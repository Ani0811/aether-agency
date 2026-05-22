import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Play, ChevronLeft, ChevronRight } from 'lucide-react'

const categories = ['All', 'Websites', 'AI Agents', 'Videos']
const videoSubCategories = ['All Videos', 'Reels', 'YT Videos', 'Vlogs']

const DRIVE_LINK = 'https://drive.google.com/drive/folders/1jO4KAWED3Y005JOYMXiXahl1KcVwWUkI?usp=sharing'

const projects = [
  {
    title: 'FoodieFrenzy SaaS',
    type: 'Websites',
    category: 'Food SaaS • Full Stack',
    description: 'High-performance food delivery platform and SaaS dashboard with real-time tracking.',
    image: `${import.meta.env.BASE_URL}Agency_Websites/FoodieFrenzy.jpg`.replace(/\/+/g, '/')
  },
  {
    title: 'Aether Insight Bot',
    type: 'AI Agents',
    category: 'AI • Automation',
    description: 'Custom LLM-powered support agent that handles 90% of routine customer inquiries.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'FitFlow Cinematic',
    type: 'Reels',
    category: 'IG Reels • Fitness',
    description: 'High-energy short-form content for Instagram Reels, driving 1M+ views and engagement.',
    image: `${import.meta.env.BASE_URL}Agency_Videos/AiReel.jpg`.replace(/\/+/g, '/'),
    link: 'https://drive.google.com/file/d/1DqnEGWk_w7-eVIBXfgyUv63yPtyZXM63/view'
  },
  {
    title: 'G-One Tech Review',
    type: 'YT Videos',
    category: 'YouTube • Tech',
    description: 'In-depth YouTube video production with custom graphics and cinematic B-roll.',
    image: `${import.meta.env.BASE_URL}Agency_Videos/Reel.jpg`.replace(/\/+/g, '/'),
    link: 'https://drive.google.com/file/d/1aA4v-bCBV4IG4oqzgb4KiMZ7XgqyEtd-/view'
  },
  {
    title: 'Digital Nomad Life',
    type: 'Vlogs',
    category: 'Vlog • Travel',
    description: 'Long-format cinematic vlog series documenting a global journey of digital entrepreneurship.',
    image: `${import.meta.env.BASE_URL}Agency_Videos/0621_Reel.jpg`.replace(/\/+/g, '/'),
    link: 'https://drive.google.com/file/d/1fNKd-6i0fEGVnkEev-TCN9b1P3VU7UZB/view'
  },
  {
    title: 'ABT Developer Portfolio',
    type: 'Websites',
    category: 'Portfolio • Full Stack',
    description: 'Premium developer portfolio featuring advanced system architectures and creative layouts.',
    image: `${import.meta.env.BASE_URL}Agency_Websites/ABT_Portfolio.jpg`.replace(/\/+/g, '/')
  },
  {
    title: 'Nexus Data Agent',
    type: 'AI Agents',
    category: 'AI • Analytics',
    description: 'Autonomous data analysis agent for real-time market sentiment tracking.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Client Showcase',
    type: 'Reels',
    category: 'IG Reels • Client',
    description: 'Dynamic client showcase reel highlighting key achievements and project milestones.',
    image: `${import.meta.env.BASE_URL}Agency_Videos/ClientReel.jpg`.replace(/\/+/g, '/'),
    link: 'https://drive.google.com/file/d/1LvITp9vG8ieDu7EGzzmxjdasWbQRFSjN/view'
  },
  {
    title: 'Aesthetic Cloth Reel',
    type: 'Reels',
    category: 'IG Reels • Fashion',
    description: 'Cinematic fashion showcase featuring high-end apparel with rapid-cut editing.',
    image: `${import.meta.env.BASE_URL}Agency_Videos/ClothReel.jpg`.replace(/\/+/g, '/'),
    link: 'https://drive.google.com/file/d/1lFvPCKIzgt3gSTj1T35R2qxgjkjXAKlk/view'
  },
  {
    title: 'Aether Essence',
    type: 'YT Videos',
    category: 'YouTube • Cinematic',
    description: 'High-production value cinematic experience showcasing the essence of digital agency work.',
    image: `${import.meta.env.BASE_URL}Agency_Videos/Reel1.jpg`.replace(/\/+/g, '/'),
    link: 'https://drive.google.com/file/d/1rmSSFv5UU8UipYjdZtOk0IXvYUwJiwdB/view'
  },
  {
    title: 'Production Highlights',
    type: 'YT Videos',
    category: 'YouTube • Production',
    description: 'Detailed breakdown of our production process and equipment setup for large-scale projects.',
    image: `${import.meta.env.BASE_URL}Agency_Videos/Reel2.jpg`.replace(/\/+/g, '/'),
    link: 'https://drive.google.com/file/d/1vsfhyLj6X0i3s2cHkhQ-S7gszuqDZONB/view'
  },
  {
    title: 'Behind the Scenes',
    type: 'Vlogs',
    category: 'Vlog • BTS',
    description: 'Raw and authentic look at our team in action during a major brand campaign shoot.',
    image: `${import.meta.env.BASE_URL}Agency_Videos/0621_Reel.jpg`.replace(/\/+/g, '/'),
    link: 'https://drive.google.com/file/d/1fNKd-6i0fEGVnkEev-TCN9b1P3VU7UZB/view'
  },
  {
    title: 'Agency Lifestyle',
    type: 'Vlogs',
    category: 'Vlog • Culture',
    description: 'Insight into the day-to-day culture and creative atmosphere at Aether Agency.',
    image: `${import.meta.env.BASE_URL}Agency_Videos/Reel3.jpg`.replace(/\/+/g, '/'),
    link: 'https://drive.google.com/file/d/1CcIoHrBpPCU9ekpeT1CexDY6ULIBbKU9/view'
  },
  {
    title: 'Dynamic Reel',
    type: 'Reels',
    category: 'IG Reels • Movement',
    description: 'Fast-paced, high-transition reel demonstrating our creative editing capabilities.',
    image: `${import.meta.env.BASE_URL}Agency_Videos/Reel.jpg`.replace(/\/+/g, '/'),
    link: 'https://drive.google.com/file/d/1aA4v-bCBV4IG4oqzgb4KiMZ7XgqyEtd-/view'
  }
]

