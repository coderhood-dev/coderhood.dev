import { AnimatePresence, motion } from 'framer-motion'

export const TransitionManager = ({ children, transitionKey }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div key={transitionKey} className='h-full'>
        {/* Transition overlay */}
        <motion.div
          className='absolute z-10 w-full h-full bg-black'
          initial={{ x: 0 }}
          animate={{ x: '100vw', transitionEnd: { x: '-100vw' } }}
          exit={{ x: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        ></motion.div>

        {children}
      </motion.div>
    </AnimatePresence>
  )
}
