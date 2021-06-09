import { Container } from '@/components/Container'

// custom pages/500.js !! Do not remove please or it will break build
export default function Error() {
  return (
    <>
      <Container title='error'>
        <h1>500 - Something went wrong</h1>
      </Container>
    </>
  )
}
