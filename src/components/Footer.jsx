import { motion } from 'framer-motion'
import { Instagram, Twitter, Linkedin, Github, Mail, MessageCircle } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative pt-32 pb-10 overflow-hidden border-t" style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-primary)' }}>
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-200 h-100 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-6 lg:pr-8">
            <a 
              href="/" 
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="text-3xl font-black tracking-tighter uppercase inline-block"
            >
              Aether<span className="text-cyan-400">.</span>
            </a>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Engineering digital ecosystems that captivate and convert. We blend cinematic visuals with high-performance code.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all" style={{ color: 'var(--text-muted)' }}>
                <Twitter size={20} />
              </a>
              <a href="#" className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:text-fuchsia-400 hover:border-fuchsia-400/50 hover:bg-fuchsia-400/10 transition-all" style={{ color: 'var(--text-muted)' }}>
                <Instagram size={20} />
              </a>
              <a href="#" className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all" style={{ color: 'var(--text-muted)' }}>
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:text-fuchsia-400 hover:border-fuchsia-400/50 hover:bg-fuchsia-400/10 transition-all" style={{ color: 'var(--text-muted)' }}>
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold mb-2 uppercase tracking-widest text-base">Explore</h4>
            {['About Us', 'Services', 'Our Portfolio', 'Pricing Plans'].map((item) => (
              <a key={item} href="#" className="text-base transition-colors hover:text-cyan-400 w-fit" style={{ color: 'var(--text-secondary)' }}>
                {item}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold mb-2 uppercase tracking-widest text-base">Legal</h4>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="text-base transition-colors hover:text-fuchsia-400 w-fit" style={{ color: 'var(--text-secondary)' }}>
                {item}
              </a>
            ))}
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold mb-2 uppercase tracking-widest text-base">Connect</h4>
            <div className="flex flex-col gap-3">
              <a 
                href="https://wa.me/919875417275" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-base hover:text-cyan-400 transition-colors group"
                style={{ color: 'var(--text-secondary)' }}
              >
                <div className="w-9 h-9 rounded-lg bg-cyan-400/10 flex items-center justify-center border border-cyan-400/20 group-hover:border-cyan-400/50 transition-all">
                  <MessageCircle size={16} className="text-cyan-400" />
                </div>
                Chat with Anirudha
              </a>
              <a 
                href="https://wa.me/918017790952" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-base hover:text-fuchsia-400 transition-colors group"
                style={{ color: 'var(--text-secondary)' }}
              >
                <div className="w-9 h-9 rounded-lg bg-fuchsia-400/10 flex items-center justify-center border border-fuchsia-400/20 group-hover:border-fuchsia-400/50 transition-all">
                  <MessageCircle size={16} className="text-fuchsia-400" />
                </div>
                Chat with Vasudev
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
          <p className="text-sm font-medium tracking-wide" style={{ color: 'var(--text-muted)' }}>
            &copy; {currentYear} Aether Digital Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm font-bold tracking-widest uppercase text-cyan-400">Systems Online</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
