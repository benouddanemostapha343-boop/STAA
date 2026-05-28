import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { path: '/', label: 'Home', icon: '◈' },
  { path: '/dashboard', label: 'Dashboard', icon: '◉' },
  { path: '/map', label: 'Map Explorer', icon: '◎' },
  { path: '/analysis', label: 'Analysis', icon: '◆' },
  { path: '/compare', label: 'Compare', icon: '◑' },
  { path: '/ai-planner', label: 'AI Planner', icon: '✦' },
  { path: '/reports', label: 'Reports', icon: '◈' },
  { path: '/about', label: 'About', icon: '◉' },
]

export default function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      style={{
        position: 'sticky', top: 0, zIndex: 500,
        background: 'rgba(7,17,29,0.92)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        height: 60,
      }}
      className="flex items-center justify-between px-6"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 no-underline" style={{ textDecoration: 'none' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg, #00c851, #009938)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem', fontWeight: 700, color: '#fff',
          boxShadow: '0 0 12px rgba(0,200,81,0.4)',
        }}>
          S
        </div>
        <div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.95rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
            STAA
          </div>
          <div style={{ fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '0.08em', lineHeight: 1, marginTop: 2 }}>
            Smart Tourism · Algeria
          </div>
        </div>
      </Link>

      {/* Desktop nav links */}
      <div className="hidden md:flex items-center gap-1">
        {navLinks.map(link => {
          const active = location.pathname === link.path
          return (
            <Link
              key={link.path}
              to={link.path}
              style={{
                padding: '5px 11px',
                borderRadius: 8,
                fontSize: '0.75rem',
                fontWeight: active ? 600 : 400,
                color: active ? '#fff' : 'var(--muted)',
                background: active ? 'rgba(0,200,81,0.15)' : 'transparent',
                border: active ? '1px solid rgba(0,200,81,0.3)' : '1px solid transparent',
                textDecoration: 'none',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (!active) { e.target.style.color = '#fff'; e.target.style.background = 'rgba(255,255,255,0.06)'; } }}
              onMouseLeave={e => { if (!active) { e.target.style.color = 'var(--muted)'; e.target.style.background = 'transparent'; } }}
            >
              {link.label}
            </Link>
          )
        })}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'rgba(0,200,81,0.1)', border: '1px solid rgba(0,200,81,0.25)',
          borderRadius: 20, padding: '3px 10px',
          fontSize: '0.65rem', color: '#00c851', fontWeight: 600,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00c851', display: 'inline-block', animation: 'pulse-dot 1.5s infinite' }} />
          LIVE GIS
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          style={{ background: 'var(--glass2)', border: '1px solid var(--border)', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--muted)', fontSize: '1rem' }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'absolute', top: 60, left: 0, right: 0,
              background: 'rgba(7,17,29,0.98)', backdropFilter: 'blur(24px)',
              borderBottom: '1px solid var(--border)', padding: '12px 16px',
              display: 'flex', flexDirection: 'column', gap: 4,
            }}
          >
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: '9px 14px', borderRadius: 9,
                  fontSize: '0.85rem', color: location.pathname === link.path ? '#00c851' : 'var(--muted)',
                  background: location.pathname === link.path ? 'rgba(0,200,81,0.1)' : 'transparent',
                  textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                <span>{link.icon}</span> {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
