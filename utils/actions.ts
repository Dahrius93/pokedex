'use server'

import { auth } from '@clerk/nextjs/server'
import { updateTag } from 'next/cache'
import db from '@/utils/db'
import { getPokemon, toPokemonCard } from '@/lib/pokeapi'
import { pokemonIdSchema, type ActionResult } from '@/lib/schemas'
import { pokedexTag } from '@/utils/queries'

// Le server action sono raggiungibili con una POST diretta:
// ogni action verifica l'utente e valida l'input, senza fidarsi del client.

export async function addPokemonAction(
  pokemonId: number,
): Promise<ActionResult> {
  const { userId } = await auth()
  if (!userId) return { ok: false, message: 'Devi effettuare il login' }

  const id = pokemonIdSchema.safeParse(pokemonId)
  if (!id.success) return { ok: false, message: 'Pokemon non valido' }

  try {
    // i dati si prendono da pokeapi (in cache), non dal client
    const data = await getPokemon(id.data)
    const pokemon = toPokemonCard(data)
    const { types } = data

    // salva il pokemon nel catalogo condiviso se non c'è già
    await db.pokemon.upsert({
      where: { id: pokemon.id },
      update: {},
      create: {
        id: pokemon.id,
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        imageUrl: pokemon.imgUrl,
        types: {
          connectOrCreate: types.map(({ type }) => ({
            where: { name: type.name },
            create: { name: type.name, url: type.url },
          })),
        },
      },
    })

    // e lo collega all'utente (nessun errore se lo possiede già)
    await db.userPokemon.upsert({
      where: { clerkId_pokemonId: { clerkId: userId, pokemonId: pokemon.id } },
      update: {},
      create: { clerkId: userId, pokemonId: pokemon.id },
    })
  } catch (error) {
    console.error(error)
    return { ok: false, message: 'Impossibile aggiungere il pokemon' }
  }

  updateTag(pokedexTag(userId))
  return { ok: true }
}

export async function removePokemonAction(
  pokemonId: number,
): Promise<ActionResult> {
  const { userId } = await auth()
  if (!userId) return { ok: false, message: 'Devi effettuare il login' }

  const id = pokemonIdSchema.safeParse(pokemonId)
  if (!id.success) return { ok: false, message: 'Pokemon non valido' }

  try {
    // il filtro su clerkId garantisce che si tocchi solo il proprio pokedex;
    // il pokemon resta nel catalogo condiviso
    await db.userPokemon.deleteMany({
      where: { clerkId: userId, pokemonId: id.data },
    })
  } catch (error) {
    console.error(error)
    return { ok: false, message: 'Impossibile eliminare il pokemon' }
  }

  updateTag(pokedexTag(userId))
  return { ok: true }
}
