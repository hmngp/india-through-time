import { useState, useEffect } from 'react'

const DISPLAY_MS = 2200
const FADE_MS = 600

export default function RadarLoader({ onComplete }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), DISPLAY_MS)
    const t2 = setTimeout(() => onComplete(), DISPLAY_MS + FADE_MS)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onComplete])

  return (
    <div
      className="app-loader"
      style={{
        opacity: fading ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease-out`,
      }}
    >
      <div className="app-loader-inner">
        <img
          src="/images/Logo Icon.svg"
          alt="itihaas"
          className="app-loader-logo"
        />
      </div>
    </div>
  )
}
