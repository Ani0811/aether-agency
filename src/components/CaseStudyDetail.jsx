import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, TrendingUp, Users, Zap, Clock, AlertCircle, RefreshCw } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

const METRIC_ICONS = {
  'Revenue Increase': TrendingUp,
  'Monthly Users': Users,
  'Load Time': Zap,
  'Delivery Time': Clock,
  'Interview Rate': TrendingUp,
  'Monthly Visitors': Users,
  'Lighthouse Score': Zap,
  'Build Time': Clock,
  'Cost Reduction': TrendingUp,
  'Queries Resolved': Users,
  'Avg Response': Zap,
  'Setup Time': Clock,
  'Signal Accuracy': TrendingUp,
  'Data Sources': Users,
  'Processing': Zap,
  'Reel Views': Users,
  'Views': Users,
  'Total Views': Users,
  'Engagement Rate': TrendingUp,
  'Engagement': TrendingUp,
  'Watch Time': Clock,
  'Click-Through Rate': TrendingUp,
  'Subscriber Growth': Users,
  'Saves': Zap,
  'Saves & Shares': Zap,
  'Impressions': Users,
  'Inquiry Conversion': TrendingUp,
  'Sales Referral': TrendingUp,
  'Video Replays': Zap,
  'Brand Recall': TrendingUp,
  'Inbound Leads': Users,
  'Video Likes': Users,
  'Lead Quality': TrendingUp,
  'Average View Duration': Clock,
  'Inquiries': Users,
  'Team Sentiment': Users,
  'Social Reach': Users,
  'Follower Growth': TrendingUp,
  'Job Applications': Users,
  'Social Share Rate': TrendingUp,
  'Reach': Users,
  'Page Load Speed': Zap,
  'Active Listings': Users,
  'Bounce Rate': Zap,
}

function getMetricIcon(label) {
  return METRIC_ICONS[label] || TrendingUp
}

function CaseStudySkeleton() {
  return (
    <section className="pt-28 pb-20">
      <div className="container-custom animate-pulse">
        <div className="h-5 w-32 bg-white/5 rounded mb-10" />
        <div className="aspect-[21/9] rounded-3xl bg-white/5 mb-12" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card p-6 h-28" />
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-card p-10 h-64" />
          <div className="glass-card p-8 h-64" />
        </div>
      </div>
    </section>
  )
}

