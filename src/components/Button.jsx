export const Button = ({ children, className, loading, disabled, ...props }) => {
  const isDisabled = loading || disabled
  const background = isDisabled ? 'bg-gray-300' : 'bg-yellow-500 dark:bg-gray-900'

  return (
    <button
      className={`inline px-4 py-2 text-sm font-medium text-white focus:ring-1 dark:focus:ring-1 dark:border dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-yellow-500 rounded-full focus:outline-none dark:hover:border-gray-600 font-serif ${background} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      <p className='text-xs'>{loading ? '...' : children}</p>
    </button>
  )
}
