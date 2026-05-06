import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 250 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleHover = (e) => {
      const target = e.target
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('.glass-card') ||
        target.getAttribute('role') === 'button'
        
      setIsHovered(!!isInteractive)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleHover)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleHover)
    }
  }, [cursorX, cursorY])

  return (
    <>
      <style>{`
        body, a, button {
          cursor: none !important;
        }
      `}</style>
      
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      {/* Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full z-[9998] pointer-events-none border border-cyan-400/50"
        animate={{
          width: isHovered ? 60 : 32,
          height: isHovered ? 60 : 32,
          backgroundColor: isHovered ? 'rgba(0, 240, 255, 0.1)' : 'rgba(0, 240, 255, 0)',
          borderColor: isHovered ? 'rgba(0, 240, 255, 0.8)' : 'rgba(0, 240, 255, 0.4)',
          boxShadow: isHovered ? '0 0 20px rgba(0, 240, 255, 0.4)' : '0 0 0px rgba(0, 240, 255, 0)'
        }}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          backdropFilter: 'blur(2px)'
        }}
      />
    </>
  )
}
