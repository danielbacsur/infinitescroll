import * as THREE from 'three'
import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Preload, Image as ImageImpl } from '@react-three/drei'
import { ScrollControls, Scroll, useScroll } from './ScrollControls'

function Image(props) {
  const ref = useRef()
  const group = useRef()
  const data = useScroll()
  useFrame((state, delta) => {
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, Math.max(0, data.delta * 50), 4, delta)
    ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, Math.max(0, 1 - data.delta * 1000), 4, delta)
  })
  return (
    <group ref={group}>
      <ImageImpl ref={ref} {...props} />
    </group>
  )
}

function Page({ m = 0.4, urls, ...props }) {
  const { width } = useThree((state) => state.viewport)
  const w = width < 10 ? 1.5 / 3 : 1 / 3
  return (
    <group {...props}>
      <Image position={[-width * w, 0, -1]} scale={[width * w - m * 2, 5, 1]} url={urls[0]} />
      <Image position={[0, 0, 0]} scale={[width * w - m * 2, 5, 1]} url={urls[1]} />
      <Image position={[width * w, 0, 1]} scale={[width * w - m * 2, 5, 1]} url={urls[2]} />
    </group>
  )
}

function Pages() {
  const { height } = useThree((state) => state.viewport)
  return (
    <>
      <Page position={[0, -height * 1, 0]} urls={['/trip1.jpg', '/trip2.jpg', '/trip3.jpg']} />
      <Page position={[0, height * 0, 0]} urls={['/img1.jpg', '/img2.jpg', '/img3.jpg']} />
      <Page position={[0, height * 1, 0]} urls={['/img4.jpg', '/img5.jpg', '/img6.jpg']} />
      <Page position={[0, height * 2, 0]} urls={['/trip1.jpg', '/trip2.jpg', '/trip3.jpg']} />
      <Page position={[0, height * 3, 0]} urls={['/img1.jpg', '/img2.jpg', '/img3.jpg']} />
      <Page position={[0, height * 4, 0]} urls={['/img4.jpg', '/img5.jpg', '/img6.jpg']} />
    </>
  )
}

export default function App() {
  return (
    <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ScrollControls infinite vertical damping={4} pages={4} distance={1}>
          <Scroll>
            <Pages />
          </Scroll>
          <Scroll html>
            <h1 style={{ position: 'absolute', left: '50vw', top: '-75vw', transform: 'translate(-50%, -50%)' }}>kavarom</h1>
            <h1 style={{ position: 'absolute', left: '50vw', top: '25vw', transform: 'translate(-50%, -50%)' }}>a</h1>
            <h1 style={{ position: 'absolute', left: '50vw', top: '125vw', transform: 'translate(-50%, -50%)' }}>kávém</h1>
            <h1 style={{ position: 'absolute', left: '50vw', top: '225vw', transform: 'translate(-50%, -50%)' }}>kavarom</h1>
            <h1 style={{ position: 'absolute', left: '50vw', top: '325vw', transform: 'translate(-50%, -50%)' }}>a</h1>
            <h1 style={{ position: 'absolute', left: '50vw', top: '425vw', transform: 'translate(-50%, -50%)' }}>kávém</h1>
          </Scroll>
        </ScrollControls>
        <Preload />
      </Suspense>
    </Canvas>
  )
}
