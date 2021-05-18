import { Dots } from '@/components/dots/Dots'

const Home = ({ modules }) => {
  return (
    <>
      <div className='min-h-screen'>
        {/* hero */}
        <section className='flex items-center h-screen p-4 pt-0 sm:p-20'>
          <div className='flex flex-col max-w-4xl gap-y-4'>
            <h1 className='text-xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 font-display'>
              Compartimos conocimiento,
              <br /> Aprendemos juntos
            </h1>
            <h3 className='text-sm font-thin text-gray-700 dark:text-gray-100 sm:text-lg'>
              Somos una comunidad de personas en tech que aprende y comparte
              conocimiento. No sabemos todo, el mundo tech es enorme y lleva una
              vida de aprendizaje, pero mientras vamos aprendiendo creemos que
              compartido el viaje es mejor. Por eso incentivamos siempre a que
              una vez se aprenda algo, le que quiera pueda compartirlo y asi
              crecer juntos.
              <br />
              Coderhood es y siempre va a ser gratis, tanto la comunidad, como
              las clases y cualquiera de sus espacios.
            </h3>
          </div>
        </section>
      </div>
      <Dots r3f />
    </>
  )
}

export default Home
