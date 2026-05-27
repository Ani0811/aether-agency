import { useEffect } from 'react'
import { ArrowLeft, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function TermsOfService() {
  const navigate = useNavigate()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="min-h-screen pt-32 pb-20 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[150%] sm:w-150 h-150 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container-custom relative z-10 w-full max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors mb-8"
          style={{ color: 'var(--text-muted)' }}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div 
          className="glass-card p-6 md:p-12 border shadow-2xl relative w-full"
          style={{
            background: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 pb-8 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="w-12 h-12 rounded-full bg-cyan-400/10 flex items-center justify-center border border-cyan-400/20 shrink-0">
              <FileText size={24} className="text-cyan-400" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Terms of Service
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
          
          <div className="space-y-8 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>1. Terms</h2>
              <p>
                By accessing the website at G-One Media, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on G-One Media's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>modify or copy the materials;</li>
                <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                <li>attempt to decompile or reverse engineer any software contained on G-One Media's website;</li>
                <li>remove any copyright or other proprietary notations from the materials; or</li>
                <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>3. Disclaimer</h2>
              <p>
                The materials on G-One Media's website are provided on an 'as is' basis. G-One Media makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>4. Limitations</h2>
              <p>
                In no event shall G-One Media or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on G-One Media's website, even if G-One Media or a G-One Media authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>5. Revisions and Errata</h2>
              <p>
                The materials appearing on G-One Media's website could include technical, typographical, or photographic errors. G-One Media does not warrant that any of the materials on its website are accurate, complete or current. G-One Media may make changes to the materials contained on its website at any time without notice. However G-One Media does not make any commitment to update the materials.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}
