import { useState } from 'react'

import { Container } from '@/components/Container'
import { supabase } from '@/lib/supabaseClient'

const initialState = {
  name: '',
  lastName: '',
  username: '',
  website: '',
  twitter: '',
  instagram: '',
}

const Welcome = () => {
  const [state, setState] = useState(initialState)
  const { name, lastname, username, website, twitter, instagram } = state

  const handleChange = (e) => {
    console.log('target name', e.target.name)
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })

    console.log(state)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let { error } = await supabase.from('profiles').upsert(state, {
      returning: 'minimal', // Don't return the value after inserting
    })
  }

  return (
    <>
      <Container title='welcome'>
        <form
          className='flex flex-col items-start m-10'
          onSubmit={handleSubmit}
        >
          <input
            name='name'
            placeholder='Nombre'
            value={name}
            onChange={handleChange}
          />
          <input
            name='lastname'
            placeholder='Apellido'
            value={lastname}
            onChange={handleChange}
          />
          <input
            name='username'
            placeholder='Nombre de usuario'
            value={username}
            onChange={handleChange}
          />
          <input
            name='website'
            placeholder='Web'
            value={website}
            onChange={handleChange}
          />
          <input
            name='twitter'
            placeholder='Twitter'
            value={twitter}
            onChange={handleChange}
          />
          <input
            name='instagram'
            placeholder='Instagram'
            value={instagram}
            onChange={handleChange}
          />
          <button className='p-5 mt-2 bg-gray-800 rounded-full' type='submit'>
            Actualizar perfil
          </button>
        </form>
      </Container>
    </>
  )
}

export default Welcome
