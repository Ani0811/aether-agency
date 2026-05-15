import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Sparkles, Zap, Building2, Code, Video, Bot, TrendingUp } from 'lucide-react'

const pricingData = {
  'Websites & Apps': {
    icon: Code,
    packages: [
      {
        name: 'Starter', icon: Sparkles,
        price: { INR: '₹10,000', USD: '$150' },
        period: '/ project',
        description: 'Perfect for local businesses',
        features: ['Up to 5 Pages', 'Responsive Design', 'Contact Form', 'Basic SEO']
      },
      {
        name: 'Growth', icon: Zap,
        price: { INR: '₹20,000', USD: '$250' },
        period: '/ project',
        description: 'For scaling companies',
        features: ['Custom UI Design', 'CMS Integration', 'Advanced Animations', 'Performance Optimization']
      },
      {
        name: 'Premium', icon: Building2,
        price: { INR: '₹50,000+', USD: '$600+' },
        period: '/ project +',
        description: 'Enterprise level solutions',
        features: ['Advanced Integrations', 'Custom Dashboards', 'Workflow Automations', 'AI Features']
      }
    ],
    services: [
      { name: 'Landing Page', price: { INR: '15K - 30K', USD: '$200 - $400' } },
      { name: 'Business Website', price: { INR: '30K - 80K', USD: '$400 - $1,000' } },
      { name: 'Custom Dashboard / Web App', price: { INR: '80K - 2L', USD: '$1,000 - $2,500' } },
      { name: 'MVP Development', price: { INR: '1L - 4L', USD: '$1,200 - $5,000' } },
      { name: 'Maintenance Retainer', price: { INR: '5K - 25K / mo', USD: '$50 - $300 / mo' } }
    ]
  },
  'Video Editing': {
    icon: Video,
    packages: [
      {
        name: 'Starter Package', icon: Sparkles,
        price: { INR: '₹10K - ₹15K', USD: '$120 - $200' },
        period: '/ month',
        description: 'Consistent content engine',
        features: ['12 Reels / Shorts per month', 'Standard Pacing & Cuts', 'Basic Motion Graphics', 'Trending Audio']
      },
      {
        name: 'Growth Package', icon: Zap,
        price: { INR: '₹20K - ₹35K', USD: '$250 - $450' },
        period: '/ month',
        description: 'Aggressive reach',
        features: ['20 Reels / Shorts per month', 'Advanced Motion Graphics', 'Retention Hooks', 'Scripting Assistance']
      },
      {
        name: 'Premium Package', icon: Building2,
        price: { INR: '₹50K - ₹100K+', USD: '$600 - $1,200+' },
        period: '/ month',
        description: 'Full channel dominance',
        features: ['30+ Reels / Shorts per month', 'Full Channel Management', 'Cinematic Edits', 'Dedicated Content Strategist']
      }
    ],
    services: [
      { name: 'Reels Editing', price: { INR: '₹500 - ₹4K+ / video', USD: '$30 - $150 / video' } },
      { name: 'YouTube Editing', price: { INR: '₹2K - ₹20K+ / video', USD: '$100 - $500 / video' } },
      { name: 'Podcast Editing', price: { INR: '₹2K - ₹15K+ / episode', USD: '$150 - $1,000 / episode' } },
      { name: 'Thumbnail Design', price: { INR: '₹500 - ₹2K+ / unit', USD: '$10 - $30 / unit' } },
      { name: 'Captions Only', price: { INR: '₹300 - ₹1.5K+ / unit', USD: '$5 - $20 / unit' } },
      { name: 'Full Video Retainer', price: { INR: '₹40K - ₹4L+ / mo', USD: '$500 - $5,000 / mo' } }
    ]
  },
  'AI Agents': {
    icon: Bot,
    packages: [
      {
        name: 'Basic Bot', icon: Sparkles,
        price: { INR: '₹10,000', USD: '$150' },
        period: 'starts from',
        description: 'Customer Support and FAQs',
        features: ['Website Integration', 'Knowledge Base Training', 'Lead Capture Form', 'Email Notifications']
      },
      {
        name: 'Advanced Agent', icon: Zap,
        price: { INR: '₹20,000', USD: '$250' },
        period: 'starts from',
        description: 'Complex intelligent flows',
        features: ['API Integrations (CRM/ERP)', 'Appointment Scheduling', 'Sentiment Analysis', 'Multi-channel (Web, WA)']
      },
      {
        name: 'Full AI Ecosystem', icon: Building2,
        price: { INR: '₹50,000+', USD: '$600+' },
        period: 'starts from',
        description: 'Enterprise automation',
        features: ['Autonomous multi-agent', 'Custom AI Pipelines', 'Internal Team Tools', 'Ongoing Optimization']
      }
    ],
    services: [
      { name: 'AI Chatbot Integration', price: { INR: '25K - 75K', USD: '$300 - $900' } },
      { name: 'Custom LLM Training', price: { INR: '50K - 1.5L', USD: '$600 - $1,800' } },
      { name: 'WhatsApp Bot Integration', price: { INR: '30K - 80K', USD: '$400 - $1,000' } },
      { name: 'Agent Maintenance', price: { INR: '10K - 30K / mo', USD: '$150 - $400 / mo' } }
    ]
  },
  'Digital Marketing': {
    icon: TrendingUp,
    packages: [
      {
        name: 'Launch', icon: Sparkles,
        price: { INR: '₹10,000', USD: '$150' },
        period: '/ month',
        description: 'Establish your presence',
        features: ['Social Media Management', '8 Posts per month', 'Basic Engagement Strategy', 'Monthly Report']
      },
      {
        name: 'Scale', icon: Zap,
        price: { INR: '₹20,000', USD: '$250' },
        period: '/ month',
        description: 'Drive traffic and leads',
        features: ['Advanced SEO Implementation', '15 Social Posts / mo', 'Ad Campaign Management', 'Bi-weekly Strategy Call']
      },
      {
        name: 'Dominate', icon: Building2,
        price: { INR: '₹50,000+', USD: '$600+' },
        period: '/ month',
        description: 'Market leadership',
        features: ['Omnichannel Strategy', 'Unlimited Ad Management', 'Daily Content Publishing', 'Advanced Analytics Dashboard']
      }
    ],
    services: [
      { name: 'SEO Optimization', price: { INR: '15K - 35K / mo', USD: '$200 - $450 / mo' } },
      { name: 'Performance Ads (Meta/Google)', price: { INR: '25K - 80K / mo', USD: '$300 - $1,000 / mo' } },
      { name: 'Email Marketing Flow', price: { INR: '15K - 40K', USD: '$200 - $500' } },
      { name: 'Brand Identity Design', price: { INR: '30K - 1L', USD: '$400 - $1,200' } }
    ]
  }
}

