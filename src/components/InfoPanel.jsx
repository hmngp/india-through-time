import { useState } from 'react'
import TypewriterText from './TypewriterText'
import DynastyTree from './DynastyTree'

export default function InfoPanel({ era, isOpen, onToggle }) {
  const [worldExpanded, setWorldExpanded] = useState(false)
  if (!era) return null

  const fields = [
    { label: 'RULER', value: era.ruler },
    { label: 'CAPITAL', value: era.capital },
    { label: 'PERIOD', value: era.yearDisplay },
    { label: 'RELIGION', value: era.religion },
    { label: 'LANGUAGE', value: era.language },
    { label: 'TERRITORY', value: era.territory },
  ]

  return (
    <>
      <button className="mobile-panel-toggle" onClick={onToggle}>
        {isOpen ? '▼ HIDE INTEL' : '▲ SHOW INTEL'}
      </button>

      <aside className={`info-panel ${isOpen ? 'open' : ''}`}>
        <div className="panel-header">
          <div className="era-label">Era overview</div>
          <div className="era-name era-title">{era.eraName}</div>
          {era.subTitle && <div className="era-subtitle">{era.subTitle}</div>}
        </div>

        <div className="panel-content">
          {fields.map((f) => (
            <div key={f.label} className="panel-field">
              <span className="field-label">{f.label}</span>
              <span className="field-value">{f.value}</span>
            </div>
          ))}

          {era.territoryPercent != null && (
            <div className="panel-field territory-visualizer">
              <span className="field-label">TERRITORY VS MODERN INDIA</span>
              <div className="territory-bar-wrapper">
                <div
                  className="territory-bar-fill"
                  style={{ width: `${Math.min(100, era.territoryPercent)}%` }}
                />
              </div>
              <span className="territory-percent">{era.territoryPercent}% of modern India</span>
            </div>
          )}

          <hr className="panel-divider" />

          <div className="panel-description">
            <TypewriterText key={era.id} text={era.description} speed={12} />
          </div>

          {era.funFact && (
            <div className="panel-fun-fact">
              {era.funFact}
            </div>
          )}

          {era.worldEvents && era.worldEvents.length > 0 && (
            <div className="panel-world-events">
              <button
                className="world-events-toggle"
                onClick={() => setWorldExpanded((p) => !p)}
              >
                {worldExpanded ? '▼' : '▶'} WHAT WAS HAPPENING IN THE WORLD?
              </button>
              {worldExpanded && (
                <ul className="world-events-list">
                  {era.worldEvents.map((ev, i) => (
                    <li key={i}>{ev}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <DynastyTree era={era} />
        </div>

        <div className="panel-footer">
          <a
            href={era.wikiLink}
            target="_blank"
            rel="noopener noreferrer"
            className="wiki-link"
          >
            Open Wikipedia article
          </a>
        </div>
      </aside>
    </>
  )
}
