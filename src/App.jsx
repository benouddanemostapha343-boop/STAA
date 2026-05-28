import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import MapExplorer from './pages/MapExplorer'
import TourismAnalysis from './pages/TourismAnalysis'
import AIPlanner from './pages/AIPlanner'
import CompareWilayas from './pages/CompareWilayas'
import Reports from './pages/Reports'
import About from './pages/About'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
        <div className="noise-overlay" />
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/map" element={<MapExplorer />} />
              <Route path="/analysis" element={<TourismAnalysis />} />
              <Route path="/ai-planner" element={<AIPlanner />} />
              <Route path="/compare" element={<CompareWilayas />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
