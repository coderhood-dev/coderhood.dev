import Image from 'next/image'
import Link from 'next/link'

import { Head } from '@/components/Head'
import { HeaderItem } from '@/components/HeaderItem'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import useStore from '@/lib/store'
import { useAuth } from '@/hooks/useAuth'

export const Header = ({ className }) => {
  const title = useStore((s) => s.title)

  const { user } = useAuth()
  const profileTitle = user?.email || 'Inicia sesión'

  return (
    <>
      <Head title={title} />
      <header
        className={`flex items-center w-full justify-between h-20 pl-10 pr-16 border-b  dark:border-gray-900 border-gray-300 z-10  ${className}`}
        style={{ backdropFilter: 'saturate(180%) blur(20px)' }}
      >
        <div className='flex items-center justify-start'>
          <ThemeSwitcher />
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
            <HeaderItem url='/academy'>Academy</HeaderItem>
            <HeaderItem url='/teams'> Equipos</HeaderItem>
            <HeaderItem url='/profile' type={user ? 'normal' : 'primary'}>
              {profileTitle}
            </HeaderItem>
          </ul>
        </nav>
      </header>
    </>
  )
}
