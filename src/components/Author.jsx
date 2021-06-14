import Image from 'next/image'

const team = {
  Ema: '/images/team/ema.png',
}

export const Author = ({ author }) => {
  const src = team[author]
  console.log(src)
  return (
    <Image
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
