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
    <header
      className={`h-20 w-full z-10 flex border-b items-center dark:border-gray-900 border-gray-200 bg-white dark:bg-gray-900 ${className}`}
      // style={{
      //   backgroundImage: 'linear-gradient(to top, rgba(255,0,0,0), rgba(255,255,255,1))',
      // }}
    >
      {/* <Head title={title} /> */}
      <div
        className='relative flex items-center justify-between w-full h-full pl-10 pr-10'
        // style={{ backdropFilter: 'blur(5px)' }}
      >
        <div className='flex items-center justify-start'>
          <Link href='/'>
            <a className='flex w-30 sm:w-48'>
              <Image
                src='/images/logos/logo-full.png'
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
        <nav className='flex'>
          <ul className='flex items-center'>
            <HeaderItem url='/academy'>Academy</HeaderItem>
            <HeaderItem url='/teams'> Equipos</HeaderItem>
            <HeaderItem url='/profile' type={user ? 'normal' : 'primary'}>
              {profileTitle}
            </HeaderItem>
            <ThemeSwitcher />
          </ul>
        </nav>
      </div>
    </header>
  )
}
