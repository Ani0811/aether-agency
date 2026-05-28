import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Code, Video, Mail, ExternalLink, Github, Linkedin, Instagram, Youtube, Zap, Star } from 'lucide-react'

const founders = {
  anirudha: {
    name: 'Anirudha Basu Thakur',
    role: 'Co-Founder & Lead Engineer',
    tagline: 'Turning ambitious ideas into scalable digital products',
    description: 'Expert full-stack developer dedicated to building high-performance, pixel-perfect digital ecosystems. I architect and build robust web solutions from the ground up — whether it is a complex SaaS platform, a high-converting landing page, or a custom internal tool, I translate any vision into clean, scalable code that delivers measurable impact. If you can dream it, I will code it.',
    image: 'Anirudha.jpeg',
    bgImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    accentColor: 'cyan',
    icon: Code,
    email: 'anirudha.basuthakur@gmail.com',
    skills: [
      { label: 'React & Next.js', desc: 'Building high-performance, SEO-friendly frontends with modern React patterns.' },
      { label: 'Node.js & APIs', desc: 'Designing scalable REST and GraphQL backends with robust authentication.' },
      { label: 'System Architecture', desc: 'Database design, cloud deployment, and CI/CD pipeline setup.' },
      { label: 'AI Integration', desc: 'Building intelligent automation agents using LLM APIs and RAG pipelines.' },
    ],
    socials: [
      { name: 'GitHub', url: 'https://github.com/Ani0811', icon: Github },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/anirudha-basu-thakur-686aa8253', icon: Linkedin },
      { name: 'Instagram', url: 'https://www.instagram.com/this_is_ringo_here/', icon: Instagram },
    ],
    stats: [
      { value: '20+', label: 'Projects Shipped' },
      { value: '3+', label: 'Years Building' },
      { value: '90+', label: 'Avg Lighthouse Score' },
    ],
  },
  vasudev: {
    name: 'Vasudev Sharma',
    role: 'Founder & Creative Director',
    tagline: 'Crafting visual narratives that captivate and convert',
    description: 'A cinematic storyteller specialising in professional-grade video production and high-impact post-processing. I transform raw concepts into compelling visual narratives that captivate audiences and define brand identities. From high-energy social content to cinematic brand films, I craft the visual journey that brings your story to life — whatever the medium, whatever the request.',
    image: 'Vasudev.jpeg',
    bgImage: 'https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071&auto=format&fit=crop',
    accentColor: 'fuchsia',
    icon: Video,
    email: 'vasudevsharma997@gmail.com',
    skills: [
      { label: 'Cinematic Production', desc: 'High-quality video shoots, lighting, and direction for brands and individuals.' },
      { label: 'Post-Production', desc: 'Professional colour grading, sound design, and multi-platform delivery.' },
      { label: 'Motion Graphics', desc: 'Custom animated titles, transitions, and visual effects using industry tools.' },
      { label: 'Content Strategy', desc: 'Storyboarding, scripting, and platform-optimised content calendars.' },
    ],
    socials: [
      { name: 'YouTube', url: 'https://www.youtube.com/@vasudevsharma1', icon: Youtube },
      { name: 'LinkedIn', url: 'https://linkedin.com/in/vasudev-sharma-a8b4ab22a', icon: Linkedin },
      { name: 'Instagram', url: 'https://www.instagram.com/vasudev.sharma5/', icon: Instagram },
    ],
    stats: [
      { value: '50+', label: 'Videos Produced' },
      { value: '4+', label: 'Years Creating' },
      { value: '1M+', label: 'Views Generated' },
    ],
  },
}

