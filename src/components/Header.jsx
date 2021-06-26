import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

import { Head } from '@/components/Head'
import { HeaderItem } from '@/components/HeaderItem'
import useStore from '@/lib/store'
import { useAuth } from '@/hooks/useAuth'

export const Header = () => {
  const title = useStore((s) => s.title)

  const { user } = useAuth()
  const profileTitle = user?.email || 'Profile'

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
            <span className=' p-1 ml-2 text-xs text-yellow-200 bg-yellow-500 rounded'>BETA</span>
          )}
        </div>
        <nav className='flex pl-10'>
          <ul className='flex'>
            <HeaderItem url='/academy'>🎓 Academy</HeaderItem>
            <HeaderItem url='/profile'>{`🧠 ${profileTitle}`}</HeaderItem>
          </ul>
        </nav>
      </header>
    </>
  )
}
