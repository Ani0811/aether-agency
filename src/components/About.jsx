import { motion } from 'framer-motion'
import { Code, Video, Star, Zap } from 'lucide-react'

const founders = [
  {
    name: 'Anirudha Basu Thakur',
    role: 'Technical Visionary & Full-Stack Architect',
    description: 'Expert full-stack developer dedicated to building high-performance, pixel-perfect digital ecosystems. I architect and build robust web solutions from the ground up—whether it is a complex SaaS platform, a high-converting landing page, or a custom internal tool, I translate any vision into clean, scalable code that delivers measurable impact. If you can dream it, I will code it.',
    icon: Code,
    image: '/AnirudhaTechie.jpg',
    color: 'cyan',
    skills: ['React & Next.js', 'Node.js Backend', 'System Architecture']
  },
  {
    name: 'Vasudev Sharma',
    role: 'Creative Director & Cinematic Editor',
    description: 'A cinematic storyteller specializing in professional-grade video production and high-impact post-processing. I transform raw concepts into compelling visual narratives that captivate audiences and define brand identities. From high-energy social content to cinematic brand films, I craft the visual journey that brings your story to life, whatever the medium, whatever the request.',
    icon: Video,
    image: '/VasudevVideoEditor.jpeg',
    color: 'fuchsia',
    skills: ['Post-Production', 'Motion Graphics', 'Visual Storytelling']
  }
]

export default function About() {
  return (
    <section id="about" className="relative py-48 overflow-hidden">
      {/* Immersive background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.03)_0%,transparent_70%)] -z-10" />
      <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[160px] -z-10" />
      <div className="absolute -bottom-24 -right-24 w-150 h-150 bg-fuchsia-500/5 rounded-full blur-[160px] -z-10" />

      <div className="container-custom">
        <div className="text-center mb-32">
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
            className="text-4xl lg:text-6xl font-black mb-8 tracking-tightest"
          >
            Meet the <span className="gradient-text">Founders</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            Teaming up, we create the digital agency you can trust—merging top-tier engineering with cinematic excellence.
          </motion.p>
        </div>

        <div className="flex flex-col gap-32">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
            >
              {/* Image side */}
              <div className="w-full lg:w-1/2">
                <div className={`relative aspect-square max-w-md mx-auto group`}>
                  <div className={`absolute inset-0 bg-linear-to-br ${founder.color === 'cyan' ? 'from-cyan-500/20' : 'from-fuchsia-500/20'} to-transparent rounded-[48px] blur-2xl group-hover:blur-3xl transition-all duration-500`} />
                  <div className="relative h-full w-full rounded-[48px] overflow-hidden glass-card flex items-center justify-center">
                    {founder.image ? (
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full object-cover profile-crop group-hover:scale-110 group-hover:opacity-100 group-hover:brightness-110 transition-all duration-700 opacity-80"
                      />
                    ) : (
                      <founder.icon 
                        size={120} 
                        className={`opacity-20 ${founder.color === 'cyan' ? 'text-cyan-400' : 'text-fuchsia-400'} group-hover:scale-110 transition-transform duration-700`} 
                      />
                    )}
                    <div className="absolute inset-0" style={{ background: 'var(--image-overlay)' }} />
                    <div className="absolute bottom-10 left-10 right-10">
                       <div className="flex gap-2">
                         {founder.skills.map((skill, i) => (
                           <span key={i} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full skill-pill">
                             {skill}
                           </span>
                         ))}
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <div className={`inline-flex items-center gap-2 mb-6 text-sm font-bold uppercase tracking-widest ${founder.color === 'cyan' ? 'text-cyan-400' : 'text-fuchsia-400'}`}>
                  {founder.color === 'cyan' ? <Zap size={16} /> : <Star size={16} />}
                  {founder.role}
                </div>
                <h3 className="text-3xl lg:text-5xl font-bold mb-8">{founder.name}</h3>
                <p className="text-lg lg:text-xl leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
                  {founder.description}
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <button className="btn-primary">View Projects</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

