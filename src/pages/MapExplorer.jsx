import { useState } from 'react'
import { motion } from 'framer-motion'
import AlgeriaMap from '../components/AlgeriaMap'
import Sidebar from '../components/Sidebar'

export default function MapExplorer() {
  const [filter, setFilter] = useState('All')
  const [region, setRegion] = useState('All')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        height: 'calc(100vh - 60px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >

      {/* Top toolbar */}
      <div
        style={{
          height: 44,
          background: 'var(--bg2)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1rem',
          gap: 12,
          flexShrink: 0,
          overflowX: 'auto',
        }}
      >

        {/* Layers button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            background: sidebarOpen
              ? 'rgba(0,200,81,0.12)'
              : 'var(--glass)',
            border: `1px solid ${
              sidebarOpen
                ? 'rgba(0,200,81,0.3)'
                : 'var(--border)'
            }`,
            color: sidebarOpen ? '#00c851' : 'var(--muted)',
            borderRadius: 8,
            padding: '4px 10px',
            fontSize: '0.75rem',
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            whiteSpace: 'nowrap',
          }}
        >
          ◧ Layers
        </button>

        <div
          style={{
            height: 20,
            width: 1,
            background: 'var(--border)',
          }}
        />

        {/* Categories */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            overflowX: 'auto',
          }}
        >
          {[
            'All',
            'Historical',
            'Beach',
            'Desert',
            'Mountains',
            'Culture',
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                background:
                  filter === cat
                    ? 'rgba(0,200,81,0.12)'
                    : 'transparent',
                border: `1px solid ${
                  filter === cat
                    ? 'rgba(0,200,81,0.3)'
                    : 'transparent'
                }`,
                color:
                  filter === cat
                    ? '#fff'
                    : 'var(--muted)',
                borderRadius: 20,
                padding: '3px 10px',
                fontSize: '0.7rem',
                cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status */}
        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.68rem',
            color: 'var(--muted)',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#00c851',
              display: 'inline-block',
              animation: 'pulse-dot 1.5s infinite',
            }}
          />
          OpenStreetMap · Leaflet
        </div>
      </div>

      {/* Main map section */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
        }}
      >

        {/* Overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.45)',
              zIndex: 20,
            }}
          />
        )}

        {/* Sidebar drawer */}
        <motion.div
          initial={false}
          animate={{
            x: sidebarOpen ? 0 : -260,
          }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 250,
            height: '100%',
            zIndex: 30,
            background: 'var(--bg2)',
            borderRight: '1px solid var(--border)',
            overflowY: 'auto',
          }}
        >

          {/* Close button */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '10px',
            }}
          >
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '1.2rem',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          <Sidebar
            activeFilter={filter}
            activeRegion={region}

            onFilter={(value) => {
              setFilter(value)

              if (window.innerWidth < 768) {
                setSidebarOpen(false)
              }
            }}

            onRegion={(value) => {
              setRegion(value)

              if (window.innerWidth < 768) {
                setSidebarOpen(false)
              }
            }}
          />
        </motion.div>

        {/* Real map */}
        <div
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <AlgeriaMap
            filter={filter}
            region={region}
          />
        </div>

      </div>
    </motion.div>
  )
}
