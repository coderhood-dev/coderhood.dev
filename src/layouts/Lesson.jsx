import { parseISO, format } from 'date-fns'
import { useRouter } from 'next/router'

import { Sidebar } from '@/components/Sidebar'
import { LessonVideo } from '@/components/LessonVideo'
import { Container } from '@/components/Container'
import { Author } from '@/components/Author'

export const LessonLayout = ({
  title,
  frontMatter,
  pdfURL,
  lessons,
  children,
}) => {
  const { asPath } = useRouter()
  const { publishedAt, author, summary, readingTime, youtubeURL } = frontMatter
  return (
    <>
      <Container className='mx-auto'>
        <div className='flex-initial w-1/4'>
          <div className='flex justify-end h-full'>
            <Sidebar title={title} items={lessons} itemSelected={asPath} />
          </div>
        </div>
        <div className='w-3/4 h-full overflow-y-scroll'>
          <LessonVideo videoURL={youtubeURL} title={title} />
          {/* <div className='bg-red-300 max-w-7xl'> */}
          <div className='flex justify-between p-10'>
            <div className='flex'>
              <Author author={author} />
              {/* <p className='ml-2 text-sm text-gray-700 dark:text-gray-300'>
                {author}
              </p> */}
              <p className='ml-2 text-sm text-gray-700 dark:text-gray-300'>
                {publishedAt && format(parseISO(publishedAt), 'MMMM dd, yyyy')}
              </p>
            </div>
            {pdfURL ? (
              <a
                className='self-start bg-yellow-500 rounded-full hover:ring-4 ring-yellow-500 ring-opacity-50'
                href={pdfURL}
                download
              >
                <p className='p-4 font-bold text-white'>
                  ⚡️ Descarga el pdf de la clase
                </p>
              </a>
            ) : (
              <p className='text-xl text-gray-700'>Próximamente</p>
            )}
          </div>

          <article className='flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16'>
            <h1 className='mb-4 text-3xl font-bold md:text-5xl '>
              {title.text}
            </h1>
            <div
              className='w-full prose dark:prose-dark max-w-none'
              // TODO: prose variants are not working, maybe could check into tailwind typography plugin to find out a config to make it work later
              // prose-sm sm:prose lg:prose-lg xl:prose-xl
            >
              {children}
            </div>
          </article>
        </div>
        {/* </div> */}
      </Container>
    </>
  )
}
