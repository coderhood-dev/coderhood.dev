import React from 'react'
import { Dialog } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { CreateTeamForm } from '@/components/CreateTeamForm'
import { Button } from '@/components/Button'

const MotionOverlay = motion(Dialog.Overlay)

export const CreateTeamModal = ({ className, onComplete }) => {
  const [open, setOpen] = React.useState(false)

  const handleComplete = () => {
    setOpen(false)
    onComplete()
  }

  return (
    <AnimatePresence>
      <motion.div key={open} className={className}>
        {open ? (
          <Dialog
            className='fixed inset-0 z-30 flex items-end justify-center overflow-hidden sm:items-center'
            open={open}
            onClose={() => setOpen(false)}
          >
            <MotionOverlay
              animate={{ opacity: 1 }}
              className='fixed inset-0 backdrop-filter backdrop-blur-lg'
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
            <motion.div
              layout
              animate={{ scale: 1, opacity: 1 }}
              className='relative max-w-4xl overflow-hidden overflow-y-scroll text-left align-bottom border border-gray-800 shadow-xl dark:bg-black rounded-3xl sm:my-8 sm:align-middle backdrop-filter backdrop-blur-3xl'
              exit={{ scale: 0.7, opacity: 0 }}
              initial={{ scale: 0.7, opacity: 0.5 }}
              transition={{ type: 'just' }}
            >
              <CreateTeamForm onComplete={handleComplete} />
            </motion.div>
          </Dialog>
        ) : (
          <motion.aside
            animate={{ y: 0, opacity: 1 }}
            className='flex flex-row items-center p-5 bg-white border border-gray-300 shadow-lg dark:border-gray-700 dark:bg-black rounded-xl'
            exit={{ y: 100, opacity: 0, transition: { delay: 0, duration: 0.3 } }}
            initial={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <p className='mr-5 text-xs'>
              Te gustaría formar parte de un equipo con diferentes preferencias?
            </p>
            <Button onClick={() => setOpen(true)}>Crea un equipo</Button>
          </motion.aside>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
