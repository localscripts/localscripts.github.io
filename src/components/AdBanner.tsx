import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

export default function AdBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 backdrop-blur-xl border border-primary/20 rounded-2xl overflow-hidden mx-4 sm:mx-auto my-8 max-w-4xl transform hover:scale-[1.02] transition-all duration-300"
    >
      <a 
        href="https://blox.game/free" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="relative">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-10" />
          
          {/* Banner Image */}
          <img 
            src="/assets/bloxgame-banner.jpg" 
            alt="BloxGame Free Offer"
            className="w-full h-48 sm:h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white drop-shadow-lg">
              🔥 Get Free Robux on BloxGame! 🔥
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-4 drop-shadow-md">
              Use code "FREE" to start earning now!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors"
            >
              Claim Now
              <ExternalLink className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </a>
    </motion.div>
  )
}