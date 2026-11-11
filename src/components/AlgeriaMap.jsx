import { useEffect, useRef, useState } from 'react'
import { loadAlgeriaGeoJSON, getScoreColor, calcTourismScore } from '../services/geoService'
import { buildPopupHTML } from './TourismPopup'
import { getAllWilayas } from '../services/analyticsService'
import Loader from './Loader'

const markerCoordinates = {
  Alger: [36.74, 3.06], Oran: [35.69, -0.64], Constantine: [36.36, 6.61],
  Annaba: [36.9, 7.77], Tlemcen: [34.87, -1.32], Tamanrasset: [22.78, 5.52],
  'Ghardaïa': [32.49, 3.67], 'Béjaïa': [36.75, 5.08], 'Tizi Ouzou': [36.72, 4.05],
  'Sétif': [36.19, 5.41], Biskra: [34.85, 5.73], Batna: [35.56, 6.18],
  Blida: [36.47, 2.83], 'Médéa': [36.26, 2.75], Mostaganem: [35.93, 0.09],
  Ouargla: [31.95, 5.32], Adrar: [27.87, -0.29], Djelfa: [34.67, 3.26],
  Skikda: [36.87, 6.9], Jijel: [36.82, 5.77],
}

function matchesFilters(wilaya, properties, filter, region) {
  const wilayaTypes = wilaya?.types || properties.types || []
  const hasCategory = filter === 'All' || (
    filter === 'Hotels'
      ? Number(wilaya?.hotels ?? properties.hotels ?? properties.Hotels) > 0
      : wilayaTypes.includes(filter)
  )
  const wilayaRegion = wilaya?.region || properties.region
  return hasCategory && (region === 'All' || wilayaRegion === region)
}