function CaseStudyError({ onRetry }) {
  const navigate = useNavigate()
  return (
    <section className="pt-28 pb-20">
      <div className="container-custom">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors mb-10"
          style={{ color: 'var(--text-muted)' }}
        >
          <ArrowLeft size={16} /> Back to Portfolio
        </button>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 gap-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <AlertCircle size={28} className="text-red-400" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Could not load case study
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              Failed to connect to the database. Please check your connection and try again.
            </p>
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-bold hover:bg-cyan-400/20 transition-all cursor-pointer"
            >
              <RefreshCw size={16} />
              Retry
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function CaseStudyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [study, setStudy] = useState(null)
  const [loadState, setLoadState] = useState('loading') // 'loading' | 'success' | 'notfound' | 'error'

  const fetchStudy = async () => {
    setLoadState('loading')
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('slug', id)
        .single()

      if (error) {
        // PGRST116 = no rows found
        if (error.code === 'PGRST116') {
          setLoadState('notfound')
        } else {
          throw error
        }
        return
      }

      // Also fetch link and type from portfolio_projects
      const { data: projectData } = await supabase
        .from('portfolio_projects')
        .select('link, type')
        .eq('case_study_slug', id)
        .single()
        
      if (projectData) {
        data.link = projectData.link
        data.project_type = projectData.type
      }

      setStudy(data)
      setLoadState('success')
    } catch (err) {
      console.error('[CaseStudy] Supabase fetch error:', err)
      setLoadState('error')
    }
  }

  useEffect(() => { 
    window.scrollTo(0, 0)
    fetchStudy() 
  }, [id])

  if (loadState === 'loading') return <CaseStudySkeleton />
  if (loadState === 'error') return <CaseStudyError onRetry={fetchStudy} />

  if (loadState === 'notfound' || !study) {
    return (
      <section className="py-32">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Case Study Not Found</h2>
          <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>This project doesn't have a detailed case study yet.</p>
          <button 
            onClick={() => navigate('/#portfolio')}
            className="btn-primary inline-block cursor-pointer"
          >
            ← Back to Portfolio
          </button>
        </div>
      </section>
    )
  }

  // Resolve hero image path
  const heroImage = study.hero_image?.startsWith('http')
    ? study.hero_image
    : `${import.meta.env.BASE_URL}${study.hero_image?.replace(/^\//, '')}`.replace(/\/+/g, '/')

  // Determine if this is a video case study based on category
  const isVideoCategory = ['reel', 'vlog', 'youtube', 'video'].some(kw => study.category.toLowerCase().includes(kw))

  return (
    <section className="pt-28 pb-20">
      <div className="container-custom">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mt-6 mb-10 flex gap-4"
        >
          <button
            onClick={() => navigate('/#portfolio')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest border border-white/10 hover:border-cyan-400 hover:text-cyan-400 transition-colors bg-white/5 cursor-pointer"
            style={{ color: 'var(--text-muted)' }}
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </button>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden mb-12 aspect-[21/9] border border-white/10"
        >
          {isVideoCategory && (
            <img 
              src={heroImage} 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110" 
            />
          )}
          <img
            src={heroImage}
            alt={study.title}
            className={`relative z-10 w-full h-full ${isVideoCategory ? 'object-contain' : 'object-cover'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] via-transparent to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 p-8 lg:p-12 z-30">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 mb-3 block">{study.category}</span>
            <h1 className="text-3xl lg:text-5xl font-black" style={{ color: 'var(--text-primary)' }}>{study.title}</h1>
          </div>
        </motion.div>

        {/* Metrics Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {(study.metrics || []).map((metric, i) => {
            const Icon = getMetricIcon(metric.label)
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass-card p-6 text-center group hover:border-cyan-500/30"
              >
                <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                  <Icon size={20} className="text-cyan-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-cyan-400 mb-1">{metric.value}</div>
                <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{metric.label}</div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 glass-card p-8 lg:p-10"
          >
            <h2 className="text-2xl font-black mb-4" style={{ color: 'var(--text-primary)' }}>Overview</h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>{study.description}</p>

            <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>The Challenge</h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>{study.challenge}</p>

            <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Our Solution</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{study.solution}</p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-8"
          >
            <h2 className="text-lg font-black mb-6" style={{ color: 'var(--text-primary)' }}>Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {(study.tech_stack || []).map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold border border-white/10 bg-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all cursor-default"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
              {study.project_type === 'Websites' && study.link ? (
                <div className="flex flex-col gap-3">
                  <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5 relative group">
                    <iframe 
                      src={study.link} 
                      width="100%" 
                      height="100%" 
                      title={study.title}
                      style={{ border: 'none' }}
                    ></iframe>
                  </div>
                  <a
                    href={study.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold bg-cyan-400 text-black hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all"
                  >
                    <ExternalLink size={14} />
                    Open Website in New Tab
                  </a>
                </div>
              ) : study.project_type === 'Websites' ? (
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold transition-all bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed"
                >
                  <ExternalLink size={14} />
                  Website Not Available
                </a>
              ) : null}
              {study.link && ['Reels', 'YT Videos', 'Vlogs'].includes(study.project_type) && (
                <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10">
                  <iframe 
                    src={study.link.replace(/\/view.*$/, '/preview')} 
                    width="100%" 
                    height="100%" 
                    allow="autoplay" 
                    title={study.title}
                    style={{ border: 'none' }}
                  ></iframe>
                </div>
              )}
              <Link
                to="/get-started"
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold border border-white/10 hover:border-cyan-400 hover:text-cyan-400 transition-all text-white hover:bg-cyan-400/5 mt-2"
              >
                Start a Similar Project
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
