import Card from '@/components/global/Card'
import React from 'react'

const Pokedex = () => {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
      <Card
        id={25}
        height={1}
        imgUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
        name="pikachu"
        type="electric"
        weight={15}
      />
      <Card
        id={25}
        height={1}
        imgUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
        name="pikachu"
        type="electric"
        weight={15}
      />
      <Card
        id={25}
        height={1}
        imgUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
        name="pikachu"
        type="electric"
        weight={15}
      />
      <Card
        id={25}
        height={1}
        imgUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
        name="pikachu"
        type="electric"
        weight={15}
      />
    </div>
  )
}

export default Pokedex