export default function FounderProfile() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const founder = founders[slug]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!founder) {
    return (
      <section className="py-32 text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Profile Not Found</h2>
        <Link to="/#about" className="btn-primary inline-block mt-4">← Back to Team</Link>
      </section>
    )
  }

  const Icon = founder.icon
  const isAccentCyan = founder.accentColor === 'cyan'
  const accentClass = isAccentCyan ? 'text-cyan-400' : 'text-fuchsia-400'
  const accentBg = isAccentCyan ? 'bg-cyan-400/10' : 'bg-fuchsia-400/10'
  const accentBorder = isAccentCyan ? 'border-cyan-400/20' : 'border-fuchsia-400/20'
  const accentGlow = isAccentCyan
    ? 'shadow-[0_0_40px_rgba(0,240,255,0.15)]'
    : 'shadow-[0_0_40px_rgba(217,70,239,0.15)]'
  const gradientFrom = isAccentCyan ? 'from-cyan-900/40 via-blue-900/20' : 'from-fuchsia-900/40 via-purple-900/20'
  const ringClass = isAccentCyan ? 'ring-cyan-400/30' : 'ring-fuchsia-400/30'

  return (
    <section className="pt-28 pb-24 relative min-h-screen overflow-hidden">
      {/* Ambient BG */}
      <div className={`absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-b ${gradientFrom} to-[#050508] opacity-40 -z-20 pointer-events-none`} />
      <img
        src={founder.bgImage}
        alt="Background"
        className="absolute top-0 left-0 right-0 w-full h-[60vh] object-cover opacity-10 blur-sm scale-105 -z-30 pointer-events-none"
      />
      <div className="absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-b from-transparent to-[var(--bg-deep)] -z-10 pointer-events-none" />

      <div className="container-custom">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-12 mt-4">
          <button
            onClick={() => navigate('/#about')}
            className={`group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 cursor-pointer hover:${accentClass} ${accentBorder} hover:border-opacity-50`}
            style={{
              color: 'var(--text-secondary)',
              borderColor: 'var(--border-subtle)',
              backgroundColor: 'var(--bg-card)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Meet the Team</span>
          </button>
        </motion.div>

        {/* Hero Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1 rounded-full mb-6 w-fit ${accentBg} ${accentClass} border ${accentBorder}`}>
              <Icon size={12} />
              {founder.role}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tighter leading-none" style={{ color: 'var(--text-primary)' }}>
              {founder.name}
            </h1>

            <p className={`text-lg font-semibold mb-6 ${accentClass}`}>{founder.tagline}</p>

            <p className="text-base leading-relaxed max-w-xl mb-8" style={{ color: 'var(--text-secondary)' }}>
              {founder.description}
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-8">
              {founder.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className={`text-2xl font-black ${accentClass}`}>{stat.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Social + Email */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${founder.email}`}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-bold tracking-wide transition-all hover:-translate-y-0.5 ${accentBg} ${accentBorder} ${accentClass}`}
              >
                <Mail size={14} />
                {founder.email}
              </a>
              <div className="flex items-center gap-3">
                {founder.socials.map((s, i) => {
                  const SIcon = s.icon
                  return (
                    <a
                      key={i}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      title={s.name}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all hover:-translate-y-0.5 ${accentBg} ${accentBorder} ${accentClass}`}
                    >
                      <SIcon size={16} />
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Right: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-md mx-auto lg:ml-auto lg:mr-0"
          >
            <div className={`relative z-10 rounded-[40px] overflow-hidden shadow-2xl ring-1 ${ringClass} ${accentGlow}`}>
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}${founder.image}`.replace(/\/+/g, '/')}
                  alt={founder.name}
                  className="w-full h-full object-cover profile-crop hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className={`absolute -inset-10 bg-gradient-to-tr ${gradientFrom} to-transparent blur-[80px] -z-10 opacity-50 pointer-events-none`} />
          </motion.div>
        </div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-black mb-8 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Areas of <span className="gradient-text">Expertise</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {founder.skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`glass-card p-6 border ${accentBorder} hover:${accentGlow} transition-all`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-2 h-2 rounded-full ${isAccentCyan ? 'bg-cyan-400' : 'bg-fuchsia-400'} animate-pulse`} />
                  <h3 className={`text-sm font-black uppercase tracking-wider ${accentClass}`}>{skill.label}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-10 lg:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/40 z-0" />
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} to-transparent opacity-40 z-0`} />
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-black mb-4" style={{ color: 'var(--text-primary)' }}>
              Want to work with {founder.name.split(' ')[0]}?
            </h2>
            <p className="mb-8 max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Book a free discovery call and let's talk about your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${founder.email}`}
                className={`btn-secondary inline-flex items-center justify-center gap-2 px-7! py-3.5!`}
              >
                <Mail size={16} /> Send an Email
              </a>
              <Link
                to="/get-started"
                className="btn-primary inline-flex items-center justify-center gap-2 group px-7! py-3.5!"
              >
                Get Started
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
