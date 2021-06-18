import { createContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

const initialState = { session: null, user: null }
export const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const session = supabase.auth.session()
    setState({ session, user: session?.user ?? null })

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setState({
          session,
          user: session?.user ?? null,
        })

        // set cookie
        fetch('/api/authCookie', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json())
      }
    )

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
