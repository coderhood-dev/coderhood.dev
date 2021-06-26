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

export const SignUp = ({ onComplete, onRequestSignIn }) => {
  const [step, setStep] = useState('USERNAME')
  const [fields, setFields] = useState({})

  const updateFields = (newFields) => {
    setFields((prev) => ({ ...prev, ...newFields }))
  }

  const handleStepCompleted = (newFields) => {
    updateFields(newFields)

    if (step === 'SIGNUP') {
      onComplete()
    } else {
      setStep(step === 'USERNAME' ? 'PROFILE' : 'SIGNUP')
    }
  }

  const currentForm = {
    USERNAME: <UsernameForm onSubmitComplete={handleStepCompleted} />,
    PROFILE: <ProfileForm onSubmitComplete={handleStepCompleted} />,
    SIGNUP: <SignUpForm onSubmitComplete={handleStepCompleted} profileFields={fields} />,
  }[step]

  return (
    <div className='flex flex-col-reverse w-full h-full p-6 sm:flex-row'>
      <div className='flex flex-col items-start justify-between w-1/2'>
        <motion.div
          className='self-start p-0 pt-10 pr-10 md:p-10 md:pt-0'
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
            className='inline font-serif text-4xl leading-relaxed bg-gray-200 md:text-5xl dark:bg-black'
          >
            Bienvenid@!
          </Dialog.Title>
          <br className='mb-10' />
          <motion.h3
            className='inline bg-gray-200 text-md dark:bg-black'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            Sumate a la comunidad de personas en tech que aprenden y comparten.
          </motion.h3>
        </motion.div>
        <div className='p-2 pb-0 mb-2 bg-gray-200 dark:bg-black'>
          <p className='inline p-5 text-xs'>Ya tenés una cuenta?</p>
          <Button onClick={onRequestSignIn}>Inicia sesión</Button>
        </div>
      </div>
      <div className='flex flex-col justify-center w-1/2 h-full'>
        <div className='p-10 bg-white border border-black dark:bg-gray-900 rounded-2xl'>
          {currentForm}
        </div>
      </div>
    </div>
  )
}

const usernameSquema = yup.object().shape({
  username: yup
    .string()
    .required('Ingresa un nombre de usuario')
    .matches(
      '^[A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)*$',
      'Comenza con una letra, solo se permite . _ -'
    )
    .min(5, 'Debe tener al menos 5 caracteres')
    .max(20, '20 caracteres es el máximo'),
})

const UsernameForm = ({ onSubmitComplete }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(usernameSquema),
  })
  const { errors } = formState

  const onSubmit = async ({ username }) => {
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('username', username)

      const usernameAvailable = data && data.length === 0

      if (error) {
        throw error.error_description || error.message
      }

      if (!usernameAvailable) {
        console.log('entro aca')
        throw new Error('Ups ese nombre de usuario no esta disponible')
      } else {
        onSubmitComplete({ username })
      }
    } catch (error) {
      console.log('entro catch', error)
      setError(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className='pb-2 text-xs'>Para comenzar elegí tu nombre de usuario.</p>
      <Input
        {...register('username')}
        placeholder='Nombre de usuario'
        error={errors?.username?.message}
      />
      <p className='text-xs text-red-700'>{getErrorMessage(error)}</p>
      <Button type='submit' className='self-end mt-8' loading={loading}>
        Continuar
      </Button>
    </form>
  )
}

const profileSquema = yup
  .object()
  .shape({
    firstname: yup
      .string()
      .max(20, '20 caracteres es el límite')
      .required('Por favor ingresa tu nombre'),
    lastname: yup
      .string()
      .max(20, '20 caracteres es el límite')
      .required('Por favor ingresa tu nombre'),
    gender: yup.string().required('Por favor dejanos saber como te identificás'),
  })
  .default(undefined)

const ProfileForm = ({ onSubmitComplete }) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(profileSquema),
  })
  const { errors } = formState

  const onSubmit = (fields) => {
    onSubmitComplete(fields)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className='pb-2 text-xs'>Necesitamos algunos datos de tu identidad.</p>
      <Input {...register('firstname')} placeholder='Nombre' error={errors?.firstname?.message} />
      <Input {...register('lastname')} placeholder='Apellido' error={errors?.lastname?.message} />
      <select {...register('gender')}>
        <option value='undefined'>Prefiero no decirlo</option>
        <option value='women'>Mujer</option>
        <option value='man'>Hombre</option>
        <option value='fluid'>Binario / Gender fluid</option>
      </select>
      <Button type='submit' className='self-end mt-8'>
        Continuar
      </Button>
    </form>
  )
}

const signupSquema = yup.object().shape({
  email: yup.string().required('Ingresa un email').email('Ingresa un email valido'),
  password: yup
    .string()
    .required('Ingresa una contraseña')
    .min(8, 'Debe tener al menos 8 caracteres')
    .matches(/[A-Z]+/g, 'Te falta al menos una mayúscula'),
})

const SignUpForm = ({ onSubmitComplete, profileFields }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signupSquema),
  })
  const { errors } = formState

  const onSubmit = async (fields) => {
    setLoading(true)
    setError(null)

    try {
      const { user, error: signUpError } = await supabase.auth.signUp(fields)

      if (signUpError) {
        throw signUpError
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .upsert(
          { ...profileFields, id: user.id },
          {
            returning: 'minimal',
          }
        )
        .eq('id', user.id)

      if (profileError) {
        throw profileError
      } else {
        onSubmitComplete(fields)
      }
    } catch (error) {
      setError(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className='pb-2 text-xs'>Por último ingresa tu email y contraseña.</p>
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
        Registrarme
      </Button>
    </form>
  )
}
