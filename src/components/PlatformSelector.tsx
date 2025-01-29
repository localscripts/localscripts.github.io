import { Monitor, Smartphone, Apple } from 'lucide-react'

const platforms = [
  {
    name: 'Windows',
    icon: Monitor,
    path: '/windows',
    description: 'PC exploits and injectors'
  },
  {
    name: 'Android',
    icon: Smartphone,
    path: '/android',
    description: 'Mobile exploits for Android'
  },
  {
    name: 'iOS',
    icon: Apple,
    path: '/ios',
    description: 'Mobile exploits for iOS'
  }
]

export default function PlatformSelector() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {platforms.map((platform) => {
        const Icon = platform.icon
        return (
          <a
            key={platform.name}
            href={platform.path}
            className="group relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-sm border border-primary/20 p-8 transition-all duration-300 hover:scale-105 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
          >
            <div className="relative z-10 flex flex-col items-center text-center">
              <Icon className="w-16 h-16 mb-4 text-primary group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bold mb-2">{platform.name}</h3>
              <p className="text-gray-400">{platform.description}</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        )
      })}
    </div>
  )
}