'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Points, PointMaterial, OrbitControls, Float } from '@react-three/drei';

function Particles({ count = 2000 }) {
  const points = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const { clock } = state;
    const t = clock.getElapsedTime() * 0.05;

    // Rotate the entire cloud
    points.current.rotation.x = t * 0.2;
    points.current.rotation.y = t * 0.3;
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#D4AF37" // Gold
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingGeometry() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh position={[2, 0, -2]} scale={2.4}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#1E293B"
          wireframe
          emissive="#00D4D4"
          emissiveIntensity={0.8}
          transparent
          opacity={0.4}
          roughness={0}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

export default function Hero3DBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Mobile touch scroll pass-through layer */}
      <div
        className="absolute inset-0 z-[5] md:hidden"
        style={{ touchAction: 'pan-y' }}
      />

      <div className="absolute inset-0 z-[1] h-full w-full pointer-events-none md:pointer-events-auto">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          style={{ pointerEvents: isMobile ? 'none' : 'auto', touchAction: 'none' }}
        >
          <fog attach="fog" args={['#0A0A0A', 5, 15]} />
          <ambientLight intensity={0.5} />
          <Particles count={3000} />
          <FloatingGeometry />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={!isMobile}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Canvas>
        {/* Gradient overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black-void via-transparent to-black-void/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black-void/80 via-transparent to-black-void/80 pointer-events-none" />
      </div>
    </>
  );
}
