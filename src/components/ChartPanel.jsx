import { motion } from 'framer-motion'

export default function ChartPanel({ title, subtitle, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      style={{
        background: 'var(--glass)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '1.3rem',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div style={{ marginBottom: '1.2rem' }}>
        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff' }}>{title}</div>
        {subtitle && <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 3 }}>{subtitle}</div>}
      </div>
      {children}
    </motion.div>
  )
}
