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
import { countriesWithRegions } from '@/lib/countries'

export const SignUp = ({ onComplete, onRequestSignIn }) => {
  const steps = ['USERNAME', 'PROFILE', 'SIGNUP']
  const [step, setStep] = useState(0)
  const [fields, setFields] = useState({})

  const currentStep = steps[step]

  const updateFields = newFields => {
    setFields(prev => ({ ...prev, ...newFields }))
  }

  const handleStepCompleted = newFields => {
    updateFields(newFields)

    if (currentStep === 'SIGNUP') {
      onComplete()
    } else {
      setStep(step + 1)
    }
  }

  const handleGoBack = () => {
    setStep(step - 1)
  }

  const currentForm = {
    USERNAME: <UsernameForm onSubmitComplete={handleStepCompleted} />,
    PROFILE: <ProfileForm onBack={handleGoBack} onSubmitComplete={handleStepCompleted} />,
    SIGNUP: (
      <SignUpForm
        profileFields={fields}
        onBack={handleGoBack}
        onSubmitComplete={handleStepCompleted}
      />
    ),
  }[currentStep]

  return (
    <div className='flex flex-col-reverse w-full h-full p-6 sm:flex-row'>
      <div className='flex flex-col items-start justify-between w-1/2'>
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          className='self-start p-0 pt-10 pr-10 sm:p-10 md:pt-0'
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
            className='inline font-serif text-6xl leading-relaxed bg-gray-200 md:text-6xl dark:bg-black'
          >
            Bienvenid@!
          </Dialog.Title>
          <br className='mb-10' />
          <motion.h3
            animate={{ opacity: 1 }}
            className='inline bg-gray-200 text-md dark:bg-black'
            initial={{ opacity: 0 }}
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
        throw new Error('Ups ese nombre de usuario no esta disponible')
      } else {
        onSubmitComplete({ username })
      }
    } catch (error) {
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
        error={errors?.username?.message}
        placeholder='Nombre de usuario'
      />
      <p className='text-xs text-red-700'>{getErrorMessage(error)}</p>
      <Button className='self-end mt-8' loading={loading} type='submit'>
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
    country: yup.string().required('Por favor ingresa tu país'),
    region: yup.string().required('Por favor ingresa tu región'),
  })
  .default(undefined)

const ProfileForm = ({ onSubmitComplete, onBack }) => {
  const { register, watch, handleSubmit, formState } = useForm({
    resolver: yupResolver(profileSquema),
  })
  const country = watch('country')

  // no es muy performante recorrer todos los paises al seleccionar uno, seria mejor guardar toda la info de las regiones en el pais seleccionado quizas
  const regions =
    country && countriesWithRegions.find(({ countryName }) => countryName === country).regions
  const { errors } = formState

  const onSubmit = fields => {
    onSubmitComplete(fields)
  }

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      <p className='pb-2 text-xs'>Necesitamos algunos datos de tu identidad.</p>
      <Input {...register('firstname')} error={errors?.firstname?.message} placeholder='Nombre' />
      <Input {...register('lastname')} error={errors?.lastname?.message} placeholder='Apellido' />
      <select
        {...register('country')}
        className='p-2 my-2 bg-white rounded dark:bg-gray-800 focus:outline-none focus:ring-1 dark:focus:ring-yellow-500 focus:ring-black dark:border-gray-800 hover:border-gray-500 dark:hover:border-gray-600'
      >
        <option disabled label='De que país sos?' selected='selected'></option>
        {countriesWithRegions.map(({ countryName }) => (
          <option key={countryName} value={countryName}>
            {countryName}
          </option>
        ))}
      </select>
      {regions && (
        <select
          {...register('region')}
          className='p-2 my-2 bg-white rounded dark:bg-gray-800 focus:outline-none focus:ring-1 dark:focus:ring-yellow-500 focus:ring-black dark:border-gray-800 hover:border-gray-500 dark:hover:border-gray-600'
        >
          <option disabled label='De que región sos?' selected='selected'></option>
          {regions.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      )}

      <div className='flex justify-between'>
        <Button className='self-end mt-8' onClick={onBack}>
          Volver
        </Button>
        <Button className='self-end mt-8' type='submit'>
          Continuar
        </Button>
      </div>
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

const SignUpForm = ({ onSubmitComplete, onBack, profileFields }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signupSquema),
  })
  const { errors } = formState

  const onSubmit = async fields => {
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
      <div className='flex justify-between'>
        <Button className='self-end mt-8' onClick={onBack}>
          Volver
        </Button>
        <Button className='self-end mt-8' loading={loading} type='submit'>
          Registrarme
        </Button>
      </div>
    </form>
  )
}
