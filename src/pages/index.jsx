import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bubbles } from '@/components/Bubbles'
import { Container } from '@/components/Container'
import { learningBubbles } from '@/data/learningBubbles'
import { useAuth } from '@/hooks/useAuth'
import { Account } from '@/components/Account'
// import { Auth } from '@/components/Auth/_Signin'
import { AuthModal } from '@/components/Auth'
import { supabase } from '@/lib/supabaseClient'

const Home = ({ modules }) => {
  return (
    <>
      <Container title='home' className='flex-col-reverse sm:flex-row'>
        {/* hero */}
        <section className='flex items-center w-full h-full p-4 pt-0 sm:w-3/5 sm:p-20'>
          <div className='flex flex-col max-w-4xl gap-y-4 bg-opacity-60'>
            <div className='relative overflow-hidden'>
              <motion.h1
                className='font-serif text-xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-br from-pink-400 to-red-600'
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, delay: 0.5, ease: 'easeInOut' }}
              >
                Compartimos conocimiento,
                <br /> Aprendemos juntos
              </motion.h1>
            </div>
            <h3 className='text-sm font-light text-gray-700 dark:text-gray-100 sm:text-lg'>
              <span className='bg-white dark:bg-gray-900'>
                Somos una comunidad de personas en tech que aprende y comparte conocimiento. No
                sabemos todo, el mundo tech es enorme y lleva una vida de aprendizaje, pero mientras
                vamos aprendiendo creemos que compartido el viaje es mejor. Por eso incentivamos
                siempre a que una vez se aprenda algo, le que quiera pueda compartirlo y asi crecer
                juntos.
                <br />
                Coderhood es y siempre va a ser gratis, tanto la comunidad, como las clases y
                cualquiera de sus espacios.
              </span>
            </h3>
          </div>
        </section>
      </Container>
    </>
  )
}

export default Home

export async function getStaticProps() {
  return {
    props: {
      title: 'Coderhood',
    },
  }
}
