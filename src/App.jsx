import { useState, useEffect, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Process from './components/Process'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import NotFound from './components/NotFound'

import Loader from './components/Loader'

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Process />
      <Pricing />
      <Testimonials />
      <CTA />
    </>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const handleComplete = useCallback(() => setLoading(false), [])

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
        <CustomCursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
