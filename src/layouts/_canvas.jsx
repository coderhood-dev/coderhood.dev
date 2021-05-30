import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { A11yUserPreferences } from '@react-three/a11y'
import useStore from '@/lib/store'

const homeCanvasConfig = {
  orthographic: true,
  colorManagement: false, // not working
  camera: {
    zoom: 20,
  },
}

const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)

  return (
    <Canvas
      mode='concurrent'
      style={{
        position: 'absolute',
        top: 0,
      }}
      onCreated={(state) => state.events.connect(dom.current)}
      {...homeCanvasConfig}
    >
      <A11yUserPreferences>
        <Preload all />
        {children}
      </A11yUserPreferences>
    </Canvas>
  )
}

export default LCanvas
