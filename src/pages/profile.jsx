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
        <p className='p-10 font-sm'>Querés cambiar de cuenta cuenta o salir?</p>
        <Button
          onClick={() => {
            supabase.auth.signOut()
          }}
        >
          Salir, hasta luego!
        </Button>
      </Container>
    </>
  )
}

export default withProtection(Profile)
