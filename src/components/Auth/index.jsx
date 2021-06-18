import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { SignIn } from './SignIn'
import { SignUp } from './SignUp'

const MotionOverlay = motion(Dialog.Overlay)

export const AuthModal = ({ open, onClose }) => {
  const [selectedView, setSelectedView] = useState('SIGNIN')
  const view = {
    SIGNIN: <SignIn onRequestSignUp={() => setSelectedView('SIGNUP')} />,
    SIGNUP: <SignUp onRequestSignIn={() => setSelectedView('SIGNIN')} />,
  }[selectedView]

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={onClose}
          className='fixed inset-0 z-30 flex items-center justify-center overflow-hidden'
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
            className='relative overflow-hidden text-left align-bottom bg-gray-900 rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
            initial={{ y: '100vh' }}
            animate={{ y: 0 }}
            exit={{ y: '100vh' }}
            transition={{ type: 'just' }}
          >
            <AnimatePresence exitBeforeEnter>
              <motion.div key={selectedView}>
                <motion.div
                  className='absolute w-full h-full bg-black'
                  initial={{ x: 0 }}
                  animate={{ x: '100%', transitionEnd: { x: '-100%' } }}
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

// Previous Modal content

/* <div className='px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4'>
              <div className='sm:flex sm:items-start'>
                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium text-gray-900 leading-6'
                  >
                    Deactivate account
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      Are you sure you want to deactivate your account? All of
                      your data will be permanently removed. This action cannot
                      be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div> */

/* <div className='px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse'>
              <button
                type='button'
                className='inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
                onClick={onClose}
              >
                Deactivate
              </button>
              <button
                type='button'
                className='inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                onClick={onClose}
              >
                Cancel
              </button>
            </div> */
