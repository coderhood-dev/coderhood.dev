import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='footer-container h-72 w-full flex absolute bottom-0'>
      <div className="left-section w-1/4 flex flex-col justify-between">
        <div className="footerLinks-container flex items-end ml-36 flex-grow">
          <div className="footerLinks-subcontainer flex flex-col items-start mb-4 text-gray-500">
            <Link href="/">
              <a className="footerLink hover:text-gray-400">Inicio</a>
            </Link>
            <Link href="/academy">
              <a className="footerLink hover:text-gray-400">Academy</a>
            </Link>
            <Link href="#">
              <a className="footerLink hover:text-gray-400">Equipos</a>
            </Link>
          </div>
        </div>
        <div className="footerLogo-container h-1/4 ml-28 flex items-center">
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

      <div className="main-section w-3/5 h-full flex flex-col items-center justify-between">
        <div className="joinUs-container flex flex-col items-center mt-28">
          <p>Sumate a nuestra comunidad!</p>
          <a href="https://discord.gg/jk73saSWGd" target="_blank" className="joinUs-button mt-1 bg-yellow-500 flex items-center justify-around h-12 w-80 text-lg text-black rounded-full  hover:ring-4 ring-yellow-500 ring-opacity-50">
            <div className="discord-logo w-10 h-10 bg-cover" style={{ backgroundImage: `url(https://i.imgur.com/Ftnujs7.png)` }}></div>
            Unirme a coderhood
            <div className="arrow-image w-10 h-8 bg-contain bg-no-repeat" style={{ backgroundImage: `url(https://i.imgur.com/rfvLNkR.png)` }}></div>
          </a>
        </div>
        <div className="socialMedia-container w-60 flex justify-between mb-5">
          <a href="https://www.youtube.com/channel/UCZiR1u5RtSYYt8qcenxr-Uw" target="_blank" className="socialMedia-link flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 hover:bg-gray-700">
            <div className="socialMedia-logo bg-cover bg-center h-6 w-6" style={{ backgroundImage: `url(https://i.imgur.com/f0sTtvV.png)` }}></div>
          </a>
          <a href="https://www.twitch.tv/coderhood" target="_blank" className="socialMedia-link flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 hover:bg-gray-700">
            <div className="socialMedia-logo2 h-6 w-6 bg-cover" style={{ backgroundImage: `url(https://i.imgur.com/s0Fl2YX.png)` }}></div>
          </a>
          <a href="https://twitter.com/coderhood_dev" target="_blank" className="socialMedia-link flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 hover:bg-gray-700">
            <div className="socialMedia-logo3 h-6 w-6 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: `url(https://i.imgur.com/NZnrCui.png)` }}></div>
          </a>
          <a href="https://www.instagram.com/coderhood.dev/" target="_blank" className="socialMedia-link flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 hover:bg-gray-700">
            <div className="socialMedia-logo4 h-6 w-6 bg-cover" style={{ backgroundImage: `url(https://i.imgur.com/xKpRCg5.png)` }}></div>
          </a>
        </div>
      </div>
      <div className="right-section w-1/4 h-full relative">
        <div className="rounded-points w-full h-full bg-bottom bg-contain bg-no-repeat dark:hidden" style={{ backgroundImage: `url(https://i.imgur.com/IeHjBjp.png)` }}></div>
        <div className="rounded-points w-full h-full bg-bottom bg-contain bg-no-repeat hidden dark:block" style={{ backgroundImage: `url(https://i.imgur.com/sOhyx6Q.png)` }}></div>
      </div>
    </div >
  )
}

export default Footer
