import { useRef, useEffect } from 'react'
import { Dots } from '@/components/dots/Dots'
import { Bubbles } from '@/components/bubbles/Bubbles'
import { learningBubbles } from '@/data/learningBubbles'
// import Packery from 'packery'
// import dynamic from 'next/dynamic'

// const Packery = dynamic(() => import('packery'), {
//   ssr: false,
// })

const Home = ({ modules }) => {
  // const bubblesContainerRef = useRef(null)

  // console.log('Packery', Packery)

  // useEffect(() => {
  //   if (bubblesContainerRef.current) {
  //     new Packery(bubblesContainerRef.current, {
  //       itemSelector: '.bubble',
  //       gutter: 5,
  //     })
  //   }
  // }, [bubblesContainerRef])
  return (
    <>
      <div className='flex flex-col-reverse min-h-screen sm:flex-row'>
        {/* hero */}
        <section className='flex items-center w-full h-screen p-4 pt-0 sm:w-3/5 sm:p-20'>
          <div className='flex flex-col max-w-4xl gap-y-4 bg-opacity-60'>
            <h1 className='text-xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 font-display'>
              Compartimos conocimiento,
              <br /> Aprendemos juntos
            </h1>
            <h3 className='text-sm font-light text-gray-700 dark:text-gray-100 sm:text-lg'>
              <span className='bg-white dark:bg-black'>
                Somos una comunidad de personas en tech que aprende y comparte
                conocimiento. No sabemos todo, el mundo tech es enorme y lleva
                una vida de aprendizaje, pero mientras vamos aprendiendo creemos
                que compartido el viaje es mejor. Por eso incentivamos siempre a
                que una vez se aprenda algo, le que quiera pueda compartirlo y
                asi crecer juntos.
                <br />
                Coderhood es y siempre va a ser gratis, tanto la comunidad, como
                las clases y cualquiera de sus espacios.
              </span>
            </h3>
          </div>
        </section>

        {/* bubbles */}
        <section className='w-full sm:w-2/5 '>
          <Bubbles bubbles={learningBubbles} />
        </section>
      </div>
      <Dots r3f />
      {/* <mesh r3f>
        <circleGeometry args={[5, 32, 32]} />
        <meshBasicMaterial />
      </mesh> */}
    </>
  )
}

export default Home
