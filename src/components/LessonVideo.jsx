import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export const LessonVideo = ({ videoURL, title }) => {
  const [logoRotation, setLogoRotation] = useState(0)

  return (
    <div className={`relative flex justify-center w-full px-10 bg-black`}>
      <div className='w-full max-w-4xl'>
        <div
          className='relative flex justify-end w-full overflow-hidden'
          style={{ paddingTop: '56.25%' }}
        >
          {videoURL && (
            <iframe
              className='absolute top-0 bottom-0 left-0 right-0 w-full h-full'
              src={videoURL}
              title={title}
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
      {!videoURL && (
        <motion.aside
          className='absolute flex items-center p-4 text-sm bg-gray-300 cursor-pointer right-10 dark:bg-gray-800 bottom-10 rounded-xl'
          initial={{ x: 700 }}
          animate={{ x: 0, transition: { delay: 1, duration: 0.7 } }}
          // transition={{ duration: 0.7, delay: 1 }}
          onClick={() => {
            setLogoRotation((rot) => rot + 360)
          }}
          whileHover={{ y: -2 }}
        >
          <motion.div
            animate={{ rotate: logoRotation }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src='/images/logo.png'
              alt='Coderhood logo'
              height={20}
              width={20}
              quality={65}
            />
          </motion.div>
          <p className='ml-2 select-none'>
            Al parecer esta lección no tiene un video asignado todavía.
          </p>
        </motion.aside>
      )}
    </div>
  )
}
