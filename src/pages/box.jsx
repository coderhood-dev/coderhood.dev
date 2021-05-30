import useStore from '@/lib/store'
import dynamic from 'next/dynamic'

const Box = dynamic(() => import('@/components/Box'), {
  ssr: false,
})

const Page = () => {
  useStore.setState({ title: 'Box' })
  return (
    <>
      <Box r3f route='/' />
    </>
  )
}

export default Page
