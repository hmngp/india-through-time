import { motion, AnimatePresence } from 'framer-motion'

export default function WelcomeModal({ onStartTour, onExploreFree }) {
  return (
    <AnimatePresence>
      <motion.div
        className="tour-welcome-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="tour-welcome-card"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="tour-welcome-logo">
            <img src="/images/Logo Icon.svg" alt="" className="tour-welcome-logo-img" />
          </div>

          <h1 className="tour-welcome-title">
            Welcome to <span className="tour-welcome-hindi">इतिहास</span>
          </h1>

          <p className="tour-welcome-sub">How would you like to explore?</p>

          <div className="tour-welcome-actions">
            <button className="tour-welcome-btn tour-welcome-btn--primary" onClick={onStartTour}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>Take the Grand Tour</span>
              <span className="tour-welcome-btn-hint">Experience 5,000 years, guided</span>
            </button>

            <button className="tour-welcome-btn tour-welcome-btn--secondary" onClick={onExploreFree}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>Explore Freely</span>
              <span className="tour-welcome-btn-hint">Jump to any era yourself</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
