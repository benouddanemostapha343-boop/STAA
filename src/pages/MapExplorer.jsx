import { useState } from 'react'
import { motion } from 'framer-motion'
import AlgeriaMap from '../components/AlgeriaMap'
import Sidebar from '../components/Sidebar'

export default function MapExplorer() {
  const [filter, setFilter] = useState('All')
  const [region, setRegion] = useState('All')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}
    >
      {/* Map toolbar */}
      <div style={{
        height: 44, background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', padding: '0 1rem', gap: 12, flexShrink: 0,
      }}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            background: sidebarOpen ? 'rgba(0,200,81,0.12)' : 'var(--glass)',
            border: `1px solid ${sidebarOpen ? 'rgba(0,200,81,0.3)' : 'var(--border)'}`,
            color: sidebarOpen ? '#00c851' : 'var(--muted)',
            borderRadius: 8, padding: '4px 10px', fontSize: '0.75rem', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          ◧ Layers
        </button>

        <div style={{ height: 20, width: 1, background: 'var(--border)' }} />

        <div style={{ display: 'flex', gap: 6 }}>
          {['All', 'Historical', 'Beach', 'Desert', 'Mountains', 'Culture'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                background: filter === cat ? 'rgba(0,200,81,0.12)' : 'transparent',
                border: `1px solid ${filter === cat ? 'rgba(0,200,81,0.3)' : 'transparent'}`,
                color: filter === cat ? '#fff' : 'var(--muted)',
                borderRadius: 20, padding: '3px 10px', fontSize: '0.7rem', cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.68rem', color: 'var(--muted)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00c851', display: 'inline-block', animation: 'pulse-dot 1.5s infinite' }} />
          OpenStreetMap · Leaflet {filter !== 'All' && `· Filter: ${filter}`}
        </div>
      </div>

      {/* Map body */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: sidebarOpen ? '250px 1fr' : '1fr', overflow: 'hidden' }}>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <Sidebar
              activeFilter={filter}
              activeRegion={region}
              onFilter={setFilter}
              onRegion={setRegion}
            />
          </motion.div>
        )}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <AlgeriaMap filter={filter} region={region} />
        </div>
      </div>
    </motion.div>
  )
}
