import { Suspense } from 'react'
import Link from 'next/link'
import CardWithToggle from '@/components/global/CardWithToggle'
import {
  PokemonGrid,
  PokemonGridSkeleton,
} from '@/components/global/PokemonGrid'
import SearchBar, { SearchBarFallback } from '@/components/global/SearchBar'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getPokemonPage } from '@/lib/pokeapi'
import { pokemonSearchParamsSchema } from '@/lib/schemas'
import { getMyPokemonIds } from '@/utils/queries'

const ExplorePage = ({ searchParams }: PageProps<'/explore'>) => {
  return (
    <section className="flex flex-col gap-6 py-8">
      <div>
        <h1 className="text-3xl font-bold">Esplora</h1>
        <p className="text-muted-foreground">
          Scopri i pokémon e aggiungili al tuo Pokédex.
        </p>
      </div>

      <Suspense fallback={<SearchBarFallback />}>
        <SearchBar />
      </Suspense>

      {/* searchParams e sessione sono dati di runtime: dietro il Suspense */}
      <Suspense fallback={<PokemonGridSkeleton count={20} />}>
        <ExploreList searchParams={searchParams} />
      </Suspense>
    </section>
  )
}

const ExploreList = async ({
  searchParams,
}: {
  searchParams: PageProps<'/explore'>['searchParams']
}) => {
  const { q, page } = pokemonSearchParamsSchema.parse(await searchParams)

  // lista da pokeapi (in cache) e pokemon posseduti (db) in parallelo
  const [{ pokemons, total, totalPages }, ownedIds] = await Promise.all([
    getPokemonPage(page, q),
    getMyPokemonIds(),
  ])

  if (total === 0) {
    return (
      <p className="py-10 text-center text-muted-foreground">
        Nessun pokémon trovato per &quot;{q}&quot;.
      </p>
    )
  }

  return (
    <>
      {q && (
        <p className="text-sm text-muted-foreground">
          {total} risultati per &quot;{q}&quot;
        </p>
      )}
      <PokemonGrid>
        {pokemons.map((p) => (
          <CardWithToggle key={p.id} pokemon={p} owned={ownedIds.has(p.id)} />
        ))}
      </PokemonGrid>

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} q={q} />
      )}
    </>
  )
}

const Pagination = ({
  page,
  totalPages,
  q,
}: {
  page: number
  totalPages: number
  q: string
}) => {
  // i link di pagina conservano la ricerca corrente
  const pageHref = (p: number) => {
    const params = new URLSearchParams({ page: String(p) })
    if (q) params.set('q', q)
    return `/explore?${params}`
  }

  return (
    <nav
      aria-label="Paginazione"
      className="flex items-center justify-center gap-4"
    >
      <PageLink href={pageHref(page - 1)} enabled={page > 1}>
        ← Precedenti
      </PageLink>
      <span className="text-sm text-muted-foreground">
        Pagina {page} di {totalPages}
      </span>
      <PageLink href={pageHref(page + 1)} enabled={page < totalPages}>
        Successivi →
      </PageLink>
    </nav>
  )
}

const PageLink = ({
  href,
  enabled,
  children,
}: {
  href: string
  enabled: boolean
  children: React.ReactNode
}) => (
  <Link
    href={href}
    aria-disabled={!enabled}
    tabIndex={enabled ? undefined : -1}
    className={cn(
      buttonVariants({ variant: 'outline' }),
      !enabled && 'pointer-events-none opacity-50',
    )}
  >
    {children}
  </Link>
)

export default ExplorePage
