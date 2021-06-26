import { Container } from '@/components/Container'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'

const Profile = ({ user }) => {
  // const { user } = useAuth()
  const router = useRouter()
  user.id = 'Epa (?'
  return (
    <>
      <Container title='profile'>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <button
          className='block button'
          onClick={() => {
            supabase.auth.signOut()
            router.push(`/box`)
          }}
        >
          Sign Out
        </button>
      </Container>
    </>
  )
}

export default Profile

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  // If no user, redirect to index.
  if (!user) {
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }

  // If there is a user, return it.
  return { props: { user } }
}
