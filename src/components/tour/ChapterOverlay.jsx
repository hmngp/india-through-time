import { motion, AnimatePresence } from 'framer-motion'

export default function ChapterOverlay({ chapter, visible, onBegin }) {
  return (
    <AnimatePresence>
      {visible && chapter && (
        <motion.div
          className="tour-chapter-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="tour-chapter-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="tour-chapter-number"
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 0.5, letterSpacing: '0.35em' }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              C H A P T E R&ensp;{chapter.number}
            </motion.div>

            <motion.h1
              className="tour-chapter-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {chapter.title}
            </motion.h1>

            <motion.div
              className="tour-chapter-divider"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            />

            <motion.p
              className="tour-chapter-period"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              {chapter.period}
            </motion.p>

            <motion.p
              className="tour-chapter-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              "{chapter.tagline}"
            </motion.p>

            <motion.button
              className="tour-chapter-begin"
              onClick={onBegin}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.4 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Begin This Chapter
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
