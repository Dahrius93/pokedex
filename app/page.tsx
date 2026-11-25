import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col gap-2 text-blue-500 underline ">
      <Link href="/search" className="hover:font-bold ">
        search page
      </Link>
      <Link href="/pokedex" className="hover:font-bold ">
        pokedex
      </Link>
    </div>
  )
}
