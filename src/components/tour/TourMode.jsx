import { useState, useEffect, useCallback, useRef } from 'react'
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet'
import { chapters } from '../../data/tourChapters'
import ChapterOverlay from './ChapterOverlay'
import StepNarrator from './StepNarrator'
import TourControls from './TourControls'
// Quiz removed per user request
import TourOutro from './TourOutro'
import ConquestArrow from './ConquestArrow'
import AchievementPopup from './AchievementPopup'
import 'leaflet/dist/leaflet.css'

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
const INDIA_CENTER = [22.5, 78.0]

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

function MapController({ mapAction, onMapReady }) {
  const map = useMap()

  useEffect(() => {
    onMapReady(map)
  }, [map, onMapReady])

  useEffect(() => {
    if (!mapAction || !map) return
    if (mapAction.type === 'flyTo') {
      map.flyTo([mapAction.lat, mapAction.lng], mapAction.zoom || 6, {
        duration: (mapAction.duration || 2000) / 1000,
        easeLinearity: 0.25,
      })
    }
  }, [map, mapAction])

  return null
}

function GeoJSONLayer({ geojsonFile, style }) {
  const [data, setData] = useState(null)
  const [key, setKey] = useState(0)
  const map = useMap()
  const L = window.L || (map && map.options && {})

  useEffect(() => {
    if (!geojsonFile) { setData(null); return }
    loadGeoJSON(geojsonFile).then((d) => {
      setData(d)
      setKey((k) => k + 1)
    })
  }, [geojsonFile])

  useEffect(() => {
    if (!data || !map) return
    const layer = window.L.geoJSON(data, {
      style: () => style,
      className: style.className || '',
    })
    layer.addTo(map)
    return () => { map.removeLayer(layer) }
  }, [data, map, key, style])

  return null
}

/*
 * State machine phases:
 *   intro -> chapterIntro -> stepping -> (next chapterIntro | outro)
 */
