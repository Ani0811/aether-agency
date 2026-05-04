import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-6"
      >
        <h1 className="text-6xl font-bold gradient-text mb-3">404</h1>
        <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Page not found</p>
        <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: 'var(--text-secondary)' }}>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="gradient-bg text-white text-sm font-semibold px-6 py-2.5 rounded-lg inline-flex items-center gap-2 transition-all duration-200 hover:opacity-90">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </motion.div>
    </div>
  )
}
