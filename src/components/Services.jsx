import { motion } from 'framer-motion'
import { Code2, Video, Rocket } from 'lucide-react'

const services = [
  {
    icon: Code2,
    title: 'Web Engineering',
    description: 'High-performance, scalable web solutions built with cutting-edge tech stacks for maximum speed and security.',
    highlight: true
  },
  {
    icon: Video,
    title: 'Content Creation',
    description: 'Cinematic storytelling and professional video production that captures your brand essence and engages audiences.',
    highlight: false
  },
  {
    icon: Rocket,
    title: 'Digital Strategy',
    description: 'Data-driven growth strategies and marketing automation to scale your reach and maximize conversion rates.',
    highlight: false
  }
]

export default function Services() {
  return (
    <section id="services">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Core <span className="gradient-text">Competencies</span></h2>
          <p className="max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>Specialized solutions engineered for measurable impact.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card p-10 relative overflow-hidden group cursor-pointer ${service.highlight ? 'ring-1 ring-cyan-400/50 shadow-[0_0_30px_rgba(0,240,255,0.2)]' : ''}`}
            >
              {/* Hover highlight background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" style={{ background: 'rgba(0, 240, 255, 0.1)', border: '1px solid var(--border-subtle)', boxShadow: '0 0 15px rgba(0,240,255,0.2)' }}>
                  <service.icon size={24} className="text-cyan-400 group-hover:text-cyan-300 transition-colors drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)] group-hover:text-cyan-400 transition-colors drop-shadow-sm">{service.title}</h3>
                <p className="leading-relaxed text-sm text-[var(--text-secondary)] transition-colors">
                  {service.description}
                </p>

                <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-fuchsia-500 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 drop-shadow-[0_0_8px_rgba(255,0,229,0.6)]">
                  Explore Service <ArrowRightTiny />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ArrowRightTiny() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  )
}
