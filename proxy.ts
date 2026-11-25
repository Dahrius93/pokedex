import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { publicRoutes } from '@/utils/links'

const isPublicRoute = createRouteMatcher(publicRoutes)
const isApiRoute = createRouteMatcher(['/api(.*)', '/trpc(.*)'])

// Controllo "ottimistico" sulla sessione: decide solo dove mandare l'utente.
// I dati sono comunque protetti da auth() nelle query e nelle server actions.
export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  // utente loggato sulla home -> direttamente al suo pokedex
  if (userId && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/pokedex', req.url))
  }

  // utente non loggato su una pagina privata
  if (!userId && !isPublicRoute(req)) {
    if (isApiRoute(req)) {
      return NextResponse.json({ error: 'non autorizzato' }, { status: 401 })
    }
    // la home è l'unica pagina visibile senza login
    return NextResponse.redirect(new URL('/', req.url))
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for Clerk's auto-proxy path
    '/__clerk/:path*',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
