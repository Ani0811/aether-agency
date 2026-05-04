import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-64 pb-32 lg:pt-80">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />

      <div className="container-custom pt-20">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-10"
          >
            <h1 className="text-5xl lg:text-[5.5rem] font-black leading-[1.0] mb-8 tracking-tighter" style={{ color: 'var(--text-primary)' }}>
              We help businesses grow with <span className="gradient-text">high-converting</span> websites
            </h1>

            <p className="text-xl mb-12 leading-relaxed max-w-[520px]" style={{ color: 'var(--text-secondary)' }}>
              Aether Digital bridges the gap between sophisticated engineering and compelling visual narratives. We build digital ecosystems designed to capture attention and convert audiences.
            </p>

            <div className="flex flex-wrap gap-6">
              <button className="btn-primary flex items-center gap-3 group shadow-2xl shadow-purple-500/30 !px-8 !py-4">
                Get a Free Audit
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#portfolio" className="btn-secondary !px-8 !py-4 inline-flex items-center justify-center">
                View Our Work
              </a>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:ml-auto"
          >
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl shadow-purple-500/10 p-2" style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)' }}>
              <div className="rounded-[32px] overflow-hidden">
                <img 
                  src="/hero-visual.png" 
                  alt="Aether Dashboard" 
                  className="w-full h-auto object-cover opacity-90"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -inset-10 bg-purple-500/20 blur-[80px] -z-10 opacity-30 animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
