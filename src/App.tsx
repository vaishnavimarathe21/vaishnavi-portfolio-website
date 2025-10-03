import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import ScrollToTopButton from './components/ScrollToTopButton.tsx'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Projects from './pages/Projects.tsx'
import ProjectDetail from './pages/ProjectDetail.tsx'
import Contact from './pages/Contact.tsx'
import Developer from './pages/Developer.tsx'
import { addImageSecurity, injectSecurityCSS } from './utils/imageSecurity'

function App() {
  useEffect(() => {
    // Disable browser scroll restoration to prevent it from interfering
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    
    // Initialize image security measures
    addImageSecurity()
    injectSecurityCSS()
  }, [])

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <Header />
        <main className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/developer" element={<Developer />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTopButton />
        <Analytics />
        <SpeedInsights />
      </div>
    </Router>
  )
}

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top when route changes
    const scrollToTop = () => {
      window.scrollTo(0, 0)
    }
    
    // Use setTimeout to ensure DOM is ready and override any browser scroll restoration
    setTimeout(scrollToTop, 0)
    
    // Also try again after a short delay to ensure it works
    setTimeout(scrollToTop, 100)
  }, [pathname])

  return null
}

export default App