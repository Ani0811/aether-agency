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
import BudgetCalculator from './components/BudgetCalculator'
import AIChatWidget from './components/AIChatWidget'
import CaseStudyDetail from './components/CaseStudyDetail'
import ClientLogin from './components/ClientLogin'
import ClientDashboard from './components/ClientDashboard'
import ServiceDetail from './components/ServiceDetail'
import GetStarted from './components/GetStarted'

import ScheduleModal from './components/ScheduleModal'
import Loader from './components/Loader'

function HomePage({ onScheduleCall }) {
  return (
    <>
      <Hero onScheduleCall={onScheduleCall} />
      <Services />
      <Portfolio />
      <Process />
      <BudgetCalculator />
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

  useEffect(() => {
    if (!loading && location.pathname === '/' && location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        const timer = setTimeout(() => {
          const offset = 85
          const bodyRect = document.body.getBoundingClientRect().top
          const elementRect = el.getBoundingClientRect().top
          const elementPosition = elementRect - bodyRect
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          })
        }, 150)
        return () => clearTimeout(timer)
      }
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
      <div className="min-h-screen relative">
        <Navbar onScheduleCall={() => setIsScheduleOpen(true)} />
        <ScheduleModal isOpen={isScheduleOpen} onClose={() => setIsScheduleOpen(false)} />

        <Routes>
          <Route path="/" element={<HomePage onScheduleCall={() => setIsScheduleOpen(true)} />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/services/:slug" element={<ServiceDetail onScheduleCall={() => setIsScheduleOpen(true)} />} />
          <Route path="/portfolio/:id" element={<CaseStudyDetail />} />
          <Route path="/portal" element={<ClientLogin />} />
          <Route path="/portal/dashboard" element={<ClientDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />

        {/* Global AI Chat Widget */}
        <AIChatWidget />
      </div>
    </ThemeProvider>
  )
}
