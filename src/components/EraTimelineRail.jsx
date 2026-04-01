import { useEffect, useRef } from 'react'

export default function EraTimelineRail({ eras, currentIndex, onIndexChange }) {
  const navRef = useRef(null)

  useEffect(() => {
    const el = navRef.current?.querySelector('.era-rail-item.is-active')
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [currentIndex])

  return (
    <nav ref={navRef} className="era-timeline-rail" aria-label="Historical eras">
      <div className="era-rail-header">Eras</div>
      <div className="era-rail-line" aria-hidden />
      <div className="era-rail-list">
        {eras.map((e, i) => (
          <button
            key={e.id}
            type="button"
            className={`era-rail-item ${i === currentIndex ? 'is-active' : ''}`}
            onClick={() => onIndexChange(() => i)}
          >
            <span className="era-rail-dot" aria-hidden />
            <span className="era-rail-label">{e.yearDisplay}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
