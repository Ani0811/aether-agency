import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, User, Mail, Briefcase, DollarSign, Send, CheckCircle, Loader } from 'lucide-react'
import { useState } from 'react'

export default function ScheduleModal({ isOpen, onClose }) {
  const [status, setStatus] = useState('idle') // idle | loading | success
  const [currency, setCurrency] = useState('USD')
  const [fields, setFields] = useState({
    name: '',
    email: '',
    service: 'Websites',
    budget: '$1,000 - $3,000',
    details: ''
  })

  const budgetOptions = {
    USD: ['$1,000 - $3,000', '$3,000 - $10,000', '$10,000+'],
    INR: ['₹50k - ₹2.5L', '₹2.5L - ₹10L', '₹10L+']
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setTimeout(() => {
        onClose()
        setStatus('idle')
        setFields({ name: '', email: '', service: 'Websites', budget: budgetOptions[currency][0], details: '' })
      }, 2500)
    }, 1500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md dark:bg-black/80 dark:backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl glass-card overflow-hidden shadow-2xl"
            style={{ 
              maxHeight: 'calc(100vh - 40px)',
              background: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)'
            }}
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all z-20"
              style={{ color: 'var(--text-muted)' }}
            >
              <X size={20} />
            </button>

            <div className="p-8 md:p-12 overflow-y-auto max-h-[85vh]">
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-4">
                  <Calendar size={12} /> Priority Booking
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                  Schedule a <span className="gradient-text">Discovery Call</span>
                </h2>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Let's discuss your vision and how we can engineer a digital ecosystem that dominates your market.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-20 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-cyan-400/10 flex items-center justify-center border border-cyan-400/20 mx-auto mb-6">
                      <CheckCircle size={40} className="text-cyan-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Request Received!</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>We'll reach out shortly to confirm your slot.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                          <User size={12} /> Full Name
                        </label>
                        <input 
                          required
                          type="text"
                          placeholder="Anirudha Basu"
                          className="w-full bg-black/5 dark:bg-white/5 border rounded-xl px-5 py-4 outline-none transition-all"
                          style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                          value={fields.name}
                          onChange={e => setFields({...fields, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                          <Mail size={12} /> Email Address
                        </label>
                        <input 
                          required
                          type="email"
                          placeholder="contact@aether.com"
                          className="w-full bg-black/5 dark:bg-white/5 border rounded-xl px-5 py-4 outline-none transition-all"
                          style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                          value={fields.email}
                          onChange={e => setFields({...fields, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                          <Briefcase size={12} /> Service
                        </label>
                        <select 
                          className="w-full bg-black/5 dark:bg-white/5 border rounded-xl px-5 py-4 outline-none transition-all appearance-none cursor-pointer"
                          style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                          value={fields.service}
                          onChange={e => setFields({...fields, service: e.target.value})}
                        >
                          <option value="Websites" className="bg-[var(--bg-card)]">Websites</option>
                          <option value="AI Agents" className="bg-[var(--bg-card)]">AI Agents</option>
                          <option value="Videos" className="bg-[var(--bg-card)]">Videos</option>
                          <option value="Strategy" className="bg-[var(--bg-card)]">Strategy</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                            <DollarSign size={12} /> Budget
                          </label>
                          <div className="flex gap-2 p-1 rounded-lg bg-black/5 dark:bg-white/5 border border-white/5">
                            {['USD', 'INR'].map((curr) => (
                              <button
                                key={curr}
                                type="button"
                                onClick={() => {
                                  setCurrency(curr)
                                  setFields({...fields, budget: budgetOptions[curr][0]})
                                }}
                                className={`px-2 py-0.5 rounded-md text-[9px] font-black transition-all ${
                                  currency === curr 
                                    ? 'bg-cyan-400 text-black shadow-lg' 
                                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                }`}
                              >
                                {curr}
                              </button>
                            ))}
                          </div>
                        </div>
                        <select 
                          className="w-full bg-black/5 dark:bg-white/5 border rounded-xl px-5 py-4 outline-none transition-all appearance-none cursor-pointer"
                          style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                          value={fields.budget}
                          onChange={e => setFields({...fields, budget: e.target.value})}
                        >
                          {budgetOptions[currency].map(opt => (
                            <option key={opt} value={opt} className="bg-[var(--bg-card)]">{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                        Project Description
                      </label>
                      <textarea 
                        required
                        rows="4"
                        placeholder="Tell us about your project goals..."
                        className="w-full bg-black/5 dark:bg-white/5 border rounded-xl px-5 py-4 outline-none transition-all resize-none"
                        style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                        value={fields.details}
                        onChange={e => setFields({...fields, details: e.target.value})}
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary w-full flex items-center justify-center gap-3 py-5 rounded-2xl shadow-xl"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader size={20} className="animate-spin" />
                          Scheduling...
                        </>
                      ) : (
                        <>
                          Schedule My Call
                          <Send size={18} />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
