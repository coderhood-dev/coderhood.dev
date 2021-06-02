import { Sidebar } from '@/components/Sidebar'

export const ModuleLayout = ({ frontMatter, title, lessons, children }) => {
  return (
    <div className='flex'>
      <div className='w-1/4 py-10'>
        <Sidebar title={title} items={lessons} itemSelected={title.url} />
      </div>
      <div className='w-3/4 h-full'>
        <article>
          <div className='w-full prose dark:prose-dark max-w-none'>
            {children}
          </div>
        </article>
      </div>
    </div>
  )
}
