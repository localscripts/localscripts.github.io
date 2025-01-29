import { Globe } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black/95 backdrop-blur-xl border-t border-primary/30">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <span className="text-lg font-bold">
              www.<span className="text-primary">voxlis</span>.NET
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 text-sm">
            <a 
              href="https://github.com/localscripts/localscripts.github.io/blob/main/scripts/index.json" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contribute
            </a>
            <span className="text-gray-600">•</span>
            <a 
              href="https://discord.com/invite/Ynxbp2YPus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Discord
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} voxlis.NET. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}