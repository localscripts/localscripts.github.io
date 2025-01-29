import { useState, useEffect } from 'react'
import { Globe, Zap, Shield, Cpu } from 'lucide-react'
import PlatformSelector from '../components/PlatformSelector'
import CardGrid from '../components/CardGrid'
import AdBanner from '../components/AdBanner'

export default function Home() {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenBloxGamePopup')
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true)
        localStorage.setItem('hasSeenBloxGamePopup', 'true')
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black">
      <section className="relative pt-20 sm:pt-32 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                voxlis.NET
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-medium">
                The ultimate source for executors: everything you need, all in one place.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 sm:mt-16">
              <Feature
                icon={Zap}
                title="Lightning Fast"
                description="Quick execution process with minimal loading times"
              />
              <Feature
                icon={Shield}
                title="Secure & Safe"
                description="All executors are thoroughly tested and verified"
              />
              <Feature
                icon={Cpu}
                title="High Performance"
                description="Optimized for maximum efficiency and stability"
              />
            </div>
          </div>
        </div>
      </section>

      <AdBanner />

      <section className="py-6 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PlatformSelector />
        </div>
      </section>

      <section className="py-6 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CardGrid />
        </div>
      </section>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-primary rounded-2xl max-w-md w-full p-6 transform transition-all duration-500 hover:scale-105">
            <div className="text-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent mb-3">
                🔥 Check out BloxGame! 🔥
              </h2>
              <p className="text-gray-300 mb-4 font-medium">
                💵 Coupon code "FREE" to start! 💵
              </p>
              <a 
                href="https://blox.game/free" 
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="relative rounded-xl overflow-hidden mb-4">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img 
                    src="/assets/bloxgame-banner.jpg" 
                    alt="BloxGame/free" 
                    className="w-full transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </a>
              <button
                onClick={() => setShowPopup(false)}
                className="w-full bg-gradient-to-r from-primary to-red-500 hover:from-primary/90 hover:to-red-500/90 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-primary/20"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Feature({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-primary/20 rounded-2xl p-4 sm:p-6 transform hover:scale-105 transition-all duration-300">
      <div className="flex flex-col items-center text-center">
        <div className="p-2 sm:p-3 bg-primary/10 rounded-xl mb-3 sm:mb-4">
          <Icon className="w-5 h-5 sm:w-8 sm:h-8 text-primary" />
        </div>
        <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  )
}