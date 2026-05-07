import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { Sun, Moon, Menu, X } from 'lucide-react'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl' : 'py-6 bg-transparent'
      }`}
      style={isScrolled ? { background: 'var(--bg-glass)' } : {}}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="/" className="text-2xl font-black tracking-tighter uppercase" style={{ color: 'var(--text-primary)' }}>
          Aether
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center md:gap-6 lg:gap-10">
          {['About', 'Services', 'Portfolio', 'Pricing', 'Testimonials'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium transition-colors hover:text-cyan-400"
              style={{ color: 'var(--text-secondary)' }}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors hover:bg-white/5"
            style={{ color: 'var(--text-primary)' }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button className="hidden md:block btn-primary !py-2.5 !text-sm !px-6">
            Get Started
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: 'var(--text-primary)' }}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 p-8 md:hidden shadow-2xl backdrop-blur-3xl"
            style={{ 
              background: theme === 'dark' ? 'rgba(10, 10, 15, 0.98)' : 'rgba(255, 255, 255, 0.98)', 
              borderBottom: '1px solid var(--border-subtle)' 
            }}
          >
            <div className="flex flex-col gap-6">
              {['About', 'Services', 'Portfolio', 'Pricing', 'Testimonials'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-bold py-2 border-b border-white/5 last:border-0"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item}
                </a>
              ))}
              <button className="btn-primary w-full">Get Started</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
