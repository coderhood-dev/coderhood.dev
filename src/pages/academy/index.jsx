import { motion } from 'framer-motion'
import Link from 'next/link'

import { getFolderContent } from '@/lib/files'
import useStore from '@/lib/store'
import { capitalize } from '@/lib/string'
import { Container } from '@/components/Container'

const listVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  initial: { x: -50, opacity: 0 },
  animate: { x: 0.5, opacity: 1 },
}

const Academy = ({ modules }) => {
  useStore.setState({ title: 'Coderhood Academy' })
  return (
    <>
      <Container title='academy'>
        <div className='flex flex-col min-h-screen p-6 sm:p-20'>
          <h1 className='text-xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl '>
            Coderhood Academy 🎓
          </h1>
          <p className='pt-5 text-xs text-gray-600 dark:text-gray-300 sm:text-sm'>
            El material que preparamos esta pensado para que puedas aprender lo necesario para ser
            un Desarrollador Full Stack en aproximadamente 6 meses. La modalidad va a ser la
            siguiente, dos veces por semana vamos a tener clases a travez de streamings en vivo por
            Twitch. Cada presentación de la clase va a estar en este repositorio así que si no
            pudiste estar vas a poder ponerte al día buscando y leyendo tu clase. Dos días después
            los streamings van a estar en nuestro canal de Youtube para que los puedas ver cuando
            quieras. En cada clase vamos a intentar dejarte ejercicios para que practiques,
            esforzate en hacerlos porque así es como te demostras a vos que realmente estas
            aprendiendo. Varias veces te vas a bloquear o vas a tener dudas, le pasa a todo el mundo
            y para eso tenes la comunidad en Discord. Además, la primera clase vamos a formar
            equipos. Tu equipo van a ser otras 2 personas que van a hacer el mismo camino que vos,
            den lo mejor para ayudarse mutuamente. Si no pudiste resolver los ejercicios planteados
            para una clase no te preocupes, la clase siguiente los vamos a resolver en vivo antes de
            continuar con los temas.
          </p>

          <h3 className='pt-16 pb-5 text-3xl font-extrabold'>Módulos</h3>
          <motion.ul variants={listVariants} initial='initial' animate='animate'>
            {modules.map((module) => (
              <motion.li key={module.name} variants={itemVariants}>
                <Link href={`/academy/${module.name}`}>
                  <a>
                    <p className='p-4 text-lg text-gray-600 dark:text-gray-300'>{`📓 ${module.title}`}</p>
                  </a>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </>
  )
}

export default Academy

export async function getStaticProps() {
  const content = await getFolderContent('academy')

  const modules = content.map((module) => {
    const name = module.split(/-(.+)/)[1]
    const words = name.split('-')
    const [fistWord, ...others] = words
    const title = [capitalize(fistWord), ...others].join(' ')

    return { title, name }
  })

  return {
    props: { modules, title: 'Academy' },
  }
}
