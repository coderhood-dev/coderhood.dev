import { createContext, useEffect, useState } from 'react'

import { supabase } from '@/lib/supabaseClient'

const initialState = { session: null, user: null, profile: null }

export const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(initialState)

  const updateAuth = async session => {
    const user = session?.user ?? null
    let profile = null

    if (user) {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()

      profile = data
    }

    setState({ session, user, profile })

    // set cookie
    // fetch('/api/authCookie', {
    //   method: 'POST',
    //   headers: new Headers({ 'Content-Type': 'application/json' }),
    //   credentials: 'same-origin',
    //   body: JSON.stringify({ event, session }),
    // }).then((res) => res.json())
  }

  useEffect(() => {
    const session = supabase.auth.session()

    updateAuth(session)

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      updateAuth(session)
    })

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
