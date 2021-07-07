import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import Footer from './Footer'

export const Container = ({ title, children, column, className }) => {
  return (
    <motion.div
      // className={`w-full h-full flex flex-col overflow-x-hidden`}  Comente esto xq me pisaba el footer.
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* TODO: Hacksito para fixear despues, el header esta tapando la scrollbar */}
      <Header className='absolute top-0 right-5' />
      <main className={`flex-1 pt-20 flex ${className}`}>{children}</main>
      {/* <footer className='px-20 text-lg text-gray-100 bg-gray-900'>Footer</footer> */}
      <Footer />
    </motion.div>
  )
}
