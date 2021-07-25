import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Dialog } from '@headlessui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Image from 'next/image'

import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { supabase } from '@/lib/supabaseClient'
import { getErrorMessage } from '@/lib/errors'

const schema = yup.object().shape({
  email: yup.string().required('Ingresa un email').email('Ingresa un email valido'),
  password: yup
    .string()
    .required('Ingresa una contraseña')
    .min(8, 'Debe tener al menos 8 caracteres')
    .matches(/[A-Z]+/g, 'Te falta al menos una mayúscula'),
})

export const SignIn = ({ onComplete, onRequestSignUp, unauthorizedMessage }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [discordButtonLoading, setDiscordButtonLoading] = useState(false)
  const [discordAuthError, setDiscordAuthError] = useState(null)
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  })
  const { errors } = formState

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true)
      setError(null)

      const { user, error } = await supabase.auth.signIn({ email, password })

      if (error) {
        throw error
      } else {
        onComplete(user)
      }
    } catch (error) {
      setError(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  const discordAuth = async () => {
    setDiscordAuthError(null)
    setDiscordButtonLoading(true)
    try {
      const { user, error } = await supabase.auth.signIn(
        {
          provider: 'discord',
        },
        {
          redirectTo: window.location.href,
        }
      )

      if (error) {
        throw error
      } else {
        onComplete(user)
      }
    } catch (error) {
      setError(error.error_description || error.message)
    } finally {
      setDiscordButtonLoading(false)
    }
  }

  return (
    <div className='flex flex-col-reverse w-full h-full p-6 sm:flex-row'>
      <div className='flex flex-col justify-center w-1/2 h-full p-10 bg-white border border-black dark:bg-gray-900 rounded-2xl'>
        <form
          className='flex flex-col items-stretch justify-center'
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className='pb-2 text-sm'>Inicia sesión con tu email y contraseña.</p>
          <Input
            {...register('email')}
            type='email'
            placeholder='Email'
            error={errors?.email?.message}
          />
          <Input
            {...register('password')}
            type='password'
            placeholder='Password'
            error={errors?.password?.message}
          />
          <p className='text-red-700'>{getErrorMessage(error)}</p>
          <Button type='submit' className='self-end mt-8' loading={loading}>
            Iniciar sesión
          </Button>
        </form>
        <div className='my-2 border border-gray-300'></div>
        <div className='flex flex-col items-center'>
          <Button loading={discordButtonLoading} onClick={discordAuth}>
            <div className='flex items-center'>
              <Image
                src='/images/logos/discord.png'
                alt='Logo de Discord'
                height={16}
                width={16}
                quality={65}
              />{' '}
              <p className='ml-2'>Iniciar sesión con Discord</p>
            </div>
          </Button>
        </div>
        <p className='text-red-700'>{getErrorMessage(discordAuthError)}</p>
      </div>
      <div className='flex flex-col items-end justify-between w-1/2'>
        <motion.div
          className='self-start p-20'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { delay: 0 },
          }}
          transition={{
            delay: 1,
            duration: 0.3,
          }}
        >
          <Dialog.Title
            as='h2'
            className='inline text-6xl leading-relaxed bg-gray-200 dark:bg-black'
          >
            Hey!
          </Dialog.Title>
          <br className='mb-10' />
          <motion.h3
            className='inline text-xl bg-gray-200 dark:bg-black'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            {unauthorizedMessage || 'Que bueno verte de vuelta :)'}
          </motion.h3>
        </motion.div>
        <div className='p-2 pb-0 mb-2 bg-gray-200 dark:bg-black'>
          <p className='inline p-5 '>No tenés una cuenta?</p>
          <Button onClick={onRequestSignUp}>Registrate</Button>
        </div>
      </div>
    </div>
  )
}
