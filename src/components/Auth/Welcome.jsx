import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Dialog } from '@headlessui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { supabase } from '@/lib/supabaseClient'
import { getErrorMessage } from '@/lib/errors'

const socialMediaSquema = yup
  .object()
  .shape({
    github: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Ingresa una url válida'
      ),
    twitter: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Ingresa una url válida'
      ),
    instagram: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Ingresa una url válida'
      ),
  })
  .default(undefined)

export const Welcome = ({ onComplete }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(socialMediaSquema),
  })
  const { errors } = formState

  const onSubmit = ({ username }) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)

      onComplete()
    }, 2000)
  }

  return (
    <div className='flex flex-col-reverse w-full h-full p-6 sm:flex-row'>
      <div className='flex flex-col justify-center w-1/2 h-full'>
        <div className='p-10 bg-white border border-black dark:bg-gray-900 rounded-2xl'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register('email')}
              error={errors?.email?.message}
              placeholder='Email'
              type='email'
            />
            <Input
              {...register('password')}
              error={errors?.password?.message}
              placeholder='Password'
              type='password'
            />
            <p className='text-red-700'>{getErrorMessage(error)}</p>
            <Button className='self-end mt-8' loading={loading} type='submit'>
              Iniciar sesión
            </Button>
          </form>
        </div>
      </div>
      <div className='flex flex-col items-end justify-between w-1/2'>
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          className='self-start p-20'
          exit={{
            opacity: 0,
            transition: { delay: 0 },
          }}
          initial={{ y: 20, opacity: 0 }}
          transition={{
            delay: 1,
            duration: 0.3,
          }}
        >
          <Dialog.Title
            as='h2'
            className='inline text-6xl leading-relaxed bg-gray-200 dark:bg-black'
          >
            Bienvenida a la comunidad!
          </Dialog.Title>
          <br className='mb-10' />
          <motion.h3
            animate={{ opacity: 1 }}
            className='inline text-xl bg-gray-200 dark:bg-black'
            initial={{ opacity: 0 }}
            transition={{ delay: 2 }}
          >
            Personaliza tu perfil, estos pasos son opcionales y lo podés hacer luego en tu perfil.
            Sentite libre de terminar en cualquier momento.
          </motion.h3>
        </motion.div>
        {/* <div className='p-2 pb-0 mb-2 bg-gray-200 dark:bg-black'>
          <p className='inline p-5 '>No tenés una cuenta?</p>
          <Button onClick={onRequestSignUp}>Registrate</Button>
        </div> */}
      </div>
    </div>
  )
}
