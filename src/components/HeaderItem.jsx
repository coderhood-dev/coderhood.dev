import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion } from 'framer-motion'

export const HeaderItem = ({ url, children }) => {
  const { asPath } = useRouter()
  const color = asPath.includes(url) ? 'text-yellow-500' : 'text-white'
  console.log('path', asPath, url)
  return (
    <motion.li
      className={`mr-5`} // bg-yellow-500 rounded-full hover:ring-4 ring-yellow-500 ring-opacity-50
      // initial={{ x: 250 }}
      // animate={{ x: 0 }}
      // exit={{ x: 250, transition: { delay: 0.2, duration: 0.7 } }}
      // transition={{
      //   duration: 1,
      //   delay: 0.5,
      //   type: 'spring',
      // }}
    >
      <Link href={url}>
        <a>
          <p className={`p-2 text-xs font-bold ${color} sm:p-4`}>{children}</p>
        </a>
      </Link>
    </motion.li>
  )
}
