import { ExternalLink } from 'lucide-react'
import type { Card as CardType } from '../types'

const typeList: Record<string, string> = {
  windows: "Windows",
  macos: "MacOS", 
  android: "Android",
  key: "Has a Key System",
  ios: "iOS",
  server: "Serversided",
  unc: "UNC and sUNC tested by voxlis.NET"
}

export default function Card({ card }: { card: CardType }) {
  const now = new Date()
  const expires = card.expires ? new Date(card.expires) : null
  const isExpired = expires && now > expires
  const isWave = card.name === 'Wave'
  const cardColor = isWave ? '#06A3F1' : '#B32624'

  const handleClick = (url: string) => {
    if (card.warning) {
      const warningText = card.warningText || "⚠️ **DANGER**: THIS EXPLOIT IS **UNVERIFIED** BY voxlis.NET. INSTALLING SOFTWARE FROM THIS SOURCE IS HIGHLY **RISKY** AND MAY INFECT YOUR DEVICE WITH **MALWARE OR VIRUSES**. PROCEED AT YOUR OWN RISK. ⚠️"
      if (confirm(warningText)) {
        window.open(url, '_blank')
      }
    } else {
      window.open(url, '_blank')
    }
  }

  return (
    <div 
      className={`
        relative overflow-hidden bg-black/40 backdrop-blur-xl border rounded-lg p-5
        hover:scale-[1.02] transition-all duration-300 group h-full
        ${isWave ? 'animate-pulse-blue' : ''}
        ${card.glow && !isExpired ? 'shadow-lg' : 'border-gray-800/50'}
      `}
      style={{
        borderColor: card.glow && !isExpired ? cardColor : 'rgba(31, 41, 55, 0.5)',
        boxShadow: card.glow && !isExpired ? `0 0 20px ${cardColor}40` : undefined
      }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card Types */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        {card.types.map((type) => (
          <div key={type} className="group/icon relative">
            <div className="relative">
              <img 
                src={`/assets/${type}.png`}
                alt={type}
                className="w-5 h-5 object-contain transform transition-transform duration-300 group-hover/icon:scale-110"
              />
              <div className="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover/icon:opacity-100 animate-ping" />
            </div>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-xl border border-primary/20 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover/icon:opacity-100 transition-all duration-300 whitespace-nowrap z-20">
              {typeList[type]}
            </div>
          </div>
        ))}
      </div>

      {/* Card Content */}
      <div className="relative z-10 space-y-4">
        <h3 className="text-lg font-bold pr-20 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {card.name}
        </h3>

        {/* Lists */}
        <div className="space-y-3 min-h-[100px]">
          {card.pros.length > 0 && (
            <div className="transform transition-all duration-300 hover:translate-x-1">
              <h4 className="text-sm font-semibold text-emerald-400 mb-1">Pros</h4>
              <ul className="list-disc pl-4 space-y-1">
                {card.pros.map((pro, i) => (
                  <li key={i} className="text-sm text-emerald-400/90">{pro}</li>
                ))}
              </ul>
            </div>
          )}

          {card.neutral.length > 0 && (
            <div className="transform transition-all duration-300 hover:translate-x-1">
              <h4 className="text-sm font-semibold text-yellow-400 mb-1">Neutral</h4>
              <ul className="list-disc pl-4 space-y-1">
                {card.neutral.map((item, i) => (
                  <li key={i} className="text-sm text-yellow-400/90">{item}</li>
                ))}
              </ul>
            </div>
          )}

          {card.cons.length > 0 && (
            <div className="transform transition-all duration-300 hover:translate-x-1">
              <h4 className="text-sm font-semibold text-red-400 mb-1">Cons</h4>
              <ul className="list-disc pl-4 space-y-1">
                {card.cons.map((con, i) => (
                  <li key={i} className="text-sm text-red-400/90">{con}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => handleClick(card.link)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg
              bg-gradient-to-r from-primary/10 to-primary/5
              hover:from-primary/20 hover:to-primary/10
              border border-primary/20 hover:border-primary/40 
              text-white transition-all duration-300
              group/btn text-sm"
          >
            <span>{card.buttonText || 'View'}</span>
            <ExternalLink className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
          </button>

          {card.buylink && !isExpired && (
            <button
              onClick={() => handleClick(card.buylink!)}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg
                bg-gradient-to-r from-emerald-500/10 to-emerald-500/5
                hover:from-emerald-500/20 hover:to-emerald-500/10
                border border-emerald-500/20 hover:border-emerald-500/40 
                text-emerald-400 transition-all duration-300
                group/btn text-sm"
            >
              <span>{card.buytext || 'Buy Now'}</span>
              <ExternalLink className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>

        {/* Last Edited */}
        {card.lastEditedBy && (
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="text-xs text-gray-500">Last edited by {card.lastEditedBy}</span>
            {card.lastEditedByImage && (
              <img 
                src={card.lastEditedByImage} 
                alt="Editor" 
                className="w-4 h-4 rounded-full ring-1 ring-white/10"
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}