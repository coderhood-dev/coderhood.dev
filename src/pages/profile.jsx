import { Container } from '@/components/Container'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/hooks/useAuth'

const Profile = ({ user }) => {
  // const { user } = useAuth()
  console.log('user', user)
  return (
    <>
      <Container title='profile'>
        <button
          className='block button'
          onClick={() => supabase.auth.signOut()}
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
