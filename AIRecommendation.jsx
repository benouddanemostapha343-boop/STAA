import { motion } from 'framer-motion'

export default function AIRecommendation({ recommendations }) {
  if (!recommendations || recommendations.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'linear-gradient(135deg, rgba(0,200,81,0.06), rgba(255,187,51,0.04))',
        border: '1px solid rgba(0,200,81,0.2)',
        borderRadius: 16, padding: '1.2rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{
          background: 'rgba(0,200,81,0.15)', border: '1px solid rgba(0,200,81,0.3)',
          borderRadius: 8, padding: '3px 9px', fontSize: '0.62rem', color: '#00c851',
          fontWeight: 700, letterSpacing: '0.08em',
        }}>
          ✦ AI INSIGHTS
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {recommendations.map((rec, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            style={{
              display: 'flex', gap: 10, alignItems: 'flex-start',
              padding: '8px 10px', background: 'rgba(255,255,255,0.04)',
              borderRadius: 10,
            }}
          >
            <span style={{ fontSize: '1rem', flexShrink: 0 }}>{rec.icon}</span>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 500 }}>{rec.text}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
