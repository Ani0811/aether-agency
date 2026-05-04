import { motion } from 'framer-motion'
import { Check, Sparkles, Zap, Building2 } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    icon: Sparkles,
    price: '₹4,999',
    period: '/ project',
    description: 'Website + Video • 3–5 day delivery',
    features: [
      'Custom responsive website',
      'Professional promo video',
      'Basic SEO optimization',
      '1 round of revisions'
    ]
  },
  {
    name: 'Growth',
    icon: Zap,
    price: '₹8,999',
    period: '/ project',
    description: 'Advanced Website + Video • 5–7 day delivery',
    features: [
      'Everything in Starter',
      'Social media video cuts',
      'Advanced SEO optimization',
      'Analytics integration',
      '3 rounds of revisions'
    ]
  },
  {
    name: 'Enterprise',
    icon: Building2,
    price: 'Custom',
    period: '',
    description: 'Custom Solutions • Dedicated Team',
    features: [
      'Everything in Growth',
      'Custom web application',
      'Ongoing video content (monthly)',
      'Priority support 24/7',
      'Unlimited revisions'
    ]
  }
]

export default function Pricing() {
  return (
    <section id="pricing">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Transparent <span className="gradient-text">Pricing</span></h2>
          <p className="max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>Choose the plan that fits your business needs.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-10 relative overflow-hidden flex flex-col group cursor-pointer transition-all duration-300"
            >
              {/* Hover background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Subtle background icon */}
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:opacity-10">
                <plan.icon size={80} className="text-purple-500" />
              </div>

              <div className="relative z-10 flex-grow flex flex-col">
                <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-6 self-start">
                  {plan.name}
                </span>
                
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-black tracking-tighter text-[var(--text-primary)] group-hover:text-purple-500 transition-colors duration-300">{plan.price}</span>
                  <span className="text-sm font-medium text-[var(--text-muted)] transition-colors duration-300 group-hover:text-purple-400">{plan.period}</span>
                </div>
                <p className="text-sm mb-8 font-medium text-[var(--text-secondary)]">{plan.description}</p>

                <div className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/30 transition-colors">
                        <Check size={12} className="text-purple-400" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>

                <button className="w-full py-4 text-sm font-bold rounded-full transition-all duration-300 bg-transparent border border-gray-500/30 hover:border-purple-500/50 hover:bg-purple-500/5 text-[var(--text-primary)]">
                  {plan.price === 'Custom' ? 'Contact Us' : 'Get Started'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