export default function TourMode({ onExit }) {
  const [phase, setPhase] = useState('intro')
  const [chapterIdx, setChapterIdx] = useState(0)
  const [stepIdx, setStepIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [currentMapAction, setCurrentMapAction] = useState(null)
  const [currentGeoFile, setCurrentGeoFile] = useState(null)
  const [currentGeoStyle, setCurrentGeoStyle] = useState('highlight')
  const [currentArrows, setCurrentArrows] = useState([])
  const [currentAchievements, setCurrentAchievements] = useState([])
  const mapRef = useRef(null)
  const autoTimerRef = useRef(null)

  const chapter = chapters[chapterIdx]
  const step = chapter?.steps?.[stepIdx]

  const clearTimers = useCallback(() => {
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current)
      autoTimerRef.current = null
    }
  }, [])

  const executeStep = useCallback((ch, si) => {
    const s = chapters[ch]?.steps?.[si]
    if (!s) return

    if (s.mapAction) {
      setCurrentMapAction({ ...s.mapAction, _t: Date.now() })
      if (s.mapAction.type === 'highlightRegion') {
        setCurrentGeoFile(s.mapAction.geojsonFile)
        setCurrentGeoStyle('highlight')
      } else if (s.mapAction.type === 'animateExpansion') {
        setCurrentGeoFile(s.mapAction.geojsonFile)
        setCurrentGeoStyle('expansion')
      }
    }

    setCurrentArrows(s.conquestArrows || [])
    setCurrentAchievements(s.achievements || [])
  }, [])

  const scheduleAutoAdvance = useCallback((duration) => {
    clearTimers()
    if (isPaused) return
    autoTimerRef.current = setTimeout(() => {
      handleNext()
    }, duration)
  }, [isPaused, clearTimers])

  useEffect(() => {
    if (phase !== 'stepping' || !step || isPaused) return
    clearTimers()
    autoTimerRef.current = setTimeout(() => {
      goNext()
    }, step.duration || 6000)
    return clearTimers
  }, [phase, stepIdx, chapterIdx, isPaused, step])

  function goNext() {
    if (phase === 'stepping') {
      if (stepIdx < chapter.steps.length - 1) {
        const next = stepIdx + 1
        setStepIdx(next)
        executeStep(chapterIdx, next)
      } else {
        clearTimers()
        advanceChapter()
      }
    }
  }

  function advanceChapter() {
    if (chapterIdx < chapters.length - 1) {
      const next = chapterIdx + 1
      setChapterIdx(next)
      setStepIdx(0)
      setPhase('chapterIntro')
      setCurrentGeoFile(null)
      setCurrentArrows([])
      setCurrentAchievements([])
      setCurrentMapAction(null)
    } else {
      setPhase('outro')
    }
  }

  function goPrev() {
    if (phase === 'stepping' && stepIdx > 0) {
      clearTimers()
      const prev = stepIdx - 1
      setStepIdx(prev)
      executeStep(chapterIdx, prev)
    }
  }

  function handleNext() { goNext() }
  function handlePrev() { goPrev() }

  function handleTogglePause() {
    setIsPaused((p) => !p)
  }

  function handleBeginChapter() {
    setStepIdx(0)
    setPhase('stepping')
    setCurrentGeoFile(null)
    setCurrentArrows([])
    setCurrentAchievements([])
    executeStep(chapterIdx, 0)
  }

  function handleSkip() {
    clearTimers()
    localStorage.setItem('itihaas_tour', 'skipped')
    onExit()
  }

  function handleOutroExplore() {
    localStorage.setItem('itihaas_tour', 'completed')
    onExit()
  }

  function handleMapReady(map) {
    mapRef.current = map
  }

  useEffect(() => {
    if (phase === 'intro') {
      const t = setTimeout(() => {
        setPhase('chapterIntro')
      }, 3500)
      return () => clearTimeout(t)
    }
  }, [phase])

  useEffect(() => {
    function onKeyDown(e) {
      if (phase !== 'stepping') return
      if (e.code === 'Space' || e.code === 'KeyK') {
        e.preventDefault()
        handleTogglePause()
      } else if (e.code === 'ArrowRight' || e.code === 'KeyL') {
        e.preventDefault()
        clearTimers()
        goNext()
      } else if (e.code === 'ArrowLeft' || e.code === 'KeyJ') {
        e.preventDefault()
        clearTimers()
        goPrev()
      } else if (e.code === 'Escape') {
        handleSkip()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [phase, stepIdx, chapterIdx, isPaused])

  const highlightStyle = {
    fillColor: '#5ae4c0',
    fillOpacity: 0.25,
    color: '#7ee8d4',
    weight: 2,
    opacity: 0.9,
    className: 'tour-territory-highlight',
  }

  const expansionStyle = {
    fillColor: '#5ae4c0',
    fillOpacity: 0,
    color: '#7ee8d4',
    weight: 2.5,
    opacity: 1,
    className: 'tour-territory-expansion',
  }

  return (
    <div className="tour-mode">
      <div className="tour-map-container">
        <MapContainer
          center={INDIA_CENTER}
          zoom={5}
          zoomControl={false}
          className="map-container"
          maxBounds={[[-10, 30], [50, 120]]}
          minZoom={3}
          maxZoom={10}
        >
          <TileLayer url={TILE_URL} attribution="" />
          <MapController mapAction={currentMapAction} onMapReady={handleMapReady} />

          {currentGeoFile && (
            <GeoJSONLayer
              geojsonFile={currentGeoFile}
              style={currentGeoStyle === 'expansion' ? expansionStyle : highlightStyle}
            />
          )}

          {currentArrows.length > 0 && <ConquestArrow arrows={currentArrows} />}
          {currentAchievements.length > 0 && <AchievementPopup achievements={currentAchievements} />}

          <ZoomControl position="bottomright" />
        </MapContainer>
      </div>

      {phase === 'intro' && (
        <div className="tour-intro-overlay">
          <div className="tour-intro-content">
            <p className="tour-intro-text">
              Before Pakistan, before the British, before the Mughals — this land had 5,000 years of stories.
              <br /><br />
              Let's start at the very beginning.
            </p>
          </div>
        </div>
      )}

      <ChapterOverlay
        chapter={chapter}
        visible={phase === 'chapterIntro'}
        onBegin={handleBeginChapter}
      />

      <StepNarrator
        step={step}
        stepIndex={stepIdx}
        visible={phase === 'stepping'}
      />

      {phase === 'stepping' && (
        <TourControls
          chapterIndex={chapterIdx}
          totalChapters={chapters.length}
          stepIndex={stepIdx}
          totalSteps={chapter?.steps?.length || 0}
          isPaused={isPaused}
          onPrev={handlePrev}
          onNext={handleNext}
          onTogglePause={handleTogglePause}
          onSkip={handleSkip}
          chapterTitle={chapter?.title}
        />
      )}

      {phase === 'outro' && <TourOutro onExplore={handleOutroExplore} />}
    </div>
  )
}
