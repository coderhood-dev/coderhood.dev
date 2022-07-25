import MDX from '@/components/MDX'
import useStore from '@/lib/store'
import { ModuleLayout } from '@/layouts/Module'
import {
  getModule,
  getLessons,
  getFolderContent,
  getCompleteName,
  getModuleTitle,
} from '@/lib/files'

const Module = ({ mdxSource, title, lessons, frontMatter }) => {
  useStore.setState({ title: title.text })

  return (
    <>
      <ModuleLayout frontMatter={frontMatter} lessons={lessons} title={title}>
        <MDX source={mdxSource} />
      </ModuleLayout>
    </>
  )
}

export const getStaticPaths = async () => {
  const content = await getFolderContent('academy')

  const paths = content.map(m => `/academy/${m.split(/-(.+)/)[1]}`)

  return { paths, fallback: false }
}

export const getStaticProps = async ({ params: { module: moduleURL } }) => {
  const moduleName = await getCompleteName(moduleURL, 'academy')

  const lessons = await getLessons(moduleURL)
  const title = await getModuleTitle(moduleURL)
  const module = await getModule(moduleName)

  return {
    props: { ...module, title, lessons },
  }
}

export default Module
