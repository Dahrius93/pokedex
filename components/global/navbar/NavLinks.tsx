'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { links } from '@/utils/links'

const NavLinks = () => {
  const pathname = usePathname()

  return (
    <ul className="flex items-center gap-1">
      {links.map((link) => {
        const isActive = pathname === link.href
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'rounded-full px-3 py-1.5 text-sm font-medium transition hover:bg-amber-100',
                isActive && 'bg-amber-400 text-white hover:bg-amber-400',
              )}
            >
              {link.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavLinks
