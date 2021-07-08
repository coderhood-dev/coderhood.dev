import { ThemeProvider } from 'next-themes'

import { TransitionManager } from '@/components/TransitionManager'
import { AuthProvider } from '@/context/Auth'

import '@/styles/index.css'

function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class'>
      <AuthProvider>
        <TransitionManager transitionKey={pageProps.title}>
          <Component {...pageProps} />
        </TransitionManager>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
