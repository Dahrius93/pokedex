import { Suspense } from 'react'
import Link from 'next/link'
import { Show } from '@clerk/nextjs'
import ClerkNav from './ClerkNav'
import NavLinks from './NavLinks'

const Navbar = () => {
  return (
    <header className="border-b-4 border-amber-400 bg-card">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-8 xl:max-w-7xl">
        <div className="flex items-center gap-6">
          {/* per l'utente loggato "/" porta al pokedex (vedi proxy.ts) */}
          <Link href="/" className="text-xl font-bold">
            Poké<span className="text-amber-500">dex</span>
          </Link>
          {/* Show legge la sessione: deve stare dietro un Suspense */}
          <Suspense>
            <Show when="signed-in">
              <NavLinks />
            </Show>
          </Suspense>
        </div>
        <Suspense>
          <ClerkNav />
        </Suspense>
      </nav>
    </header>
  )
}

export default Navbar
