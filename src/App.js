import { React, useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, ContactShadows, Environment } from '@react-three/drei'
import { proxy, useSnapshot } from 'valtio'
import { HexColorPicker } from 'react-colorful'
import mug_03 from "./mug_03.gltf"
import mug_02 from "./mug_02.gltf"
import pot_03 from "./pot_03.gltf"
import pot_02 from "./pot_02.gltf"
import pot_01 from "./pot_01.gltf"

import mug_01 from "./mug_01.gltf"


const b = mug_02;

const state = proxy({
  current: null,
  items: {
    Rim: '#1e1e1e',
    Body: '#d9d9db',
    Base: '#1e1e1e',
    Top_Band: '#da604e',
    Mid_Band: '#5da696',
    Bot_Band: '#cdb152',
    Handle: '#1e1e1e'
  }
})

function Mesh(props) {
  const ref = useRef()
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF(b)

    // Animate model
   useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
    ref.current.rotation.x = Math.cos(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 4) / 8
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
    })

    const [hovered, set] = useState(null)

    useEffect(() => {
      const cursor = `<svg width="100" height="100" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="20" y="62.5">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
      const auto = `<svg width="100" height="100" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
      if (hovered) {
        document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`
      return () => (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(auto)}'), auto`)
      }
    })

  return (
    <group
      ref={ref}
      dispose={null}
      onPointerOver={(e) => {
        e.stopPropagation()
        set(e.object.material.name)
      }}
      onPointerOut={(e) => {
        e.intersections.length === 0 && set(null)
      }}
      onPointerDown={(e) => {
        e.stopPropagation()
        state.current = e.object.material.name
      }}
      onPointerMissed={(e) => {
        state.current = null
      }}>

      {/* Mug_01 */}
      {/* <mesh material-color={snap.items.Body} geometry={nodes.Body.geometry} material={materials.Body} scale={[20, 20, 20]} />
      <mesh material-color={snap.items.Base} geometry={nodes.Base.geometry} material={materials.Base} scale={[20, 20, 20]} />
      <mesh material-color={snap.items.Top_Band} geometry={nodes.Top_Band.geometry} material={materials.Top_Band} scale={[20, 20, 20]} />
      <mesh material-color={snap.items.Bot_Band} geometry={nodes.Bot_Band.geometry} material={materials.Bot_Band} scale={[20, 20, 20]} />
      <mesh material-color={snap.items.Mid_Band} geometry={nodes.Mid_Band.geometry} material={materials.Mid_Band} scale={[20, 20, 20]} />
      <mesh material-color={snap.items.Rim} geometry={nodes.Rim.geometry} material={materials.Rim} scale={[20, 20, 20]} />
      <mesh material-color={snap.items.Handle} geometry={nodes.Handle.geometry} material={materials.Handle} scale={[20, 20, 20]} /> */}

      {/* Mug_02 */}
      <mesh material-color={snap.items.Body} geometry={nodes.Body.geometry} material={materials.Body} scale={[20, 20, 20]} />
      <mesh material-color={snap.items.Base} geometry={nodes.Base.geometry} material={materials.Base} scale={[20, 20, 20]} />
      <mesh material-color={snap.items.Rim} geometry={nodes.Rim.geometry} material={materials.Rim} scale={[20, 20, 20]} />
      <mesh material-color={snap.items.Handle} geometry={nodes.Handle.geometry} material={materials.Handle} scale={[20, 20, 20]} />
      <mesh material-color={snap.items.Top_Band} geometry={nodes.Top_Band.geometry} material={materials.Top_Band} scale={[20, 20, 20]} />
      <mesh material-color={snap.items.Bot_Band} geometry={nodes.Bot_Band.geometry} material={materials.Bot_Band} scale={[20, 20, 20]} />

      {/* Mug_03 */}
      {/* <mesh material-color={snap.items.Base} geometry={nodes.Base.geometry} material={materials.Base} scale={[20, 20, 20]} />
      <mesh material-color={snap.items.Rim} geometry={nodes.Rim.geometry} material={materials.Rim} scale={[20, 20, 20]} />
      <mesh material-color={snap.items.Handle} geometry={nodes.Handle.geometry} material={materials.Handle} scale={[20, 20, 20]} />
      <mesh material-color={snap.items.Body} geometry={nodes.Body.geometry} material={materials.Body} scale={[20, 20, 20]} /> */}

      {/* Pot_01 */}
      {/* <mesh material-color={snap.items.Body} geometry={nodes.Body.geometry} material={materials.Body} scale={[12,12,12]} />
      <mesh material-color={snap.items.Base} geometry={nodes.Base.geometry} material={materials.Base} scale={[12,12,12]} />
      <mesh material-color={snap.items.Rim} geometry={nodes.Rim.geometry} material={materials.Rim} scale={[12,12,12]} />
      <mesh material-color={snap.items.Top_Band} geometry={nodes.Top_Band.geometry} material={materials.Top_Band} scale={[12,12,12]} />
      <mesh material-color={snap.items.Bot_Band} geometry={nodes.Bot_Band.geometry} material={materials.Bot_Band} scale={[12,12,12]} />
      <mesh material-color={snap.items.Mid_Band} geometry={nodes.Mid_Band.geometry} material={materials.Mid_Band} scale={[12,12,12]} /> */}

      {/* Pot_02 */}
      {/* <mesh material-color={snap.items.Base} geometry={nodes.Base.geometry} material={materials.Base} scale={[12,12,12]} />
      <mesh material-color={snap.items.Rim} geometry={nodes.Rim.geometry} material={materials.Rim} scale={[12,12,12]} />
      <mesh material-color={snap.items.Body} geometry={nodes.Body.geometry} material={materials.Body} scale={[12,12,12]}  />
      <mesh material-color={snap.items.Top_Band} geometry={nodes.Top_Band.geometry} material={materials.Top_Band} scale={[12,12,12]} />
      <mesh material-color={snap.items.Mid_Band} geometry={nodes.Mid_Band.geometry} material={materials.Mid_Band} scale={[12,12,12]} />
      <mesh material-color={snap.items.Bot_Band} geometry={nodes.Bot_Band.geometry} material={materials.Bot_Band} scale={[12,12,12]} /> */}

      {/* Pot_03*/}
      {/* <mesh material-color={snap.items.Base} geometry={nodes.Base.geometry} material={materials.Base} scale={[12,12,12]} />
      <mesh material-color={snap.items.Rim} geometry={nodes.Rim.geometry} material={materials.Rim} scale={[12,12,12]} />
      <mesh material-color={snap.items.Body} geometry={nodes.Body.geometry} material={materials.Body} scale={[12,12,12]} /> */}

    </group>
  )
}

function Picker() {
  const snap = useSnapshot(state)
  return (
    <div>
      <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
      <h1>{snap.current}</h1>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Canvas style={{
      width:'500px',
      height:'500px',
      }}
      shadows camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight intensity={0.8} position={[10, 15, 10]} castShadow />
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
        <Suspense fallback={null}>
          <Mesh />
          <Environment preset="sunset" />
          <ContactShadows position={[0,-1.5, 0]} opacity={0.4} scale={10} blur={1.5} far={1.5} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
      <Picker />
    </>
  )
}