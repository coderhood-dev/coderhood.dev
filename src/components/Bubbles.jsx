import { useState } from 'react'

import { Bubble } from '@/components/Bubble'
import { useInterval } from '@/hooks/useInterval'

export const Bubbles = ({ bubbles: initialState }) => {
  const [bubbles, setBubbles] = useState(initialState)

  const updateBubbles = () => {
    const lastBubbleFinished = bubbles[bubbles.length - 1].status > 4

    const nextBubblesState = lastBubbleFinished
      ? initialState
      : bubbles.map(({ status, ...b }) => ({
          ...b,
          status: status + 1,
        }))

    setBubbles(nextBubblesState)
  }

  useInterval(() => {
    updateBubbles()
  }, 5000)

  return (
    <div className='relative w-full h-full' onClick={updateBubbles}>
      {bubbles.map(bubble => (
        <Bubble key={bubble.img} {...bubble} />
      ))}
    </div>
  )
}
