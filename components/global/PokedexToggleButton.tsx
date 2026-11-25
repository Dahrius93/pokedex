'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { addPokemonAction, removePokemonAction } from '@/utils/actions'

// pulsante sotto la card in "esplora": aggiunge il pokemon al pokedex
// oppure lo elimina se l'utente lo possiede già
const PokedexToggleButton = ({
  pokemonId,
  owned,
}: {
  pokemonId: number
  owned: boolean
}) => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleClick = () => {
    setError(null)
    startTransition(async () => {
      const result = owned
        ? await removePokemonAction(pokemonId)
        : await addPokemonAction(pokemonId)
      if (!result.ok) setError(result.message)
    })
  }

  return (
    <div className="flex w-full flex-col gap-1">
      <Button
        onClick={handleClick}
        disabled={isPending}
        variant={owned ? 'destructive' : 'default'}
        className="w-full"
      >
        {isPending
          ? owned
            ? 'Eliminazione...'
            : 'Aggiunta...'
          : owned
            ? 'Elimina'
            : 'Aggiungi'}
      </Button>
      {error && (
        <p role="alert" className="text-center text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export default PokedexToggleButton
