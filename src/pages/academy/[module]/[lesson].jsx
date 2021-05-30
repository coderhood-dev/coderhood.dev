import { MDXRemote } from 'next-mdx-remote'

import useStore from '@/lib/store'
import { getFolderContent, getLesson, getLessons } from '@/lib/files'
import { LessonLayout } from '@/layouts/Lesson'

const LessonPage = ({ mdxSource, frontMatter, lessons }) => {
  return (
    <>
      <LessonLayout frontMatter={frontMatter} lessons={lessons}>
        <MDXRemote
          {...mdxSource}
          // components={}
        />
      </LessonLayout>
    </>
  )
  // useStore.setState({ title: module })
  // return (
  //   <>
  //     <div className='flex h-full bg-white'>
  //       <div className='w-1/5 py-10'>
  //         <a className='cursor-pointer'>
  //           <h3
  //             className='pb-10 pl-10 pr-4 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-700 to-gray-900'
  //             onClick={() => useStore.setState({ lesson: null })}
  //           >
  //             {module}
  //           </h3>
  //         </a>
  //         {lessons.map((l) => (
  //           <a
  //             className='cursor-pointer'
  //             onClick={() => useStore.setState({ lesson: l })}
  //             key={l.id}
  //           >
  //             <p
  //               className={`px-10 py-1 my-1 text-lg hover:bg-gray-100 ${
  //                 lesson && l.id === lesson.id
  //                   ? 'text-yellow-500'
  //                   : 'text-gray-700'
  //               }`}
  //             >{`Clase ${l.id}`}</p>
  //           </a>
  //         ))}
  //       </div>
  //       <div className='w-4/5 h-full shadow-2xl'>
  //         {lesson ? (
  //           <Lesson key={lesson.id} lesson={lesson} />
  //         ) : (
  //           <div className='flex items-center justify-center h-full'>
  //             <p className='text-center text-gray-700'>
  //               Selecciona una leccion para ver su contenido.
  //               <br /> En una futura update aca se va a cargar el README.md del
  //               módulo.
  //             </p>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </>
  // )
}

export const getStaticPaths = async (props) => {
  const content = await getFolderContent('academy')

  const paths = []
  for (const module of content) {
    const moduleName = module.split(/-(.+)/)[1]

    const lessons = await getFolderContent(`academy/${module}`)

    lessons.forEach((lesson) => {
      // in the module folder there will be folders for lessons and one readme.mdx, we don't want it
      if (!lesson.includes('.')) {
        const lessonName = lesson.split(/-(.+)/)[1]

        paths.push(`/academy/${moduleName}/${lessonName}`)
      }
    })
  }

  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
  const { module: moduleURL, lesson: lessonURL } = params

  const lesson = await getLesson(lessonURL, moduleURL)
  const lessons = await getLessons(moduleURL)

  return {
    props: { ...lesson, lessons },
  }
}

export default LessonPage
