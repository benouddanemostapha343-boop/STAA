import { useEffect, useRef, useState } from 'react'
import { loadAlgeriaGeoJSON, getScoreColor, calcTourismScore } from '../services/geoService'
import { buildPopupHTML } from './TourismPopup'
import { getAllWilayas } from '../services/analyticsService'
import Loader from './Loader'

export default function AlgeriaMap({ filter = 'All', region = 'All' }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const geoLayerRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('Initializing map...')

  useEffect(() => {
    let L
    let map

    async function initMap() {
      if (mapInstanceRef.current) return
      L = (await import('leaflet')).default

      if (!mapRef.current) return
      setStatus('Loading Leaflet...')

      map = L.map(mapRef.current, {
        center: [28.0, 2.5],
        zoom: 5,
        zoomControl: true,
        attributionControl: false,
      })
      mapInstanceRef.current = map

      // Tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        opacity: 0.3,
      }).addTo(map)

      setStatus('Loading GeoJSON data...')

      // Try to load real GeoJSON
      const geojson = await loadAlgeriaGeoJSON()
      const wilayas = getAllWilayas()
      const wilayaMap = {}
      wilayas.forEach(w => { wilayaMap[w.name.toLowerCase()] = w })

      if (geojson) {
        setStatus('Rendering wilaya boundaries...')
        const layer = L.geoJSON(geojson, {
          style: (feature) => {
            const props = feature.properties || {}
            const name = (props.name || props.NAME || '').toLowerCase()
            const w = wilayaMap[name] || {}
            const score = calcTourismScore(w)
            const color = getScoreColor(score || 50)
            return {
              fillColor: color,
              fillOpacity: 0.25,
              color: color,
              weight: 1.5,
              opacity: 0.7,
            }
          },
          onEachFeature: (feature, layer) => {
            const props = feature.properties || {}
            const name = (props.name || props.NAME || '').toLowerCase()
            const wData = wilayaMap[name] || {}
            const enriched = { ...props, ...wData }

            layer.on('click', () => {
              const popup = L.popup({ maxWidth: 280, className: 'staa-popup' })
                .setLatLng(layer.getBounds().getCenter())
                .setContent(buildPopupHTML(enriched))
                .openOn(map)
            })

            layer.on('mouseover', () => {
              layer.setStyle({ fillOpacity: 0.5, weight: 2.5 })
            })
            layer.on('mouseout', () => {
              layer.setStyle({ fillOpacity: 0.25, weight: 1.5 })
            })
          },
        }).addTo(map)
        geoLayerRef.current = layer
        setStatus('Algeria GeoJSON loaded ✓')
      } else {
        // Fallback: Show markers for known wilayas
        setStatus('GeoJSON not found — showing markers')
        const coords = {
          'Alger': [36.74, 3.06], 'Oran': [35.69, -0.64], 'Constantine': [36.36, 6.61],
          'Annaba': [36.9, 7.77], 'Tlemcen': [34.87, -1.32], 'Tamanrasset': [22.78, 5.52],
          'Ghardaïa': [32.49, 3.67], 'Béjaïa': [36.75, 5.08], 'Tizi Ouzou': [36.72, 4.05],
          'Sétif': [36.19, 5.41], 'Biskra': [34.85, 5.73], 'Batna': [35.56, 6.18],
          'Blida': [36.47, 2.83], 'Médéa': [36.26, 2.75], 'Mostaganem': [35.93, 0.09],
          'Ouargla': [31.95, 5.32], 'Adrar': [27.87, -0.29], 'Djelfa': [34.67, 3.26],
          'Skikda': [36.87, 6.9], 'Jijel': [36.82, 5.77],
        }
        wilayas.forEach(w => {
          const coord = coords[w.name]
          if (!coord) return
          const color = getScoreColor(w.score)
          const marker = L.circleMarker(coord, {
            radius: 8 + (w.score / 20),
            fillColor: color,
            color: color,
            fillOpacity: 0.7,
            weight: 2,
          }).addTo(map)
          marker.on('click', () => {
            L.popup({ maxWidth: 280 })
              .setLatLng(coord)
              .setContent(buildPopupHTML(w))
              .openOn(map)
          })
          marker.bindTooltip(w.name, { permanent: false, className: 'staa-tooltip' })
        })
      }

      setLoading(false)
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {loading && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', background: 'rgba(7,17,29,0.85)',
          backdropFilter: 'blur(8px)',
        }}>
          <Loader text={status} />
        </div>
      )}
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

      {/* Legend */}
      <div style={{
        position: 'absolute', bottom: 16, left: 16, zIndex: 400,
        background: 'rgba(7,17,29,0.9)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 12, padding: '10px 14px', backdropFilter: 'blur(12px)',
      }}>
        <div style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Tourism Score</div>
        {[
          ['#00c851', '≥ 80', 'Excellent'],
          ['#ffbb33', '≥ 65', 'Good'],
          ['#ff8800', '≥ 50', 'Moderate'],
          ['#ff4444', '< 50', 'Developing'],
        ].map(([color, range, label]) => (
          <div key={range} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }} />
            <div style={{ fontSize: '0.7rem' }}>
              <span style={{ color: '#fff', fontWeight: 600 }}>{range}</span>
              <span style={{ color: 'var(--muted)', marginLeft: 4 }}>{label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div style={{
        position: 'absolute', bottom: 16, right: 16, zIndex: 400,
        background: 'rgba(7,17,29,0.9)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 8, padding: '5px 12px', backdropFilter: 'blur(12px)',
        fontSize: '0.68rem', color: 'var(--muted)',
      }}>
        <span style={{ color: '#00c851', fontWeight: 600 }}>● </span>
        OpenStreetMap · QGIS Data
      </div>
    </div>
  )
}
