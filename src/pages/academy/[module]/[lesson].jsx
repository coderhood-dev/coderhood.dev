import { MDXRemote } from 'next-mdx-remote'

import { getFolderContent, getLesson, getLessons } from '@/lib/files'
import { LessonLayout } from '@/layouts/Lesson'

const LessonPage = ({ pdfURL, mdxSource, frontMatter, lessons }) => {
  return (
    <>
      <LessonLayout frontMatter={frontMatter} lessons={lessons} pdfURL={pdfURL}>
        <MDXRemote
          {...mdxSource}
          components={{
            Steps: ({ children }) => <ul>{children}</ul>,
            Image: ({ children, ...props }) => <img {...props}>{children}</img>,
          }}
        />
      </LessonLayout>
    </>
  )
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
