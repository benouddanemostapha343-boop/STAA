import { motion } from 'framer-motion'
import { getScoreColor, getScoreLabel } from '../services/geoService'

export default function WilayaCard({ wilaya, delay = 0, onClick }) {
  const { name, hotels, sites, rating, accessibility, score, region } = wilaya
  const color = getScoreColor(score)
  const label = getScoreLabel(score)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
      whileHover={{ y: -3, scale: 1.01 }}
      onClick={onClick}
      style={{
        background: 'var(--glass)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '1.1rem',
        backdropFilter: 'blur(12px)',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 80, height: 80,
        background: `radial-gradient(circle, ${color}18, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{name}</div>
          <div style={{ fontSize: '0.68rem', color: 'var(--dim)', marginTop: 2 }}>{region} Algeria</div>
        </div>
        <div style={{
          background: `${color}18`,
          border: `1px solid ${color}40`,
          borderRadius: 8, padding: '3px 10px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color, fontFamily: 'Playfair Display, serif' }}>{score}</div>
          <div style={{ fontSize: '0.58rem', color, letterSpacing: '0.06em', fontWeight: 600 }}>{label}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {[
          ['🏨', 'Hotels', hotels],
          ['🏛️', 'Sites', sites],
          ['⭐', 'Rating', rating],
          ['🛣️', 'Access', `${accessibility}%`],
        ].map(([icon, lbl, val]) => (
          <div key={lbl} style={{
            background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '6px 9px',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ fontSize: '0.8rem' }}>{icon}</span>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#fff' }}>{val}</div>
              <div style={{ fontSize: '0.62rem', color: 'var(--dim)' }}>{lbl}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
