const Card = ({
  id,
  name,
  imgUrl,
  type,
  height,
  weight,
}: {
  id: number
  name: string
  imgUrl: string
  type: string
  height: number
  weight: number
}) => {
  return (
    <div className="flex h-80 w-56 flex-col gap-2 rounded-xl border-4 border-amber-400 bg-card p-2 text-card-foreground shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      {/* header: nome + numero */}
      <div className="flex items-baseline justify-between px-1">
        <h2 className="truncate text-lg font-bold capitalize">{name}</h2>
        <span className="text-xs font-mono text-muted-foreground">
          #{String(id).padStart(3, '0')}
        </span>
      </div>

      {/* immagine */}
      <div className="flex flex-1 items-center justify-center rounded-lg border border-amber-200 bg-linear-to-b from-amber-100 to-amber-50">
        <img
          src={imgUrl}
          alt={name}
          className="size-32 object-contain [image-rendering:pixelated]"
        />
      </div>

      {/* tipo */}
      <div className="flex gap-1">
        <span className="rounded-full bg-amber-500 px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
          {type}
        </span>
      </div>

      {/* statistiche */}
      <div className="grid grid-cols-2 gap-1 text-center">
        <div className="rounded-md bg-muted py-1">
          <p className="text-[10px] uppercase text-muted-foreground">Altezza</p>
          <p className="text-sm font-semibold">{height / 10} m</p>
        </div>
        <div className="rounded-md bg-muted py-1">
          <p className="text-[10px] uppercase text-muted-foreground">Peso</p>
          <p className="text-sm font-semibold">{weight / 10} kg</p>
        </div>
      </div>
    </div>
  )
}

export default Card
