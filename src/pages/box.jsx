import dynamic from 'next/dynamic'

import useStore from '@/lib/store'

const Box = dynamic(() => import('@/components/Box'), {
  ssr: false,
})

const Page = () => {
  return (
    <>
      <Box r3f route='/' />
    </>
  )
}

export default Page
