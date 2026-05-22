import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  QrCode, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Terminal, 
  Send, 
  RefreshCw, 
  Power, 
  Info, 
  ArrowLeft,
  Smartphone,
  Loader2
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function WhatsappDashboard() {
  const navigate = useNavigate()
  const [statusData, setStatusData] = useState({
    status: 'initializing',
    hasQr: false,
    qr: null,
    logs: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Test message states
  const [testPhone, setTestPhone] = useState('')
  const [testMessage, setTestMessage] = useState('')
  const [sendLoading, setSendLoading] = useState(false)
  const [sendResult, setSendResult] = useState(null) // { success: boolean, message: string }

  // Action states
  const [actionLoading, setActionLoading] = useState(false)
  const [showConfirmDisconnect, setShowConfirmDisconnect] = useState(false)

  const logsEndRef = useRef(null)
  const pollIntervalRef = useRef(null)

  const API_BASE = import.meta.env.DEV
    ? 'http://localhost:3001'
    : (import.meta.env.VITE_API_BACKEND_URL || '')

  const fetchStatus = async (showLoader = false) => {
    if (showLoader) setLoading(true)
    try {
      const endpoint = `${API_BASE.replace(/\/$/, '')}/api/whatsapp-status`
      const res = await fetch(endpoint)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()
      setStatusData(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching status:', err)
      setError('Cannot connect to the WhatsApp chatbot server. Please ensure the backend is running.')
    } finally {
      if (showLoader) setLoading(false)
    }
  }

  // Poll status every 2 seconds
  useEffect(() => {
    fetchStatus(true)
    pollIntervalRef.current = setInterval(() => {
      fetchStatus(false)
    }, 2000)

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current)
    }
  }, [])

  // Auto-scroll logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [statusData.logs])

  // Handle manual test message sending
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!testPhone || !testMessage) return

    setSendLoading(true)
    setSendResult(null)

    try {
      const endpoint = `${API_BASE.replace(/\/$/, '')}/api/whatsapp-send`
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: testPhone, message: testMessage })
      })
      const data = await res.json()
      
      if (res.ok && data.success) {
        setSendResult({ success: true, message: `Message sent successfully to ${testPhone}!` })
        setTestMessage('')
        // Refresh logs immediately
        fetchStatus(false)
      } else {
        setSendResult({ success: false, message: data.error || 'Failed to send message.' })
      }
    } catch (err) {
      console.error('Error sending test message:', err)
      setSendResult({ success: false, message: 'Server communication error.' })
    } finally {
      setSendLoading(false)
      setTimeout(() => setSendResult(null), 5000)
    }
  }

  // Handle session disconnect
  const handleDisconnect = async () => {
    setActionLoading(true)
    setShowConfirmDisconnect(false)
    try {
      const endpoint = `${API_BASE.replace(/\/$/, '')}/api/whatsapp-logout`
      const res = await fetch(endpoint, { method: 'POST' })
      const data = await res.json()
      if (res.ok) {
        // Immediate status refresh
        fetchStatus(false)
      } else {
        alert(data.error || 'Failed to disconnect session.')
      }
    } catch (err) {
      console.error('Error disconnecting:', err)
      alert('Failed to connect to backend server.')
    } finally {
      setActionLoading(false)
    }
  }

  // Helper to color log types in terminal
  const getLogColor = (type) => {
    switch (type) {
      case 'incoming': return 'text-cyan-400'
      case 'outgoing': return 'text-emerald-400'
      case 'qr': return 'text-yellow-400 font-bold'
      case 'auth': return 'text-fuchsia-400'
      case 'ready': return 'text-green-500 font-bold'
      case 'error': return 'text-rose-500'
      case 'test': return 'text-violet-400'
      default: return 'text-slate-300'
    }
  }

  // Helper for status badge presentation
  const getStatusPresentation = (status) => {
    switch (status) {
      case 'initializing':
        return {
          label: 'Initializing',
          colorClass: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400',
          dotClass: 'bg-yellow-400 animate-pulse',
          desc: 'Setting up headless browser & bot instance...'
        }
      case 'qr_ready':
        return {
          label: 'Waiting for Link',
          colorClass: 'border-amber-400/30 bg-amber-400/10 text-amber-400',
          dotClass: 'bg-amber-400 animate-ping',
          desc: 'Scan the QR code to connect your WhatsApp session.'
        }
      case 'authenticated':
        return {
          label: 'Authenticated',
          colorClass: 'border-sky-400/30 bg-sky-400/10 text-sky-400',
          dotClass: 'bg-sky-400 animate-pulse',
          desc: 'Session approved. Loading contacts and history...'
        }
      case 'ready':
        return {
          label: 'Active & Online',
          colorClass: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
          dotClass: 'bg-emerald-400 shadow-[0_0_8px_#34d399]',
          desc: 'AI Assistant is monitoring inquiries and responding automatically.'
        }
      case 'disconnected':
        return {
          label: 'Disconnected',
          colorClass: 'border-rose-500/30 bg-rose-500/10 text-rose-400',
          dotClass: 'bg-rose-500 animate-pulse',
          desc: 'WhatsApp disconnected. Re-initializing session.'
        }
      default:
        return {
          label: 'Unknown',
          colorClass: 'border-slate-500/30 bg-slate-500/10 text-slate-400',
          dotClass: 'bg-slate-400',
          desc: 'Checking status...'
        }
    }
  }

  const statusInfo = getStatusPresentation(statusData.status)

  return (
    <div className="min-h-screen pt-28 pb-20 relative bg-black">
      {/* Background Neon Gradients */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-120 h-120 bg-cyan-500/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-120 h-120 bg-fuchsia-500/5 blur-[150px] rounded-full"></div>
      </div>

      <div className="container-custom max-w-6xl">
        {/* Navigation Back */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-cyan-400 transition-all duration-300 mb-8 cursor-pointer group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </button>

        {/* Header Title */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-3">
            <Smartphone size={12} /> Systems Admin Portal
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tighter">
            WhatsApp AI <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-base max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Real-time status management and logging of the G-One Media automated chatbot.
          </p>
        </div>

        {error && (
          <div className="mb-8 flex items-start gap-3 p-4 rounded-xl border border-red-500/20 bg-red-950/20 text-red-200 text-sm">
            <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Connection Warning</p>
              <p className="mt-1 text-red-300">{error}</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Status & QR Card (5 columns) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Status Card */}
            <div className="glass-card p-6 border bg-[var(--bg-card)] rounded-2xl relative overflow-hidden" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Live Status</span>
                <button 
                  onClick={() => fetchStatus(true)}
                  disabled={loading}
                  className="p-2 rounded-lg hover:bg-white/5 text-[var(--text-muted)] hover:text-cyan-400 transition-colors disabled:opacity-50"
                  title="Force status refresh"
                >
                  <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-sm font-semibold transition-all duration-300 ${statusInfo.colorClass}`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${statusInfo.dotClass}`}></span>
                  {statusInfo.label}
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                {statusInfo.desc}
              </p>

              {/* QR Render Area if waiting for scan */}
              {statusData.status === 'qr_ready' && statusData.qr && (
                <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 mt-6 relative shadow-inner animate-fade-in">
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-[10px] font-bold text-yellow-600">
                    <QrCode size={12} /> Pending Scan
                  </div>
                  
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(statusData.qr)}`} 
                    alt="WhatsApp Web Link QR" 
                    className="w-56 h-56 object-contain pointer-events-none mt-2"
                  />

                  <div className="text-[11px] text-slate-500 leading-relaxed max-w-xs mt-6 border-t border-slate-100 pt-4 text-center">
                    <p className="font-bold text-slate-700 mb-1.5">To Link WhatsApp:</p>
                    <ol className="list-decimal list-inside text-left space-y-1 text-slate-600 mx-auto w-fit">
                      <li>Open <strong className="text-slate-800">WhatsApp</strong> on your phone</li>
                      <li>Go to <strong className="text-slate-800">Settings</strong> or <strong className="text-slate-800">Menu (⋮)</strong></li>
                      <li>Select <strong className="text-cyan-500">Linked Devices</strong></li>
                      <li>Tap <strong className="text-cyan-500">Link a Device</strong> & scan QR</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* Ready Area */}
              {statusData.status === 'ready' && (
                <div className="flex flex-col items-center justify-center p-8 rounded-xl border border-emerald-500/10 bg-emerald-500/5 mt-6 text-center animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-2xl shadow-[0_0_15px_rgba(16,185,129,0.25)] mb-4">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-emerald-400 mb-1">Session Active</h4>
                  <p className="text-xs max-w-[240px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Your WhatsApp number is successfully paired. Gemini AI will automatically resolve any incoming customer chat.
                  </p>
                </div>
              )}

              {/* Loading Area */}
              {statusData.status === 'initializing' && (
                <div className="flex flex-col items-center justify-center p-8 rounded-xl border border-yellow-500/10 bg-yellow-500/5 mt-6 text-center animate-pulse">
                  <Loader2 size={36} className="text-yellow-400 animate-spin mb-4" />
                  <h4 className="text-sm font-bold text-yellow-400 mb-1">Starting Puppeteer</h4>
                  <p className="text-xs max-w-[240px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Waking up browser instance and loading session tokens. This may take 10-15 seconds.
                  </p>
                </div>
              )}
            </div>

            {/* Session Controller Card */}
            <div className="glass-card p-6 border bg-[var(--bg-card)] rounded-2xl" style={{ borderColor: 'var(--border-subtle)' }}>
              <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] block mb-4">Session Controller</span>
              
              <p className="text-xs leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                Need to change the paired WhatsApp number or reset a stuck connection? Disconnecting clears current session locks on the server and generates a new QR code.
              </p>

              {showConfirmDisconnect ? (
                <div className="p-4 rounded-xl border border-red-500/20 bg-red-950/20 mb-4">
                  <div className="flex gap-2 text-red-200 text-xs mb-3">
                    <Info size={16} className="shrink-0 mt-0.5" />
                    <span>Are you sure? This will disconnect the bot immediately and require you to link again.</span>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={handleDisconnect}
                      disabled={actionLoading}
                      className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs cursor-pointer flex items-center gap-1.5"
                    >
                      {actionLoading && <Loader2 size={12} className="animate-spin" />}
                      Confirm Disconnect
                    </button>
                    <button 
                      onClick={() => setShowConfirmDisconnect(false)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--text-secondary)] font-bold text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowConfirmDisconnect(true)}
                  disabled={actionLoading || statusData.status === 'initializing'}
                  className="w-full py-3.5 rounded-xl border border-red-500/30 text-red-400 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/50 transition-all font-bold tracking-wider text-xs uppercase flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Power size={14} />
                  Disconnect Session
                </button>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: Terminal Logs & Sandbox (7 columns) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Live Terminal logs */}
            <div className="glass-card border bg-[var(--bg-card)] rounded-2xl overflow-hidden flex flex-col h-[400px]" style={{ borderColor: 'var(--border-subtle)' }}>
              
              {/* Terminal Header */}
              <div className="bg-black/40 border-b border-[var(--border-subtle)] px-6 py-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/40"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/40"></span>
                  </div>
                  <span className="h-4 w-px bg-slate-800"></span>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <Terminal size={14} />
                    <span>whatsapp_agent_logs.sh</span>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                  Live Stream
                </span>
              </div>

              {/* Terminal Console View */}
              <div className="p-5 font-mono text-xs overflow-y-auto grow bg-[#040406]/90 scrollbar-thin select-text">
                {statusData.logs && statusData.logs.length > 0 ? (
                  <div className="space-y-2">
                    {statusData.logs.map((log, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 leading-relaxed break-all">
                        <span className="text-slate-600 shrink-0 select-none">[{log.timestamp}]</span>
                        <span className={`${getLogColor(log.type)} shrink-0 select-none`}>
                          [{log.type.toUpperCase()}]
                        </span>
                        <span className="text-slate-300">{log.message}</span>
                      </div>
                    ))}
                    <div ref={logsEndRef} />
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-600 italic">
                    No activities recorded yet. Status changes or inbound messages will stream logs here.
                  </div>
                )}
              </div>
            </div>

            {/* Sandbox Testing Console */}
            <div className="glass-card p-6 border bg-[var(--bg-card)] rounded-2xl" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] block mb-1">Testing Sandbox</span>
                <h3 className="text-xl font-bold">Send a Test Message</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Validate that the WhatsApp API client can dispatch outbound messages. Specify a recipient number (with country code) and test message.
                </p>
              </div>

              <form onSubmit={handleSendMessage} className="space-y-4 mt-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2 md:col-span-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Phone Number
                    </label>
                    <input 
                      required
                      type="tel"
                      placeholder="919875417275"
                      disabled={statusData.status !== 'ready'}
                      value={testPhone}
                      onChange={e => setTestPhone(e.target.value)}
                      className="w-full bg-black/30 border border-[var(--border-subtle)] focus:border-cyan-400 outline-none rounded-xl px-4 py-2.5 text-sm transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <p className="text-[9px] text-[var(--text-muted)]">Include country code (e.g. 91 for India)</p>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Message Content
                    </label>
                    <div className="relative">
                      <input 
                        required
                        type="text"
                        placeholder="Hello, testing WhatsApp AI assistant from the dashboard!"
                        disabled={statusData.status !== 'ready'}
                        value={testMessage}
                        onChange={e => setTestMessage(e.target.value)}
                        className="w-full bg-black/30 border border-[var(--border-subtle)] focus:border-cyan-400 outline-none rounded-xl pl-4 pr-12 py-2.5 text-sm transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <button
                        type="submit"
                        disabled={sendLoading || statusData.status !== 'ready' || !testPhone || !testMessage}
                        className="absolute right-2 top-1.5 p-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        {sendLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                      </button>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {sendResult && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`flex items-center gap-2 p-3 text-xs rounded-xl border mt-2 ${
                        sendResult.success 
                          ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-300' 
                          : 'border-red-500/20 bg-red-500/5 text-red-300'
                      }`}
                    >
                      {sendResult.success ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                      <span>{sendResult.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {statusData.status !== 'ready' && (
                  <div className="flex items-center gap-2.5 p-3 rounded-xl border border-yellow-500/10 bg-yellow-500/5 text-yellow-300 text-[11px]">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>The message sender is disabled because the WhatsApp client is not active. Complete linking to enable.</span>
                  </div>
                )}
              </form>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
