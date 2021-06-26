import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { SignIn } from './SignIn'
import { SignUp } from './SignUp'
import { Welcome } from './Welcome'

const MotionOverlay = motion(Dialog.Overlay)

export const AuthModal = ({ open, onClose }) => {
  const [selectedView, setSelectedView] = useState('SIGNIN')

  const handleClose = () => {
    onClose()
    setSelectedView('SIGNIN')
  }

  const view = {
    SIGNIN: <SignIn onComplete={handleClose} onRequestSignUp={() => setSelectedView('SIGNUP')} />,
    SIGNUP: (
      <SignUp
        onComplete={() => {
          // setSelectedView('WELCOME') TODO: terminar esta pantalla
          handleClose()
        }}
        onRequestSignIn={() => setSelectedView('SIGNIN')}
      />
    ),
    FORGOT_PASSWORD: () => {},
    WELCOME: <Welcome onComplete={handleClose} />,
  }[selectedView]

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          className='fixed inset-0 z-30 flex items-end justify-center overflow-hidden sm:items-center'
        >
          <MotionOverlay
            className='fixed inset-0'
            style={{ backdropFilter: 'saturate(180%) blur(20px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />

          <motion.div
            className='relative overflow-hidden text-left align-bottom border border-gray-800 shadow-xl dot-background dark:bg-black rounded-3xl sm:w-4/5 sm:my-8 sm:align-middle h-2/3'
            initial={{ scale: 0.7, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'just' }}
          >
            <AnimatePresence exitBeforeEnter>
              <motion.div key={selectedView} className='h-full'>
                {/* Transition overlay */}
                <motion.div
                  className='absolute z-10 w-full h-full bg-black'
                  initial={{ x: 0 }}
                  animate={{ x: '100vw', transitionEnd: { x: '-100vw' } }}
                  exit={{ x: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                ></motion.div>
                {view}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
