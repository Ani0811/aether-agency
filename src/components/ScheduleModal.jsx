import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, User, Mail, Briefcase, DollarSign, Send, CheckCircle, Loader } from 'lucide-react'
import { useState } from 'react'

export default function ScheduleModal({ isOpen, onClose }) {
  const [status, setStatus] = useState('idle') // idle | loading | success
  const [fields, setFields] = useState({
    name: '',
    email: '',
    service: 'Websites',
    budget: '$1,000 - $3,000',
    details: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setTimeout(() => {
        onClose()
        setStatus('idle')
        setFields({ name: '', email: '', service: 'Websites', budget: '$1,000 - $3,000', details: '' })
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
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl glass-card border-white/10 overflow-hidden shadow-[0_0_100px_rgba(0,240,255,0.1)]"
            style={{ maxHeight: 'calc(100vh - 40px)' }}
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-white/50 hover:text-white transition-all z-20"
            >
              <X size={20} />
            </button>

            <div className="p-8 md:p-12 overflow-y-auto max-h-[85vh]">
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-4">
                  <Calendar size={12} /> Priority Booking
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter">Schedule a <span className="gradient-text">Discovery Call</span></h2>
                <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
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
                    <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
                    <p className="text-[var(--text-secondary)]">We'll reach out shortly to confirm your slot.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                          <User size={12} /> Full Name
                        </label>
                        <input 
                          required
                          type="text"
                          placeholder="Anirudha Basu"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-400 transition-all"
                          value={fields.name}
                          onChange={e => setFields({...fields, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                          <Mail size={12} /> Email Address
                        </label>
                        <input 
                          required
                          type="email"
                          placeholder="contact@aether.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-400 transition-all"
                          value={fields.email}
                          onChange={e => setFields({...fields, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                          <Briefcase size={12} /> Service
                        </label>
                        <select 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-400 transition-all appearance-none"
                          value={fields.service}
                          onChange={e => setFields({...fields, service: e.target.value})}
                        >
                          <option className="bg-[#0a0a0f]">Websites</option>
                          <option className="bg-[#0a0a0f]">AI Agents</option>
                          <option className="bg-[#0a0a0f]">Videos</option>
                          <option className="bg-[#0a0a0f]">Strategy</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                          <DollarSign size={12} /> Estimated Budget
                        </label>
                        <select 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-400 transition-all appearance-none"
                          value={fields.budget}
                          onChange={e => setFields({...fields, budget: e.target.value})}
                        >
                          <option className="bg-[#0a0a0f]">$1,000 - $3,000</option>
                          <option className="bg-[#0a0a0f]">$3,000 - $10,000</option>
                          <option className="bg-[#0a0a0f]">$10,000+</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                        Project Description
                      </label>
                      <textarea 
                        required
                        rows="4"
                        placeholder="Tell us about your project goals..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-400 transition-all resize-none"
                        value={fields.details}
                        onChange={e => setFields({...fields, details: e.target.value})}
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary w-full flex items-center justify-center gap-3 py-5 rounded-2xl shadow-[0_20px_40px_rgba(0,240,255,0.2)]"
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
