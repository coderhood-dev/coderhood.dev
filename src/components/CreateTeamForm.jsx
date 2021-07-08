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

const interests = [
  'anime',
  'literatura',
  'filosofia',
  'arte',
  'música',
  'finanzas',
  'crypto',
  'old school',
  'netflix',
  'salud',
  'espiritualidad',
  'politica',
  'lgbtiq+',
  'solo chicas',
  'diseño',
  'ux',
  'backend',
  'frontend',
  'cambio de carrera',
  'bien desde 0',
  'pro',
]

export const CreateTeamForm = ({ onComplete, onRequestSignUp }) => {
  const { user } = useAuth()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [teamInterests, setInterests] = useState([])

  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(schema),
  })
  const { errors } = formState

  const handleInterestClick = (interest, selected) => {
    if (selected) {
      const index = teamInterests.indexOf(interest)
      if (index !== -1) {
        const interestsCopy = [...teamInterests]
        interestsCopy.splice(index, 1)

        setInterests(interestsCopy)
      }
    } else {
      setInterests((prev) => [...prev, interest])
    }
  }

  const onSubmit = async (fields) => {
    try {
      setLoading(true)
      setError(null)

      console.log('teamInterests', teamInterests)

      const { data, error } = await supabase
        .from('teams')
        .insert([{ ...fields, interests: teamInterests, created_by: user.id }])

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
          <Input
            {...register('name')}
            label='Nombre'
            placeholder='Equipo Rocket'
            error={errors?.name?.message}
          />
          <label className='mt-2 mb-2 text-xs dark:text-gray-300'>Mensaje de bienvenida</label>
          <textarea
            {...register('description')}
            placeholder='Jessie: ¡Para proteger el mundo de la devastación! James: Y unir a los pueblos dentro nuestra nación. Jessie: ¡Para denunciar los males de la verdad y el amor!'
            className='w-full max-w-md p-2 pl-5 mb-2 text-sm font-medium bg-white border border-black rounded dark:bg-gray-800 dark:border-gray-800 hover:border-gray-500 dark:hover:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-yellow-500 focus:ring-black'
            rows={4}
          />
          <Input
            {...register('max')}
            type='number'
            label='Cantidad máxima'
            placeholder='4'
            onChange={(e) => setValue('max', parseInt(e.target.value || '0'))}
            error={errors?.max?.message}
          />
          <label className='mt-2 mb-2 text-xs dark:text-gray-300'>Elegí los que te interesen</label>
          <div className='flex flex-row flex-wrap'>
            {interests.map((interest) => {
              const selected = teamInterests.includes(interest)
              const background = selected ? 'bg-yellow-500' : 'bg-yellow-200'
              const textColor = selected ? 'text-white' : 'text-gray-900'
              const border = selected && 'border border-black'
              return (
                <div
                  key={interest}
                  onClick={() => handleInterestClick(interest, selected)}
                  className={`px-2 py-1 m-1 text-xs ${background} rounded-full ${textColor} ${border} cursor-pointer`}
                >
                  {interest}
                </div>
              )
            })}
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
