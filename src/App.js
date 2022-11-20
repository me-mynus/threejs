import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars} from "@react-three/drei";
function Box(){
    return (
        <mesh rotation={[90, 0, 20]}>
            <boxBufferGeometry attach="geometry" args={[3, 3, 3]}/>
            <meshStandardMaterial attach="material" color ="blue" />
        </mesh>
    );
 }


export default function App()   {
    return(
    <Canvas
    style={{ width: "50vw", height: "50vh" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 5, 2]} intensity={1} />
        <OrbitControls />
        <Stars/>
        <Box />
    </Canvas>
    );
}