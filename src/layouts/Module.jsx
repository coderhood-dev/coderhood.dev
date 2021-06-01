import { Sidebar } from '@/components/Sidebar'

export const ModuleLayout = ({ frontMatter, title, lessons, children }) => {
  return (
    <div className='flex items-stretch'>
      <div className='py-10' style={{ width: '30%' }}>
        <Sidebar title={title} items={lessons} />
      </div>
      <div className='h-full' style={{ flex: 1 }}>
        Module
        <article>
          <div className='w-full prose dark:prose-dark max-w-none'>
            {children}
          </div>
        </article>
      </div>
    </div>
  )
}
