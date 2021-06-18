import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../lib/supabaseClient'

export const Auth = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async (email, password) => {
    try {
      setLoading(true)
      const { user, error } = await supabase.auth.signUp({ email, password })
      if (error) throw error

      alert(JSON.stringify(user, null, 2))
      router.push('/welcome')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex row flex-center'>
      <div className='col-6 form-widget'>
        <div>
          <input
            className='inputField'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='inputField'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleSignup(email, password)
            }}
            className={'button block'}
            disabled={loading}
          >
            {loading ? <span>Loading</span> : <span>Registrarme</span>}
          </button>
        </div>
      </div>
    </div>
  )
}
