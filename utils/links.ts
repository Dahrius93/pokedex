export type NavLink = {
  href: string
  label: string
}

// pagine visibili solo agli utenti loggati (mostrate nella navbar)
export const links: NavLink[] = [
  { href: '/pokedex', label: 'Pokédex' },
  { href: '/explore', label: 'Esplora' },
]

// pagine raggiungibili senza login
export const publicRoutes = ['/']
