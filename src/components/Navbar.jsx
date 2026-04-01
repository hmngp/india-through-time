import { useState, useEffect } from 'react'

export default function Navbar({ onStartTour }) {
  const [showAbout, setShowAbout] = useState(false)
  const [showTourHint, setShowTourHint] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('itihaas_tour_hint')
    if (!seen) {
      const t = setTimeout(() => setShowTourHint(true), 1500)
      return () => clearTimeout(t)
    }
  }, [])

  function dismissHint() {
    setShowTourHint(false)
    localStorage.setItem('itihaas_tour_hint', '1')
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/images/Logo-Full.svg" alt="itihaas" className="logo-full" />
        </div>

        <p className="navbar-tagline">
         Explore India Through 5000 Years
        </p>

        <div className="navbar-actions">
          {onStartTour && (
            <div className="tour-btn-wrap">
              <button type="button" className="nav-btn nav-btn--icon" onClick={() => { dismissHint(); onStartTour(); }}>
                <svg className="nav-btn-svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="5 3 17 10 5 17 5 3" />
                </svg>
                Tour
              </button>
              {showTourHint && (
                <div className="tour-hint">
                  <span>Take a guided journey through 5,000 years of India</span>
                  <button className="tour-hint-close" onClick={dismissHint}>✕</button>
                </div>
              )}
            </div>
          )}
          <button type="button" className="nav-btn nav-btn--icon" onClick={() => setShowAbout(true)}>
            <svg className="nav-btn-svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="10" cy="10" r="8" />
              <line x1="10" y1="9" x2="10" y2="14" />
              <circle cx="10" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
            About
          </button>
        </div>
      </nav>

      {showAbout && (
        <div className="modal-overlay" onClick={() => setShowAbout(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setShowAbout(false)}>
              ✕
            </button>
            <h2 className="era-title">About itihaas</h2>
            <p>
              <strong>itihaas</strong> is an interactive map of the Indian subcontinent across roughly
              5,000 years of history.
            </p>
            <p>
              Move through 29 eras — from the Indus Valley (3300 BCE) to modern India — and see
              how borders and power centers shifted. Each glowing point marks a documented event;
              open it for context and sources.
            </p>
            <p className="amber-text" style={{ fontSize: '12px', marginTop: '20px' }}>
              Educational use — summaries link to Wikipedia for detail.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
