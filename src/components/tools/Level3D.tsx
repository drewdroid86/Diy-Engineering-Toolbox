import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, SoftShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Bubble = ({ pitch, roll }: { pitch: number, roll: number }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    mesh.current.position.x = roll * 0.05;
    mesh.current.position.z = pitch * 0.05;
  });
  return (
    <mesh ref={mesh} castShadow>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color="cyan" metalness={0.6} roughness={0.2} />
    </mesh>
  );
};

export default function Level3D() {
  const [pitch, setPitch] = useState(0);
  const [roll, setRoll] = useState(0);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      setPitch(event.beta ? event.beta : 0);
      setRoll(event.gamma ? event.gamma : 0);
    };
    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  return (
    <div className="w-full h-96 bg-gray-900 rounded-xl overflow-hidden">
      <Canvas shadows camera={{ position: [0, 5, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        <SoftShadows />
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <Bubble pitch={pitch} roll={roll} />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
