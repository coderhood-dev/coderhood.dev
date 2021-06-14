import { createContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

const initialState = { session: null, user: null }
export const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const session = supabase.auth.session()
    setState({ session, user: session?.user ?? null })
  }, [])

  supabase.auth.onAuthStateChange((event, session) => {
    console.log(`Supbase auth event: ${event}`, session)
    setState({ session, user: session?.user ?? null })
  })

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
