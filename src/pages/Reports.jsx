import { useState } from 'react'
import { motion } from 'framer-motion'
import { getAllWilayas, getKPIs } from '../services/analyticsService'
import { generateInsights } from '../services/aiService'
import { getScoreColor } from '../services/geoService'

const wilayas = getAllWilayas()
const kpis = getKPIs()

export default function Reports() {
  const [selectedWilaya, setSelectedWilaya] = useState(wilayas[0])
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  function generateReport() {
    setGenerating(true)
    setGenerated(false)
    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
      // In real implementation, use jsPDF or html2pdf to export
      const printContent = document.getElementById('report-preview')
      if (printContent) {
        window.print()
      }
    }, 1800)
  }

  const insights = generateInsights(selectedWilaya)
  const scoreColor = getScoreColor(selectedWilaya.score)

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ padding: '2rem 1.5rem', maxWidth: 1100, margin: '0 auto' }}
    >
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', color: '#00c851', textTransform: 'uppercase', marginBottom: 6 }}>Export & Documentation</div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, marginBottom: 6 }}>Report Generator</h1>
        <p style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>Generate detailed tourism reports for individual wilayas</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
        {/* Controls */}
        <div>
          <div style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.2rem', marginBottom: 14 }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Select Wilaya</div>
            <div style={{ maxHeight: 320, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
              {wilayas.map(w => (
                <button
                  key={w.id}
                  onClick={() => { setSelectedWilaya(w); setGenerated(false) }}
                  style={{
                    background: selectedWilaya.id === w.id ? 'rgba(0,200,81,0.12)' : 'transparent',
                    border: `1px solid ${selectedWilaya.id === w.id ? 'rgba(0,200,81,0.3)' : 'transparent'}`,
                    color: selectedWilaya.id === w.id ? '#fff' : 'var(--muted)',
                    borderRadius: 8, padding: '7px 10px', textAlign: 'left',
                    fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.15s',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  {w.name}
                  <span style={{ fontSize: '0.65rem', color: getScoreColor(w.score) }}>{w.score}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={generateReport}
            disabled={generating}
            style={{
              width: '100%',
              background: generating ? 'rgba(0,200,81,0.3)' : 'linear-gradient(135deg, #00c851, #009938)',
              color: '#fff', border: 'none', borderRadius: 12,
              padding: '12px', fontSize: '0.88rem', fontWeight: 700,
              cursor: generating ? 'wait' : 'pointer', fontFamily: 'DM Sans, sans-serif',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            {generating ? (
              <>
                <span style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.9s linear infinite', display: 'inline-block' }} />
                Generating...
              </>
            ) : '📄 Generate Report'}
          </motion.button>

          {generated && (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: 10, padding: '8px 12px', background: 'rgba(0,200,81,0.1)', border: '1px solid rgba(0,200,81,0.25)', borderRadius: 10, fontSize: '0.75rem', color: '#00c851', textAlign: 'center' }}
            >
              ✓ Report ready — use browser print to export PDF
            </motion.div>
          )}
        </div>

        {/* Report preview */}
        <div id="report-preview" style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 20, padding: '2rem', position: 'relative', overflow: 'hidden' }}>
          {/* Report header */}
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1.2rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#00c851', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>STAA · Official Tourism Report</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 700 }}>{selectedWilaya.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: 2 }}>Wilaya Tourism Intelligence Report · {new Date().getFullYear()}</div>
              </div>
              <div style={{ textAlign: 'center', background: `${scoreColor}18`, border: `1px solid ${scoreColor}40`, borderRadius: 14, padding: '12px 18px' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 700, color: scoreColor, lineHeight: 1 }}>{selectedWilaya.score}</div>
                <div style={{ fontSize: '0.6rem', color: scoreColor, letterSpacing: '0.1em', marginTop: 2 }}>TOURISM SCORE</div>
              </div>
            </div>
          </div>

          {/* KPI grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: '1.5rem' }}>
            {[
              { icon: '🏨', label: 'Hotels', value: selectedWilaya.hotels },
              { icon: '🏛️', label: 'Tourist Sites', value: selectedWilaya.sites },
              { icon: '⭐', label: 'Avg Rating', value: selectedWilaya.rating },
              { icon: '🛣️', label: 'Accessibility', value: `${selectedWilaya.accessibility}%` },
            ].map(kpi => (
              <div key={kpi.label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '0.85rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: 4 }}>{kpi.icon}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>{kpi.value}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--muted)', marginTop: 2 }}>{kpi.label}</div>
              </div>
            ))}
          </div>

          {/* Tourism types */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Tourism Categories</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {selectedWilaya.types.map(type => (
                <span key={type} style={{ background: 'rgba(0,200,81,0.1)', border: '1px solid rgba(0,200,81,0.25)', color: '#00c851', padding: '3px 10px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 600 }}>
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* AI Insights in report */}
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>AI Analysis & Recommendations</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {insights.map((ins, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '9px 12px' }}>
                  <span style={{ fontSize: '1rem', flexShrink: 0 }}>{ins.icon}</span>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>{ins.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Report footer */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--dim)' }}>
            <span>STAA Platform · Smart Tourism Analytics Algeria</span>
            <span>Generated: {new Date().toLocaleDateString('en-GB')}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
