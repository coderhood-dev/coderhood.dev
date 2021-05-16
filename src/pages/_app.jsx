import { Children } from 'react'
import dynamic from 'next/dynamic'
import Dom from '@/components/layout/_dom'

import '@/styles/index.css'

let LCanvas = null
if (process.env.NODE_ENV === 'production') {
  LCanvas = dynamic(() => import('@/components/layout/_canvas'), {
    ssr: false,
  })
} else {
  LCanvas = require('@/components/layout/_canvas').default
}

function Layout({ dom }) {
  return <>{dom && <Dom>{dom}</Dom>}</>
}

function App({ Component, pageProps }) {
  let r3fArr = []
  let compArr = []

  Children.forEach(Component(pageProps).props.children, (child) => {
    if (child.props && child.props.r3f) {
      r3fArr.push(child)
    } else {
      compArr.push(child)
    }
  })

  return (
    <>
      {compArr && <Layout dom={compArr} />}
      {r3fArr && <LCanvas>{r3fArr}</LCanvas>}
    </>
  )
}

export default App
