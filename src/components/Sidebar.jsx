import { useState } from 'react'
import { motion } from 'framer-motion'

const categories = ['All', 'Historical', 'Beach', 'Desert', 'Hotels', 'Mountains', 'Culture']
const regions = ['All', 'North', 'South', 'East', 'West', 'Center']

export default function Sidebar({ onFilter, onRegion, activeFilter, activeRegion }) {
  return (
    <div style={{
      background: 'var(--bg2)', borderRight: '1px solid var(--border)',
      overflowY: 'auto', display: 'flex', flexDirection: 'column', height: '100%',
    }}>
      <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--dim)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
          Category Filter
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {categories.map(cat => {
            const active = activeFilter === cat
            return (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.97 }}
                onClick={() => onFilter(cat)}
                style={{
                  background: active ? 'rgba(0,200,81,0.12)' : 'transparent',
                  border: active ? '1px solid rgba(0,200,81,0.3)' : '1px solid transparent',
                  color: active ? '#fff' : 'var(--muted)',
                  borderRadius: 8, padding: '7px 10px', textAlign: 'left',
                  fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.18s',
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >
                <span style={{ fontSize: '0.75rem' }}>{getCatIcon(cat)}</span>
                {cat}
                {active && <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: '#00c851' }} />}
              </motion.button>
            )
          })}
        </div>
      </div>

      <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--dim)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
          Region
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {regions.map(reg => {
            const active = activeRegion === reg
            return (
              <motion.button
                key={reg}
                whileTap={{ scale: 0.97 }}
                onClick={() => onRegion(reg)}
                style={{
                  background: active ? 'rgba(255,187,51,0.1)' : 'transparent',
                  border: active ? '1px solid rgba(255,187,51,0.25)' : '1px solid transparent',
                  color: active ? '#ffbb33' : 'var(--muted)',
                  borderRadius: 8, padding: '7px 10px', textAlign: 'left',
                  fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.18s',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >
                {reg} {active && '◈'}
              </motion.button>
            )
          })}
        </div>
      </div>

      <div style={{ padding: '1rem', marginTop: 'auto' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Map Legend</div>
        {[
          ['#00c851', 'High Opportunity'],
          ['#ffbb33', 'Medium Potential'],
          ['#ff8800', 'Moderate'],
          ['#ff4444', 'Needs Development'],
        ].map(([color, label]) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: color, flexShrink: 0 }} />
            <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function getCatIcon(cat) {
  const icons = { All: '◈', Historical: '🏛️', Beach: '🏖️', Desert: '🏜️', Hotels: '🏨', Mountains: '⛰️', Culture: '🎭' }
  return icons[cat] || '◈'
}
