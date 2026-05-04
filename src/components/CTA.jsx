import { motion } from 'framer-motion'
import { Send, MessageCircle } from 'lucide-react'

export default function CTA() {
  return (
    <section id="contact" className="pb-32 pt-20">
      <div className="container-custom">
        <div className="relative rounded-[40px] overflow-hidden p-8 md:p-16 lg:p-20 border shadow-2xl" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
          {/* Animated Background */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10 -z-10" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] animate-pulse -z-10" />
          
          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            {/* Left side: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter leading-tight" style={{ color: 'var(--text-primary)' }}>
                Let's start your <br/> <span className="gradient-text">next project</span>
              </h2>
              <p className="text-lg mb-10 max-w-md" style={{ color: 'var(--text-secondary)' }}>
                Ready to upgrade your digital presence? Fill out the form or reach out directly on WhatsApp for an immediate response.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <a 
                  href="https://wa.me/1234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-full font-bold text-white transition-all duration-300 shadow-lg hover:-translate-y-1"
                  style={{ background: '#25D366', boxShadow: '0 10px 25px -5px rgba(37, 211, 102, 0.4)' }}
                >
                  <MessageCircle size={20} />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Right side: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-[32px] border"
              style={{ background: 'var(--bg-glass)', borderColor: 'var(--border-subtle)' }}
            >
              <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-transparent border rounded-xl px-5 py-4 outline-none focus:border-purple-500 transition-colors"
                    style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-transparent border rounded-xl px-5 py-4 outline-none focus:border-purple-500 transition-colors"
                    style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Project Details</label>
                  <textarea 
                    placeholder="Tell us about your goals..." 
                    rows="4"
                    className="w-full bg-transparent border rounded-xl px-5 py-4 outline-none focus:border-purple-500 transition-colors resize-none"
                    style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full flex justify-center items-center gap-2 mt-4">
                  Send Message
                  <Send size={18} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
