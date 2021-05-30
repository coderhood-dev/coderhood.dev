import useStore from '@/lib/store'
import { getLessons, getFolderContent, getCompleteName } from '@/lib/files'
import { getTitleFromFile } from '@/lib/string'
import { Sidebar } from '@/components/Sidebar'

const Modules = ({ title, lessons }) => {
  useStore.setState({ title })

  return (
    <>
      <div className='flex h-full bg-white'>
        <div className='w-1/5 py-10'>
          <Sidebar title={title} items={lessons} />
        </div>
        <div className='w-4/5 h-full shadow-2xl'>
          <div className='flex items-center justify-center h-full'>
            <p className='text-center text-gray-700'>
              Selecciona una leccion para ver su contenido.
              <br /> En una futura update aca se va a cargar el README.md del
              módulo.
            </p>
          </div>
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

export const getStaticProps = async ({ params: { module: moduleURL } }) => {
  const lessons = await getLessons(moduleURL)
  const module = await getCompleteName(moduleURL, 'academy')

  const title = getTitleFromFile(module)

  return {
    props: { title, lessons },
  }
}

export default Modules
