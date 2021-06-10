import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'

import useStore from '@/lib/store'

export const ThemeSwitcher = ({ className }) => {
  const [mounted, setMounted] = useState(false)
  const [{ scale, margin, zIndex }, setStyle] = useState({
    scale: 1,
    margin: '1.25rem',
    zIndex: 1,
  })
  const { resolvedTheme, setTheme } = useTheme()

  const theme = useStore((state) => state.theme)

  useStore.setState({
    theme: resolvedTheme === 'dark' ? 'light' : 'dark',
  })

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), [])

  return (
    <motion.button
      aria-label='Toggle Dark Mode'
      type='button'
      className={`flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded dark:bg-gray-800 focus:outline-none focus:ring-2 ring-yellow-500 ring-opacity-50 ${className}`}
      onClick={() => {
        setStyle({ scale: 2, margin: '3rem', zIndex: 20 })
        setTimeout(() => {
          setStyle({ scale: 1, margin: '1.25rem', zIndex: 1 })
        }, 800)

        useStore.setState({
          algo: theme === 'dark' ? 'light' : 'dark',
        })

        setTimeout(() => {
          setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
        }, 400)
      }}
      animate={{ scale, margin, zIndex }}
    >
      {mounted && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          stroke='currentColor'
          className='w-4 h-4 text-gray-800 dark:text-gray-200'
        >
          <AnimatePresence exitBeforeEnter>
            {resolvedTheme === 'dark' ? (
              <motion.path
                key={resolvedTheme}
                initial={{
                  x: -20,
                  opacity: 0.5,
                  rotate: -45,
                  pathLength: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  rotate: 0,
                  pathLength: 1,
                }}
                exit={{ x: 20, rotate: 45 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
              />
            ) : (
              <motion.path
                key={resolvedTheme}
                initial={{
                  x: -20,
                  opacity: 0.5,
                  rotate: -45,
                  pathLength: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  rotate: 0,
                  pathLength: 1,
                }}
                exit={{ x: 20, rotate: 45 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
              />
            )}
          </AnimatePresence>
        </svg>
      )}
    </motion.button>
  )
}
