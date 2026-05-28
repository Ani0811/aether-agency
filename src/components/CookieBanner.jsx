import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('g1media_cookie_consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('g1media_cookie_consent', 'accepted')
    setIsVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem('g1media_cookie_consent', 'rejected')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleReject}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md p-6 md:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-[24px] shadow-[0_0_50px_rgba(0,240,255,0.15)] z-10"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-400/10 flex items-center justify-center border border-cyan-400/20 shrink-0">
                  <Cookie size={20} className="text-cyan-400" />
                </div>
                <h3 className="font-extrabold text-lg tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  Cookie Consent
                </h3>
              </div>
              <button 
                onClick={handleReject}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                style={{ color: 'var(--text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>
            
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              We use essential cookies to make our website work properly. With your consent, we may also use non-essential cookies to analyze website traffic, customize content, and improve your overall experience.
            </p>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleAccept}
                className="w-full btn-primary py-3! text-xs! font-bold uppercase tracking-wider"
              >
                Accept All
              </button>
              <button 
                onClick={handleReject}
                className="w-full btn-secondary py-3! text-xs! font-bold uppercase tracking-wider"
              >
                Reject All
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
