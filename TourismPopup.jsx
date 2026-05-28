import { calcTourismScore, getScoreColor, getScoreLabel } from '../services/geoService'
import { generateInsights } from '../services/aiService'

export function buildPopupHTML(props) {
  const wilaya = {
    name: props.name || props.NAME || props.wilaya || 'Unknown',
    hotels: props.Hotels || props.hotels || Math.floor(Math.random() * 100 + 20),
    sites: props.sites || props.Sites || Math.floor(Math.random() * 200 + 50),
    rating: props.rating || props.Rating || (Math.random() * 1.5 + 3.5).toFixed(1),
    accessibility: props.accessibility || props.Accessibility || Math.floor(Math.random() * 50 + 40),
  }
  wilaya.score = calcTourismScore(wilaya)
  const color = getScoreColor(wilaya.score)
  const label = getScoreLabel(wilaya.score)
  const insights = generateInsights(wilaya)

  const insightHTML = insights.slice(0, 2).map(i =>
    `<div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:7px 9px;margin-top:6px;font-size:11px;color:rgba(255,255,255,0.75);display:flex;gap:7px;align-items:flex-start;">
      <span>${i.icon}</span><span>${i.text}</span>
    </div>`
  ).join('')

  return `
    <div style="min-width:220px;font-family:'DM Sans',sans-serif;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
        <div>
          <div style="font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:#fff;">${wilaya.name}</div>
          <div style="font-size:0.68rem;color:rgba(255,255,255,0.4);margin-top:2px;">Wilaya · Algeria</div>
        </div>
        <div style="background:${color}20;border:1px solid ${color}50;border-radius:8px;padding:4px 10px;text-align:center;">
          <div style="font-size:1.1rem;font-weight:700;color:${color};font-family:'Playfair Display',serif;">${wilaya.score}</div>
          <div style="font-size:0.58rem;color:${color};letter-spacing:0.05em;">${label.toUpperCase()}</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px;">
        ${[
          ['🏨', wilaya.hotels, 'Hotels'],
          ['🏛️', wilaya.sites, 'Sites'],
          ['⭐', Number(wilaya.rating).toFixed(1), 'Rating'],
          ['🛣️', `${wilaya.accessibility}%`, 'Access'],
        ].map(([icon, val, lbl]) => `
          <div style="background:rgba(255,255,255,0.05);border-radius:7px;padding:6px 8px;">
            <div style="font-size:0.78rem;font-weight:600;color:#fff;">${icon} ${val}</div>
            <div style="font-size:0.62rem;color:rgba(255,255,255,0.4);">${lbl}</div>
          </div>
        `).join('')}
      </div>
      <div style="font-size:0.65rem;color:rgba(255,255,255,0.35);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px;">AI Insights</div>
      ${insightHTML}
      <div style="margin-top:10px;background:linear-gradient(135deg,#00c851,#009938);color:#fff;border:none;padding:7px;border-radius:8px;font-size:0.78rem;font-weight:600;text-align:center;cursor:pointer;">
        View Full Analysis →
      </div>
    </div>
  `
}
