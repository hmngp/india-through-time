import { motion } from 'framer-motion'

export default function TourControls({
  chapterIndex,
  totalChapters,
  stepIndex,
  totalSteps,
  isPaused,
  onPrev,
  onNext,
  onTogglePause,
  onSkip,
  chapterTitle,
}) {
  return (
    <motion.div
      className="tour-controls"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="tour-controls-top">
        <span className="tour-controls-label">
          Chapter {chapterIndex + 1} of {totalChapters} — {chapterTitle}
        </span>
        <button className="tour-skip-btn" onClick={onSkip}>
          Skip Tour
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="tour-controls-middle">
        <button className="tour-ctrl-btn" onClick={onPrev} disabled={stepIndex === 0 && chapterIndex === 0}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button className="tour-ctrl-btn tour-ctrl-btn--play" onClick={onTogglePause}>
          {isPaused ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          )}
        </button>

        <button className="tour-ctrl-btn" onClick={onNext}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="tour-controls-bottom">
        <div className="tour-step-dots">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className={`tour-step-dot ${i === stepIndex ? 'active' : ''} ${i < stepIndex ? 'done' : ''}`}
            />
          ))}
          <span className="tour-step-label">Step {stepIndex + 1} of {totalSteps}</span>
        </div>

        <div className="tour-chapter-progress">
          <div className="tour-chapter-progress-track">
            <div
              className="tour-chapter-progress-fill"
              style={{ width: `${((chapterIndex + (stepIndex + 1) / totalSteps) / totalChapters) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
