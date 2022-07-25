import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'

export const ThemeSwitcher = ({ className }) => {
  const [mounted, setMounted] = useState(false)

  // nextTheme is a key to trigger motion animations
  const [nextTheme, setNextTheme] = useState(undefined)

  const [{ scale, margin, zIndex }, setStyle] = useState({
    scale: 1,
    zIndex: 0,
  })
  const data = useTheme()
  const { resolvedTheme, setTheme } = data

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), [])

  const handlePress = () => {
    setStyle({ scale: 1.2, zIndex: 20 })
    setTimeout(() => {
      setStyle({ scale: 1, zIndex: 0 })
    }, 800)

    setNextTheme(resolvedTheme === 'dark' ? 'light' : 'dark')

    setTimeout(() => {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    }, 400)
  }

  return (
    <motion.button
      animate={{ scale, zIndex }}
      aria-label='Toggle Dark Mode'
      className={`flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded dark:bg-gray-800 focus:outline-none focus:ring-2 ring-yellow-500 ring-opacity-50 ${className}`}
      type='button'
      onClick={handlePress}
    >
      {mounted && (
        <svg
          className='w-4 h-4 text-gray-800 dark:text-gray-200'
          fill='currentColor'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <AnimatePresence exitBeforeEnter>
            {resolvedTheme === 'dark' ? (
              <motion.path
                key={resolvedTheme}
                animate={{
                  x: 0,
                  opacity: 1,
                  rotate: 0,
                  pathLength: 1,
                }}
                d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                exit={{ x: 20, rotate: 45 }}
                initial={{
                  x: -20,
                  opacity: 0.5,
                  rotate: -45,
                  pathLength: 0,
                }}
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            ) : (
              <motion.path
                key={resolvedTheme}
                animate={{
                  x: 0,
                  opacity: 1,
                  rotate: 0,
                  pathLength: 1,
                }}
                d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                exit={{ x: 20, rotate: 45 }}
                initial={{
                  x: -20,
                  opacity: 0.5,
                  rotate: -45,
                  pathLength: 0,
                }}
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>
        </svg>
      )}
    </motion.button>
  )
}
