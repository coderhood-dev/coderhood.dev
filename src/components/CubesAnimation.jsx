export const CubesAnimation = () => {
  return (
    <>
      <mesh
        // {...props}
        // ref={mesh}
        scale={1}
        rotation={[0, 1, 2]}
        // onClick={(event) => setActive(!active)}
        // onPointerOver={(event) => setHover(true)}
        // onPointerOut={(event) => setHover(false)}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color='orange' />
      </mesh>
      <ambientLight intensity='0.5' />
    </>
  )
}
