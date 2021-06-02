import { Header } from '@/components/Header'

export const Container = ({ children, column }) => {
  const flexDirection = column ? 'flex-col' : 'flex-row'
  return (
    <div className='w-full h-full'>
      <Header />
      <main className={`h-full flex ${flexDirection}`}>{children}</main>
      <footer className='p-20 text-lg text-gray-100 bg-gray-900'>Footer</footer>
    </div>
  )
}
