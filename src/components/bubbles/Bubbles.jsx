import { useState } from 'react'
import { Bubble } from '@/components/bubble/Bubble'
import { useInterval } from '@/hooks/useInterval'

export const Bubbles = ({ bubbles: initialState }) => {
  const [bubbles, setBubbles] = useState(initialState)

  // const calculateInterval = () => {
  //   // loading first message
  //   if (bubleIndex < 0) {
  //     return initialDelay
  //   }
  //   // buble duration
  //   if (bubleIndex < chatData.length) {
  //     return chatData[bubleIndex].duration
  //   }
  //   // already iterated all bubles, stop interval passing null
  //   return null
  // }

  useInterval(() => {
    const newBubblesState = bubbles.map(({ status, ...b }) => {
      let newStatus = status

      switch (true) {
        case status >= 5:
          newStatus = Infinity
          break
        default:
          newStatus++
      }

      return { ...b, status: newStatus }
    })

    setBubbles(newBubblesState)
  }, 3000)

  console.log('bubbles', bubbles)
  return (
    <div className='relative w-full h-full'>
      {bubbles.map((bubble) => (
        <Bubble key={bubble.img} {...bubble} />
      ))}
    </div>
  )
}
