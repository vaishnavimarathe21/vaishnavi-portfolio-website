import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, Suspense, lazy } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import ScrollToTopButton from './components/ScrollToTopButton.tsx'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home.tsx'))
const About = lazy(() => import('./pages/About.tsx'))
const Projects = lazy(() => import('./pages/Projects.tsx'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.tsx'))
const Contact = lazy(() => import('./pages/Contact.tsx'))
const Developer = lazy(() => import('./pages/Developer.tsx'))

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
      <p className="text-slate-600 dark:text-slate-300">Loading...</p>
    </div>
  </div>
)

function App() {
  useEffect(() => {
    // Disable browser scroll restoration to prevent it from interfering
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    // Disable right-click on entire website
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    // Add event listener to document
    document.addEventListener('contextmenu', handleContextMenu)

    // Cleanup function
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

  return (
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
            <Header />
            <main className="relative">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:slug" element={<ProjectDetail />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/developer" element={<Developer />} />
                </Routes>
              </Suspense>
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