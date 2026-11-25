import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

// unica pagina visibile senza login: chi è loggato viene mandato
// al pokedex dal proxy
const features = [
  {
    title: 'Esplora',
    text: 'Sfoglia tutti i pokémon con tipi, altezza e peso.',
  },
  {
    title: 'Cattura',
    text: 'Aggiungi al tuo Pokédex i pokémon che preferisci con un clic.',
  },
  {
    title: 'Collezione',
    text: 'Ritrova la tua collezione personale ogni volta che accedi.',
  },
]

export default function Home() {
  return (
    <section className="flex flex-col items-center gap-12 py-16 text-center">
      <div className="flex flex-col items-center gap-4">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
          alt="Pikachu"
          className="size-32 [image-rendering:pixelated]"
        />
        <h1 className="text-4xl font-bold sm:text-5xl">
          Il tuo <span className="text-amber-500">Pokédex</span> personale
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Esplora il mondo dei pokémon, cattura i tuoi preferiti e costruisci
          la tua collezione. Accedi per iniziare!
        </p>
        <div className="flex gap-3">
          <SignInButton mode="modal">
            <Button size="lg">Accedi</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button size="lg" variant="outline">
              Registrati
            </Button>
          </SignUpButton>
        </div>
      </div>

      <ul className="grid w-full max-w-4xl gap-4 sm:grid-cols-3">
        {features.map((f) => (
          <li
            key={f.title}
            className="rounded-xl border-4 border-amber-400 bg-card p-4 text-left shadow-md"
          >
            <h2 className="text-lg font-bold">{f.title}</h2>
            <p className="text-sm text-muted-foreground">{f.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
