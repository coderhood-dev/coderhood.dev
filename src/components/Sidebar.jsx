import Link from 'next/link'
import { useRouter } from 'next/router'

export const Sidebar = ({ title, items }) => {
  const { asPath } = useRouter()
  return (
    <aside className='w-full h-full'>
      <a className='cursor-pointer'>
        <h3 className='pb-5 pl-10 pr-4 text-xl font-extrabold text-gray-900 dark:text-white'>
          {title}
        </h3>
      </a>
      <ul>
        {items.map((item) => (
          <li key={item.url}>
            <Link href={item.url}>
              <a className='cursor-pointer'>
                <p
                  className={`px-10 py-1 my-1 text-sm hover:bg-gray-100 ${
                    asPath === item.url
                      ? 'text-yellow-500'
                      : 'text-gray-700 dark:text-gray-400'
                  }`}
                >
                  {item.title}
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
