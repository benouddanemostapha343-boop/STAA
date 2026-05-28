import { motion } from 'framer-motion'

const typeColors = {
  opportunity: { bg: 'rgba(0,200,81,0.08)', border: 'rgba(0,200,81,0.25)', text: '#00c851' },
  warning: { bg: 'rgba(255,187,51,0.08)', border: 'rgba(255,187,51,0.25)', text: '#ffbb33' },
  positive: { bg: 'rgba(0,200,81,0.08)', border: 'rgba(0,200,81,0.25)', text: '#00e85f' },
  info: { bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.25)', text: '#60a5fa' },
}

export default function InsightCard({ insight, delay = 0 }) {
  const { type, icon, text } = insight
  const colors = typeColors[type] || typeColors.info

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        padding: '0.85rem 1rem',
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
      }}
    >
      <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: 1 }}>{icon}</span>
      <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>{text}</p>
    </motion.div>
  )
}
