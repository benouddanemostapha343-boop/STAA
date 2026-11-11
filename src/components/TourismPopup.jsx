import { calcTourismScore, getScoreColor, getScoreLabel } from '../services/geoService'
import { generateInsights } from '../services/aiService'

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character])
}

function metricValue(value) {
  if (value === undefined || value === null || value === '') return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export function buildPopupHTML(props) {
  const wilaya = {
    name: props.name || props.NAME || props.wilaya || 'Unknown',
    hotels: metricValue(props.hotels ?? props.Hotels),
    sites: metricValue(props.sites ?? props.Sites),
    rating: metricValue(props.rating ?? props.Rating),
    accessibility: metricValue(props.accessibility ?? props.Accessibility),
  }
  const hasMetrics = [wilaya.hotels, wilaya.sites, wilaya.rating, wilaya.accessibility]
    .every(value => value !== null)
  const score = hasMetrics ? calcTourismScore(wilaya) : null
  const color = score === null ? '#9aa5b1' : getScoreColor(score)
  const label = score === null ? 'No data' : getScoreLabel(score)
  const insights = score === null ? [] : generateInsights({ ...wilaya, score })

  const insightHTML = insights.slice(0, 2).map(i =>
    `<div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:7px 9px;margin-top:6px;font-size:11px;color:rgba(255,255,255,0.75);display:flex;gap:7px;align-items:flex-start;">
      <span>${escapeHtml(i.icon)}</span><span>${escapeHtml(i.text)}</span>
    </div>`
  ).join('')

  const displayMetric = value => value === null ? 'N/A' : value
  const displayName = escapeHtml(wilaya.name)

  return `
    <div style="min-width:220px;font-family:'DM Sans',sans-serif;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
        <div>
          <div style="font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:#fff;">${displayName}</div>
          <div style="font-size:0.68rem;color:rgba(255,255,255,0.4);margin-top:2px;">Wilaya · Algeria</div>
        </div>
        <div style="background:${color}20;border:1px solid ${color}50;border-radius:8px;padding:4px 10px;text-align:center;">
          <div style="font-size:1.1rem;font-weight:700;color:${color};font-family:'Playfair Display',serif;">${score ?? '—'}</div>
          <div style="font-size:0.58rem;color:${color};letter-spacing:0.05em;">${escapeHtml(label.toUpperCase())}</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px;">
        ${[
          ['🏨', displayMetric(wilaya.hotels), 'Hotels'],
          ['🏛️', displayMetric(wilaya.sites), 'Sites'],
          ['⭐', wilaya.rating === null ? 'N/A' : wilaya.rating.toFixed(1), 'Rating'],
          ['🛣️', wilaya.accessibility === null ? 'N/A' : `${wilaya.accessibility}%`, 'Access'],
        ].map(([icon, val, lbl]) => `
          <div style="background:rgba(255,255,255,0.05);border-radius:7px;padding:6px 8px;">
            <div style="font-size:0.78rem;font-weight:600;color:#fff;">${escapeHtml(icon)} ${escapeHtml(val)}</div>
            <div style="font-size:0.62rem;color:rgba(255,255,255,0.4);">${lbl}</div>
          </div>
        `).join('')}
      </div>
      ${insights.length ? `<div style="font-size:0.65rem;color:rgba(255,255,255,0.35);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px;">Rule-based insights</div>${insightHTML}` : '<div style="font-size:0.7rem;color:rgba(255,255,255,0.5);">Tourism metrics are not available for this area.</div>'}
      <a href="/analysis" style="display:block;margin-top:10px;background:linear-gradient(135deg,#00c851,#009938);color:#fff;border:none;padding:7px;border-radius:8px;font-size:0.78rem;font-weight:600;text-align:center;text-decoration:none;">
        View Full Analysis →
      </a>
    </div>
  `
}
