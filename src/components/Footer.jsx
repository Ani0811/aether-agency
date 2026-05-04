import { Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-20 border-t" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <span className="text-2xl font-black uppercase tracking-tighter" style={{ color: 'var(--text-primary)' }}>Aether</span>
            <p className="text-sm max-w-xs text-center md:text-left" style={{ color: 'var(--text-secondary)' }}>
              Building digital ecosystems that capture attention and convert audiences.
            </p>
          </div>

          <div className="flex gap-12">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Navigation</span>
              <div className="flex flex-col gap-2">
                {['Services', 'Portfolio', 'Pricing', 'Testimonials'].map(item => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="text-sm transition-colors hover:text-purple-400" style={{ color: 'var(--text-secondary)' }}>{item}</a>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Legal</span>
              <div className="flex flex-col gap-2">
                {['Privacy', 'Terms', 'Contact'].map(item => (
                  <a key={item} href={item === 'Contact' ? '#contact' : '#'} className="text-sm transition-colors hover:text-purple-400" style={{ color: 'var(--text-secondary)' }}>{item}</a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 items-center md:items-end">
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ background: 'var(--bg-glass)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)' }}>
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ background: 'var(--bg-glass)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)' }}>
                <Instagram size={18} />
              </a>
            </div>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>© 2026 Aether Digital. Built for the future.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
