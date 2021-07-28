import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const roundedSquareWave = (t, delta, a, f) => {
  return ((2 * a) / Math.PI) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta)
}

export const Dots = ({ waveStartPosition = { x: 200, y: 200 } }) => {
  const ref = useRef()

  const { vec, transform, focus, positions, distances } = useMemo(() => {
    const vec = new THREE.Vector3()
    const transform = new THREE.Matrix4()

    // Where the dots are clustered around
    const focus = new THREE.Vector3()

    // Precompute randomized initial positions
    const positions = [...Array(10000)].map((_, i) => {
      const position = new THREE.Vector3()

      // Place in a grid
      position.x = (i % 100) - 50
      position.y = Math.floor(i / 100) - 50

      // Offset every other column (hexagonal pattern)
      position.y += (i % 2) * 0.5

      // Add some noise
      position.x += Math.random() * 0.3
      position.y += Math.random() * 0.3

      return position
    })
    const distances = positions.map(pos => pos.length())

    return { vec, transform, focus, positions, distances }
  }, [])

  useFrame(({ clock }) => {
    for (let i = 0; i < 10000; ++i) {
      // Drift focus to center as click is released
      // focus.copy(waveStartPosition) //clickSpring.get()

      const t = clock.elapsedTime - distances[i] / 80
      // Math.sin(clock.elapsedTime) 0.1, 1, 1/4 //  0.1, 0.5, 1 / 4
      const wave = roundedSquareWave(t, 0.1, 0.2, 1 / 4)
      const scale = 1 + wave * 0.3

      vec.copy(positions[i])
      vec.multiplyScalar(scale).add(focus)

      transform.setPosition(vec)
      ref.current.setMatrixAt(i, transform)
    }
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[null, null, 10000]}>
      <circleBufferGeometry args={[0.06]} />
      <meshBasicMaterial color='#c2c2c2' />
    </instancedMesh>
  )
}
