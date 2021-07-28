import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const Input = React.forwardRef(({ error, label, placeholder, ...props }, ref) => (
  <div className={`relative flex flex-col items-start w-full my-2 ${error && 'mb-8'}`}>
    <AnimatePresence exitBeforeEnter>
      {error && (
        <motion.span
          animate={{ y: 28, opacity: 1 }}
          className='absolute bottom-0 p-2 pt-3 text-xs text-white bg-black rounded'
          exit={{ y: -5, opacity: 0 }}
          initial={{ y: -5, opacity: 0 }}
          transition={{ type: 'tween' }}
        >
          {error}
        </motion.span>
      )}
    </AnimatePresence>
    <label className='mb-2 text-xs dark:text-gray-300'>{label}</label>
    <input
      className='relative w-full max-w-md p-2 pl-5 text-sm font-medium bg-white border border-black rounded dark:bg-gray-800 dark:border-gray-800 hover:border-gray-500 dark:hover:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-yellow-500 focus:ring-black'
      placeholder={placeholder}
      {...props}
    />
  </div>
))