export default function Pricing({ onScheduleCall }) {
  const [currency, setCurrency] = useState('INR')
  const [activeCategory, setActiveCategory] = useState('Websites & Apps')

  const currentData = pricingData[activeCategory]

  return (
    <section id="pricing" className="py-24">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight" style={{ color: 'var(--text-primary)' }}>Transparent <span className="gradient-text">Pricing</span></h2>
          <p className="max-w-xl mx-auto mb-10 text-lg" style={{ color: 'var(--text-secondary)' }}>
            Choose the specific vertical and find the plan that perfectly accelerates your business.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-black/10 border border-white/5 backdrop-blur-sm">
              {Object.keys(pricingData).map((cat) => {
                const IconName = pricingData[cat].icon
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      isActive 
                        ? 'bg-(--accent-blue)-black shadow-lg' 
                        : 'text-(--text-muted) hover:text-(--text-primary) hover:bg-white/5'
                    }`}
                  >
                    <IconName size={16} className={isActive ? 'text-black' : ''} />
                    {cat}
                  </button>
                )
              })}
            </div>

            {/* Currency Toggle */}
            <div className="flex items-center gap-1 p-1.5 rounded-xl bg-black/10 border border-white/5 backdrop-blur-sm">
              {['INR', 'USD'].map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-5 py-2 rounded-lg text-sm font-black transition-all ${
                    currency === curr 
                      ? 'bg-fuchsia-500 text-white shadow-lg' 
                      : 'text-(--text-muted) hover:text-(--text-primary)'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${activeCategory}-grid`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20"
          >
            {currentData.packages.map((plan, index) => (
              <motion.div 
                key={plan.name}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="glass-card p-8 lg:p-10 relative overflow-hidden flex flex-col group cursor-pointer transition-all duration-300"
              >
                {/* Hover background glow */}
                <div className="absolute inset-0 bg-linear-to-br from-(--accent-blue)/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Subtle background icon */}
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:opacity-10">
                  <plan.icon size={80} className="text-cyan-500" />
                </div>

                <div className="relative z-10 grow flex flex-col">
                  <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-6 self-start">
                    {plan.name}
                  </span>
                  
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-black tracking-tighter text-(--text-primary) group-hover:text-cyan-400 transition-colors duration-300">
                      {plan.price[currency]}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-(--text-muted) group-hover:text-cyan-400/80 mb-6 tracking-wide">
                    {plan.period}
                  </span>
                  
                  <p className="text-sm mb-8 font-medium text-(--text-secondary)">{plan.description}</p>

                  <div className="space-y-4 mb-10 grow">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/30 transition-colors">
                          <Check size={12} className="text-cyan-400" />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={onScheduleCall}
                    className="w-full py-4 text-sm font-bold rounded-xl transition-all duration-300 bg-transparent border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-(--text-primary)"
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Ala Carte Services Table */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-table`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>A La Carte / Services</h3>
              <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Need a specific service? Select individually.</p>
            </div>
            
            <div className="glass-card overflow-hidden border-white/5 shadow-2xl">
              <div className="w-full">
                {currentData.services.map((service, index) => (
                  <div 
                    key={index}
                    className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b border-white/5 last:border-0 hover:bg-white/5 transition-all"
                  >
                    <div className="font-bold text-(--text-secondary) group-hover:text-(--text-primary) sm:mb-0 transition-colors">
                      {service.name}
                    </div>
                    <div className="font-black text-(--text-primary) tracking-tight px-4 py-1.5 rounded-lg bg-black/20 group-hover:bg-(--accent-blue) group-hover:text-black transition-all">
                      {currency === 'INR' ? '₹' + service.price.INR : service.price.USD}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
