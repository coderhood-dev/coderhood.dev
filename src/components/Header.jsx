import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

import { Head } from '@/components/Head'
import useStore from '@/lib/store'
import { useAuth } from '@/hooks/useAuth'

export const Header = () => {
  const title = useStore((s) => s.title)
  const { asPath } = useRouter()

  const { user } = useAuth()
  console.log(`user: ${JSON.stringify(user, null, 2)}`)

  return (
    <>
      <Head title={title} />
      <header className='flex items-center justify-between h-20 pl-10 pr-16 border-b dark:border-b-0'>
        <div className='flex items-center justify-start'>
          <Link href='/'>
            <a className='flex w-30 sm:w-48'>
              <Image
                src='/images/logo-full.png'
                alt='Coderhood logo'
                height={42}
                width={192}
                quality={65}
              />
            </a>
          </Link>
          {process.env.NEXT_PUBLIC_BETA_BADGE && (
            <span className=' p-1 ml-2 text-xs text-yellow-200 bg-yellow-500 rounded'>
              BETA
            </span>
          )}
        </div>
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
            {user?.email}
          </ul>
        </nav>
      </header>
    </>
  )
}
