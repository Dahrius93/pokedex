import { z } from 'zod'

// singolo pokemon
export const pokeApiSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  height: z.number().int().positive(),
  weight: z.number().int().positive(),
  types: z.array(
    z.object({
      slot: z.number().int(),
      type: z.object({
        name: z.string().min(1),
        url: z.url(),
      }),
    }),
  ),
  sprites: z.object({
    front_default: z.url().nullable(),
  }),
})
export type PokeApi = z.infer<typeof pokeApiSchema>

// lista pokemon
export const pokemonList = z.object({
  count: z.number().int().positive(),
  next: z.url().nullable(),
  previous: z.url().nullable(),
  results: z.array(
    z.object({
      name: z.string().min(1),
      url: z.url(),
    }),
  ),
})
export type PokemonList = z.infer<typeof pokemonList>
