import useStore from '@/lib/store'
import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from 'next-themes'

const Dom = ({ children }) => {
  const ref = useRef(null)
  useStore.setState({ dom: ref })

  const algo = useStore((state) => state.algo)

  // console.log(children[0].props.title)

  // const { resolvedTheme } = useTheme()

  // const container = {
  //   initial: { y: 0 },
  //   animate: {
  //     y: 0,
  //     transition: {
  //       staggerChildren: 1,
  //     },
  //   },
  //   exit: {
  //     y: 0,
  //     transition: {
  //       staggerChildren: 1,
  //     },
  //   },
  // }

  const key = children[0] ? children[0].props.title + algo : algo
  console.log(key)
  return (
    <div
      className='absolute top-0 left-0 z-10 w-full h-screen overflow-hidden dom'
      ref={ref}
    >
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={key}
          // variants={container}
          // initial='hidden'
          // animate='show'
          // exit='exit'
        >
          <motion.div
            className='absolute z-10 w-full h-full bg-black'
            initial={{ x: 0 }}
            animate={{ x: '-100vw' }}
            exit={{ x: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          ></motion.div>
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Dom
