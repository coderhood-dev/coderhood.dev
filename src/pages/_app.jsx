import { Children } from 'react'
import dynamic from 'next/dynamic'
import Dom from '@/layouts/_dom'
import { Header } from '@/components/Header'

import '@/styles/index.css'

let LCanvas = null
if (process.env.NODE_ENV === 'production') {
  LCanvas = dynamic(() => import('@/layouts/_canvas'), {
    ssr: false,
  })
} else {
  LCanvas = require('@/layouts/_canvas').default
}

function Layout({ dom }) {
  return (
    <>
      {dom && (
        <Dom>
          <Header />
          {dom}
        </Dom>
      )}
    </>
  )
}

const ForwardPropsToR3fComponent = ({ comp, pageProps }) => {
  let r3fArr = []
  let compArr = []

  Children.forEach(comp(pageProps).props.children, (child) => {
    if (child.props && child.props.r3f) {
      r3fArr.push(child)
    } else {
      compArr.push(child)
    }
  })

  return (
    <>
      {r3fArr && <LCanvas>{r3fArr}</LCanvas>}
      {compArr && <Layout dom={compArr} />}
    </>
  )
}

function App({ Component, pageProps }) {
  if (process.browser) {
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(
      '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="10" fill="#E8B059"/></svg>'
    )}'), auto`
  }

  return (
    <>
      <ForwardPropsToR3fComponent comp={Component} pageProps={pageProps} />
    </>
  )
}

export default App
