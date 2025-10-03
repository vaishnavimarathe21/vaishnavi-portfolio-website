import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import ScrollToTopButton from './components/ScrollToTopButton.tsx'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Projects from './pages/Projects.tsx'
import Contact from './pages/Contact.tsx'
import Developer from './pages/Developer.tsx'

function App() {
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
            <Route path="/contact" element={<Contact />} />
            <Route path="/developer" element={<Developer />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </Router>
  )
}

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default App