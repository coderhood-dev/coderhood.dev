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
import { useAuth } from '@/hooks/useAuth'

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Como mínimo el equipo debe tener 3 letras')
    .max(15, 'Como máximo el equipo debe tener 15 letras')
    .required('Ingresá un nombre para el equipo'),
  max: yup
    .number()
    .min(2, 'El equipo no puede ser de menos de 2')
    .max(10, 'El equipo no puede ser de más de 10')
    .required('Ingresá una cantidad máxima'),
})

export const CreateTeamForm = ({ onComplete, onRequestSignUp }) => {
  const { user } = useAuth()

  console.log('user', user)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(schema),
  })
  const { errors } = formState

  const onSubmit = async (fields) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('teams')
        .insert([{ ...fields, created_by: user.id }])

      const [team] = data

      if (error) {
        throw error
      }

      const { error: profileTeamError } = await supabase
        .from('profiles')
        .upsert(
          { team: team.id, id: user.id },
          {
            returning: 'minimal',
          }
        )
        .eq('id', user.id)

      if (profileTeamError) {
        throw profileTeamError
      } else {
        onComplete()
      }
    } catch (error) {
      setError(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div className='flex flex-col-reverse w-full h-full p-6 sm:flex-row' layout>
      <div className='flex flex-col justify-center w-1/2 h-full'>
        <form
          className='flex flex-col items-stretch justify-center p-10 bg-white border border-black dark:bg-gray-900 rounded-2xl'
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className='pb-2 text-sm'>Definí tus preferencias para el equipo.</p>
          <Input {...register('name')} placeholder='Nombre' error={errors?.name?.message} />
          <Input
            {...register('description')}
            placeholder='Un mensaje de bienvenida'
            error={errors?.description?.message}
          />
          <Input
            {...register('max')}
            type='number'
            placeholder='Cantidad máxima'
            onChange={(e) => setValue('max', parseInt(e.target.value || '0'))}
            error={errors?.max?.message}
          />
          <div className='flex items-center justify-start mt-5'>
            <input {...register('lgbtiq_only')} id='lgbtiq' type='checkbox' className='w-5 h-5' />
            <label htmlFor='lgbtiq' className='ml-2 text-xs'>
              Prerirías que sea solo LGBTIQ+?
            </label>
          </div>
          <p className='text-red-700'>{getErrorMessage(error)}</p>
          <Button type='submit' className='self-end mt-8' loading={loading}>
            Crear equipo
          </Button>
        </form>
      </div>

      <div className='flex flex-col w-1/2 max-w-2xl'>
        <motion.div
          className='self-start p-8'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { delay: 0 },
          }}
          transition={{
            delay: 0.3,
            duration: 0.3,
          }}
        >
          <Dialog.Title as='h2' className='text-xl leading-relaxed'>
            Estas creando un equipo
          </Dialog.Title>
          <br className='mb-10' />
          <motion.h3
            className='inline text-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Una vez creado, vas a sumarte automáticamente.
          </motion.h3>
          <motion.h3
            className='inline text-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            {' '}
            En los equipos somos todos compañeros.
          </motion.h3>
          <motion.h3
            className='inline text-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
          >
            {' '}
            Si definiste un equipo de 4 personas y son 2, ya son un equipo! Más integrantes pueden
            sumarse hasta completar el total.
          </motion.h3>
          <motion.h3
            className='inline text-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
          >
            {' '}
            Se va a mostrar el país y región configurados en tu cuenta para conveniencia de horario
            y ubicación de les que quieran sumarse.
          </motion.h3>
          <motion.h3
            className='inline text-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5, duration: 1 }}
          >
            {' '}
            Solo se puede pertenecer a un equipo por el momento.
          </motion.h3>
        </motion.div>
      </div>
    </motion.div>
  )
}
