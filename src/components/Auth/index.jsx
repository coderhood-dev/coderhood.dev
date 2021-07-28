import React from 'react'
import { Dialog } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { SignIn } from './SignInForm'
import { SignUp } from './SignUpForm'
import { Welcome } from './Welcome'

const MotionOverlay = motion(Dialog.Overlay)

export const AuthModal = ({ open, onClose, unauthorizedMessage }) => {
  const [selectedView, setSelectedView] = React.useState('SIGNIN')

  const handleClose = user => {
    onClose(user)
    setSelectedView('SIGNIN')
  }

  const view = {
    SIGNIN: (
      <SignIn
        unauthorizedMessage={unauthorizedMessage}
        onComplete={handleClose}
        onRequestSignUp={() => setSelectedView('SIGNUP')}
      />
    ),
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
          className='fixed inset-0 z-30 flex items-end justify-center overflow-hidden sm:items-center'
          open={open}
          onClose={handleClose}
        >
          <MotionOverlay
            animate={{ opacity: 1 }}
            className='fixed inset-0 backdrop-filter backdrop-blur-lg'
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />

          <motion.div
            animate={{ scale: 1, opacity: 1 }}
            className='relative overflow-hidden text-left align-bottom border border-gray-800 shadow-xl dot-background dark:bg-black rounded-3xl sm:w-4/5 sm:my-8 sm:align-middle h-2/3'
            exit={{ scale: 0.7, opacity: 0 }}
            initial={{ scale: 0.7, opacity: 0.5 }}
            transition={{ type: 'just' }}
          >
            <AnimatePresence exitBeforeEnter>
              <motion.div key={selectedView} className='h-full'>
                {/* Transition overlay */}
                <motion.div
                  animate={{ x: '100vw', transitionEnd: { x: '-100vw' } }}
                  className='absolute z-10 w-full h-full bg-black'
                  exit={{ x: 0 }}
                  initial={{ x: 0 }}
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
