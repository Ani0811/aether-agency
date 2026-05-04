import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Arjun Mehta',
    role: 'Founder, NovaTech',
    text: 'Aether delivered a stunning website and promo video in just 4 days. Our conversions jumped 85% in the first month.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
  },
  {
    name: 'Priya Sharma',
    role: 'CEO, FitFlow',
    text: 'Professional, fast, and creative. The website and social media content package was exactly what we needed for our launch.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    name: 'Rahul Verma',
    role: 'Director, Luxe Interiors',
    text: 'The brand video they created perfectly captures our aesthetic. Clean work, great communication throughout.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  }
]

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Client <span className="gradient-text">Testimonials</span></h2>
          <p className="max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>What our clients say about working with us.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-10"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-purple-500 text-purple-500" />
                ))}
              </div>
              
              <p className="text-lg font-medium leading-relaxed mb-8 italic" style={{ color: 'var(--text-primary)' }}>
                "{t.text}"
              </p>

              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/20" />
                <div>
                  <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{t.name}</h4>
                  <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
