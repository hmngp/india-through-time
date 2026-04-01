import { motion } from 'framer-motion'

export default function TourOutro({ onExplore }) {
  return (
    <motion.div
      className="tour-outro-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="tour-outro-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="tour-outro-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 1, type: 'spring', stiffness: 200 }}
        >
          <img src="/images/Logo Icon.svg" alt="" className="tour-outro-logo" />
        </motion.div>

        <motion.h1
          className="tour-outro-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          This Is Your History
        </motion.h1>

        <motion.p
          className="tour-outro-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.8 }}
        >
          5,000 years in 25 minutes
        </motion.p>

        <motion.p
          className="tour-outro-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 2.2 }}
        >
          From the world's first cities to the world's largest democracy — you just
          traveled through one of humanity's greatest civilizations.
        </motion.p>

        <motion.button
          className="tour-outro-cta"
          onClick={onExplore}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Explore the Map Freely
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
