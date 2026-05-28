import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import StatsCard from '../components/StatsCard'
import ChartPanel from '../components/ChartPanel'
import { getKPIs, getMonthlyTourists, getTopWilayas, getHotelDistribution, getRegionDistribution } from '../services/analyticsService'

const kpis = getKPIs()
const monthly = getMonthlyTourists()
const topWilayas = getTopWilayas(8)
const hotels = getHotelDistribution()
const regions = getRegionDistribution()

const COLORS = ['#00c851', '#ffbb33', '#00a8e0', '#ff6b6b', '#a855f7']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'rgba(13,27,42,0.95)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '8px 12px', fontSize: '0.78rem' }}>
      <div style={{ color: 'var(--muted)', marginBottom: 4 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color, fontWeight: 600 }}>{p.name}: {typeof p.value === 'number' && p.value > 999 ? (p.value / 1000).toFixed(0) + 'K' : p.value}</div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ padding: '2rem 1.5rem', maxWidth: 1200, margin: '0 auto' }}
    >
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', color: '#00c851', textTransform: 'uppercase', marginBottom: 6 }}>Analytics Command Center</div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, marginBottom: 6 }}>Tourism Dashboard</h1>
        <p style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>National KPIs · Real-time tourism intelligence for Algeria</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: '1.8rem' }}>
        <StatsCard label="Total Wilayas" value={kpis.totalWilayas} sub="Full national coverage" color="#00c851" icon="◎" delay={0} />
        <StatsCard label="Total Hotels" value={kpis.totalHotels.toLocaleString()} sub="Registered accommodation" color="#ffbb33" icon="🏨" delay={0.06} />
        <StatsCard label="Tourist Sites" value={kpis.totalSites.toLocaleString()} sub="Mapped & categorized" color="#00c851" icon="🏛️" delay={0.12} />
        <StatsCard label="Avg Tourism Score" value={kpis.avgScore} sub="National index" color="#ffbb33" icon="◆" delay={0.18} />
      </div>

      {/* Top Performers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: '1.8rem' }}>
        {[
          { label: '🏆 Top Wilaya', val: kpis.topWilaya?.name, sub: `Score: ${kpis.topWilaya?.score}` },
          { label: '🏨 Most Hotels', val: kpis.mostHotels?.name, sub: `${kpis.mostHotels?.hotels} hotels` },
          { label: '⭐ Highest Rated', val: kpis.highestRating?.name, sub: `${kpis.highestRating?.rating} / 5.0` },
          { label: '🏛️ Most Sites', val: kpis.mostSites?.name, sub: `${kpis.mostSites?.sites} sites` },
        ].map((card, i) => (
          <motion.div key={card.label}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06 }}
            style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 14, padding: '1rem 1.1rem' }}
          >
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginBottom: 5 }}>{card.label}</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{card.val}</div>
            <div style={{ fontSize: '0.72rem', color: '#00c851', marginTop: 3 }}>{card.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <ChartPanel title="Monthly Tourist Arrivals" subtitle="2024 national data (thousands)" delay={0.3}>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthly}>
              <defs>
                <linearGradient id="tourGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00c851" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00c851" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="tourists" name="Tourists" stroke="#00c851" strokeWidth={2} fill="url(#tourGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Top Wilayas by Tourism Score" subtitle="Score index out of 100" delay={0.35}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topWilayas} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <YAxis type="category" dataKey="name" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" name="Score" radius={[0, 4, 4, 0]}>
                {topWilayas.map((w, i) => (
                  <Cell key={i} fill={w.score >= 80 ? '#00c851' : w.score >= 65 ? '#ffbb33' : '#ff8800'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      {/* Charts row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <ChartPanel title="Hotel Distribution" subtitle="Top wilayas by hotel count" delay={0.4}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={hotels}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="hotels" name="Hotels" fill="#ffbb33" radius={[4, 4, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Regional Distribution" subtitle="Wilayas by geographic region" delay={0.45}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={regions} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" nameKey="name" paddingAngle={3}>
                {regions.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={v => <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>
    </motion.div>
  )
}
