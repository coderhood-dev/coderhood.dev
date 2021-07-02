import React from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Container } from '@/components/Container'
import { supabase } from '@/lib/supabaseClient'
import { getErrorMessage } from '@/lib/errors'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'

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

const Teams = () => {
  const [teams, setTeams] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const getTeams = async () => {
      const { data, error } = await supabase.from('teams').select('*')
      console.log('data', data, error)

      setTeams(data)
    }
    getTeams()
  }, [])

  const onSubmit = () => {}

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(usernameSquema),
  })
  const { errors } = formState

  return (
    <Container className='flex-col p-10'>
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
      <div>
        {teams.map((team) => (
          <div className='p-5 m-2 bg-gray-900 border border-gray-700 rounded' key={team.id}>
            {`Equipo ${team.id}`}
          </div>
        ))}
      </div>
      <aside></aside>
    </Container>
  )
}

export default Teams
