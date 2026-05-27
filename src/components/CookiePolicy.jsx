import { useEffect } from 'react'
import { ArrowLeft, Cookie } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function CookiePolicy() {
  const navigate = useNavigate()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="min-h-screen pt-32 pb-20 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-amber-500/50 to-transparent opacity-50" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[150%] sm:w-150 h-150 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

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
            <div className="w-12 h-12 rounded-full bg-amber-400/10 flex items-center justify-center border border-amber-400/20 shrink-0">
              <Cookie size={24} className="text-amber-400" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Cookie Policy
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
          
          <div className="space-y-8 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>1. What Are Cookies</h2>
              <p>
                As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>2. How We Use Cookies</h2>
              <p>
                We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>3. Disabling Cookies</h2>
              <p>
                You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>4. The Cookies We Set</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Site preferences cookies:</strong> In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>5. Third Party Cookies</h2>
              <p>
                In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}
