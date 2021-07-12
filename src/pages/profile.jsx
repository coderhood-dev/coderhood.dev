import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/hooks/useAuth'
import { withProtection } from '@/hoc/withProtection'

const Profile = () => {
  const { user } = useAuth()

  return (
    <>
      <Container title='profile' className='flex-col items-center'>
        {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
        <Button
          onClick={() => {
            supabase.auth.signOut()
          }}
        >
          Cerrar sesión, hasta luego!
        </Button>
      </Container>
    </>
  )
}

export default withProtection(Profile)
