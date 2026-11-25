import { Suspense } from 'react'
import Link from 'next/link'
import CardWithToggle from '@/components/global/CardWithToggle'
import {
  PokemonGrid,
  PokemonGridSkeleton,
} from '@/components/global/PokemonGrid'
import SearchBar, { SearchBarFallback } from '@/components/global/SearchBar'
import { buttonVariants } from '@/components/ui/button'
import { pokemonSearchParamsSchema } from '@/lib/schemas'
import { getMyPokedex } from '@/utils/queries'

const PokedexPage = ({ searchParams }: PageProps<'/pokedex'>) => {
  return (
    <section className="flex flex-col gap-6 py-8">
      <div>
        <h1 className="text-3xl font-bold">Il tuo Pokédex</h1>
        <p className="text-muted-foreground">
          Tutti i pokémon che hai catturato.
        </p>
      </div>

      <Suspense fallback={<SearchBarFallback />}>
        <SearchBar placeholder="Cerca nel tuo Pokédex..." />
      </Suspense>

      {/* legge sessione e searchParams: viene caricato a runtime dietro il Suspense */}
      <Suspense fallback={<PokemonGridSkeleton />}>
        <PokedexList searchParams={searchParams} />
      </Suspense>
    </section>
  )
}

const PokedexList = async ({
  searchParams,
}: {
  searchParams: PageProps<'/pokedex'>['searchParams']
}) => {
  const { q } = pokemonSearchParamsSchema.parse(await searchParams)
  const pokedex = await getMyPokedex()

  if (pokedex.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-amber-300 p-10 text-center">
        <p className="text-lg font-semibold">Il tuo Pokédex è vuoto</p>
        <p className="text-muted-foreground">
          Vai su Esplora e aggiungi i tuoi primi pokémon!
        </p>
        <Link href="/explore" className={buttonVariants()}>
          Esplora i pokémon
        </Link>
      </div>
    )
  }

  // il pokedex di un utente è piccolo ed è già in cache: si filtra in memoria
  const pokemons = q ? pokedex.filter((p) => p.name.includes(q)) : pokedex

  if (pokemons.length === 0) {
    return (
      <p className="py-10 text-center text-muted-foreground">
        Nessun pokémon nel tuo Pokédex corrisponde a &quot;{q}&quot;.
      </p>
    )
  }

  return (
    <>
      <p className="text-sm text-muted-foreground">
        {q
          ? `${pokemons.length} di ${pokedex.length} pokémon`
          : `${pokedex.length} pokémon catturati`}
      </p>
      <PokemonGrid>
        {pokemons.map((p) => (
          <CardWithToggle key={p.id} pokemon={p} owned />
        ))}
      </PokemonGrid>
    </>
  )
}

export default PokedexPage
