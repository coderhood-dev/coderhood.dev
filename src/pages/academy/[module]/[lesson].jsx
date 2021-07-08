import { MDXRemote } from 'next-mdx-remote'

import useStore from '@/lib/store'
import { getFolderContent, getLesson, getLessons, getModuleTitle } from '@/lib/files'
import { LessonLayout } from '@/layouts/Lesson'

const LessonPage = ({ title, pdfURL, mdxSource, frontMatter, lessons }) => {
  useStore.setState({ title: title.text })

  return (
    <>
      <LessonLayout frontMatter={frontMatter} lessons={lessons} pdfURL={pdfURL} title={title}>
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
  const title = await getModuleTitle(moduleURL)

  return {
    props: { ...lesson, title, lessons },
  }
}

export default LessonPage
