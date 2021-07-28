import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Button } from '@/components/Button'

const Footer = () => {
  const router = useRouter()

  return (
    <div className='flex w-full bg-black'>
      <div className='flex flex-col justify-between w-1/4 left-section'>
        <div className='flex items-end flex-grow footerLinks-container ml-36'>
          <div className='flex flex-col items-start mb-4 text-gray-500 footerLinks-subcontainer'>
            <Link href='/'>
              <a className='footerLink hover:text-gray-400'>Inicio</a>
            </Link>
            <Link href='/academy'>
              <a className='footerLink hover:text-gray-400'>Academy</a>
            </Link>
            <Link href='#'>
              <a className='footerLink hover:text-gray-400'>Equipos</a>
            </Link>
          </div>
        </div>
        <div className='flex items-center footerLogo-container h-1/4 ml-28'>
          <Link href='/'>
            <a className='flex w-32 sm:w-60'>
              <Image
                alt='Coderhood logo'
                height={42}
                quality={65}
                src='/images/logos/logo-full.png'
                width={192}
              />
            </a>
          </Link>
        </div>
      </div>

      <div className='flex flex-col items-center justify-between w-3/5 h-full main-section'>
        <div className='flex flex-col items-center joinUs-container mt-28'>
          <p className='pb-5 text-xs text-center text-white prose-lg'>
            Dentro de Discord vive nuestra comunidad. Ahí hacemos preguntas y respuestas de todo
            tipo relacionadas a este mundo, desde consejos para buscar trabajo, preguntas técnicas
            hasta salud y compartir espacio de trabajo escuchando música. Si todavía no estas
            sumate!
          </p>
          <Button className='mb-10' onClick={() => router.push('https://discord.gg/JJpBQYJ')}>
            <div className='flex items-center'>
              <Image
                alt='Coderhood logo'
                height={16}
                quality={65}
                src='/images/logos/discord.png'
                width={16}
              />{' '}
              <p className='ml-2'>Unirme a la comunidad</p>
            </div>
          </Button>
        </div>
        <div className='flex justify-between mb-5 socialMedia-container w-60'>
          <a
            className='flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full socialMedia-link hover:bg-gray-700'
            href='https://www.youtube.com/channel/UCZiR1u5RtSYYt8qcenxr-Uw'
            rel='noreferrer'
            target='_blank'
          >
            <div
              className='w-6 h-6 bg-center bg-cover socialMedia-logo'
              style={{ backgroundImage: `url(https://i.imgur.com/f0sTtvV.png)` }}
            ></div>
          </a>
          <a
            className='flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full socialMedia-link hover:bg-gray-700'
            href='https://www.twitch.tv/coderhood'
            rel='noreferrer'
            target='_blank'
          >
            <div
              className='w-6 h-6 bg-cover socialMedia-logo2'
              style={{ backgroundImage: `url(https://i.imgur.com/s0Fl2YX.png)` }}
            ></div>
          </a>
          <a
            className='flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full socialMedia-link hover:bg-gray-700'
            href='https://twitter.com/coderhood_dev'
            rel='noreferrer'
            target='_blank'
          >
            <div
              className='w-6 h-6 bg-center bg-no-repeat bg-contain socialMedia-logo3'
              style={{ backgroundImage: `url(https://i.imgur.com/NZnrCui.png)` }}
            ></div>
          </a>
          <a
            className='flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full socialMedia-link hover:bg-gray-700'
            href='https://www.instagram.com/coderhood.dev/'
            rel='noreferrer'
            target='_blank'
          >
            <div
              className='w-6 h-6 bg-cover socialMedia-logo4'
              style={{ backgroundImage: `url(https://i.imgur.com/xKpRCg5.png)` }}
            ></div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
