import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Code2, Bot, Video, Rocket, Calendar } from 'lucide-react'
import { useEffect } from 'react'

const services = {
  'web-engineering': {
    icon: Code2,
    title: 'Web Engineering',
    tagline: 'High-performance digital products built to scale',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    accentColor: 'text-cyan-400',
    accentBg: 'bg-cyan-400/10',
    accentBorder: 'border-cyan-400/20',
    accentGlow: 'shadow-[0_0_30px_rgba(0,240,255,0.2)]',
    description:
      'We architect and build robust, scalable web applications using modern technology stacks. From fast landing pages to complex SaaS platforms, every product is engineered for performance, security, and long-term maintainability.',
    features: [
      'Full-stack React / Next.js development',
      'E-commerce with integrated payment gateways (Razorpay, Stripe)',
      'Real-time features via WebSockets and SSE',
      'REST & GraphQL API design and development',
      'PostgreSQL / Supabase database architecture',
      'CI/CD pipelines and cloud deployment (Vercel, Render, AWS)',
      'Performance optimization — 90+ Lighthouse scores',
      'Accessibility-first and mobile-responsive design',
    ],
    process: [
      { step: '01', title: 'Discovery & Architecture', desc: 'We map out your requirements, tech stack, and system design before writing a single line of code.' },
      { step: '02', title: 'Build & Iterate', desc: 'Agile sprints with weekly demos. You see real progress, not promises.' },
      { step: '03', title: 'Launch & Handoff', desc: 'Full deployment, documentation, and a knowledge-transfer session so your team owns it.' },
    ],
    priceRange: '₹25,000 – ₹2,00,000+',
    timeline: '2 – 8 weeks',
  },
  'ai-agents': {
    icon: Bot,
    title: 'AI Agents',
    tagline: 'Intelligent automation that works while you sleep',
    gradient: 'from-fuchsia-500/20 via-purple-500/10 to-transparent',
    accentColor: 'text-fuchsia-400',
    accentBg: 'bg-fuchsia-400/10',
    accentBorder: 'border-fuchsia-400/20',
    accentGlow: 'shadow-[0_0_30px_rgba(217,70,239,0.2)]',
    description:
      'We build custom AI agents and automation pipelines powered by the latest large language models. From customer support bots to autonomous data pipelines, our agents handle repetitive work so your team can focus on what matters.',
    features: [
      'Custom chatbots on Gemini, GPT-4o, Claude APIs',
      'WhatsApp, Telegram, and web channel integrations',
      'RAG pipelines with your own knowledge base',
      'Human-in-the-loop escalation and handoff flows',
      'Multi-agent orchestration for complex workflows',
      'Structured output parsing and function calling',
      'Automated reporting and data analysis agents',
      'Webhook-driven event automation',
    ],
    process: [
      { step: '01', title: 'Use Case Definition', desc: 'We identify the highest-ROI automation opportunities and define success metrics.' },
      { step: '02', title: 'Prototype & Train', desc: 'A working prototype in 5–7 days. We fine-tune on your data until it performs.' },
      { step: '03', title: 'Deploy & Monitor', desc: 'Production deployment with logging, error tracking, and ongoing optimisation.' },
    ],
    priceRange: '₹15,000 – ₹1,50,000+',
    timeline: '1 – 4 weeks',
  },
  'content-creation': {
    icon: Video,
    title: 'Content Creation',
    tagline: 'Cinematic storytelling that captures and converts',
    gradient: 'from-orange-500/20 via-rose-500/10 to-transparent',
    accentColor: 'text-orange-400',
    accentBg: 'bg-orange-400/10',
    accentBorder: 'border-orange-400/20',
    accentGlow: 'shadow-[0_0_30px_rgba(251,146,60,0.2)]',
    description:
      'We produce professional video content that tells your brand story and drives measurable engagement. From high-energy Instagram Reels to cinematic YouTube productions, every frame is crafted with intent.',
    features: [
      'Instagram Reels and short-form content',
      'YouTube videos with custom motion graphics',
      'Cinematic brand films and product showcases',
      'Vlog series and documentary-style content',
      'Script writing and storyboarding',
      'Professional colour grading and sound design',
      'Thumbnail and cover art design',
      'Content calendar planning and strategy',
    ],
    process: [
      { step: '01', title: 'Brief & Storyboard', desc: 'We develop a creative brief, script, and storyboard aligned with your brand goals.' },
      { step: '02', title: 'Production', desc: 'Filming, motion graphics, and editing with multiple revision rounds.' },
      { step: '03', title: 'Delivery & Optimisation', desc: 'Export in all required formats with publishing strategy recommendations.' },
    ],
    priceRange: '₹8,000 – ₹80,000 per project',
    timeline: '3 – 14 days',
  },
  'digital-consultation': {
    icon: Rocket,
    title: 'Digital Consultation',
    tagline: 'Data-driven strategy to scale your digital presence',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    accentColor: 'text-emerald-400',
    accentBg: 'bg-emerald-400/10',
    accentBorder: 'border-emerald-400/20',
    accentGlow: 'shadow-[0_0_30px_rgba(52,211,153,0.2)]',
    description:
      'Strategic digital guidance for businesses ready to scale. We audit your existing digital infrastructure, identify growth bottlenecks, and build an actionable roadmap to increase reach, leads, and revenue.',
    features: [
      'Full digital audit (website, SEO, social, analytics)',
      'Competitor and market landscape analysis',
      'Growth roadmap with prioritised action items',
      'Marketing automation strategy',
      'Conversion rate optimisation (CRO)',
      'Social media strategy and content calendar',
      'Google Analytics 4 setup and custom dashboards',
      'Monthly performance reviews and iteration',
    ],
    process: [
      { step: '01', title: 'Audit & Research', desc: 'A deep dive into your current state — analytics, competitors, audience, and tech stack.' },
      { step: '02', title: 'Strategy Development', desc: 'A prioritised 90-day roadmap with specific, measurable goals.' },
      { step: '03', title: 'Execution Support', desc: 'Ongoing support as you implement — weekly check-ins and monthly reviews.' },
    ],
    priceRange: '₹10,000 – ₹50,000/month',
    timeline: 'Ongoing engagement',
  },
}

