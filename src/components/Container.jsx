import { motion } from 'framer-motion'
import { Header } from '@/components/Header'

export const Container = ({ title, children, column, className }) => {
  return (
    <motion.div
      className={`w-full h-full overflow-x-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header className='fixed top-0' />
      <main className={`h-full pt-20 flex ${className}`}>{children}</main>
      <footer className='px-20 text-lg text-gray-100 bg-gray-900'>Footer</footer>
    </motion.div>
  )
}
