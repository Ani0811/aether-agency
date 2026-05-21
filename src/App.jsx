import { useState, useEffect, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { trackPageView } from './utils/analytics'
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
  const location = useLocation()
  const handleComplete = useCallback(() => setLoading(false), [])

  useEffect(() => {
    if (!loading) {
      trackPageView(location.pathname + location.search + location.hash)
    }
  }, [location, loading])

  if (loading) {
    return (
      <ThemeProvider>
        <Loader onComplete={handleComplete} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navbar onScheduleCall={() => setIsScheduleOpen(true)} />
        <ScheduleModal isOpen={isScheduleOpen} onClose={() => setIsScheduleOpen(false)} />
        <Routes>
          <Route path="/" element={<HomePage onScheduleCall={() => setIsScheduleOpen(true)} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
