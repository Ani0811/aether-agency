import { useState, useEffect, useCallback } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { trackPageView } from './utils/analytics'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Process from './components/Process'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import RefundSection from './components/RefundSection'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import WhatsappDashboard from './components/WhatsappDashboard'

import ScheduleModal from './components/ScheduleModal'
import Loader from './components/Loader'

function HomePage({ onScheduleCall }) {
  return (
    <>
      <Hero onScheduleCall={onScheduleCall} />
      <Services />
      <Portfolio />
      <Process />
      <Pricing onScheduleCall={onScheduleCall} />
      <Testimonials />
      <About />
      <RefundSection />
      <CTA />
    </>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [isScheduleOpen, setIsScheduleOpen] = useState(false)
  const [botStatus, setBotStatus] = useState('initializing')
  const location = useLocation()
  const navigate = useNavigate()
  const handleComplete = useCallback(() => setLoading(false), [])

  useEffect(() => {
    if (!loading) {
      trackPageView(location.pathname + location.search + location.hash)
    }
  }, [location, loading])

  // Poll WhatsApp Bot Status for the Floating Portal Badge
  useEffect(() => {
    if (loading) return
    const API_BASE = import.meta.env.DEV
      ? 'http://localhost:3001'
      : (import.meta.env.VITE_API_BACKEND_URL || '')
      
    const checkBotStatus = async () => {
      try {
        const res = await fetch(`${API_BASE.replace(/\/$/, '')}/api/whatsapp-status`)
        if (res.ok) {
          const data = await res.json()
          setBotStatus(data.status)
        }
      } catch (err) {
        setBotStatus('offline')
      }
    }
    
    checkBotStatus()
    const interval = setInterval(checkBotStatus, 4000)
    return () => clearInterval(interval)
  }, [loading])

  if (loading) {
    return (
      <ThemeProvider>
        <Loader onComplete={handleComplete} />
      </ThemeProvider>
    )
  }

  const showFloatingButton = location.pathname !== '/whatsapp-dashboard'

  return (
    <ThemeProvider>
      <div className="min-h-screen relative">
        <Navbar onScheduleCall={() => setIsScheduleOpen(true)} />
        <ScheduleModal isOpen={isScheduleOpen} onClose={() => setIsScheduleOpen(false)} />
        
        {/* Floating AI Portal button */}
        {showFloatingButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="fixed right-6 bottom-24 md:right-8 md:bottom-28 z-40"
          >
            <button
              onClick={() => navigate('/whatsapp-dashboard')}
              className="group relative flex items-center justify-center w-14 h-14 rounded-full border border-emerald-500/30 bg-[#0a0a0f]/90 backdrop-blur-md shadow-[0_0_20px_rgba(37,211,102,0.15)] cursor-pointer hover:border-emerald-400/80 hover:shadow-[0_0_30px_rgba(37,211,102,0.45)] hover:-translate-y-1 transition-all duration-300 select-none active:scale-95"
            >
              {/* Dynamic Status Tooltip */}
              <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3.5 py-2 rounded-xl bg-[#0a0a0f]/95 backdrop-blur-md border border-emerald-500/20 text-[11px] font-bold tracking-wider whitespace-nowrap opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                <span className="text-white">AI Agent Portal</span>
                <span className={`ml-1.5 font-black uppercase text-[9px] ${
                  botStatus === 'ready' 
                    ? 'text-emerald-400' 
                    : botStatus === 'qr_ready' || botStatus === 'initializing' || botStatus === 'authenticated'
                      ? 'text-amber-400'
                      : 'text-rose-500'
                }`}>
                  {botStatus === 'ready' 
                    ? '• Online' 
                    : botStatus === 'qr_ready' || botStatus === 'initializing' || botStatus === 'authenticated'
                      ? '• Linking'
                      : '• Offline'}
                </span>
              </div>

              {/* WhatsApp SVG Icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-7 h-7 text-[#25D366] drop-shadow-[0_0_5px_rgba(37,211,102,0.4)] transition-transform duration-300 group-hover:scale-110"
              >
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.233-1.371a9.994 9.994 0 0 0 4.777 1.21h.005c5.505 0 9.987-4.478 9.989-9.985A9.997 9.997 0 0 0 12.012 2zm4.72 13.513c-.26.732-1.288 1.341-1.785 1.4-1.37.165-3.116-.39-4.838-2.115-1.721-1.723-2.274-3.47-2.106-4.839.062-.497.674-1.522 1.408-1.78.232-.08.455-.098.625-.098.17 0 .34.003.49.076.16.077.362.29.439.475.08.19.27.658.293.708.068.14.095.3.003.483-.09.183-.152.268-.266.398-.114.13-.23.23-.33.35-.11.12-.224.254-.097.473.127.22.565.93 1.215 1.51.837.747 1.542.977 1.762 1.087.22.11.348.09.478-.06.13-.15.565-.658.715-.883.15-.224.3-.19.505-.114.205.076 1.3.613 1.523.725.223.11.372.165.428.26.056.096.056.55-.205 1.282z"/>
              </svg>

              {/* Status Badge */}
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                {botStatus === 'ready' ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-[#0a0a0f]" />
                  </>
                ) : botStatus === 'qr_ready' || botStatus === 'initializing' || botStatus === 'authenticated' ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border border-[#0a0a0f]" />
                  </>
                ) : (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500 border border-[#0a0a0f]" />
                  </>
                )}
              </span>
            </button>
          </motion.div>
        )}

        <Routes>
          <Route path="/" element={<HomePage onScheduleCall={() => setIsScheduleOpen(true)} />} />
          <Route path="/whatsapp-dashboard" element={<WhatsappDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
