import Link from 'next/link'

import useStore from '@/lib/store'
import { getFolderContent } from '@/lib/mdx'
import { parseFileName } from '@/lib/string'
import { Lesson } from '@/components/lesson/Lesson'

const Modules = ({ title, lessons }) => {
  const lesson = useStore((state) => state.lesson)
  useStore.setState({ title })
  return (
    <>
      <div className='flex h-full bg-white'>
        <div className='w-1/5 py-10'>
          <a className='cursor-pointer'>
            <h3
              className='pb-10 pl-10 pr-4 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-700 to-gray-900'
              onClick={() => useStore.setState({ lesson: null })}
            >
              {title}
            </h3>
          </a>

          {lessons.map((l) => (
            <a
              className='cursor-pointer'
              onClick={() => useStore.setState({ lesson: l })}
              key={l.name}
            >
              <p
                className={`px-10 py-1 my-1 text-lg hover:bg-gray-100 ${
                  lesson && l.name === lesson.name
                    ? 'text-yellow-500'
                    : 'text-gray-700'
                }`}
              >
                {l.title}
              </p>
            </a>
          ))}
        </div>
        <div className='w-4/5 h-full shadow-2xl'>
          {lesson ? (
            <Lesson key={lesson.name} lesson={lesson} />
          ) : (
            <div className='flex items-center justify-center h-full'>
              <p className='text-center text-gray-700'>
                Selecciona una leccion para ver su contenido.
                <br /> En una futura update aca se va a cargar el README.md del
                módulo.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const content = await getFolderContent('academy')

  const paths = content.map((m) => `/academy/${m.split(/-(.+)/)[1]}`)

  return { paths, fallback: false }
}

export const getStaticProps = async ({ params: { module: moduleShort } }) => {
  const content = await getFolderContent('academy')

  const module = content.find((m) => m.includes(moduleShort))
  const { title } = parseFileName(module)

  const moduleFiles = await getFolderContent(`academy/${module}`)

  const lessons = moduleFiles
    .filter((m) => !m.includes('.'))
    .map((m) => parseFileName(m))
  console.log('lessons', lessons, module)

  return {
    props: { title, lessons },
  }
}

export default Modules
