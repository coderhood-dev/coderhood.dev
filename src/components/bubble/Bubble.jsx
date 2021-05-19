import { motion } from 'framer-motion'
import Image from 'next/image'

const mainWaveKeyframes = [
  '9rem',
  '10.5rem',
  '10rem',
  '11rem',
  '10rem',
  '13rem',
  '10rem',
  '12rem',
  '10rem',
  '13rem',
  '10rem',
  '11rem',
  '10.5rem',
  '12rem',
  '9rem',
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

export const Bubble = ({ size, img, style }) => {
  const sizeClasses = {
    small: 'w-20 h-20',
    medium: 'w-30 h-30',
    big: 'w-40 h-40',
  }[size]
  return (
    <motion.div
      style={style}
      animate={{ y: 20, x: 10 }}
      transition={{
        repeat: Infinity,
        duration: 2,
        repeatType: 'reverse',
      }}
    >
      <div className='relative flex items-center justify-center'>
        {size === 'big' && (
          <>
            <motion.div
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
            />
            <motion.div
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
              className='absolute w-40 h-40 bg-yellow-500 rounded-full'
            />
          </>
        )}
        <motion.div className={`${sizeClasses} overflow-hidden rounded-full`}>
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
  )
}