export default function ServiceDetail({ onScheduleCall }) {
  const { slug } = useParams()
  const navigate = useNavigate()
  const service = services[slug]

  // Fix scroll bug
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!service) {
    return (
      <section className="py-32">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Service Not Found
          </h2>
          <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
            This service page doesn't exist yet.
          </p>
          <Link to="/#services" className="btn-primary inline-block">← Back to Services</Link>
        </div>
      </section>
    )
  }

  const Icon = service.icon

  return (
    <section className="pt-28 pb-24">
      {/* Hero */}
      <div className={`absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b ${service.gradient} -z-10`} />

      <div className="container-custom">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-12 mt-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <ArrowLeft size={16} /> Back
          </button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20"
        >
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${service.accentBg} border ${service.accentBorder} ${service.accentGlow}`}>
            <Icon size={28} className={service.accentColor} />
          </div>
          <div className={`inline-block text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1 rounded-full mb-4 ${service.accentBg} ${service.accentColor} border ${service.accentBorder}`}>
            Service
          </div>
          <h1 className="text-5xl lg:text-6xl font-black mb-4 tracking-tighter" style={{ color: 'var(--text-primary)' }}>
            {service.title}
          </h1>
          <p className={`text-xl font-semibold mb-6 ${service.accentColor}`}>{service.tagline}</p>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            {service.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={onScheduleCall}
              className="btn-primary inline-flex items-center gap-3 group px-7! py-3.5!"
            >
              <Calendar size={18} />
              Schedule a Call
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              to="/get-started"
              className="btn-secondary inline-flex items-center justify-center gap-2 px-7! py-3.5!"
            >
              Get a Quote
            </Link>
          </div>
        </motion.div>

        {/* Two-column: Features + Process */}
        <div className="grid lg:grid-cols-2 gap-10 mb-20">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 lg:p-10"
          >
            <h2 className="text-2xl font-black mb-8" style={{ color: 'var(--text-primary)' }}>
              What's <span className="gradient-text">Included</span>
            </h2>
            <ul className="space-y-4">
              {service.features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${service.accentBg} border ${service.accentBorder}`}>
                    <Check size={11} className={service.accentColor} />
                  </div>
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Process + Pricing */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="glass-card p-8 lg:p-10"
            >
              <h2 className="text-2xl font-black mb-8" style={{ color: 'var(--text-primary)' }}>
                Our <span className="gradient-text">Process</span>
              </h2>
              <div className="space-y-6">
                {service.process.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-5"
                  >
                    <div className={`text-2xl font-black leading-none flex-shrink-0 ${service.accentColor} opacity-40`}>
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Pricing card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`glass-card p-8 border ${service.accentBorder} ${service.accentGlow}`}
            >
              <h3 className="text-sm font-black uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
                Investment Range
              </h3>
              <div className={`text-2xl font-black mb-2 ${service.accentColor}`}>{service.priceRange}</div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Typical timeline: <span style={{ color: 'var(--text-secondary)' }}>{service.timeline}</span>
              </div>
              <p className="text-xs mt-3 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Final pricing depends on scope, complexity, and integrations. Book a free discovery call for a custom quote.
              </p>
            </motion.div>
          </div>
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-10 lg:p-14 text-center relative overflow-hidden"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-50`} />
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-black mb-4" style={{ color: 'var(--text-primary)' }}>
              Ready to get started?
            </h2>
            <p className="mb-8 max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Book a free 30-minute discovery call. We'll scope your project and send you a no-obligation quote within 24 hours.
            </p>
            <button
              onClick={onScheduleCall}
              className="btn-primary inline-flex items-center gap-3 group px-8! py-4!"
            >
              <Calendar size={20} />
              Book Free Discovery Call
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
