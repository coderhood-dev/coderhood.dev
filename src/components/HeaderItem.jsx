import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion } from 'framer-motion'

export const HeaderItem = ({ url, children, type = 'normal' }) => {
  const { asPath } = useRouter()
  const color = asPath.includes(url) ? 'text-yellow-500' : 'text-dark dark:text-white'

  const primaryStyles =
    'bg-yellow-500 font-medium text-white dark:bg-gray-900 focus:ring-2 dark:focus:ring-1 dark:border dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-yellow-500 rounded-full focus:outline-none dark:hover:border-gray-600'

  return (
    <Link href={url}>
      <a className={`mx-2 ${type === 'primary' && primaryStyles}`}>
        <p className={`px-4 py-2 text-xs font-bold ${color} font-serif`}>{children}</p>
      </a>
    </Link>
  )
}
