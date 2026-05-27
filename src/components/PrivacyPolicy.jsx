import { useEffect } from 'react'
import { ArrowLeft, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function PrivacyPolicy() {
  const navigate = useNavigate()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="min-h-screen pt-32 pb-20 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-fuchsia-500/50 to-transparent opacity-50" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[150%] sm:w-150 h-150 bg-fuchsia-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

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
            <div className="w-12 h-12 rounded-full bg-fuchsia-400/10 flex items-center justify-center border border-fuchsia-400/20 shrink-0">
              <Shield size={24} className="text-fuchsia-400" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Privacy Policy
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
          
          <div className="space-y-8 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>1. Introduction</h2>
              <p>
                Welcome to G-One Media. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>2. The Data We Collect About You</h2>
              <p>
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>3. How We Use Your Personal Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>4. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>5. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us through the available chat options or at our provided email address.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}
