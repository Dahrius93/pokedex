'use client'

import Form from 'next/form'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Button, buttonVariants } from '@/components/ui/button'

// ricerca per nome: aggiorna ?q= nell'URL della pagina corrente
// (action="" = stessa pagina; il parametro page viene azzerato)
const SearchBar = ({ placeholder = 'Cerca per nome...' }) => {
  const pathname = usePathname()
  const q = useSearchParams().get('q') ?? ''

  return (
    <Form action="" replace className="flex w-full max-w-md gap-2">
      <input
        // key: se la ricerca cambia dall'esterno (es. "Annulla") l'input si aggiorna
        key={q}
        type="search"
        name="q"
        defaultValue={q}
        placeholder={placeholder}
        aria-label="Cerca pokémon per nome"
        maxLength={50}
        className="h-9 flex-1 rounded-4xl border border-amber-300 bg-card px-4 text-sm outline-none focus-visible:border-amber-500 focus-visible:ring-[3px] focus-visible:ring-amber-500/30"
      />
      <Button type="submit">Cerca</Button>
      {q && (
        <Link href={pathname} className={buttonVariants({ variant: 'ghost' })}>
          Annulla
        </Link>
      )}
    </Form>
  )
}

// mostrato finché i parametri URL non sono disponibili
export const SearchBarFallback = () => (
  <div className="h-9 w-full max-w-md rounded-4xl border border-amber-300 bg-card" />
)

export default SearchBar
