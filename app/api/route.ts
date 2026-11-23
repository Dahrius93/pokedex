import { NextResponse } from 'next/server'
import { pokeApiSchema } from '@/lib/schemas'

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get('q')?.trim()
  if (!q) {
    return NextResponse.json({ error: 'Query troppo corta' }, { status: 400 }) // richiesta non valida
  }

  const query = encodeURIComponent(q.toLowerCase())
  const url = new URL(`https://pokeapi.co/api/v2/pokemon/${query}`)

  try {
    const res = await fetch(url)
    if (res.status === 404) {
      return NextResponse.json(
        { error: 'pokemon non trovato' },
        { status: 404 },
      )
    }
    if (!res.ok) {
      return NextResponse.json(
        { error: 'server non risponde' },
        { status: 502 },
      )
    }
    const parsedData = pokeApiSchema.safeParse(await res.json())
    if (!parsedData.success) {
      return NextResponse.json(
        { error: 'Risposta pokeapi inattesa' },
        { status: 502 },
      )
    }
    return NextResponse.json(parsedData.data)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'servizio esterno non raggiungibile' },
      { status: 502 },
    )
  }
}
