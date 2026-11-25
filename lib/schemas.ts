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

// dati mostrati dalla Card: stessa forma sia che arrivino da pokeapi sia dal db
export const pokemonCardSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  imgUrl: z.string(),
  types: z.array(z.string().min(1)),
  height: z.number().int().positive(),
  weight: z.number().int().positive(),
})
export type PokemonCard = z.infer<typeof pokemonCardSchema>

// id ricevuto dal client nelle server actions: non ci si fida mai
export const pokemonIdSchema = z.coerce.number().int().positive()

// parametri URL di pokedex/esplora (?q=pika&page=2). Valori non validi
// non generano errori: si torna al default (nessuna ricerca, pagina 1)
const firstValue = (v: unknown) => (Array.isArray(v) ? v[0] : v)
export const pokemonSearchParamsSchema = z.object({
  q: z
    .preprocess(
      firstValue,
      z
        .string()
        .trim()
        .toLowerCase()
        .max(50)
        // pokeapi usa i trattini nei nomi composti: "mr mime" -> "mr-mime"
        .transform((s) => s.replace(/\s+/g, '-')),
    )
    .catch(''),
  page: z.preprocess(firstValue, z.coerce.number().int().positive()).catch(1),
})
export type PokemonSearchParams = z.infer<typeof pokemonSearchParamsSchema>

// risultato restituito dalle server actions
export type ActionResult = { ok: true } | { ok: false; message: string }
