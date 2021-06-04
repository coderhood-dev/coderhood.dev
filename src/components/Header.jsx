import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'

import { Head } from '@/components/Head'
import useStore from '@/lib/store'

export const Header = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), [])

  const title = useStore((s) => s.title)
  const { asPath } = useRouter()

  return (
    <>
      <Head title={title} />
      <header className='flex items-center justify-between h-20 pl-10 pr-8 border-b border-gray-900 dark:border-gray-600'>
        <Link href='/'>
          <a className='flex w-32 sm:w-60'>
            <Image
              src='/images/logo-full.png'
              alt='Coderhood logo'
              height={42}
              width={192}
              quality={65}
            />
          </a>
        </Link>
        <nav className='flex pl-10'>
          <ul>
            <AnimatePresence>
              {asPath !== '/academy' && (
                <motion.li
                  className='mr-5 bg-yellow-500 rounded-full hover:ring-4 ring-yellow-500 ring-opacity-50'
                  initial={{ x: 250 }}
                  animate={{ x: 0 }}
                  exit={{ x: 250, transition: { delay: 0.2, duration: 0.7 } }}
                  transition={{
                    duration: 1,
                    delay: 0.5,
                    type: 'spring',
                  }}
                >
                  <Link href='/academy'>
                    <a>
                      <p className='p-2 text-xs font-bold text-white sm:p-4'>
                        🎓 Academy
                      </p>
                    </a>
                  </Link>
                </motion.li>
              )}
            </AnimatePresence>
          </ul>
          <button
            aria-label='Toggle Dark Mode'
            type='button'
            className='w-10 h-10 p-3 bg-gray-200 rounded dark:bg-gray-800'
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            {mounted && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                stroke='currentColor'
                className='w-4 h-4 text-gray-800 dark:text-gray-200'
              >
                {resolvedTheme === 'dark' ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                  />
                )}
              </svg>
            )}
          </button>
        </nav>
      </header>
    </>
  )
}
