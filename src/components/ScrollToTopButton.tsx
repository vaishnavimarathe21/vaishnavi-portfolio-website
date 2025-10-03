import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Calculate scroll progress
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setScrollProgress(scrollPercent)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200/50 dark:bg-slate-700/50 z-50 backdrop-blur-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 shadow-sm"
          style={{ width: `${scrollProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1, ease: "easeOut" }}
        />
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 p-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group backdrop-blur-sm border border-primary-500/20"
            aria-label="Back to top"
          >
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <ChevronUp className="w-6 h-6" />
              
              {/* Pulse animation */}
              <motion.div
                className="absolute inset-0 rounded-full bg-primary-400"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
              Back to top
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default ScrollToTopButton