export default function AlgeriaMap({ filter = 'All', region = 'All' }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const leafletRef = useRef(null)
  const geoJsonRef = useRef(null)
  const wilayasRef = useRef([])
  const visibleLayerRef = useRef(null)
  const geoLayerRef = useRef(null)
  const markerLayerRef = useRef(null)
  const labelVisibilityHandlerRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [mapReady, setMapReady] = useState(false)
  const [status, setStatus] = useState('Initializing map...')

  useEffect(() => {
    let cancelled = false

    async function initMap() {
      try {
        const L = (await import('leaflet')).default
        if (cancelled || !mapRef.current) return

        setStatus('Loading map...')
        const map = L.map(mapRef.current, {
          center: [28.0, 2.5],
          zoom: 5,
          zoomControl: true,
          attributionControl: false,
        })
        mapInstanceRef.current = map
        leafletRef.current = L

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          opacity: 0.3,
        }).addTo(map)

        setStatus('Loading sample boundaries...')
        const [geojson, wilayas] = await Promise.all([
          loadAlgeriaGeoJSON(),
          getAllWilayas(),
        ])
        if (cancelled) return

        geoJsonRef.current = geojson
        wilayasRef.current = wilayas
        const bounds = geojson
          ? L.geoJSON(geojson).getBounds()
          : L.latLngBounds(Object.values(markerCoordinates))
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [32, 32], maxZoom: 5 })
        }
        setMapReady(true)
      } catch (error) {
        if (!cancelled) {
          setStatus(`Map could not be loaded: ${error.message}`)
          setLoading(false)
        }
      }
    }

    initMap()

    return () => {
      cancelled = true
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
      leafletRef.current = null
      visibleLayerRef.current = null
      geoLayerRef.current = null
      markerLayerRef.current = null
      labelVisibilityHandlerRef.current = null
    }
  }, [])

  useEffect(() => {
    const L = leafletRef.current
    const map = mapInstanceRef.current
    if (!mapReady || !L || !map) return

    const wilayas = wilayasRef.current
    const wilayaMap = new Map(wilayas.map(wilaya => [wilaya.name.toLocaleLowerCase(), wilaya]))
    map.closePopup()
    if (labelVisibilityHandlerRef.current) {
      map.off('zoomend', labelVisibilityHandlerRef.current)
      labelVisibilityHandlerRef.current = null
    }
    geoLayerRef.current?.remove()
    markerLayerRef.current?.remove()
    visibleLayerRef.current = null

    const geojson = geoJsonRef.current
    if (geojson) {
      const features = geojson.features.filter(feature => {
        const properties = feature.properties || {}
        const name = (properties.name || properties.NAME || '').toLocaleLowerCase()
        return matchesFilters(wilayaMap.get(name), properties, filter, region)
      })
      const filteredGeojson = { ...geojson, features }

      const updateLabelVisibility = () => {
        const visible = map.getZoom() >= 7 ? 0.95 : 0
        geoLayerRef.current?.eachLayer(layer => layer.getTooltip()?.setOpacity(visible))
      }

      geoLayerRef.current = L.geoJSON(filteredGeojson, {
        style: feature => {
          const properties = feature.properties || {}
          const name = (properties.name || properties.NAME || '').toLocaleLowerCase()
          const wilaya = wilayaMap.get(name)
          const metrics = wilaya || {
            hotels: properties.hotels ?? properties.Hotels,
            sites: properties.sites ?? properties.Sites,
            rating: properties.rating ?? properties.Rating,
            accessibility: properties.accessibility ?? properties.Accessibility,
          }
          const hasScore = ['hotels', 'sites', 'rating', 'accessibility']
            .every(key => Number.isFinite(Number(metrics[key])))
          const color = hasScore ? getScoreColor(calcTourismScore(metrics)) : '#718096'
          return {
            fillColor: color,
            fillOpacity: hasScore ? 0.36 : 0.16,
            color: hasScore ? '#e9f2f5' : '#9aa5b1',
            weight: hasScore ? 2 : 1.5,
            opacity: hasScore ? 0.9 : 0.65,
            dashArray: hasScore ? null : '4 5',
          }
        },
        onEachFeature: (feature, layer) => {
          const properties = feature.properties || {}
          const name = (properties.name || properties.NAME || '').toLocaleLowerCase()
          const displayName = properties.name || properties.NAME || 'Unknown area'
          const wilaya = wilayaMap.get(name)
          const enriched = {
            ...properties,
            ...wilaya,
            hotels: wilaya?.hotels ?? properties.hotels ?? properties.Hotels,
            sites: wilaya?.sites ?? properties.sites ?? properties.Sites,
            rating: wilaya?.rating ?? properties.rating ?? properties.Rating,
            accessibility: wilaya?.accessibility ?? properties.accessibility ?? properties.Accessibility,
          }

          layer.bindTooltip(displayName, {
            permanent: true,
            direction: 'center',
            className: 'wilaya-label',
            opacity: map.getZoom() >= 7 ? 0.95 : 0,
            interactive: false,
          })
          layer.on('click', () => {
            L.popup({ maxWidth: 280, className: 'staa-popup' })
              .setLatLng(layer.getBounds().getCenter())
              .setContent(buildPopupHTML(enriched))
              .openOn(map)
          })
          layer.on('mouseover', () => {
            layer.setStyle({ fillOpacity: 0.58, color: '#fff', weight: 3, opacity: 1 })
            layer.bringToFront()
          })
          layer.on('mouseout', () => geoLayerRef.current?.resetStyle(layer))
        },
      }).addTo(map)
      visibleLayerRef.current = geoLayerRef.current
      labelVisibilityHandlerRef.current = updateLabelVisibility
      map.on('zoomend', updateLabelVisibility)
      setStatus(features.length ? `${features.length} wilaya boundaries · zoom in for names` : 'No areas match these filters')
    } else {
      const markers = L.layerGroup()
      const matchingWilayas = wilayas
        .filter(wilaya => matchesFilters(wilaya, {}, filter, region))
      matchingWilayas.forEach(wilaya => {
        const coordinates = markerCoordinates[wilaya.name]
        if (!coordinates) return

        const color = getScoreColor(wilaya.score)
        const marker = L.circleMarker(coordinates, {
          radius: 8 + (wilaya.score / 20),
          fillColor: color,
          color,
          fillOpacity: 0.7,
          weight: 2,
        })
        marker.on('click', () => {
          L.popup({ maxWidth: 280 })
            .setLatLng(coordinates)
            .setContent(buildPopupHTML(wilaya))
            .openOn(map)
        })
        marker.bindTooltip(wilaya.name, { permanent: false, className: 'staa-tooltip' })
        markers.addLayer(marker)
      })
      markerLayerRef.current = markers.addTo(map)
      visibleLayerRef.current = markerLayerRef.current
      setStatus(matchingWilayas.length ? `${matchingWilayas.length} sample locations` : 'No matching sample locations')
    }

    setLoading(false)
  }, [filter, mapReady, region])

  function fitVisibleAreas() {
    const map = mapInstanceRef.current
    const layer = visibleLayerRef.current
    const bounds = layer?.getBounds()
    if (map && bounds?.isValid()) {
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 7, animate: true })
    }
  }

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
      {!loading && status.startsWith('Map could not be loaded:') && (
        <div role="alert" style={{
          position: 'absolute', inset: 0, zIndex: 10, display: 'grid', placeItems: 'center',
          padding: 24, background: 'rgba(7,17,29,0.95)', color: '#ff8888', textAlign: 'center',
        }}>
          {status}
        </div>
      )}
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

      <button
        type="button"
        onClick={fitVisibleAreas}
        disabled={
          !mapReady ||
          status.startsWith('Map could not be loaded:') ||
          status.startsWith('No areas match') ||
          status.startsWith('No matching sample locations')
        }
        style={{
          position: 'absolute', top: 16, right: 16, zIndex: 400,
          background: 'rgba(7,17,29,0.92)', border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 9, padding: '8px 12px', color: '#fff', cursor: 'pointer',
          font: '600 0.75rem "DM Sans", sans-serif', boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        }}
      >
        ⊙ Frame visible areas
      </button>

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
          ['#718096', '—', 'No sample data'],
        ].map(([color, range, label]) => (
          <div key={range} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }} />
            <div style={{ fontSize: '0.7rem' }}>
              <span style={{ color: '#fff', fontWeight: 600 }}>{range}</span>
              <span style={{ color: 'var(--muted)', marginLeft: 4 }}>{label}</span>
            </div>
          </div>
        ))}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 7, paddingTop: 7, maxWidth: 180, fontSize: '0.65rem', lineHeight: 1.5, color: 'var(--muted)' }}>
          Area names appear when zoomed in. Gray areas lack tourism sample data.
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 16, right: 16, zIndex: 400,
        background: 'rgba(7,17,29,0.9)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 8, padding: '5px 12px', backdropFilter: 'blur(12px)',
        fontSize: '0.68rem', color: 'var(--muted)',
      }}>
        {status} · © OpenStreetMap contributors
      </div>
    </div>
  )
}
