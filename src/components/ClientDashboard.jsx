import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { LogOut, CheckCircle, Circle, Clock, CreditCard, FileText, Rocket, ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

// Demo project data — in production this would come from Supabase
const demoProject = {
  name: 'E-Commerce Platform',
  client: 'Client',
  status: 'In Progress',
  progress: 65,
  startDate: '2026-05-01',
  estimatedEnd: '2026-06-15',
  milestones: [
    { title: 'Discovery & Planning', status: 'completed', date: '2026-05-01' },
    { title: 'UI/UX Design', status: 'completed', date: '2026-05-08' },
    { title: 'Frontend Development', status: 'in-progress', date: '2026-05-15' },
    { title: 'Backend & API Integration', status: 'upcoming', date: '2026-05-25' },
    { title: 'Payment Integration', status: 'upcoming', date: '2026-06-01' },
    { title: 'Testing & QA', status: 'upcoming', date: '2026-06-08' },
    { title: 'Launch & Deployment', status: 'upcoming', date: '2026-06-15' },
  ],
  recentUpdates: [
    { message: 'Homepage design approved — moving to development', date: '2 days ago' },
    { message: 'Product catalog wireframes completed', date: '5 days ago' },
    { message: 'Design system and color palette finalized', date: '1 week ago' },
  ],
}

export default function ClientDashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (!currentUser) {
        navigate('/portal')
        return
      }
      setUser(currentUser)
      setLoading(false)
    }
    checkAuth()
  }, [navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/portal')
  }

  if (loading) {
    return (
      <section className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-cyan-400/20 border-t-cyan-400 animate-spin" />
      </section>
    )
  }

  const project = demoProject
  if (user?.email) {
    project.client = user.email.split('@')[0]
  }

  return (
    <section className="pt-28 pb-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
        >
          <div>
            <h1 className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>
              Welcome, <span className="gradient-text">{project.client}</span>
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Here's an overview of your current project.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border border-white/10 hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-400 transition-all cursor-pointer"
            style={{ color: 'var(--text-muted)' }}
          >
            <LogOut size={14} /> Sign Out
          </button>
        </motion.div>

        {/* Project Overview Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Rocket, label: 'Project', value: project.name, color: 'cyan' },
            { icon: Clock, label: 'Status', value: project.status, color: 'amber' },
            { icon: FileText, label: 'Progress', value: `${project.progress}%`, color: 'emerald' },
            { icon: CreditCard, label: 'Est. Completion', value: new Date(project.estimatedEnd).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }), color: 'fuchsia' },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="glass-card p-5 group hover:border-cyan-500/30"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 group-hover:bg-cyan-500/10 transition-colors">
                  <card.icon size={16} className={`text-${card.color}-400`} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{card.label}</span>
              </div>
              <div className="text-lg font-black truncate" style={{ color: 'var(--text-primary)' }}>{card.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Milestone Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 glass-card p-6 lg:p-8"
          >
            <h2 className="text-xl font-black mb-6" style={{ color: 'var(--text-primary)' }}>Project Milestones</h2>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>Overall Progress</span>
                <span className="text-xs font-black text-cyan-400">{project.progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #00f0ff, #ff00e5)',
                    boxShadow: '0 0 10px rgba(0,240,255,0.4)',
                  }}
                />
              </div>
            </div>

            {/* Timeline Items */}
            <div className="space-y-4">
              {project.milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                    milestone.status === 'completed'
                      ? 'border-emerald-500/20 bg-emerald-500/5'
                      : milestone.status === 'in-progress'
                        ? 'border-cyan-500/20 bg-cyan-500/5'
                        : 'border-white/5 bg-transparent'
                  }`}
                >
                  <div className="mt-0.5">
                    {milestone.status === 'completed' ? (
                      <CheckCircle size={18} className="text-emerald-400" />
                    ) : milestone.status === 'in-progress' ? (
                      <div className="relative">
                        <Circle size={18} className="text-cyan-400" />
                        <span className="absolute inset-0 rounded-full animate-ping bg-cyan-400/30" />
                      </div>
                    ) : (
                      <Circle size={18} className="text-[var(--text-muted)]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`font-bold text-sm ${
                      milestone.status === 'completed' ? 'text-emerald-400' :
                      milestone.status === 'in-progress' ? 'text-cyan-400' :
                      'text-[var(--text-muted)]'
                    }`}>
                      {milestone.title}
                    </div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider mt-1" style={{ color: 'var(--text-muted)' }}>
                      {new Date(milestone.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                    milestone.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                    milestone.status === 'in-progress' ? 'bg-cyan-500/20 text-cyan-400' :
                    'bg-white/5 text-[var(--text-muted)]'
                  }`}>
                    {milestone.status === 'in-progress' ? 'Active' : milestone.status === 'completed' ? 'Done' : 'Upcoming'}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <h2 className="text-lg font-black mb-5" style={{ color: 'var(--text-primary)' }}>Recent Updates</h2>
              <div className="space-y-4">
                {project.recentUpdates.map((update, i) => (
                  <div key={i} className="pb-4 border-b border-white/5 last:border-0 last:pb-0">
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{update.message}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider mt-1.5" style={{ color: 'var(--text-muted)' }}>{update.date}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6"
            >
              <h2 className="text-lg font-black mb-3" style={{ color: 'var(--text-primary)' }}>Need Something?</h2>
              <p className="text-xs mb-5" style={{ color: 'var(--text-secondary)' }}>
                Reach out to your project manager or request a feature change.
              </p>
              <a
                href="/#contact"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold bg-cyan-400 text-black hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all"
              >
                Contact Team <ArrowRight size={14} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
