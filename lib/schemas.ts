import { z } from 'zod'

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
