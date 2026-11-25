// griglia comune a pokedex ed esplora
export const PokemonGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {children}
    </div>
  )
}

// segnaposto mostrato mentre le card vengono caricate
export const PokemonGridSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <PokemonGrid>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="h-80 w-56 animate-pulse rounded-xl border-4 border-amber-200 bg-muted"
        />
      ))}
    </PokemonGrid>
  )
}
