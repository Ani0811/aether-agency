import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ExternalLink, Play, ChevronLeft, ChevronRight, AlertCircle, RefreshCw } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

const categories = ['All', 'Websites', 'AI Agents', 'Videos']
const videoSubCategories = ['All Videos', 'Reels', 'YT Videos', 'Vlogs']

function LazyMedia({ image, title, isVideo }) {
  const [inView, setInView] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const ref = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '150px' }
    )

    if (ref.current) observer.observe(ref.current)
    return () => { if (ref.current) observer.unobserve(ref.current) }
  }, [])

  // Programmatic muted & defaultMuted to guarantee autoplay across all browsers
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.defaultMuted = true
      
      // If the video has already loaded metadata or data (e.g. from cache)
      if (videoRef.current.readyState >= 1) {
        setIsLoaded(true)
      }
    }
  }, [inView])

  // Resolve local paths with BASE_URL
  const resolvedImage = image?.startsWith('http')
    ? image
    : `${import.meta.env.BASE_URL}${image?.replace(/^\//, '')}`.replace(/\/+/g, '/')

  const isVideoFile = image?.endsWith('.mp4') || image?.endsWith('.webm') || image?.endsWith('.ogg')

  const handleMediaLoaded = () => {
    setIsLoaded(true)
  }

  const handleMediaError = () => {
    console.error(`Failed to load media for title "${title}": ${resolvedImage}`)
    setHasError(true)
    setIsLoaded(true) // Hide the spinner even on error to show fallback/original text instead of loading forever
  }

  return (
    <div
      ref={ref}
      className="relative aspect-4/3 rounded-3xl overflow-hidden mb-8 border border-white/5 shadow-2xl bg-white/5"
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-400/20 border-t-cyan-400 animate-spin" />
        </div>
      )}

      {inView && (
        isVideoFile ? (
          hasError ? (
            <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center p-6 text-center">
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">Video Showcase</span>
              <span className="text-[var(--text-muted)] text-[10px]">{title}</span>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={resolvedImage}
              muted
              playsInline
              autoPlay
              loop
              preload="auto"
              onLoadedMetadata={handleMediaLoaded}
              onLoadedData={handleMediaLoaded}
              onCanPlay={handleMediaLoaded}
              onPlay={handleMediaLoaded}
              onError={handleMediaError}
              className={`w-full h-full object-cover transition-opacity duration-500 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          )
        ) : (
          <img
            src={resolvedImage}
            alt={title}
            loading="lazy"
            onLoad={handleMediaLoaded}
            onError={handleMediaError}
            className={`w-full h-full object-cover transition-opacity duration-500 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )
      )}

      {isVideo && (
        <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5 transition-opacity duration-300 group-hover:opacity-0">
          <Play size={10} className="fill-cyan-400 text-cyan-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Video</span>
        </div>
      )}

      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm pointer-events-none">
        <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)] transform scale-90 group-hover:scale-100 transition-transform duration-300">
          {isVideo ? (
            <Play size={20} className="fill-black ml-0.5" />
          ) : (
            <ExternalLink size={20} />
          )}
        </div>
      </div>
    </div>
  )
}

function PortfolioSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-4/3 rounded-3xl bg-white/5 mb-8" />
          <div className="h-3 w-24 bg-white/5 rounded mb-3" />
          <div className="h-5 w-48 bg-white/5 rounded mb-3" />
          <div className="h-4 w-full bg-white/5 rounded" />
        </div>
      ))}
    </div>
  )
}

