import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const BoxComponent = ({ route }) => {
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef()

  // Subscribe this  to the render-loop, rotate the mesh every frame
  useFrame((state, delta) =>
    mesh.current ? (mesh.current.rotation.y = mesh.current.rotation.x += 0.002) : null
  )

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh ref={mesh} position={[-3, -2, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color='orange' />
      </mesh>
    </>
  )
}

export default BoxComponent
