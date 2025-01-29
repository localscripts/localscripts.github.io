import { useEffect, useState } from 'react'
import { cards as allCards } from '../data/cards'
import Card from './Card'
import SearchBar from './SearchBar'
import type { Card as CardType } from '../types'

interface CardGridProps {
  initialCards?: CardType[]
}

export default function CardGrid({ initialCards }: CardGridProps) {
  const [visibleCards, setVisibleCards] = useState<CardType[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    let filtered = initialCards || allCards.filter(card => !card.hide)

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(card => 
        card.name.toLowerCase().includes(term) ||
        card.pros.some(pro => pro.toLowerCase().includes(term)) ||
        card.neutral.some(item => item.toLowerCase().includes(term)) ||
        card.cons.some(con => con.toLowerCase().includes(term))
      )
    }

    setVisibleCards(filtered)
  }, [searchTerm, initialCards])

  return (
    <div className="space-y-6">
      <SearchBar 
        value={searchTerm}
        onChange={setSearchTerm}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto px-4">
        {visibleCards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </div>
  )
}