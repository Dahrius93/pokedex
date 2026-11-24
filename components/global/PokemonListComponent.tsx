'use client'

import { useEffect, useState } from 'react'
import type { PokemonList } from '@/lib/schemas'

const PokemonListComponent = () => {
  const [list, setList] = useState<PokemonList>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/list')
        if (!res.ok) throw new Error('errore caricamento lista')
        const data = await res.json()
        setList(data)
      } catch (error) {
        if ((error as Error).name !== 'AbortError') setList(undefined)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <>
      {loading && (
        <p className="text-sm text-muted-foreground">cercando risultati...</p>
      )}
      <ul>
        {list?.results.map((l) => {
          return (
            <li key={l.name}>
              <a href={l.url}>{l.name}</a>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default PokemonListComponent
