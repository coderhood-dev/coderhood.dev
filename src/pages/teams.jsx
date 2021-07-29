import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { Container } from '@/components/Container'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/Button'
import { CreateTeamModal } from '@/components/CreateTeamModal'
import { withProtection } from '@/hoc/withProtection'
import { useAuth } from '@/hooks/useAuth'

const container = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 1,
    },
  },
}

const item = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
}

const Teams = () => {
  const [teams, setTeams] = React.useState([])
  const [profile, setProfile] = React.useState(null)

  const { user } = useAuth()

  const getTeams = async () => {
    const { data: rawTeam, error } = await supabase.from('teams').select('*')
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .not('team', 'is', null)

    const teamsWithProfiles = rawTeam.map(team => {
      const teamProfiles = profiles.filter(p => p.team === team.id)

      return {
        ...team,
        profiles: teamProfiles,
      }
    })

    setTeams(teamsWithProfiles)
  }

  const setTeam = async team => {
    const { data, error: profileTeamError } = await supabase
      .from('profiles')
      .upsert({ team: team.id, id: profile.id })
      .eq('id', profile.id)

    getTeams()
    setProfile(data[0])
  }

  React.useEffect(() => {
    const getProfile = async () => {
      if (!user) return

      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()

      console.log('profile', data)
      setProfile(data)
    }

    getTeams()
    getProfile()
  }, [user])

  console.log(teams, profile?.team)

  return (
    <Container className='relative flex-col p-20 pb-40'>
      <h2 className='pt-20 font-serif text-4xl'>El viaje es mejor acompañado</h2>
      <p className='pt-5 pb-10 text-sm'>
        Sumate al equipo con el que te sientas mas identificado, o creá uno nuevo si sentís que
        preferirías formar parte de uno con otras preferencias
      </p>
      {teams && teams.length > 0 && (
        <motion.div
          animate='animate'
          className='flex flex-wrap pt-5'
          initial='initial'
          variants={container}
        >
          {teams.map(team => (
            <motion.div
              key={team.id}
              className={`flex flex-col items-start max-w-xs p-5 m-2 bg-gray-200 border ${
                team.id === profile?.team
                  ? 'border-gray-800 dark:border-white'
                  : 'border-gray-300 dark:border-gray-900'
              } shadow-sm dark:bg-gray-800 rounded-xl`}
              variants={item}
            >
              <div className='flex justify-between w-full row'>
                <div>
                  <span className='font-serif text-xs text-gray-600 dark:text-gray-400'>
                    Equipo
                  </span>
                  <h3 className='mb-2 font-serif text-2xl leading-none'>{`${team.name}`}</h3>
                </div>
                <p className='pl-10 font-serif text-xl'>#{team.id}</p>
              </div>
              <div className='flex flex-row flex-wrap my-2'>
                {team.interests.map(interest => {
                  const background =
                    interest === 'lgbtiq+'
                      ? 'bg-gradient-to-r from-red-300 via-yellow-300 to-blue-300'
                      : 'bg-yellow-300'

                  return (
                    <p
                      key={interest}
                      className={`px-2 py-1 m-1 font-serif text-xs text-gray-800 rounded-full ${background}`}
                    >
                      {interest}
                    </p>
                  )
                })}
              </div>
              {team.description && (
                <h3 className='mb-5 text-xs text-gray-700 dark:text-gray-300'>{`${team.description}`}</h3>
              )}
              <p className='mb-2 font-serif text-xs text-gray-600 dark:text-gray-400'>
                Integrantes {team.profiles.length}/{team.max}
              </p>
              <AnimatePresence>
                <ul className='mb-5'>
                  {team.profiles?.map(profile => (
                    <motion.div
                      key={profile.id}
                      animate={{ opacity: 1 }}
                      className='flex items-start w-full pr-5 mb-2 row'
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className='w-5 h-5 mt-2 mr-2 bg-gray-900 rounded-full' />
                      <div className='flex flex-col items-start'>
                        <p className='ml-2 font-serif text-sm'>
                          {profile.firstname} {profile.lastname}
                        </p>
                        <p className='ml-2 text-xs text-gray-700 dark:text-gray-300'>
                          {profile.country}, {profile.region}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </ul>
              </AnimatePresence>
              {team.id !== profile.team && (
                <Button
                  className='self-end mt-auto'
                  disabled={team.max <= team.profiles.length}
                  onClick={() => setTeam(team)}
                >
                  Unirme
                </Button>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      <CreateTeamModal className='absolute bottom-5 right-5' onComplete={getTeams} />
    </Container>
  )
}

export default withProtection(Teams, 'Necesitas iniciar sesión para crear o unirte a un equipo.')

export async function getStaticProps() {
  return {
    props: {
      title: 'Teams',
    },
  }
}
