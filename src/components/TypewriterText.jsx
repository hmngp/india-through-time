import { useState, useEffect, useRef } from 'react'

export default function TypewriterText({ text, speed = 18, className = '', onComplete }) {
  const [displayed, setDisplayed] = useState('')
  const indexRef = useRef(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    setDisplayed('')
    indexRef.current = 0

    if (!text) return

    intervalRef.current = setInterval(() => {
      indexRef.current++
      setDisplayed(text.slice(0, indexRef.current))

      if (indexRef.current >= text.length) {
        clearInterval(intervalRef.current)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(intervalRef.current)
  }, [text, speed])

  return <span className={className}>{displayed}<span className="typewriter-cursor">_</span></span>
}
