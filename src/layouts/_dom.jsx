import useStore from '@/lib/store'
import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { ThemeSwitcher } from '@/components/ThemeSwitcher'

const Dom = ({ children }) => {
  const ref = useRef(null)
  useStore.setState({ dom: ref })

  const auxTheme = useStore((state) => state.algo)

  const key = children[0] ? children[0].props.title + auxTheme : auxTheme
  return (
    <div
      className='absolute top-0 left-0 z-10 w-full h-screen overflow-hidden dom'
      ref={ref}
    >
      {/* Screen */}
      <ThemeSwitcher className='fixed top-0 right-0' />
      <AnimatePresence exitBeforeEnter>
        <motion.div key={key} className='h-full'>
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
    </div>
  )
}

export default Dom
