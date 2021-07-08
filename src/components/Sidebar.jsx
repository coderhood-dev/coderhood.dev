import Link from 'next/link'
import { motion, useTransform, AnimateSharedLayout, AnimatePresence } from 'framer-motion'

export const Sidebar = ({ title, items, itemSelected }) => {
  const titleColor =
    itemSelected === title.url ? 'text-yellow-500' : 'text-gray-900 dark:text-white'
  return (
    <aside className='h-full py-5 pr-10 overflow-y-auto'>
      <Link href={title.url}>
        <a className='cursor-pointer'>
          <h3 className={`pb-2 pl-5 pr-4 text-xl font-extrabold ${titleColor} `}>{title.text}</h3>
        </a>
      </Link>

      <AnimateSharedLayout>
        <ul className='flex flex-col items-start'>
          {items.map((item) => {
            const itemColor =
              itemSelected === item.url ? 'text-white' : 'text-gray-700 dark:text-gray-400'
            return (
              <Link key={item.url} href={item.url}>
                <motion.li className='relative'>
                  {itemSelected === item.url && (
                    <motion.div
                      layoutId='underline'
                      className='absolute top-0 w-full h-full bg-yellow-500 rounded'
                    />
                  )}

                  <a className='relative cursor-pointer'>
                    <p className={`px-5 py-1 my-1 text-sm ${itemColor} hover:text-white`}>
                      {item.text}
                    </p>
                  </a>
                </motion.li>
              </Link>
            )
          })}
        </ul>
      </AnimateSharedLayout>
    </aside>
  )
}
