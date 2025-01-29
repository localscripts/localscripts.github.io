import { useState } from 'react'
import { Menu, X, Home, Globe, Monitor, Smartphone, Apple, MessageSquare } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const platforms = [
  { name: 'Windows', path: '/windows', icon: Monitor },
  { name: 'Android', path: '/android', icon: Smartphone },
  { name: 'iOS', path: '/ios', icon: Apple }
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-primary/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Globe className="w-5 h-5 text-primary group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-lg sm:text-xl font-bold">
              www.<span className="text-primary">voxlis</span>.NET
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/" active={location.pathname === '/'} icon={Home}>
              Home
            </NavLink>
            
            {platforms.map((platform) => (
              <NavLink 
                key={platform.name}
                href={platform.path}
                active={location.pathname === platform.path}
                icon={platform.icon}
              >
                {platform.name}
              </NavLink>
            ))}

            <NavLink 
              href="https://discord.com/invite/Ynxbp2YPus"
              target="_blank"
              rel="noopener noreferrer"
              active={location.pathname === '/discord'}
              icon={MessageSquare}
              className="bg-gradient-to-r from-primary to-red-500 text-white hover:from-primary/90 hover:to-red-500/90"
            >
              Discord
            </NavLink>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white focus:outline-none"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <div 
        className={`
          md:hidden bg-black border-b border-primary/30
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-96 opacity-100 visible' : 'max-h-0 opacity-0 invisible'}
        `}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <MobileNavLink href="/" onClick={() => setIsOpen(false)} icon={Home}>
            Home
          </MobileNavLink>
          
          {platforms.map((platform) => (
            <MobileNavLink 
              key={platform.name}
              href={platform.path}
              onClick={() => setIsOpen(false)}
              icon={platform.icon}
            >
              {platform.name}
            </MobileNavLink>
          ))}

          <MobileNavLink 
            href="https://discord.com/invite/Ynxbp2YPus"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)} 
            icon={MessageSquare}
            className="bg-gradient-to-r from-primary to-red-500 text-white"
          >
            Discord
          </MobileNavLink>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, children, active = false, icon: Icon, className = '', ...props }) {
  return (
    <a
      href={href}
      className={`
        flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
        hover:bg-primary/10 hover:text-white
        ${active ? 'text-white bg-primary/10' : 'text-gray-400'}
        ${className}
      `}
      {...props}
    >
      <Icon className="w-4 h-4" />
      {children}
    </a>
  )
}

function MobileNavLink({ href, children, onClick, icon: Icon, className = '', ...props }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-primary/10 
        rounded-lg text-base font-medium transition-colors duration-200
        ${className}
      `}
      {...props}
    >
      <Icon className="w-5 h-5" />
      {children}
    </a>
  )
}