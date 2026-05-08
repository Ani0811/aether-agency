import { motion } from 'framer-motion'
import { Code, Video, Star, Zap } from 'lucide-react'

const founders = [
  {
    name: 'Anirudha Basu Thakur',
    role: 'Technical Visionary & Full-Stack Architect',
    description: 'Expert full-stack developer dedicated to building high-performance, pixel-perfect digital ecosystems. I architect and build robust web solutions from the ground up—whether it is a complex SaaS platform, a high-converting landing page, or a custom internal tool, I translate any vision into clean, scalable code that delivers measurable impact. If you can dream it, I will code it.',
    icon: Code,
    image: 'AnirudhaTechie.jpg',
    color: 'cyan',
    skills: ['React & Next.js', 'Node.js Backend', 'System Architecture']
  },
  {
    name: 'Vasudev Sharma',
    role: 'Creative Director & Cinematic Editor',
    description: 'A cinematic storyteller specializing in professional-grade video production and high-impact post-processing. I transform raw concepts into compelling visual narratives that captivate audiences and define brand identities. From high-energy social content to cinematic brand films, I craft the visual journey that brings your story to life, whatever the medium, whatever the request.',
    icon: Video,
    image: 'VasudevVideoEditor.jpeg',
    color: 'fuchsia',
    skills: ['Post-Production', 'Motion Graphics', 'Visual Storytelling']
  }
]

export default function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Immersive background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.03)_0%,transparent_70%)] -z-10" />
      
      <div className="container-custom">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-[0.3em] text-cyan-400"
          >
            The Duo Behind Aether
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 tracking-tightest"
          >
            Meet the <span className="gradient-text">Founders</span>
          </motion.h2>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Founders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-20">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="relative w-full aspect-square max-w-[320px] mb-8 group">
                  <div className={`absolute inset-0 bg-linear-to-br ${founder.color === 'cyan' ? 'from-cyan-500/20' : 'from-fuchsia-500/20'} to-transparent rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative h-full w-full rounded-[32px] overflow-hidden glass-card border-white/10">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover profile-crop group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0" style={{ background: 'var(--image-overlay)' }} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 tracking-tight text-center">{founder.name}</h3>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400/80 text-center">{founder.role.split(' & ')[0]}</p>
              </motion.div>
            ))}
          </div>

          {/* Collaborative Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass-card p-8 md:p-12 border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-cyan-400 to-fuchsia-500" />
            <p className="text-lg md:text-xl leading-relaxed font-medium text-center md:text-left" style={{ color: 'var(--text-secondary)' }}>
              At Aether Digital, we merge <span className="text-[var(--text-primary)] font-bold">high-end web engineering</span> with <span className="text-[var(--text-primary)] font-bold">cinematic storytelling</span> to build digital ecosystems that don't just exist—they dominate. Anirudha leads our technical front, architecting scalable, high-performance web solutions, while Vasudev drives our creative vision, crafting high-impact visual narratives that define brand identities. Our process is a seamless fusion of logic and art; we start by identifying your core goals, followed by rapid prototyping and cinematic production. Our intention is simple: to bridge the gap between sophisticated engineering and compelling narratives, providing businesses with a unified digital presence that captures attention and maximizes conversion.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

