import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { getAllWilayas, getKPIs } from '../services/analyticsService'
import { getScoreColor } from '../services/geoService'
import { generateInsights } from '../services/aiService'
import WilayaCard from '../components/WilayaCard'
import InsightCard from '../components/InsightCard'

const wilayas = getAllWilayas().sort((a, b) => b.score - a.score)
const kpis = getKPIs()

export default function TourismAnalysis() {
  const [selectedWilaya, setSelectedWilaya] = useState(null)

  const insights = selectedWilaya ? generateInsights(selectedWilaya) : []

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ padding: '2rem 1.5rem', maxWidth: 1200, margin: '0 auto' }}
    >
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', color: '#00c851', textTransform: 'uppercase', marginBottom: 6 }}>Territorial Intelligence</div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, marginBottom: 6 }}>Tourism Analysis</h1>
        <p style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>Identify opportunity zones and investment priorities across Algeria</p>
      </div>

      {/* Top 4 highlight cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: '2rem' }}>
        {[
          { icon: '🏆', label: 'Top Performing Wilaya', value: kpis.topWilaya?.name, detail: `Score: ${kpis.topWilaya?.score}`, color: '#00c851' },
          { icon: '🏨', label: 'Most Hotels', value: kpis.mostHotels?.name, detail: `${kpis.mostHotels?.hotels} hotels registered`, color: '#ffbb33' },
          { icon: '⭐', label: 'Highest Rated', value: kpis.highestRating?.name, detail: `${kpis.highestRating?.rating} avg rating`, color: '#00c851' },
          { icon: '🏛️', label: 'Most Tourist Sites', value: kpis.mostSites?.name, detail: `${kpis.mostSites?.sites} mapped sites`, color: '#ffbb33' },
        ].map((card, i) => (
          <motion.div key={card.label}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.2rem', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at top right, ${card.color}0d, transparent 60%)`, pointerEvents: 'none' }} />
            <div style={{ fontSize: '1.4rem', marginBottom: 8 }}>{card.icon}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--muted)', marginBottom: 4 }}>{card.label}</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>{card.value}</div>
            <div style={{ fontSize: '0.72rem', color: card.color }}>{card.detail}</div>
          </motion.div>
        ))}
      </div>

      {/* Score ranking chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.4rem', marginBottom: '2rem' }}
      >
        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff', marginBottom: 4 }}>Full Wilaya Rankings — Tourism Score</div>
        <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginBottom: '1.2rem' }}>Click a bar to explore insights for that wilaya</div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={wilayas} onClick={data => data?.activePayload && setSelectedWilaya(data.activePayload[0]?.payload)}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 9 }} axisLine={false} tickLine={false} interval={0} angle={-35} textAnchor="end" height={50} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip
              content={({ active, payload }) => active && payload?.length ? (
                <div style={{ background: 'rgba(13,27,42,0.95)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '8px 12px', fontSize: '0.78rem' }}>
                  <div style={{ color: '#fff', fontWeight: 600 }}>{payload[0].payload.name}</div>
                  <div style={{ color: getScoreColor(payload[0].value) }}>Score: {payload[0].value}</div>
                </div>
              ) : null}
            />
            <Bar dataKey="score" radius={[4, 4, 0, 0]} cursor="pointer">
              {wilayas.map((w, i) => (
                <Cell key={i} fill={getScoreColor(w.score)} opacity={selectedWilaya?.name === w.name ? 1 : 0.7} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Selected wilaya insights */}
      {selectedWilaya && (
        <motion.div
          key={selectedWilaya.name}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.4rem', marginBottom: '2rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700 }}>{selectedWilaya.name}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 2 }}>{selectedWilaya.region} Algeria · AI-Generated Insights</div>
            </div>
            <button onClick={() => setSelectedWilaya(null)} style={{ background: 'var(--glass)', border: '1px solid var(--border)', color: 'var(--muted)', borderRadius: 8, padding: '4px 10px', cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>✕ Close</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {insights.map((ins, i) => <InsightCard key={i} insight={ins} delay={i * 0.07} />)}
          </div>
        </motion.div>
      )}

      {/* All wilaya cards */}
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem' }}>All Wilayas</h2>
        <p style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Click any card to explore AI insights</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
        {wilayas.map((w, i) => (
          <WilayaCard key={w.id} wilaya={w} delay={i * 0.04} onClick={() => setSelectedWilaya(w)} />
        ))}
      </div>
    </motion.div>
  )
}
