import { Children } from 'react'
import dynamic from 'next/dynamic'
import { ThemeProvider } from 'next-themes'

import Dom from '@/layouts/_dom'
import { AuthProvider } from '@/context/Auth'

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
  return <>{dom && <Dom>{dom}</Dom>}</>
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
  return (
    <>
      <ThemeProvider attribute='class'>
        <AuthProvider>
          <ForwardPropsToR3fComponent comp={Component} pageProps={pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App
