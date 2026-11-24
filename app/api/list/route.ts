import { NextResponse } from 'next/server'
import { pokemonList } from '@/lib/schemas'

export async function GET() {
  const url = new URL(`https://pokeapi.co/api/v2/pokemon`)
  url.searchParams.set('offset', '0')
  url.searchParams.set('limit', '20')

  const res = await fetch(url)

  if (!res.ok) {
    return NextResponse.json({ error: 'server non risponde' }, { status: 502 })
  }

  const parsedData = pokemonList.safeParse(await res.json())
  if (!parsedData.success) {
    return NextResponse.json(
      { error: 'Risposta pokeapi inattesa' },
      { status: 502 },
    )
  }
  return NextResponse.json(parsedData.data)
}
