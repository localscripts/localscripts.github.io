import { Search, X } from 'lucide-react'
import { useState } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function SearchBar({ value, onChange, placeholder = 'Search exploits...' }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative max-w-xl mx-auto">
      <div 
        className={`
          absolute inset-0 bg-gradient-to-r from-primary via-red-500 to-primary rounded-2xl opacity-0 blur transition-all duration-300
          ${isFocused ? 'opacity-100' : 'opacity-0'}
        `} 
      />
      
      <div className={`
        relative bg-black/40 backdrop-blur-xl border rounded-2xl transition-all duration-300
        ${isFocused ? 'border-primary/50 shadow-lg shadow-primary/20' : 'border-primary/20'}
      `}>
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className={`h-5 w-5 transition-colors duration-300 ${isFocused ? 'text-primary' : 'text-gray-400'}`} />
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent rounded-2xl py-4 pl-12 pr-12 text-white placeholder-gray-400 focus:outline-none"
          placeholder={placeholder}
        />

        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  )
}