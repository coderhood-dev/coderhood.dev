import { Sidebar } from '@/components/Sidebar'
import { Container } from '@/components/Container'

export const ModuleLayout = ({ frontMatter, title, lessons, children }) => {
  return (
    <Container>
      <div className='w-1/4'>
        <div className='flex justify-end h-full'>
          <Sidebar title={title} items={lessons} itemSelected={title.url} />
        </div>
      </div>
      <div className='w-3/4 h-full'>
        <div className='max-w-7xl'>
          <article>
            <div className='w-full prose dark:prose-dark lg:prose-xl max-w-none'>
              {children}
            </div>
          </article>
        </div>
      </div>
    </Container>
  )
}
