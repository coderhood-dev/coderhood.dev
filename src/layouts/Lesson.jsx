import { parseISO, format } from 'date-fns'

import { Sidebar } from '@/components/Sidebar'
import { LessonVideo } from '@/components/LessonVideo'

export const LessonLayout = ({ frontMatter, pdfURL, lessons, children }) => {
  const {
    title,
    publishedAt,
    author,
    summary,
    readingTime,
    youtubeURL,
  } = frontMatter
  return (
    <>
      <div className='flex'>
        <div className='w-1/5 py-10'>
          <Sidebar title={title} items={lessons} />
        </div>
        <div>
          <LessonVideo videoURL={youtubeURL} title={title} />
          <article className='flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16'>
            <h1 className='mb-4 text-3xl font-bold tracking-tight md:text-5xl '>
              {title}
            </h1>
            {pdfURL ? (
              <a
                className='bg-yellow-500 rounded-full hover:ring-4 ring-yellow-500 ring-opacity-50'
                href='https://raw.githubusercontent.com/coderhood-dev/coderhood.dev/master/public/data/academy/1-fundamentos/1-datos-y-algoritmos/estructuras-de-datos.pdf'
                download
              >
                <p className='p-4 font-bold text-white'>
                  ⚡️ Descarga el pdf de la clase
                </p>
              </a>
            ) : (
              <p className='text-xl text-gray-700'>Próximamente</p>
            )}
            <div className='flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center'>
              <div className='flex items-center'>
                <p className='ml-2 text-sm text-gray-700 dark:text-gray-300'>
                  {author}
                  {publishedAt &&
                    format(parseISO(publishedAt), 'MMMM dd, yyyy')}
                </p>
              </div>
              <p className='mt-2 text-sm text-gray-500 min-w-32 md:mt-0'>
                {/* {readingTime.text} */}
              </p>
            </div>
            <div className='w-full prose dark:prose-dark max-w-none'>
              {children}
            </div>
          </article>
        </div>
      </div>
    </>
  )
}
