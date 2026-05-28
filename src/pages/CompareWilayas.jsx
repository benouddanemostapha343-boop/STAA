import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { getAllWilayas } from '../services/analyticsService'
import { getScoreColor } from '../services/geoService'

const wilayas = getAllWilayas()

function buildRadarData(wA, wB) {
  if (!wA || !wB) return []
  const maxVals = { hotels: 312, sites: 420, rating: 5, accessibility: 100, score: 100 }
  return [
    { metric: 'Hotels', A: Math.round(wA.hotels / maxVals.hotels * 100), B: Math.round(wB.hotels / maxVals.hotels * 100) },
    { metric: 'Sites', A: Math.round(wA.sites / maxVals.sites * 100), B: Math.round(wB.sites / maxVals.sites * 100) },
    { metric: 'Rating', A: Math.round(wA.rating / maxVals.rating * 100), B: Math.round(wB.rating / maxVals.rating * 100) },
    { metric: 'Access', A: wA.accessibility, B: wB.accessibility },
    { metric: 'Score', A: wA.score, B: wB.score },
  ]
}

function MetricRow({ label, valA, valB, colorA, colorB, maxVal = 100 }) {
  const pA = Math.min((valA / maxVal) * 100, 100)
  const pB = Math.min((valB / maxVal) * 100, 100)
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: '0.78rem' }}>
        <span style={{ color: colorA, fontWeight: 600 }}>{valA}</span>
        <span style={{ color: 'var(--muted)' }}>{label}</span>
        <span style={{ color: colorB, fontWeight: 600 }}>{valB}</span>
      </div>
      <div style={{ position: 'relative', height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pA}%`, background: colorA, borderRadius: 3, opacity: 0.8 }} />
        <div style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: `${pB}%`, background: colorB, borderRadius: 3, opacity: 0.8, transformOrigin: 'right', transform: 'scaleX(-1)' }} />
      </div>
    </div>
  )
}

export default function CompareWilayas() {
  const [idxA, setIdxA] = useState(0)
  const [idxB, setIdxB] = useState(2)
  const wA = wilayas[idxA]
  const wB = wilayas[idxB]
  const radarData = buildRadarData(wA, wB)
  const colorA = '#00c851'
  const colorB = '#ffbb33'

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ padding: '2rem 1.5rem', maxWidth: 1100, margin: '0 auto' }}
    >
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', color: '#00c851', textTransform: 'uppercase', marginBottom: 6 }}>Comparative Intelligence</div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, marginBottom: 6 }}>Compare Wilayas</h1>
        <p style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>Side-by-side analysis with radar visualization</p>
      </div>

      {/* Selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <div style={{ fontSize: '0.65rem', color: 'var(--muted)', marginBottom: 6, fontWeight: 600, letterSpacing: '0.08em' }}>WILAYA A</div>
          <select
            value={idxA}
            onChange={e => setIdxA(Number(e.target.value))}
            style={{
              width: '100%', background: 'var(--bg2)', border: '1px solid rgba(0,200,81,0.3)',
              color: '#fff', borderRadius: 10, padding: '9px 12px', fontSize: '0.88rem',
              fontFamily: 'DM Sans, sans-serif', outline: 'none', cursor: 'pointer',
            }}
          >
            {wilayas.map((w, i) => <option key={i} value={i} style={{ background: '#0d1b2a' }}>{w.name}</option>)}
          </select>
        </div>

        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: 'var(--muted)', textAlign: 'center' }}>VS</div>

        <div>
          <div style={{ fontSize: '0.65rem', color: 'var(--muted)', marginBottom: 6, fontWeight: 600, letterSpacing: '0.08em' }}>WILAYA B</div>
          <select
            value={idxB}
            onChange={e => setIdxB(Number(e.target.value))}
            style={{
              width: '100%', background: 'var(--bg2)', border: '1px solid rgba(255,187,51,0.3)',
              color: '#fff', borderRadius: 10, padding: '9px 12px', fontSize: '0.88rem',
              fontFamily: 'DM Sans, sans-serif', outline: 'none', cursor: 'pointer',
            }}
          >
            {wilayas.map((w, i) => <option key={i} value={i} style={{ background: '#0d1b2a' }}>{w.name}</option>)}
          </select>
        </div>
      </div>

      {/* Comparison layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: '2rem' }}>
        {/* Wilaya A card */}
        <motion.div key={`A-${idxA}`} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
          style={{ background: 'rgba(0,200,81,0.05)', border: '1px solid rgba(0,200,81,0.2)', borderRadius: 16, padding: '1.4rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', fontWeight: 700, color: colorA }}>{wA.name}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 2 }}>{wA.region} Algeria</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 700, color: colorA }}>{wA.score}</div>
              <div style={{ fontSize: '0.6rem', color: colorA, letterSpacing: '0.08em' }}>SCORE</div>
            </div>
          </div>
          {[['🏨', 'Hotels', wA.hotels], ['🏛️', 'Tourist Sites', wA.sites], ['⭐', 'Rating', wA.rating], ['🛣️', 'Accessibility', `${wA.accessibility}%`]].map(([icon, lbl, val]) => (
            <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--muted)' }}>{icon} {lbl}</span>
              <span style={{ fontWeight: 600, color: '#fff' }}>{val}</span>
            </div>
          ))}
        </motion.div>

        {/* Wilaya B card */}
        <motion.div key={`B-${idxB}`} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
          style={{ background: 'rgba(255,187,51,0.05)', border: '1px solid rgba(255,187,51,0.2)', borderRadius: 16, padding: '1.4rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', fontWeight: 700, color: colorB }}>{wB.name}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 2 }}>{wB.region} Algeria</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 700, color: colorB }}>{wB.score}</div>
              <div style={{ fontSize: '0.6rem', color: colorB, letterSpacing: '0.08em' }}>SCORE</div>
            </div>
          </div>
          {[['🏨', 'Hotels', wB.hotels], ['🏛️', 'Tourist Sites', wB.sites], ['⭐', 'Rating', wB.rating], ['🛣️', 'Accessibility', `${wB.accessibility}%`]].map(([icon, lbl, val]) => (
            <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--muted)' }}>{icon} {lbl}</span>
              <span style={{ fontWeight: 600, color: '#fff' }}>{val}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Radar chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.4rem' }}
        >
          <div style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '1.2rem' }}>Radar Comparison</div>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name={wA.name} dataKey="A" stroke={colorA} fill={colorA} fillOpacity={0.15} strokeWidth={2} />
              <Radar name={wB.name} dataKey="B" stroke={colorB} fill={colorB} fillOpacity={0.15} strokeWidth={2} />
              <Legend formatter={v => <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{v}</span>} />
              <Tooltip
                content={({ active, payload }) => active && payload?.length ? (
                  <div style={{ background: 'rgba(13,27,42,0.95)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '8px 12px', fontSize: '0.75rem' }}>
                    {payload.map(p => <div key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</div>)}
                  </div>
                ) : null}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Metric bars */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.4rem' }}
        >
          <div style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '1.2rem' }}>Head-to-Head Metrics</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, fontSize: '0.72rem' }}>
            <span style={{ color: colorA, fontWeight: 700 }}>▌ {wA.name}</span>
            <span style={{ color: colorB, fontWeight: 700 }}>{wB.name} ▌</span>
          </div>
          <MetricRow label="Hotels" valA={wA.hotels} valB={wB.hotels} colorA={colorA} colorB={colorB} maxVal={312} />
          <MetricRow label="Tourist Sites" valA={wA.sites} valB={wB.sites} colorA={colorA} colorB={colorB} maxVal={420} />
          <MetricRow label="Rating" valA={wA.rating} valB={wB.rating} colorA={colorA} colorB={colorB} maxVal={5} />
          <MetricRow label="Accessibility" valA={`${wA.accessibility}%`} valB={`${wB.accessibility}%`} colorA={colorA} colorB={colorB} maxVal={100} />
          <MetricRow label="Tourism Score" valA={wA.score} valB={wB.score} colorA={colorA} colorB={colorB} maxVal={100} />

          <div style={{ marginTop: 16, padding: '10px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, fontSize: '0.78rem', color: 'var(--muted)' }}>
            {wA.score > wB.score
              ? <><span style={{ color: colorA, fontWeight: 700 }}>{wA.name}</span> leads with a {(wA.score - wB.score).toFixed(1)}-point advantage overall.</>
              : wB.score > wA.score
                ? <><span style={{ color: colorB, fontWeight: 700 }}>{wB.name}</span> leads with a {(wB.score - wA.score).toFixed(1)}-point advantage overall.</>
                : 'Both wilayas are evenly matched in tourism performance.'
            }
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
