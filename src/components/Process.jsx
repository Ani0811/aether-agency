import { motion } from 'framer-motion'
import { Search, Palette, Video, Rocket } from 'lucide-react'

const steps = [
  { icon: Search, title: 'Discovery', description: 'We learn your goals, audience, and brand identity.' },
  { icon: Palette, title: 'Design & Build', description: 'Wireframes to pixel-perfect, responsive websites.' },
  { icon: Video, title: 'Video Creation', description: 'Engaging video content crafted for your brand.' },
  { icon: Rocket, title: 'Launch', description: 'Deploy, optimize, and watch your business grow.' }
]

export default function Process() {
  return (
    <section id="process">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Our <span className="gradient-text">Process</span></h2>
          <p className="max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>A streamlined workflow designed for speed and quality.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 text-center"
            >
              <div className="w-16 h-16 rounded-3xl border flex items-center justify-center mx-auto mb-6 relative z-10 transition-all" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
                <step.icon size={28} className="text-purple-400" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-600 text-[10px] font-black flex items-center justify-center border-4 border-black">
                  0{index + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {step.description}
              </p>

              {/* Connector for Desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-[4.5rem] left-[calc(50%+40px)] w-[calc(100%-80px)] h-[2px]" style={{ background: 'var(--border-subtle)' }}>
                  <motion.div 
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.3 + 0.3, ease: "easeInOut" }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
