import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AlertCircle, ExternalLink } from 'lucide-react'
import { cards } from '../data/cards'
import CardGrid from '../components/CardGrid'
import type { Card } from '../types'

export default function Platform() {
  const { platform } = useParams<{ platform: string }>()
  const [filteredCards, setFilteredCards] = useState<Card[]>([])

  useEffect(() => {
    if (platform) {
      const filtered = cards.filter(card => 
        !card.hide && card.types.some(type => type.toLowerCase() === platform.toLowerCase())
      )
      setFilteredCards(filtered)
    }
  }, [platform])

  return (
    <div className="min-h-screen pt-24">
      {/* Notification Section */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black/40 backdrop-blur-lg border border-primary/20 rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-start gap-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <AlertCircle className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  Installing exploits on Android & PC
                </h2>
                <a 
                  href="https://youtu.be/Zj2ug30UmnU&index=1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-primary hover:text-white transition-colors"
                >
                  <span className="font-medium">Click here to watch the YouTube tutorial</span>
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CardGrid initialCards={filteredCards} />
        </div>
      </section>
    </div>
  )
}