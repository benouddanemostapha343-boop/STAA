import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateTripPlan } from '../services/aiService'

const tripTypes = ['Desert', 'History', 'Beach', 'Adventure', 'Culture']
const dayOptions = [3, 5, 7]

const budgetColors = { Low: '#60a5fa', Medium: '#ffbb33', High: '#00c851' }
const budgetLabels = { Low: 'Economy', Medium: 'Standard', High: 'Premium' }
const typeIcons = { Desert: '🏜️', History: '🏛️', Beach: '🏖️', Adventure: '⛰️', Culture: '🎭' }

function getBudgetLevel(dailyBudget) {
  if (dailyBudget < 15000) return 'Low'
  if (dailyBudget < 40000) return 'Medium'
  return 'High'
}

function formatDzd(amount) {
  return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(amount))} DZD`
}

export default function AIPlanner() {
  const [tripType, setTripType] = useState('Desert')
  const [days, setDays] = useState(5)
  const [budgetAmount, setBudgetAmount] = useState('150000')
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const numericBudget = Number(budgetAmount)
  const budgetIsValid = Number.isSafeInteger(numericBudget) && numericBudget >= 1000 && numericBudget <= 100000000
  const dailyBudget = budgetIsValid ? numericBudget / days : 0
  const budgetLevel = getBudgetLevel(dailyBudget)

  function generate() {
    if (!budgetIsValid) return

    setLoading(true)
    setPlan(null)
    setTimeout(() => {
      const result = generateTripPlan(tripType, days, budgetLevel)
      setPlan({
        itinerary: result,
        tripType,
        days,
        budgetAmount: numericBudget,
        dailyBudget,
        budgetLevel,
      })
      setLoading(false)
    }, 1200)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ padding: '2rem 1.5rem', maxWidth: 1000, margin: '0 auto' }}
    >
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', color: '#00c851', textTransform: 'uppercase', marginBottom: 6 }}>Local planning assistant</div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, marginBottom: 6 }}>Trip Planner</h1>
        <p style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>Build a sample Algerian itinerary from built-in destination and activity templates</p>
      </div>

      {/* Config panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 20, padding: '2rem', marginBottom: '2rem' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {/* Trip type */}
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--dim)', textTransform: 'uppercase', marginBottom: 12 }}>Journey Type</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {tripTypes.map(type => (
                <motion.button
                  key={type}
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                  onClick={() => {
                    setTripType(type)
                    setPlan(null)
                  }}
                  style={{
                    background: tripType === type ? 'rgba(0,200,81,0.12)' : 'var(--glass)',
                    border: `1px solid ${tripType === type ? 'rgba(0,200,81,0.4)' : 'var(--border)'}`,
                    color: tripType === type ? '#fff' : 'var(--muted)',
                    borderRadius: 10, padding: '9px 14px', textAlign: 'left',
                    fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.18s',
                    display: 'flex', alignItems: 'center', gap: 10,
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{typeIcons[type]}</span>
                  {type}
                  {tripType === type && <span style={{ marginLeft: 'auto', color: '#00c851', fontSize: '0.75rem' }}>✓</span>}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Days */}
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--dim)', textTransform: 'uppercase', marginBottom: 12 }}>Duration</div>
            <div style={{ display: 'flex', gap: 10, marginBottom: '2rem' }}>
              {dayOptions.map(d => (
                <motion.button
                  key={d}
                  whileTap={{ scale: 0.95 }}
                  disabled={loading}
                  onClick={() => {
                    setDays(d)
                    setPlan(null)
                  }}
                  style={{
                    flex: 1,
                    background: days === d ? 'rgba(0,200,81,0.12)' : 'var(--glass)',
                    border: `1px solid ${days === d ? 'rgba(0,200,81,0.4)' : 'var(--border)'}`,
                    color: days === d ? '#00c851' : 'var(--muted)',
                    borderRadius: 10, padding: '14px 8px', textAlign: 'center',
                    cursor: 'pointer', transition: 'all 0.18s',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: 700 }}>{d}</div>
                  <div style={{ fontSize: '0.65rem', marginTop: 2 }}>days</div>
                </motion.button>
              ))}
            </div>

            {/* Budget */}
            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--dim)', textTransform: 'uppercase', marginBottom: 12 }}>Trip Budget</div>
            <label htmlFor="trip-budget" style={{ display: 'block', fontSize: '0.78rem', color: 'var(--muted)', marginBottom: 7 }}>
              Total per traveler · Algerian dinars (DZD)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="trip-budget"
                type="number"
                min="1000"
                max="100000000"
                step="1"
                inputMode="numeric"
                value={budgetAmount}
                disabled={loading}
                aria-invalid={!budgetIsValid}
                aria-describedby="budget-guidance"
                onChange={event => {
                  setBudgetAmount(event.target.value)
                  setPlan(null)
                }}
                style={{
                  width: '100%', background: 'var(--bg2)', border: `1px solid ${budgetIsValid ? 'var(--border)' : '#ff6b6b'}`,
                  color: '#fff', borderRadius: 10, padding: '12px 54px 12px 14px',
                  fontSize: '1rem', fontWeight: 700, fontFamily: 'DM Sans, sans-serif',
                  outline: 'none',
                }}
              />
              <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: '0.78rem', pointerEvents: 'none' }}>DZD</span>
            </div>
            <div id="budget-guidance" style={{ marginTop: 9, padding: '9px 11px', borderRadius: 9, background: `${budgetColors[budgetLevel]}12`, border: `1px solid ${budgetColors[budgetLevel]}35` }}>
              {budgetIsValid ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: '0.76rem' }}>
                    <span style={{ color: budgetColors[budgetLevel], fontWeight: 700 }}>{budgetLabels[budgetLevel]} plan</span>
                    <span style={{ color: '#fff' }}>{formatDzd(dailyBudget)} / day</span>
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--muted)', lineHeight: 1.5, marginTop: 5 }}>
                    Planning tiers: under 15,000 DZD/day · 15,000–39,999 DZD/day · 40,000+ DZD/day.
                  </div>
                  <div style={{ fontSize: '0.66rem', color: 'var(--dim)', lineHeight: 1.5, marginTop: 3 }}>
                    These ranges choose template options; they are not live prices or quotations.
                  </div>
                </>
              ) : (
                <div role="alert" style={{ color: '#ff8888', fontSize: '0.72rem' }}>
                  Enter a whole amount from 1,000 to 100,000,000 DZD.
                </div>
              )}
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
          onClick={generate}
          disabled={loading || !budgetIsValid}
          style={{
            width: '100%', marginTop: '1.5rem',
            background: loading || !budgetIsValid ? 'rgba(0,200,81,0.3)' : 'linear-gradient(135deg, #00c851, #009938)',
            color: '#fff', border: 'none', borderRadius: 12,
            padding: '13px', fontSize: '0.9rem', fontWeight: 700,
            cursor: loading ? 'wait' : !budgetIsValid ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans, sans-serif',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0 0 20px rgba(0,200,81,0.25)',
          }}
        >
          {loading ? (
            <>
              <span style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.9s linear infinite', display: 'inline-block' }} />
              Generating your personalized itinerary...
            </>
          ) : '✦ Generate My Custom Itinerary'}
        </motion.button>
      </motion.div>

      {/* Generated plan */}
      <AnimatePresence>
        {plan && (
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 20, padding: '1.8rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', fontWeight: 700 }}>
                  {typeIcons[plan.tripType]} {plan.tripType} Journey · {plan.days} Days
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 3 }}>
                  {formatDzd(plan.budgetAmount)} total · {formatDzd(plan.dailyBudget)} per day · {budgetLabels[plan.budgetLevel]} plan
                </div>
              </div>
              <div style={{ background: 'rgba(0,200,81,0.1)', border: '1px solid rgba(0,200,81,0.25)', borderRadius: 20, padding: '4px 12px', fontSize: '0.65rem', color: '#00c851', fontWeight: 700 }}>
                ✦ Template generated
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {plan.itinerary.map((day, i) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                  style={{
                    display: 'grid', gridTemplateColumns: '60px 1fr',
                    background: 'rgba(255,255,255,0.04)', borderRadius: 12,
                    overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div style={{
                    background: i === 0 ? 'rgba(0,200,81,0.15)' : 'rgba(255,255,255,0.04)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    padding: '1rem 0.5rem', borderRight: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <div style={{ fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.06em', marginBottom: 2 }}>DAY</div>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, color: i === 0 ? '#00c851' : '#fff' }}>{day.day}</div>
                  </div>
                  <div style={{ padding: '0.9rem 1.2rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff', marginBottom: 3 }}>{day.destination}</div>
                    <div style={{ fontSize: '0.78rem', color: '#00c851', marginBottom: 5 }}>{day.activity}</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.68rem', color: 'var(--muted)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4 }}>🏨 {day.accommodation}</span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--muted)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4 }}>🍽️ {day.meals}</span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--muted)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4 }}>🎯 Daily budget: {formatDzd(plan.dailyBudget)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ marginTop: '1.2rem', padding: '10px 14px', background: 'rgba(0,200,81,0.06)', border: '1px solid rgba(0,200,81,0.2)', borderRadius: 10, fontSize: '0.75rem', color: 'var(--muted)' }}>
              This sample itinerary uses built-in templates; it is not generated by an AI service or live tourism data.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
