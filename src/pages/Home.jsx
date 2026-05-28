import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const stats = [
  { num: '58+', label: 'Wilayas', sub: 'Full national coverage', color: '#00c851' },
  { num: '1K+', label: 'Tourist Sites', sub: 'Mapped & analyzed', color: '#ffbb33' },
  { num: 'AI', label: 'Insights', sub: 'Real-time analytics', color: '#00c851' },
  { num: 'GIS', label: 'Live Data', sub: 'QGIS integrated', color: '#ffbb33' },
]

const features = [
  { icon: '◎', title: 'Interactive GIS Map', desc: 'Real Leaflet map with OpenStreetMap tiles and QGIS wilaya boundaries', path: '/map' },
  { icon: '◆', title: 'Tourism Analytics', desc: 'Deep data analysis across all 58 wilayas with KPI dashboards', path: '/dashboard' },
  { icon: '✦', title: 'AI Travel Planner', desc: 'Generate personalized multi-day itineraries with AI-powered recommendations', path: '/ai-planner' },
  { icon: '◑', title: 'Wilaya Comparison', desc: 'Side-by-side radar chart comparison of any two Algerian wilayas', path: '/compare' },
  { icon: '◈', title: 'Territorial Analysis', desc: 'Identify tourism opportunity zones and investment priority areas', path: '/analysis' },
  { icon: '📄', title: 'Report Generator', desc: 'Export comprehensive tourism reports with statistics and recommendations', path: '/reports' },
]

export default function Home() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* Hero */}
      <section style={{
        position: 'relative', minHeight: '88vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '3rem 1.5rem',
        overflow: 'hidden',
      }}>
        {/* Background orbs */}
        <div style={{ position: 'absolute', width: 600, height: 500, borderRadius: '50%', background: 'rgba(0,200,81,0.07)', filter: 'blur(80px)', top: -120, left: -150, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 400, height: 350, borderRadius: '50%', background: 'rgba(255,187,51,0.05)', filter: 'blur(80px)', bottom: -80, right: -100, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 300, height: 250, borderRadius: '50%', background: 'rgba(0,200,81,0.04)', filter: 'blur(60px)', top: '40%', left: '65%', pointerEvents: 'none' }} />

        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.025,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: 'rgba(0,200,81,0.1)', border: '1px solid rgba(0,200,81,0.3)',
            color: '#00c851', padding: '5px 14px', borderRadius: 20,
            fontSize: '0.7rem', fontWeight: 700, marginBottom: '1.4rem',
            letterSpacing: '0.08em',
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00c851', display: 'inline-block', animation: 'pulse-dot 1.5s infinite' }} />
          LIVE GIS PLATFORM · ALGERIA
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2.2rem, 6vw, 5rem)',
            fontWeight: 900, lineHeight: 1.05,
            letterSpacing: '-2px', marginBottom: '1rem',
            maxWidth: 820,
          }}
        >
          Smart Tourism Intelligence<br />
          <span style={{ color: '#00c851' }}>for</span>{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00c851, #ffbb33)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Algeria
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            color: 'var(--muted)', fontSize: '1rem',
            maxWidth: 520, lineHeight: 1.8, marginBottom: '2.5rem',
          }}
        >
          AI-powered geospatial platform for understanding and developing Algeria's
          tourism potential across all 58 wilayas — from the Mediterranean coast to the Saharan depths.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ display: 'flex', gap: 12, marginBottom: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Link to="/map" style={{
            background: 'linear-gradient(135deg, #00c851, #009938)',
            color: '#fff', padding: '12px 28px', borderRadius: 12,
            fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 8,
            boxShadow: '0 0 24px rgba(0,200,81,0.3)',
            transition: 'transform 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >
            ◎ Explore Map
          </Link>
          <Link to="/dashboard" style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
            color: '#fff', padding: '12px 28px', borderRadius: 12,
            fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 8,
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
          >
            ◆ Open Dashboard
          </Link>
        </motion.div>

        {/* Hero stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 12, width: '100%', maxWidth: 760,
          }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.07 }}
              style={{
                background: 'var(--glass)', border: '1px solid var(--border)',
                borderRadius: 14, padding: '1rem 0.8rem',
                backdropFilter: 'blur(12px)', textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.9rem', fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#fff', marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--muted)', marginTop: 2 }}>{s.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features grid */}
      <section style={{ padding: '2rem 1.5rem 4rem', maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', color: '#00c851', textTransform: 'uppercase', marginBottom: 8 }}>Platform Capabilities</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontWeight: 700 }}>
            Everything you need for{' '}
            <span style={{ color: '#00c851' }}>tourism intelligence</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <Link to={f.path} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                  background: 'var(--glass)', border: '1px solid var(--border)',
                  borderRadius: 16, padding: '1.4rem', cursor: 'pointer',
                  position: 'relative', overflow: 'hidden', transition: 'border-color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,200,81,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,200,81,0.05), transparent)', pointerEvents: 'none', opacity: 0 }} />
                  <div style={{ fontSize: '1.5rem', marginBottom: 10 }}>{f.icon}</div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', marginBottom: 6 }}>{f.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.6 }}>{f.desc}</div>
                  <div style={{ marginTop: 10, fontSize: '0.72rem', color: '#00c851', fontWeight: 600 }}>Explore →</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
