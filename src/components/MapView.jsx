import { MapContainer, TileLayer, GeoJSON, ZoomControl, Polyline, useMap } from 'react-leaflet'
import { useState, useEffect, useRef, useMemo, forwardRef, useImperativeHandle, useCallback } from 'react'
import DotMarker from './DotMarker'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

function MapResizer() {
  const map = useMap()
  useEffect(() => {
    const id = setTimeout(() => map.invalidateSize(), 200)
    const onResize = () => map.invalidateSize()
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(id)
      window.removeEventListener('resize', onResize)
    }
  }, [map])
  return null
}

function MapRefBridge({ onMap }) {
  const map = useMap()
  useEffect(() => { onMap(map) }, [map, onMap])
  return null
}

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
const INDIA_CENTER = [22.5, 78.0]
const DEFAULT_ZOOM = 5

const geoJsonCache = {}

async function loadGeoJSON(filename) {
  if (geoJsonCache[filename]) return geoJsonCache[filename]
  try {
    const res = await fetch(`/geojson/${filename}`)
    const data = await res.json()
    geoJsonCache[filename] = data
    return data
  } catch (err) {
    console.error(`Failed to load GeoJSON: ${filename}`, err)
    return null
  }
}

function useIncidentPolyline(incidents) {
  return useMemo(() => {
    if (!incidents?.length || incidents.length < 2) return null
    const sorted = [...incidents].sort((a, b) => b.lat - a.lat || a.lng - b.lng)
    const cap = Math.min(sorted.length, 22)
    return sorted.slice(0, cap).map((i) => [i.lat, i.lng])
  }, [incidents])
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

const TRANSITION_MS = 1600

function TerritoryLayer({ geojsonFile }) {
  const map = useMap()
  const currentLayerRef = useRef(null)
  const prevLayerRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!geojsonFile || !map) return

    let cancelled = false

    loadGeoJSON(geojsonFile).then((data) => {
      if (cancelled || !data) return

      if (rafRef.current) cancelAnimationFrame(rafRef.current)

      const newLayer = L.geoJSON(data, {
        style: () => ({
          fillColor: '#4d7568',
          fillOpacity: 0,
          color: '#8fd9c4',
          weight: 1.8,
          opacity: 0,
          className: 'map-territory-glow',
        }),
        interactive: false,
      })
      newLayer.addTo(map)

      const oldLayer = currentLayerRef.current
      if (prevLayerRef.current) {
        map.removeLayer(prevLayerRef.current)
        prevLayerRef.current = null
      }

      if (!oldLayer) {
        newLayer.setStyle({ fillOpacity: 0.35, opacity: 0.85 })
        currentLayerRef.current = newLayer
        return
      }

      prevLayerRef.current = oldLayer

      const FADE_IN_MS = 800
      const FADE_OUT_MS = 400
      const start = performance.now()
      let phase = 'fadeIn'

      function animate(now) {
        if (cancelled) return
        const elapsed = now - start

        if (phase === 'fadeIn') {
          const raw = Math.min(elapsed / FADE_IN_MS, 1)
          const t = easeInOutCubic(raw)

          oldLayer.setStyle({
            fillOpacity: 0.35,
            opacity: 0.85,
            color: '#8fd9c4',
            fillColor: '#4d7568',
            weight: 1.8,
          })

          newLayer.setStyle({
            fillOpacity: 0.35 * t,
            opacity: 0.85 * t,
            color: '#8fd9c4',
            fillColor: '#4d7568',
            weight: 1.8,
          })

          if (raw < 1) {
            rafRef.current = requestAnimationFrame(animate)
          } else {
            newLayer.setStyle({ fillOpacity: 0.35, opacity: 0.85 })
            phase = 'fadeOut'
            phaseStart = performance.now()
            rafRef.current = requestAnimationFrame(animateOut)
          }
        }
      }

      let phaseStart = 0

      function animateOut(now) {
        if (cancelled) return
        const elapsed = now - phaseStart
        const raw = Math.min(elapsed / FADE_OUT_MS, 1)
        const t = easeInOutCubic(raw)

        oldLayer.setStyle({
          fillOpacity: 0.35 * (1 - t),
          opacity: 0.85 * (1 - t),
          color: '#8fd9c4',
          fillColor: '#4d7568',
          weight: 1.8,
        })

        if (raw < 1) {
          rafRef.current = requestAnimationFrame(animateOut)
        } else {
          if (prevLayerRef.current) {
            map.removeLayer(prevLayerRef.current)
            prevLayerRef.current = null
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate)
      currentLayerRef.current = newLayer
    })

    return () => {
      cancelled = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [geojsonFile, map])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return null
}

const MapView = forwardRef(function MapView(
  { era, incidents = [], showBattlesOnly, onToggleBattles, tourMode },
  ref
) {
  const [tourGeoData, setTourGeoData] = useState(null)
  const [tourGeoKey, setTourGeoKey] = useState(0)
  const [tourGeoStyle, setTourGeoStyle] = useState('highlight')
  const mapInstanceRef = useRef(null)
  const linePositions = useIncidentPolyline(incidents)

  const handleMapRef = useCallback((map) => {
    mapInstanceRef.current = map
  }, [])

  useImperativeHandle(ref, () => ({
    flyTo(lat, lng, zoom, duration = 2000) {
      const map = mapInstanceRef.current
      if (map) map.flyTo([lat, lng], zoom, { duration: duration / 1000, easeLinearity: 0.25 })
    },

    async highlightRegion(geojsonFile) {
      const data = await loadGeoJSON(geojsonFile)
      if (data) {
        setTourGeoStyle('highlight')
        setTourGeoData(data)
        setTourGeoKey((k) => k + 1)
      }
    },

    async animateExpansion(geojsonFile) {
      const data = await loadGeoJSON(geojsonFile)
      if (data) {
        setTourGeoStyle('expansion')
        setTourGeoData(data)
        setTourGeoKey((k) => k + 1)
      }
    },

    clearOverlays() {
      setTourGeoData(null)
    },

    getMap() {
      return mapInstanceRef.current
    },
  }), [])

  const tourHighlightStyle = useMemo(() => ({
    fillColor: '#5ae4c0',
    fillOpacity: 0.3,
    color: '#7ee8d4',
    weight: 2.2,
    opacity: 0.9,
    className: 'map-territory-glow tour-territory-highlight',
  }), [])

  const tourExpansionStyle = useMemo(() => ({
    fillColor: '#5ae4c0',
    fillOpacity: 0,
    color: '#7ee8d4',
    weight: 2.5,
    opacity: 1,
    className: 'map-territory-glow tour-territory-expansion',
  }), [])

  return (
    <div className="map-wrapper">
      {!tourMode && (
        <button
          type="button"
          className={`map-layer-toggle ${showBattlesOnly ? 'active' : ''}`}
          onClick={onToggleBattles}
          title={showBattlesOnly ? 'Show all events' : 'Battles only'}
        >
          {showBattlesOnly ? 'All events' : 'Battles'}
        </button>
      )}

      <MapContainer
        center={INDIA_CENTER}
        zoom={DEFAULT_ZOOM}
        zoomControl={false}
        className="map-container"
        maxBounds={[[-10, 30], [50, 120]]}
        minZoom={3}
        maxZoom={10}
      >
        <MapResizer />
        <MapRefBridge onMap={handleMapRef} />
        <TileLayer url={TILE_URL} attribution="" />

        {!tourMode && <TerritoryLayer geojsonFile={era?.geojsonFile} />}

        {tourGeoData && (
          <GeoJSON
            key={`tour-${tourGeoKey}`}
            data={tourGeoData}
            style={() => tourGeoStyle === 'expansion' ? tourExpansionStyle : tourHighlightStyle}
            className={tourGeoStyle === 'expansion' ? 'tour-geo-expansion' : 'tour-geo-highlight'}
          />
        )}

        {!tourMode && linePositions && linePositions.length > 1 && (
          <Polyline
            positions={linePositions}
            pathOptions={{
              color: '#ffffff',
              weight: 1,
              opacity: 0.28,
              className: 'incident-connection-line',
            }}
          />
        )}

        {!tourMode && incidents.map((inc) => (
          <DotMarker key={inc.id} incident={inc} variant={showBattlesOnly ? 'battle' : 'default'} />
        ))}

        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  )
})

export default MapView
