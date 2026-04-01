import { useState, useCallback, useMemo, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import RadarLoader from './components/RadarLoader'
import Navbar from './components/Navbar'
import InfoPanel from './components/InfoPanel'
import MapView from './components/MapView'
import Timeline from './components/Timeline'
import EraTimelineRail from './components/EraTimelineRail'
import TourMode from './components/tour/TourMode'
import eras from './data/eras.json'
import incidents from './data/incidents.json'
import './styles/tour.css'

export default function App() {
  const { eraId } = useParams()
  const navigate = useNavigate()

  const eraIndexFromUrl = useMemo(() => {
    if (!eraId) return 0
    const idx = eras.findIndex((e) => e.id === eraId)
    return idx >= 0 ? idx : eras.length - 1
  }, [eraId])

  const [showLoader, setShowLoader] = useState(true)
  const [currentEraIndex, setCurrentEraIndex] = useState(eraIndexFromUrl)

  const [appMode, setAppMode] = useState('explore')
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    setCurrentEraIndex(eraIndexFromUrl)
  }, [eraIndexFromUrl])

  const currentEra = eras[currentEraIndex]

  useEffect(() => {
    if (currentEra) {
      document.title = `itihaas — explorer`
    }
  }, [currentEra])

  const handleIndexChange = useCallback((fnOrVal) => {
    setCurrentEraIndex((prev) => {
      const next = typeof fnOrVal === 'function' ? fnOrVal(prev) : fnOrVal
      const era = eras[next]
      navigate(era ? `/era/${era.id}` : '/', { replace: true })
      return next
    })
  }, [navigate])

  const [showBattlesOnly, setShowBattlesOnly] = useState(false)

  const currentIncidents = useMemo(
    () => {
      const filtered = incidents.filter((inc) => inc.eraId === currentEra?.id)
      return showBattlesOnly
        ? filtered.filter((inc) => inc.classification === 'MILITARY')
        : filtered
    },
    [currentEra?.id, showBattlesOnly]
  )

  const handleLoaderComplete = useCallback(() => {
    setShowLoader(false)
  }, [])

  const handleToggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev)
  }, [])

  const handleTogglePanel = useCallback(() => {
    setPanelOpen((prev) => !prev)
  }, [])

  const handlePanelClose = useCallback(() => setPanelOpen(false), [])
  const handlePanelOpen = useCallback(() => setPanelOpen(true), [])

  const handleToggleBattles = useCallback(() => {
    setShowBattlesOnly((prev) => !prev)
  }, [])

  const handleStartTour = useCallback(() => setAppMode('tour'), [])
  const handleTourExit = useCallback(() => setAppMode('explore'), [])

  if (showLoader) {
    return <RadarLoader onComplete={handleLoaderComplete} />
  }

  if (appMode === 'tour') {
    return <TourMode onExit={handleTourExit} />
  }

  return (
    <div className="app">
      <Navbar onStartTour={handleStartTour} />

      <div className="app-body">
        <EraTimelineRail
          eras={eras}
          currentIndex={currentEraIndex}
          onIndexChange={handleIndexChange}
        />

        <MapView
          era={currentEra}
          incidents={currentIncidents}
          showBattlesOnly={showBattlesOnly}
          onToggleBattles={handleToggleBattles}
        />

        <InfoPanel
          era={currentEra}
          isOpen={panelOpen}
          onToggle={handleTogglePanel}
        />
      </div>

      <Timeline
        eras={eras}
        currentIndex={currentEraIndex}
        onIndexChange={handleIndexChange}
        isAutoPlaying={isAutoPlaying}
        onToggleAutoPlay={handleToggleAutoPlay}
        wikiLink={currentEra?.wikiLink}
        panelOpen={panelOpen}
        onMapFocus={handlePanelClose}
        onDetailFocus={handlePanelOpen}
      />
    </div>
  )
}
