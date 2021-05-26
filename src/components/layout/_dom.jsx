import useStore from '@/lib/store'
import { Header } from '@/components/header/Header'
import { useRef } from 'react'

const Dom = ({ children }) => {
  const ref = useRef(null)
  useStore.setState({ dom: ref })

  return (
    <div
      className='absolute top-0 left-0 z-10 w-screen h-screen overflow-y-scroll dom'
      ref={ref}
    >
      <Header />
      {children}
    </div>
  )
}

export default Dom
