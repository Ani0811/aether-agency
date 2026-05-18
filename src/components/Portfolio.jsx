import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const categories = ['All', 'Websites', 'AI Agents', 'Videos']
const videoSubCategories = ['All Videos', 'Reels', 'YT Videos', 'Vlogs']

const projects = [
  {
    title: 'NovaTech SaaS',
    type: 'Websites',
    category: 'SaaS • Full Stack',
    description: 'Full website redesign with high-performance engineering, boosting conversions by 85%.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
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
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'G-One Tech Review',
    type: 'YT Videos',
    category: 'YouTube • Tech',
    description: 'In-depth YouTube video production with custom graphics and cinematic B-roll.',
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Digital Nomad Life',
    type: 'Vlogs',
    category: 'Vlog • Travel',
    description: 'Long-format cinematic vlog series documenting a global journey of digital entrepreneurship.',
    image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Luxe Portfolio',
    type: 'Websites',
    category: 'Portfolio • High-End',
    description: 'Premium portfolio site for an interior design studio with smooth scroll interactions.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
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
    video: '/Agency_Videos/Client Reel.mp4',
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Aesthetic Cloth Reel',
    type: 'Reels',
    category: 'IG Reels • Fashion',
    description: 'Cinematic fashion showcase featuring high-end apparel with rapid-cut editing.',
    video: '/Agency_Videos/Cloth Reel.mp4',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Aether Essence',
    type: 'YT Videos',
    category: 'YouTube • Cinematic',
    description: 'High-production value cinematic experience showcasing the essence of digital agency work.',
    video: '/Agency_Videos/reel 1.mp4',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Production Highlights',
    type: 'YT Videos',
    category: 'YouTube • Production',
    description: 'Detailed breakdown of our production process and equipment setup for large-scale projects.',
    video: '/Agency_Videos/reel 2.mp4',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Behind the Scenes',
    type: 'Vlogs',
    category: 'Vlog • BTS',
    description: 'Raw and authentic look at our team in action during a major brand campaign shoot.',
    video: '/Agency_Videos/0621(1).mp4',
    image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Agency Lifestyle',
    type: 'Vlogs',
    category: 'Vlog • Culture',
    description: 'Insight into the day-to-1-day culture and creative atmosphere at Aether Agency.',
    video: '/Agency_Videos/reel 2 (1).mp4',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Dynamic Reel',
    type: 'Reels',
    category: 'IG Reels • Movement',
    description: 'Fast-paced, high-transition reel demonstrating our creative editing capabilities.',
    video: '/Agency_Videos/reel.mp4',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800'
  }
]

function LazyMedia({ video, image, title }) {
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
        <>
          {video ? (
            <video
              src={`${video}#t=0.1`}
              preload="metadata"
              className={`w-full h-full object-cover transition-opacity duration-500 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              muted
              loop
              onLoadedData={() => setIsLoaded(true)}
              onMouseEnter={(e) => {
                e.target.play().catch(() => { });
              }}
              onMouseLeave={(e) => {
                e.target.pause();
                e.target.currentTime = 0.1;
              }}
              playsInline
            />
          ) : (
            <img
              src={image}
              alt={title}
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-500 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
        </>
      )}

      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
        <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)]">
          <ExternalLink size={20} />
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('All')
  const [activeSubTab, setActiveSubTab] = useState('All Videos')
  const [visibleCount, setVisibleCount] = useState(6)

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

  const displayedProjects = filteredProjects.slice(0, visibleCount)

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
          <div className="flex flex-col items-center gap-6 mt-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveTab(cat)
                    if (cat !== 'Videos') setActiveSubTab('All Videos')
                    setVisibleCount(6)
                  }}
                  className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${activeTab === cat
                      ? 'bg-cyan-400 border-cyan-400 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                      : 'border-white/10 text-(--text-muted) hover:border-white/30'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sub-Filters for Videos */}
            <AnimatePresence>
              {activeTab === 'Videos' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-wrap justify-center gap-2 p-2 rounded-2xl bg-white/5 border border-white/10"
                >
                  {videoSubCategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => {
                        setActiveSubTab(sub)
                        setVisibleCount(6)
                      }}
                      className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeSubTab === sub
                          ? 'bg-white/10 text-cyan-400'
                          : 'text-(--text-muted) hover:text-white'
                        }`}
                    >
                      {sub}
                    </button>
                  ))}
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
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer"
              >
                <LazyMedia
                  video={project.video}
                  image={project.image}
                  title={project.title}
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
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        {filteredProjects.length > visibleCount && (
          <div className="flex justify-center mt-16">
            <button
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="group relative px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 border border-cyan-400/30 text-cyan-400 hover:border-cyan-400 bg-cyan-400/5 hover:bg-cyan-400 hover:text-black shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center gap-2 overflow-hidden cursor-pointer"
            >
              <span className="relative z-10">View More</span>
              <motion.span
                className="relative z-10 flex items-center justify-center"
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </motion.span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
