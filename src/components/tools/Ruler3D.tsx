import { Canvas } from "@react-three/fiber";
import { Environment, Text, OrbitControls } from '@react-three/drei';

const RulerModel = () => {
  return (
    <group>
      {/* Ruler Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[10, 0.5, 0.2]} />
        <meshStandardMaterial color="#f0f0f0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Markings */}
      {Array.from({ length: 11 }).map((_, i) => (
        <group key={i} position={[i - 5, 0.3, 0]}>
          <mesh>
            <boxGeometry args={[0.05, 0.3, 0.1]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          {i % 1 === 0 && (
            <Text position={[0, 0.5, 0]} fontSize={0.3} color="black">
              {i}
            </Text>
          )}
        </group>
      ))}
    </group>
  );
};

export default function Ruler3D() {
  return (
    <div className="w-full h-96 bg-gray-100 rounded-xl overflow-hidden shadow-inner">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} castShadow />
        <RulerModel />
        <Environment preset="studio" />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
