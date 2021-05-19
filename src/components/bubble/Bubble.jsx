import { motion } from 'framer-motion'
import Image from 'next/image'

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
          <motion.div
            animate={{
              width: ['12rem', '10rem', '11rem', '10rem', '13rem', '10rem'],
              height: ['12rem', '10rem', '11rem', '10rem', '13rem', '10rem'],
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
              repeatType: 'reverse',
            }}
            className='absolute w-40 h-40 bg-yellow-500 rounded-full'
          />
        )}
        <motion.div className={`${sizeClasses} overflow-hidden rounded-full`}>
          <Image
            src={img}
            alt='Kakashi sensei'
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
