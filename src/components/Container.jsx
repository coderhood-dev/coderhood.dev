import { Header } from '@/components/Header'

export const Container = ({ children, column, className }) => {
  return (
    <div className={`w-full h-full`}>
      <Header />
      <main className={`h-full flex ${className}`}>{children}</main>
      <footer className='p-20 text-lg text-gray-100 bg-gray-900'>Footer</footer>
    </div>
  )
}
