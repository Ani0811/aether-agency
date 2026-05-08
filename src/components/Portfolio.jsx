import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const categories = ['All', 'Websites', 'AI Agents', 'Videos']

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
    type: 'Videos',
    category: 'Video • Branding',
    description: 'Cinematic brand video package for a fitness app launch with 1M+ views.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800'
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
  }
]

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('All')

  const filteredProjects = activeTab === 'All' 
    ? projects 
    : projects.filter(p => p.type === activeTab)

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
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                  activeTab === cat 
                    ? 'bg-cyan-400 border-cyan-400 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]' 
                    : 'border-white/10 text-[var(--text-muted)] hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-8 border border-white/5 shadow-2xl">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                      <ExternalLink size={20} />
                    </div>
                  </div>
                </div>
                
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
      </div>
    </section>
  )
}
