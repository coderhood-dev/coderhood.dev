import { useEffect } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// const lightWaveKeyframes = [
//   '9rem',
//   '10rem',
//   '12.5rem',
//   '10rem',
//   '12rem',
//   '10rem',
//   '13rem',
//   '10rem',
//   // '12rem',
//   // '10rem',
//   '15rem',
//   '10rem',
//   '12rem',
//   '10rem',
//   '14rem',
//   '10rem',
//   '9rem',
//   // '12rem',
//   // '15rem',
//   // '12rem',
//   // '13rem',
//   // '12.5rem',
//   // '14rem',
//   // '9rem',
// ]
// const opacityKeyframes = [
//   0.4,
//   1,
//   0.4,
//   1,
//   0.4,
//   1,
//   0.4,
//   1,
//   0.4,
//   1,
//   0.4,
//   1,
//   0.4,
//   1,
//   0.4,
// ]

const mainWaveKeyframes = [
  '100%',
  '110%',
  '103%',
  '110%',
  '102%',
  '120%',
  '105%',
  '125%',
  '102%',
  '110%',
  '100%',
  '115%',
  '105%',
  '115%',
  '100%',
]

export const Bubble = ({ status, img, animate, position }) => {
  const waveControls = useAnimation()

  const size = {
    1: '4rem',
    2: '5rem',
    3: '6rem',
    4: '7rem',
    5: '8rem',
  }[status]
  const isVisible = status > 0 && status <= 5
  const isTalking = status === 3 || status === 4

  const waveVariants = {
    initial: { width: 0, height: 0 },
    animate: {
      width: mainWaveKeyframes,
      height: mainWaveKeyframes,
    },
    exit: { width: 0, height: 0 },
  }

  useEffect(() => {
    const doWaveAnimations = async () => {
      if (isTalking) {
        await waveControls.start('animate', {
          repeat: Infinity,
          duration: 4,
          repeatType: 'loop',
          repeatDelay: 1,
          delay: 1,
        })
      } else {
        waveControls.start('exit', {
          duration: 2,
        })
      }
    }

    doWaveAnimations()
  }, [isTalking, waveControls])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          animate={animate}
          className='absolute'
          style={position}
          transition={{
            right: { type: 'spring', stiffness: 100, duration: 2 },
            repeat: Infinity,
            duration: 5,
            repeatType: 'reverse',
          }}
        >
          <div className='relative flex items-center justify-center'>
            <AnimatePresence exitBeforeEnter>
              {isTalking && (
                <motion.div
                  animate={waveControls}
                  className='absolute bg-yellow-500 rounded-full'
                  initial='initial'
                  variants={waveVariants}
                />
              )}
            </AnimatePresence>
            <motion.div
              animate={{
                width: size,
                height: size,
              }}
              className='overflow-hidden rounded-full'
              exit={{ width: 0, height: 0 }}
              initial={{ width: 0, height: 0 }}
              transition={{ duration: 1 }}
            >
              <Image
                priority
                alt='Bubble Image'
                height={240}
                objectFit='cover'
                quality={65}
                src={img}
                width={240}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
