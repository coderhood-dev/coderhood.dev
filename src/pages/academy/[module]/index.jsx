import { MDXRemote } from 'next-mdx-remote'

import useStore from '@/lib/store'
import { getTitleFromFile } from '@/lib/string'
import { ModuleLayout } from '@/layouts/Module'
import {
  getModule,
  getLessons,
  getFolderContent,
  getCompleteName,
} from '@/lib/files'

const Modules = ({ mdxSource, title, lessons, frontMatter }) => {
  useStore.setState({ title })
  console.log('mdxSource', mdxSource)
  console.log('frontMatter', frontMatter)

  return (
    <>
      <ModuleLayout frontMatter={frontMatter} title={title} lessons={lessons}>
        <MDXRemote
          {...mdxSource}
          components={{
            Steps: ({ children }) => <ul>{children}</ul>,
            Image: ({ children, ...props }) => <img {...props}>{children}</img>,
          }}
        />
      </ModuleLayout>
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
  const moduleName = await getCompleteName(moduleURL, 'academy')

  const title = getTitleFromFile(moduleName)

  const module = await getModule(moduleName)

  return {
    props: { ...module, title, lessons },
  }
}

export default Modules
