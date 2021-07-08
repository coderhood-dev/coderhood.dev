import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='flex w-full footer-container h-72'>
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
                src='/images/logo-full.png'
                alt='Coderhood logo'
                height={42}
                width={192}
                quality={65}
              />
            </a>
          </Link>
        </div>
      </div>

      <div className='flex flex-col items-center justify-between w-3/5 h-full main-section'>
        <div className='flex flex-col items-center joinUs-container mt-28'>
          <p>Sumate a nuestra comunidad!</p>
          <a
            href='https://discord.gg/JJpBQYJ'
            target='_blank'
            className='flex items-center justify-around h-12 mt-1 text-lg text-black bg-yellow-500 rounded-full joinUs-button w-80 hover:ring-4 ring-yellow-500 ring-opacity-50'
            rel='noreferrer'
          >
            <div
              className='w-10 h-10 bg-cover discord-logo'
              style={{ backgroundImage: `url(https://i.imgur.com/Ftnujs7.png)` }}
            ></div>
            Unirme a coderhood
            <div
              className='w-10 h-8 bg-no-repeat bg-contain arrow-image'
              style={{ backgroundImage: `url(https://i.imgur.com/rfvLNkR.png)` }}
            ></div>
          </a>
        </div>
        <div className='flex justify-between mb-5 socialMedia-container w-60'>
          <a
            href='https://www.youtube.com/channel/UCZiR1u5RtSYYt8qcenxr-Uw'
            target='_blank'
            className='flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full socialMedia-link hover:bg-gray-700'
            rel='noreferrer'
          >
            <div
              className='w-6 h-6 bg-center bg-cover socialMedia-logo'
              style={{ backgroundImage: `url(https://i.imgur.com/f0sTtvV.png)` }}
            ></div>
          </a>
          <a
            href='https://www.twitch.tv/coderhood'
            target='_blank'
            className='flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full socialMedia-link hover:bg-gray-700'
            rel='noreferrer'
          >
            <div
              className='w-6 h-6 bg-cover socialMedia-logo2'
              style={{ backgroundImage: `url(https://i.imgur.com/s0Fl2YX.png)` }}
            ></div>
          </a>
          <a
            href='https://twitter.com/coderhood_dev'
            target='_blank'
            className='flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full socialMedia-link hover:bg-gray-700'
            rel='noreferrer'
          >
            <div
              className='w-6 h-6 bg-center bg-no-repeat bg-contain socialMedia-logo3'
              style={{ backgroundImage: `url(https://i.imgur.com/NZnrCui.png)` }}
            ></div>
          </a>
          <a
            href='https://www.instagram.com/coderhood.dev/'
            target='_blank'
            className='flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full socialMedia-link hover:bg-gray-700'
            rel='noreferrer'
          >
            <div
              className='w-6 h-6 bg-cover socialMedia-logo4'
              style={{ backgroundImage: `url(https://i.imgur.com/xKpRCg5.png)` }}
            ></div>
          </a>
        </div>
      </div>
      <div className='relative w-1/4 h-full right-section'>
        <div
          className='w-full h-full bg-bottom bg-no-repeat bg-contain rounded-points'
          style={{ backgroundImage: `url(https://i.imgur.com/3XkLCqg.png)` }}
        ></div>
      </div>
    </div>
  )
}

export default Footer
