import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { Container } from '@/components/Container'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/hooks/useAuth'
import { AuthModal } from '@/components/Auth'

const Profile = () => {
  const { user } = useAuth()
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!user) {
      setIsOpen(true)
    }
  }, [user])
  return (
    <>
      <Container title='profile'>
        {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
        <button
          className='block button'
          onClick={() => {
            supabase.auth.signOut()
            router.replace('/')
          }}
        >
          Sign Out
        </button>
        <AuthModal
          open={isOpen}
          onClose={() => {
            setIsOpen(false)
            console.log('user', user)
            if (!user) {
              router.replace('/')
            }
          }}
        />
      </Container>
    </>
  )
}

export default Profile
