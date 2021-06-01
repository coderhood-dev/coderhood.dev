import { Sidebar } from '@/components/Sidebar'

export const ModuleLayout = ({ frontMatter, title, lessons, children }) => {
  return (
    <div className='flex'>
      <div className='w-1/5 py-10'>
        <Sidebar title={title} items={lessons} />
      </div>
      <div className='w-4/5 h-full shadow-2xl'>
        <article>
          <div className='w-full prose dark:prose-dark max-w-none'>
            {children}
          </div>
        </article>
      </div>
    </div>
  )
}
