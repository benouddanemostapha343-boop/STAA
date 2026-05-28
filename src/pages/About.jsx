import { motion } from 'framer-motion'

const techStack = [
  { name: 'React + Vite', desc: 'Fast SPA framework with HMR', icon: '⚛️' },
  { name: 'React Router', desc: 'Client-side multi-page routing', icon: '🔀' },
  { name: 'Leaflet', desc: 'Real interactive GIS mapping', icon: '🗺️' },
  { name: 'Framer Motion', desc: 'Smooth animations & transitions', icon: '✨' },
  { name: 'TailwindCSS', desc: 'Utility-first styling', icon: '🎨' },
  { name: 'Recharts', desc: 'Data visualization & charts', icon: '📊' },
  { name: 'PapaParse', desc: 'CSV data parsing', icon: '📄' },
  { name: 'QGIS', desc: 'GeoJSON wilaya boundaries', icon: '🌍' },
]

const features = [
  { icon: '◎', title: 'Real Leaflet Maps', desc: 'OpenStreetMap tiles with QGIS-exported GeoJSON wilaya layers. Click any wilaya for instant AI-generated insights.' },
  { icon: '◆', title: 'Tourism Score Algorithm', desc: 'Proprietary index: 40% tourist sites + 30% hotels + 20% visitor rating + 10% accessibility.' },
  { icon: '✦', title: 'AI Travel Planner', desc: 'Generates personalized multi-day itineraries based on journey type, duration, and budget level.' },
  { icon: '◑', title: 'Wilaya Comparison', desc: 'Radar chart head-to-head comparison of any two of Algeria\'s 58 wilayas with live metric bars.' },
  { icon: '📍', title: 'Opportunity Zones', desc: 'Color-coded scoring system identifies green (high investment), yellow (medium), and red (developing) zones.' },
  { icon: '📄', title: 'Report Generator', desc: 'Browser-print PDF export with full KPIs, tourism categories, and AI recommendations per wilaya.' },
]

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ padding: '2rem 1.5rem', maxWidth: 1100, margin: '0 auto' }}
    >
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem', position: 'relative' }}>
        <div style={{ position: 'absolute', width: 400, height: 300, borderRadius: '50%', background: 'rgba(0,200,81,0.06)', filter: 'blur(80px)', top: -60, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}
          style={{
            width: 80, height: 80, borderRadius: 20, margin: '0 auto 1.2rem',
            background: 'linear-gradient(135deg, #00c851, #009938)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem', boxShadow: '0 0 40px rgba(0,200,81,0.3)',
          }}
        >
          🌍
        </motion.div>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', color: '#00c851', textTransform: 'uppercase', marginBottom: 8 }}>About the Platform</div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-1px' }}>
          STAA Platform
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--muted)', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
          <strong style={{ color: '#fff' }}>Smart Tourism & Territorial Analytics Algeria</strong> — 
          a professional GIS-powered intelligence platform for analyzing, comparing, and developing tourism across Algeria's 58 wilayas.
        </p>
      </div>

      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        style={{
          background: 'linear-gradient(135deg, rgba(0,200,81,0.08), rgba(255,187,51,0.04))',
          border: '1px solid rgba(0,200,81,0.2)', borderRadius: 20, padding: '2rem',
          marginBottom: '2.5rem', textAlign: 'center',
        }}
      >
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, maxWidth: 700, margin: '0 auto' }}>
          "Our mission is to bridge the gap between Algeria's extraordinary natural and cultural heritage
          and the modern tools of geospatial intelligence — enabling data-driven decisions for tourism development."
        </div>
      </motion.div>

      {/* Platform features */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 700 }}>Platform Features</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.3rem' }}
            >
              <div style={{ fontSize: '1.3rem', marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.65 }}>{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 700 }}>Technology Stack</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: 6 }}>Built with modern, production-grade open-source tools</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
          {techStack.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              style={{
                background: 'var(--glass)', border: '1px solid var(--border)',
                borderRadius: 12, padding: '1rem',
                display: 'flex', alignItems: 'center', gap: 12,
              }}
            >
              <div style={{ fontSize: '1.4rem', flexShrink: 0 }}>{t.icon}</div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{t.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: 2 }}>{t.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* QGIS integration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 20, padding: '2rem', marginBottom: '2rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ fontSize: '2rem', flexShrink: 0 }}>🗺️</div>
          <div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, marginBottom: 8 }}>QGIS Integration</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
              This platform is designed to consume real QGIS-exported data. Place your{' '}
              <code style={{ background: 'rgba(0,200,81,0.15)', color: '#00c851', padding: '1px 6px', borderRadius: 4, fontSize: '0.78rem' }}>algeria_wilayas.geojson</code>
              {' '}file in <code style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', padding: '1px 6px', borderRadius: 4, fontSize: '0.78rem' }}>public/data/</code> directory.
              The map automatically reads wilaya boundaries and merges them with tourism analytics.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: '12px 16px', fontFamily: 'monospace', fontSize: '0.78rem', color: '#00c851' }}>
              <div style={{ color: 'var(--dim)', marginBottom: 4 }}># Expected GeoJSON properties:</div>
              <div>{'{ "name": "Alger", "Hotels": 312, "sites": 420,'}</div>
              <div>{'  "rating": 4.6, "accessibility": 95 }'}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Score formula */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        style={{ background: 'var(--glass)', border: '1px solid rgba(255,187,51,0.2)', borderRadius: 20, padding: '2rem' }}
      >
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>Tourism Score Algorithm</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
          {[
            { weight: '40%', metric: 'Tourist Sites', color: '#00c851', desc: 'Normalized to max 420' },
            { weight: '30%', metric: 'Hotel Count', color: '#ffbb33', desc: 'Normalized to max 312' },
            { weight: '20%', metric: 'Visitor Rating', color: '#00c851', desc: 'Rating × 20 (out of 100)' },
            { weight: '10%', metric: 'Accessibility', color: '#ffbb33', desc: 'Direct 0–100 index' },
          ].map(item => (
            <div key={item.metric} style={{
              background: `${item.color}10`, border: `1px solid ${item.color}30`,
              borderRadius: 12, padding: '1rem', textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 700, color: item.color }}>{item.weight}</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff', marginTop: 4 }}>{item.metric}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--muted)', marginTop: 3 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