function PortfolioError({ onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 gap-6"
    >
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
        <AlertCircle size={28} className="text-red-400" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Could not load portfolio
        </h3>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          Failed to connect to the database. Please check your connection and try again.
        </p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-bold hover:bg-cyan-400/20 transition-all cursor-pointer"
        >
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('All')
  const [activeSubTab, setActiveSubTab] = useState('All Videos')
  const [currentPage, setCurrentPage] = useState(1)
  const [projects, setProjects] = useState([])
  const [loadState, setLoadState] = useState('loading') // 'loading' | 'success' | 'error'
  const ITEMS_PER_PAGE = 6
  const navigate = useNavigate()

  const fetchProjects = async () => {
    setLoadState('loading')
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      if (error) throw error
      setProjects(data || [])
      setLoadState('success')
    } catch (err) {
      console.error('[Portfolio] Supabase fetch error:', err)
      setLoadState('error')
    }
  }

  useEffect(() => { fetchProjects() }, [])

  const filteredProjects = projects.filter(p => {
    if (activeTab === 'All') return true
    if (activeTab === 'Videos') {
      if (activeSubTab === 'All Videos') return ['Reels', 'YT Videos', 'Vlogs'].includes(p.type)
      return p.type === activeSubTab
    }
    return p.type === activeTab
  })

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const displayedProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    const element = document.getElementById('portfolio')
    if (element) {
      const offset = 85
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' })
    }
  }

  return (
    <section id="portfolio" className="py-32" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black mb-6 tracking-tightest"
            style={{ color: 'var(--text-primary)' }}
          >
            Featured <span className="gradient-text">Work</span>
          </motion.h2>

          {/* Filters */}
          <div className="flex flex-col items-center gap-6 mt-8 w-full max-w-3xl mx-auto">
            <div className="relative w-full flex justify-center">
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--bg-primary)] to-transparent pointer-events-none z-10 md:hidden" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--bg-primary)] to-transparent pointer-events-none z-10 md:hidden" />
              <div className="w-full overflow-x-auto scrollbar-none flex flex-nowrap md:flex-wrap md:justify-center gap-2 px-8 pb-3 select-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveTab(cat)
                      if (cat !== 'Videos') setActiveSubTab('All Videos')
                      setCurrentPage(1)
                    }}
                    className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border shrink-0 cursor-pointer ${activeTab === cat
                        ? 'bg-cyan-400 border-cyan-400 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                        : 'border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-Filters for Videos */}
            <AnimatePresence>
              {activeTab === 'Videos' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="relative w-full max-w-md flex justify-center"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--bg-primary)] to-transparent pointer-events-none z-10 md:hidden" />
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--bg-primary)] to-transparent pointer-events-none z-10 md:hidden" />
                  <div className="w-full overflow-x-auto scrollbar-none flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 p-2 rounded-2xl bg-[var(--text-primary)]/5 border border-[var(--border-subtle)] mx-4">
                    {videoSubCategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => { setActiveSubTab(sub); setCurrentPage(1) }}
                        className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 shrink-0 cursor-pointer ${activeSubTab === sub ? 'bg-[var(--text-primary)]/10 text-cyan-400' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Content */}
        {loadState === 'loading' && <PortfolioSkeleton />}
        {loadState === 'error' && <PortfolioError onRetry={fetchProjects} />}

        {loadState === 'success' && (
          <>
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              <AnimatePresence mode="popLayout">
                {displayedProjects.map((project) => (
                  <motion.a
                    key={project.id || project.title}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    href={project.link || '#'}
                    target={project.link ? '_blank' : undefined}
                    rel={project.link ? 'noopener noreferrer' : undefined}
                    className="group cursor-pointer block"
                    onClick={(e) => {
                      if (project.case_study_slug) {
                        e.preventDefault()
                        navigate(`/portfolio/${project.case_study_slug}`)
                      } else if (!project.link) {
                        e.preventDefault()
                      }
                    }}
                  >
                    <LazyMedia
                      image={project.image}
                      title={project.title}
                      isVideo={['Reels', 'YT Videos', 'Vlogs'].includes(project.type)}
                    />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 mb-3 block opacity-80">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold mb-3 transition-colors group-hover:text-cyan-400" style={{ color: 'var(--text-primary)' }}>
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {project.description}
                    </p>
                  </motion.a>
                ))}
              </AnimatePresence>
            </motion.div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-16">
                 <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-11 h-11 rounded-xl border border-[var(--border-subtle)] flex items-center justify-center transition-all duration-300 cursor-pointer ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:border-cyan-400 hover:text-cyan-400 hover:scale-105 hover:bg-cyan-400/5 active:scale-95'}`}
                  style={{ color: 'var(--text-muted)' }}
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-11 h-11 rounded-xl text-xs font-black transition-all duration-300 border cursor-pointer ${currentPage === page ? 'bg-cyan-400 border-cyan-400 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]' : 'border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] hover:scale-105 hover:bg-[var(--text-primary)]/5 active:scale-95'}`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-11 h-11 rounded-xl border border-[var(--border-subtle)] flex items-center justify-center transition-all duration-300 cursor-pointer ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:border-cyan-400 hover:text-cyan-400 hover:scale-105 hover:bg-cyan-400/5 active:scale-95'}`}
                  style={{ color: 'var(--text-muted)' }}
                  aria-label="Next Page"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