function LazyMedia({ image, title, isVideo }) {
  const [inView, setInView] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const ref = useRef(null)

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

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className="relative aspect-4/3 rounded-3xl overflow-hidden mb-8 border border-white/5 shadow-2xl bg-white/5"
    >
      {/* Sleek Skeleton pulse animation until asset loads */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-400/20 border-t-cyan-400 animate-spin" />
        </div>
      )}

      {inView && (
        <img
          src={image}
          alt={title}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {/* Floating Video Indicator (Always visible on mobile, fades out on hover on desktop) */}
      {isVideo && (
        <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5 transition-opacity duration-300 group-hover:opacity-0">
          <Play size={10} className="fill-cyan-400 text-cyan-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Video</span>
        </div>
      )}

      {/* Full Overlay on Hover */}
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

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('All')
  const [activeSubTab, setActiveSubTab] = useState('All Videos')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 6

  const filteredProjects = projects.filter(p => {
    if (activeTab === 'All') return true
    if (activeTab === 'Videos') {
      if (activeSubTab === 'All Videos') {
        return ['Reels', 'YT Videos', 'Vlogs'].includes(p.type)
      }
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
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
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
              {/* Fade masks for mobile scroll indication */}
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
                        : 'border-white/10 text-[var(--text-muted)] hover:border-white/30 hover:text-white'
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
                  
                  <div className="w-full overflow-x-auto scrollbar-none flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 p-2 rounded-2xl bg-white/5 border border-white/10 mx-4">
                    {videoSubCategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          setActiveSubTab(sub)
                          setCurrentPage(1)
                        }}
                        className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 shrink-0 cursor-pointer ${activeSubTab === sub
                            ? 'bg-white/10 text-cyan-400'
                            : 'text-[var(--text-muted)] hover:text-white'
                          }`}
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

        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project) => (
              <motion.a
                key={project.title}
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
                  if (!project.link) {
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-16">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                currentPage === 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:border-cyan-400 hover:text-cyan-400 hover:scale-105 hover:bg-cyan-400/5 active:scale-95'
              }`}
              style={{ color: 'var(--text-muted)' }}
              aria-label="Previous Page"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-11 h-11 rounded-xl text-xs font-black transition-all duration-300 border cursor-pointer ${
                  currentPage === page
                    ? 'bg-cyan-400 border-cyan-400 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                    : 'border-white/10 text-[var(--text-muted)] hover:border-white/30 hover:text-white hover:scale-105 hover:bg-white/5 active:scale-95'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                currentPage === totalPages
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:border-cyan-400 hover:text-cyan-400 hover:scale-105 hover:bg-cyan-400/5 active:scale-95'
              }`}
              style={{ color: 'var(--text-muted)' }}
              aria-label="Next Page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
