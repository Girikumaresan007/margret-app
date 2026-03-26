import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function DigitalWaveGrid() {
  const ref = useRef<THREE.Points>(null);
  
  const count = 50;
  const particlesCount = count * count;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const x = (i - count / 2) * 0.25;
        const z = (j - count / 2) * 0.25;
        pos[(i * count + j) * 3] = x;
        pos[(i * count + j) * 3 + 1] = 0;
        pos[(i * count + j) * 3 + 2] = z;
      }
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const index = (i * count + j) * 3;
        const x = positions[index];
        const z = positions[index + 2];
        
        // Create a multi-layered wave effect
        const wave1 = Math.sin(x * 0.5 + time) * 0.5;
        const wave2 = Math.cos(z * 0.3 + time * 0.8) * 0.3;
        const wave3 = Math.sin((x + z) * 0.2 + time * 0.5) * 0.2;
        
        positions[index + 1] = wave1 + wave2 + wave3;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    
    // Subtle overall rotation
    ref.current.rotation.y = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <Points positions={positions} ref={ref}>
      <PointMaterial
        transparent
        color="#B8860B"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  );
}

function LightBeams() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      child.rotation.z = Math.sin(time * 0.2 + i) * 0.5;
      child.rotation.x = Math.cos(time * 0.1 + i) * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={i} position={[(i - 1.5) * 4, -5, -5]} rotation={[0.5, 0, 0]}>
          <cylinderGeometry args={[0.05, 2, 15, 32]} />
          <meshBasicMaterial 
            color="#DAA520" 
            transparent 
            opacity={0.05} 
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function AtmosphericParticles() {
  const ref = useRef<THREE.Points>(null);
  const particlesCount = 1000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <Points positions={positions} ref={ref}>
      <PointMaterial
        transparent
        color="#B8860B"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.2}
      />
    </Points>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <fog attach="fog" args={['#F5F2ED', 5, 20]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <DigitalWaveGrid />
        <LightBeams />
        <AtmosphericParticles />
      </Canvas>
    </div>
  );
}
