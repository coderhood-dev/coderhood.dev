// export const CubesAnimation = () => {
//   return (
//     <>
//       <ambientLight intensity='0.5' />
//       <mesh
//         // {...props}
//         // ref={mesh}
//         scale={1}
//         rotation={[0, 1, 2]}
//         // onClick={(event) => setActive(!active)}
//         // onPointerOver={(event) => setHover(true)}
//         // onPointerOut={(event) => setHover(false)}
//       >
//         <boxGeometry args={[2, 2, 2]} />
//         <meshStandardMaterial color='orange' />
//       </mesh>
//     </>
//   )
// }

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const CubesAnimation = ({ route }) => {
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef()
  // Subscribe this  to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (mesh.current) {
      // mesh.current.position.x = mesh.current.position.x += 0.002
      mesh.current.position.x = mesh.current.position.x += 0.002
      mesh.current.position.y = mesh.current.position.y -= 0.002
      mesh.current.rotation.x = mesh.current.rotation.x += 2 * Math.PI * 0.001
      // mesh.current.rotation.y = mesh.current.rotation.y += 2 * Math.PI * 0.001
      // mesh.current.rotation.y = mesh.current.rotation.y += 0.002
    }
  })
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      <ambientLight intensity='0.3' />
      <pointLight position={[10, 10, 10]} />
      <mesh ref={mesh} rotation={[0, 0, -2]}>
        {/* rotation={[2, 0, -2]} */}
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color='gray' />
      </mesh>
    </>
  )
}
export default CubesAnimation
