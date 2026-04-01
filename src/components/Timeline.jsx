import { useEffect, useCallback, useRef } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M6 4.5v11l9-5.5L6 4.5z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <rect x="5" y="4" width="3.5" height="12" rx="1" />
      <rect x="11.5" y="4" width="3.5" height="12" rx="1" />
    </svg>
  )
}

export default function Timeline({
  eras,
  currentIndex,
  onIndexChange,
  isAutoPlaying,
  onToggleAutoPlay,
  wikiLink,
  panelOpen,
  onMapFocus,
  onDetailFocus,
}) {
  const autoPlayRef = useRef(null)
  const currentEra = eras[currentIndex]

  const goNext = useCallback(() => {
    onIndexChange((prev) => Math.min(prev + 1, eras.length - 1))
  }, [eras.length, onIndexChange])

  const goPrev = useCallback(() => {
    onIndexChange((prev) => Math.max(prev - 1, 0))
  }, [onIndexChange])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault()
        goPrev()
      } else if (e.key === ' ') {
        e.preventDefault()
        onToggleAutoPlay()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev, onToggleAutoPlay])

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        onIndexChange((prev) => {
          if (prev >= eras.length - 1) {
            onToggleAutoPlay()
            return 0
          }
          return prev + 1
        })
      }, 2500)
    } else {
      clearInterval(autoPlayRef.current)
    }
    return () => clearInterval(autoPlayRef.current)
  }, [isAutoPlaying, eras.length, onIndexChange, onToggleAutoPlay])

  return (
    <div className="timeline-bar">
      {onMapFocus && onDetailFocus && (
        <div className="timeline-pill-group" role="group" aria-label="View mode">
          <button
            type="button"
            className={`timeline-pill ${!panelOpen ? 'is-active' : ''}`}
            onClick={onMapFocus}
          >
            Map
          </button>
          <button
            type="button"
            className={`timeline-pill ${panelOpen ? 'is-active' : ''}`}
            onClick={onDetailFocus}
          >
            Detail
          </button>
        </div>
      )}

      <div className="timeline-main">
        <div className="timeline-info-row">
          <button
            type="button"
            className={`timeline-play-btn ${isAutoPlaying ? 'is-playing' : ''}`}
            onClick={onToggleAutoPlay}
            title={isAutoPlaying ? 'Pause timelapse' : 'Play timelapse'}
          >
            {isAutoPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <div className="timeline-info">
            <span className="timeline-year-display">{currentEra?.yearDisplay}</span>
            <span className="timeline-era-label">{currentEra?.eraName} — {currentEra?.subTitle}</span>
          </div>
          {wikiLink && (
            <a
              href={wikiLink}
              target="_blank"
              rel="noopener noreferrer"
              className="timeline-cta-link"
            >
              Wikipedia
            </a>
          )}
        </div>
        <div className="timeline-slider-track">
          <Slider
            min={0}
            max={eras.length - 1}
            step={1}
            value={currentIndex}
            onChange={(val) => onIndexChange(() => val)}
            dots={false}
          />
        </div>
      </div>
    </div>
  )
}
