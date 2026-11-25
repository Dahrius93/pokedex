import 'server-only'
import { auth } from '@clerk/nextjs/server'
import { cacheLife, cacheTag } from 'next/cache'
import { redirect } from 'next/navigation'
import db from '@/utils/db'
import type { PokemonCard } from '@/lib/schemas'
import { fallbackSprite } from '@/lib/pokeapi'

// tag della cache del pokedex di un utente: le actions lo invalidano con updateTag
export const pokedexTag = (clerkId: string) => `pokedex:${clerkId}`

// utente corrente: il proxy protegge già le pagine, ma ogni lettura
// di dati verifica di nuovo la sessione vicino ai dati
async function requireUserId() {
  const { userId } = await auth()
  if (!userId) redirect('/')
  return userId
}

// --- funzioni in cache, NON esportate: così nessuno può chiedere
// il pokedex di un altro utente passando un clerkId diverso

async function getPokedexByClerkId(clerkId: string): Promise<PokemonCard[]> {
  'use cache'
  cacheTag(pokedexTag(clerkId))
  cacheLife('hours')

  const rows = await db.userPokemon.findMany({
    where: { clerkId },
    orderBy: { pokemonId: 'asc' },
    select: {
      pokemon: {
        select: {
          id: true,
          name: true,
          height: true,
          weight: true,
          imageUrl: true,
          types: { select: { name: true }, orderBy: { name: 'asc' } },
        },
      },
    },
  })

  return rows.map(({ pokemon: p }) => ({
    id: p.id,
    name: p.name,
    imgUrl: p.imageUrl ?? fallbackSprite(p.id),
    types: p.types.map((t) => t.name),
    height: p.height,
    weight: p.weight,
  }))
}

async function getOwnedIdsByClerkId(clerkId: string): Promise<number[]> {
  'use cache'
  cacheTag(pokedexTag(clerkId))
  cacheLife('hours')

  const rows = await db.userPokemon.findMany({
    where: { clerkId },
    select: { pokemonId: true },
  })
  return rows.map((r) => r.pokemonId)
}

// --- API pubblica

// tutti i pokemon nel pokedex dell'utente loggato
export async function getMyPokedex() {
  return getPokedexByClerkId(await requireUserId())
}

// id dei pokemon posseduti dall'utente loggato (per la pagina esplora)
export async function getMyPokemonIds() {
  return new Set(await getOwnedIdsByClerkId(await requireUserId()))
}
