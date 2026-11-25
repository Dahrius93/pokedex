import 'server-only'
import { cacheLife } from 'next/cache'
import {
  pokeApiSchema,
  pokemonList,
  type PokeApi,
  type PokemonCard,
} from '@/lib/schemas'

const BASE_URL = 'https://pokeapi.co/api/v2'
export const PAGE_SIZE = 20

// sprite di riserva quando pokeapi non fornisce front_default
export const fallbackSprite = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

// pokeapi -> dati della Card
export const toPokemonCard = (p: PokeApi): PokemonCard => ({
  id: p.id,
  name: p.name,
  imgUrl: p.sprites.front_default ?? fallbackSprite(p.id),
  types: [...p.types].sort((a, b) => a.slot - b.slot).map((t) => t.type.name),
  height: p.height,
  weight: p.weight,
})

// singolo pokemon per id o nome. I dati di pokeapi non cambiano praticamente mai,
// quindi la cache dura a lungo. Lancia un errore se il pokemon non esiste.
export async function getPokemon(idOrName: number | string): Promise<PokeApi> {
  'use cache'
  cacheLife('max')

  const query = encodeURIComponent(String(idOrName).trim().toLowerCase())
  const res = await fetch(`${BASE_URL}/pokemon/${query}`)
  if (res.status === 404) throw new Error('pokemon non trovato')
  if (!res.ok) throw new Error('pokeapi non risponde')

  const parsed = pokeApiSchema.safeParse(await res.json())
  if (!parsed.success) throw new Error('risposta pokeapi inattesa')
  return parsed.data
}

// elenco di tutti i nomi (~1300, ordinati per numero di pokedex).
// pokeapi cerca solo per nome esatto: per la ricerca parziale si filtra
// questo elenco, scaricato una volta sola e tenuto in cache
async function getAllPokemonNames(): Promise<string[]> {
  'use cache'
  cacheLife('days')

  const url = new URL(`${BASE_URL}/pokemon`)
  url.searchParams.set('limit', '100000')

  const res = await fetch(url)
  if (!res.ok) throw new Error('pokeapi non risponde')

  const parsed = pokemonList.safeParse(await res.json())
  if (!parsed.success) throw new Error('risposta pokeapi inattesa')
  return parsed.data.results.map((r) => r.name)
}

// una pagina (page parte da 1) dei pokemon il cui nome contiene query
// (tutti se query è vuota), con i dettagli pronti per le Card
export async function getPokemonPage(
  page: number,
  query = '',
): Promise<{
  pokemons: PokemonCard[]
  total: number
  totalPages: number
}> {
  'use cache'
  cacheLife('days')

  const names = await getAllPokemonNames()
  const matches = query ? names.filter((n) => n.includes(query)) : names
  const pageNames = matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // i dettagli si chiedono in parallelo (ognuno in cache)
  const details = await Promise.all(pageNames.map((n) => getPokemon(n)))

  return {
    pokemons: details.map(toPokemonCard),
    total: matches.length,
    totalPages: Math.max(1, Math.ceil(matches.length / PAGE_SIZE)),
  }
}
