import Image from 'next/image'
import { motion } from 'framer-motion'

export const LessonVideo = ({ videoURL, title }) => {
  return (
    <div className={`relative flex justify-center w-full px-10 dot-background`}>
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
          className='absolute flex items-center p-4 text-sm bg-gray-300 right-10 dark:bg-gray-800 bottom-10 rounded-xl'
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <Image
            src='/images/logo.png'
            alt='Coderhood logo'
            height={20}
            width={20}
            quality={65}
          />
          <p className='ml-2'>
            Al parecer esta lección no tiene un video asignado todavía.
          </p>
        </motion.aside>
      )}
    </div>
  )
}
