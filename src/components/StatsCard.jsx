import { motion } from 'framer-motion'

export default function StatsCard({ label, value, sub, color = '#00c851', icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      style={{
        background: 'var(--glass)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '1.2rem',
        backdropFilter: 'blur(12px)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s, border-color 0.2s',
        cursor: 'default',
      }}
      whileHover={{ y: -2, scale: 1.01 }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle at top right, ${color}0a, transparent 60%)`,
        pointerEvents: 'none',
      }} />
      {icon && (
        <div style={{ fontSize: '1.4rem', marginBottom: 10 }}>{icon}</div>
      )}
      <div style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
        fontWeight: 700,
        color,
        lineHeight: 1,
        marginBottom: 4,
      }}>
        {value}
      </div>
      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff', marginBottom: 3 }}>{label}</div>
      {sub && <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{sub}</div>}
    </motion.div>
  )
}
