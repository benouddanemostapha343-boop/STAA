import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(7,17,29,0.9)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '2rem 1.5rem 1.5rem',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>STAA</div>
            <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.7, maxWidth: 240 }}>
              Smart Tourism & Territorial Analytics Algeria — AI-powered GIS platform for sustainable tourism intelligence.
            </p>
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--dim)', textTransform: 'uppercase', marginBottom: 10 }}>Platform</div>
            {[['Map Explorer', '/map'], ['Dashboard', '/dashboard'], ['AI Planner', '/ai-planner'], ['Compare Wilayas', '/compare']].map(([label, path]) => (
              <Link key={path} to={path} style={{ display: 'block', fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 5, textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = '#00c851'}
                onMouseLeave={e => e.target.style.color = 'var(--muted)'}
              >{label}</Link>
            ))}
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--dim)', textTransform: 'uppercase', marginBottom: 10 }}>Technology</div>
            {['React + Vite', 'Leaflet GIS', 'QGIS Integration', 'AI Analytics', 'Recharts Visualization'].map(t => (
              <div key={t} style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: 5 }}>{t}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--dim)', textTransform: 'uppercase', marginBottom: 10 }}>Coverage</div>
            <div style={{ fontSize: '1.6rem', fontFamily: 'Playfair Display, serif', fontWeight: 700, color: '#00c851', marginBottom: 4 }}>58</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Wilayas analyzed</div>
            <div style={{ fontSize: '1.2rem', fontFamily: 'Playfair Display, serif', fontWeight: 700, color: 'var(--gold)', marginTop: 10, marginBottom: 4 }}>1,000+</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Tourist sites mapped</div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--dim)' }}>© 2025 STAA Platform · Smart Tourism Analytics Algeria</div>
          <div style={{ display: 'flex', gap: 12 }}>
            {['Leaflet', 'OpenStreetMap', 'QGIS'].map(t => (
              <span key={t} style={{ fontSize: '0.65rem', color: 'var(--dim)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
