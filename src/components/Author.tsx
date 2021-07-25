import React from 'react'
import Image from 'next/image'

const team = {
  Ema: '/images/team/ema.png',
  Meison: '/images/team/Meison.jpg',
  Lucas: '/images/team/Lucas.jpg',
  Tomas: '/images/team/Tomas.png',
  Pablo: '/images/team/Pablo.jpg',
}

export const Author: React.FC<{ author: string }> = ({ author }) => {
  const src = team[author] || '/images/logos/logo.png'
  return (
    <Image
      className='rounded-full'
      src={src}
      alt='Bubble Image'
      height={64}
      width={64}
      quality={65}
      objectFit='cover'
      priority
    />
  )
}
