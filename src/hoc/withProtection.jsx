import React from 'react'
import { useRouter } from 'next/router'

import { AuthModal } from '@/components/Auth'
import { useAuth } from '@/hooks/useAuth'

export const withProtection = (WrappedComponent, unauthorizedMessage) => props => {
  const [isOpen, setIsOpen] = React.useState(false)

  const { user } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!user) {
      setIsOpen(true)
    } else {
      // TODO: en un primer render user = null, luego supabase devuelve el user
      // esto provoca que se muestre el dialog al principio cuando quizas instantaneamente despues
      // la data del user ya este lista.
      // seteando esto en false cerramos el dialog, puede dar un efecto de flash al abrir y cerrarse
      setIsOpen(false)
    }
  }, [user])

  return (
    <>
      <WrappedComponent {...props} />
      <AuthModal
        open={isOpen}
        unauthorizedMessage={unauthorizedMessage}
        onClose={user => {
          setIsOpen(false)
          if (!user) {
            router.replace('/')
          }
        }}
      />
    </>
  )
}
