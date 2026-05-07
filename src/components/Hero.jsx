import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center pt-20 pb-20">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-150600px] bg-cyan-500/20 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-125500px] bg-fuchsia-500/20 rounded-full blur-[120px] -z-10" />

      <div className="container-custom w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-black leading-[1.1] mb-6 tracking-tighter" style={{ color: 'var(--text-primary)' }}>
              We help businesses grow with <span className="gradient-text">high-converting</span> websites
            </h1>

            <p className="text-lg md:text-xl mb-10 leading-relaxed max-w-130" style={{ color: 'var(--text-secondary)' }}>
              Aether Digital bridges the gap between sophisticated engineering and compelling visual narratives. We build digital ecosystems designed to capture attention and convert audiences.
            </p>

            <div className="flex flex-wrap gap-6">
              <a 
                href="#contact" 
                className="btn-primary flex items-center gap-3 group shadow-2xl shadow-cyan-500/40 px-8! py-4!"
              >
                Get a Free Audit
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#portfolio" 
                className="btn-secondary px-8! py-4! inline-flex items-center justify-center"
              >
                View Our Work
              </a>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:ml-auto max-w-2xl w-full"
          >
            <div className="relative z-10 rounded-[48px] overflow-hidden shadow-2xl shadow-cyan-500/30 p-2" style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)' }}>
              <div className="rounded-[40px] overflow-hidden aspect-4/3">
                <img
                  src="pexels-mintworkspace-18304033.jpg"
                  alt="Aether Hero Visual"
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -inset-8 bg-fuchsia-500/20 blur-[100px] -z-10 opacity-50 animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
