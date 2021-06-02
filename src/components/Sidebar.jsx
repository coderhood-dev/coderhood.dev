import Link from 'next/link'

export const Sidebar = ({ title, items, itemSelected }) => {
  const titleColor =
    itemSelected === title.url
      ? 'text-yellow-500'
      : 'text-gray-900 dark:text-white'
  return (
    <aside className='w-full h-full overflow-y-scroll'>
      <Link href={title.url}>
        <a className='cursor-pointer'>
          <h3
            className={`pb-2 pl-10 pr-4 text-xl font-extrabold ${titleColor} `}
          >
            {title.text}
          </h3>
        </a>
      </Link>
      <ul>
        {items.map((item) => {
          const itemColor =
            itemSelected === item.url
              ? 'text-yellow-500'
              : 'text-gray-700 dark:text-gray-400'
          return (
            <li key={item.url}>
              <Link href={item.url}>
                <a className='cursor-pointer'>
                  <p
                    className={`px-10 py-1 my-1 text-sm hover:bg-gray-100 ${itemColor}`}
                  >
                    {item.text}
                  </p>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
