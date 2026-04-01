import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function ChapterQuiz({ quiz, visible, onContinue }) {
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  if (!visible || !quiz) return null

  const isCorrect = selected === quiz.correctIndex

  function handleSelect(idx) {
    if (revealed) return
    setSelected(idx)
    setRevealed(true)
  }

  function handleContinue() {
    setSelected(null)
    setRevealed(false)
    onContinue()
  }

  return (
    <AnimatePresence>
      <motion.div
        className="tour-quiz-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="tour-quiz-card"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="tour-quiz-header">Quick Check</div>

          <p className="tour-quiz-question">{quiz.question}</p>

          <div className="tour-quiz-options">
            {quiz.options.map((opt, i) => {
              let cls = 'tour-quiz-option'
              if (revealed && i === quiz.correctIndex) cls += ' correct'
              else if (revealed && i === selected && !isCorrect) cls += ' wrong'
              if (selected === i) cls += ' selected'

              return (
                <button key={i} className={cls} onClick={() => handleSelect(i)}>
                  <span className="tour-quiz-option-radio" />
                  <span>{opt}</span>
                </button>
              )
            })}
          </div>

          <AnimatePresence>
            {revealed && (
              <motion.div
                className={`tour-quiz-feedback ${isCorrect ? 'correct' : 'wrong'}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.35 }}
              >
                <div className="tour-quiz-feedback-icon">
                  {isCorrect ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  )}
                </div>
                <p>{quiz.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {revealed && (
            <motion.button
              className="tour-quiz-continue"
              onClick={handleContinue}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Continue
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
