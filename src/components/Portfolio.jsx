import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const projects = [
  {
    title: 'NovaTech SaaS',
    category: 'SaaS • Website • Video',
    description: 'Full website redesign with integrated promo video, boosting conversions by 85%.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'FitFlow App',
    category: 'Landing Page • Social Media',
    description: 'Landing page and social media video package for a fitness app launch.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Luxe Interiors',
    category: 'Portfolio • Brand Video',
    description: 'Premium portfolio site with cinematic brand video for an interior design studio.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
  }
]

export default function Portfolio() {
  return (
    <section id="portfolio" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Featured <span className="gradient-text">Work</span></h2>
          <p className="max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>Real results from real projects.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-8 border border-white/5 shadow-2xl">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center">
                    <ExternalLink size={20} />
                  </div>
                </div>
              </div>
              
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-3 block">
                {project.category}
              </span>
              <h3 className="text-2xl font-bold mb-3 transition-colors" style={{ color: 'var(--text-primary)' }}>
                {project.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
