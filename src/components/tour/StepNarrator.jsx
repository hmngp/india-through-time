import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

function TypewriterText({ text, speed = 22 }) {
  const [displayed, setDisplayed] = useState('')
  const idx = useRef(0)

  useEffect(() => {
    setDisplayed('')
    idx.current = 0
    const interval = setInterval(() => {
      idx.current++
      if (idx.current <= text.length) {
        setDisplayed(text.slice(0, idx.current))
      } else {
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return <>{displayed}<span className="tour-narrator-cursor">|</span></>
}

export default function StepNarrator({ step, stepIndex, visible }) {
  if (!visible || !step) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepIndex}
        className="tour-narrator"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="tour-narrator-text">
          <TypewriterText text={step.text} />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
