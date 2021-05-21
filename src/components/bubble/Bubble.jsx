import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const mainWaveKeyframes = [
  '7rem',
  '8.5rem',
  '8rem',
  '9rem',
  '8rem',
  '11rem',
  '8rem',
  '10rem',
  '8rem',
  '11rem',
  '8rem',
  '9rem',
  '8.5rem',
  '10rem',
  '7rem',
]
const lightWaveKeyframes = [
  '9rem',
  '10rem',
  '12.5rem',
  '10rem',
  '12rem',
  '10rem',
  '13rem',
  '10rem',
  // '12rem',
  // '10rem',
  '15rem',
  '10rem',
  '12rem',
  '10rem',
  '14rem',
  '10rem',
  '9rem',
  // '12rem',
  // '15rem',
  // '12rem',
  // '13rem',
  // '12.5rem',
  // '14rem',
  // '9rem',
]
const opacityKeyframes = [
  0.4,
  1,
  0.4,
  1,
  0.4,
  1,
  0.4,
  1,
  0.4,
  1,
  0.4,
  1,
  0.4,
  1,
  0.4,
]

export const Bubble = ({ status, img, animate, position }) => {
  const size = {
    1: '4rem',
    2: '6rem',
    3: '8rem',
    4: '8rem',
    5: '8rem',
  }[status]
  const isVisible = status > 0 && status !== Infinity
  const isTalking = isVisible && (status === 3 || status === 4)

  // const bubbleVariants = {
  //   // exit: {
  //   //   width: 0,
  //   //   height: 0,
  //   //   transition: { duration: 1 },
  //   // },
  //   animate:
  //     width: '5rem',
  //     height: '5rem',
  //     ...animate,
  //   },
  // }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className='absolute'
          style={position}
          animate={{ ...animate }}
          transition={{
            width: { type: 'spring', stiffness: 100, duration: 2 },
            height: { type: 'spring', stiffness: 100, duration: 2 },
            repeat: Infinity,
            duration: 5,
            repeatType: 'reverse',
          }}
        >
          <div className='relative flex items-center justify-center'>
            {isTalking && (
              <motion.div
                initial={{ width: '8rem', height: '8rem' }}
                animate={{
                  width: mainWaveKeyframes,
                  height: mainWaveKeyframes,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  repeatType: 'loop',
                  repeatDelay: 1,
                }}
                className='absolute bg-yellow-500 rounded-full w-30 h-30'
              />
            )}
            <motion.div
              animate={{
                width: size,
                height: size,
              }}
              initial={{ width: 0, height: 0 }}
              exit={{ width: 0, height: 0 }}
              transition={{ duration: 1 }}
              className='overflow-hidden rounded-full'
            >
              <Image
                src={img}
                alt='Bubble Image'
                height={240}
                width={240}
                quality={65}
                objectFit='cover'
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* <motion.div
  animate={{
    width: lightWaveKeyframes,
    height: lightWaveKeyframes,
    opacity: opacityKeyframes,
  }}
  transition={{
    repeat: Infinity,
    duration: 3,
    repeatType: 'loop',
    repeatDelay: 1,
  }}
  className='absolute w-20 h-20 border-2 border-yellow-300 rounded-full'
/> */
