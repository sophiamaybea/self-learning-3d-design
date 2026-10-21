import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import type { Group } from 'three';

function Sculpture({ reduced }: { reduced: boolean }) {
  const model = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!reduced && model.current) {
      model.current.rotation.y += delta * 0.15;
      model.current.rotation.z += delta * 0.055;
    }
  });
  return (
    <Float speed={reduced ? 0 : 1.35} rotationIntensity={reduced ? 0 : 0.35} floatIntensity={reduced ? 0 : 0.5}>
      <group ref={model} rotation={[0.2, -0.2, 0.1]}>
        <mesh>
          <torusKnotGeometry args={[1.08, 0.27, 190, 22, 2, 5]} />
          <meshPhysicalMaterial
            color="#d3facb"
            metalness={0.42}
            roughness={0.21}
            clearcoat={1}
            clearcoatRoughness={0.09}
          />
        </mesh>
      </group>
    </Float>
  );
}


export default function SculptureScene({ reduced }: { reduced: boolean }) {
  return (
    <Canvas
      className="sculpture-canvas"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.4], fov: 43 }}
      gl={{ antialias: false, powerPreference: 'low-power' }}
      fallback={null}
    >
      <ambientLight intensity={1.7} />
      <pointLight position={[4, 6, 5]} intensity={50} color="#f2ffe9" />
      <pointLight position={[-4, -2, 3]} intensity={25} color="#9bffc8" />
      <Suspense fallback={null}><Sculpture reduced={reduced}/></Suspense>
    </Canvas>
  );
}
