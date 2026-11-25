import Card from '@/components/global/Card'
import PokedexToggleButton from '@/components/global/PokedexToggleButton'
import type { PokemonCard } from '@/lib/schemas'

// card + pulsante aggiungi/elimina, usata in pokedex ed esplora
const CardWithToggle = ({
  pokemon,
  owned,
}: {
  pokemon: PokemonCard
  owned: boolean
}) => {
  return (
    <div className="flex w-56 flex-col gap-2">
      <Card {...pokemon} />
      <PokedexToggleButton pokemonId={pokemon.id} owned={owned} />
    </div>
  )
}

export default CardWithToggle
