'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useDeviceCapabilities } from '@/animations/hooks/useDeviceCapabilities';

interface ThreeCanvasProps {
  className?: string;
  children?: React.ReactNode;
  enableControls?: boolean;
  enableEnvironment?: boolean;
  cameraPosition?: [number, number, number];
  backgroundColor?: string;
}

function SceneContent({ children, enableControls, enableEnvironment, cameraPosition, backgroundColor }: ThreeCanvasProps) {
  const { gl, scene, camera } = useThree();
  const mountedRef = useRef(false);

  useEffect(() => {
    if (enableEnvironment) {
      scene.background = new THREE.Color(backgroundColor || '#000000');
    }
    mountedRef.current = true;
  }, [backgroundColor, enableEnvironment, scene]);

  return (
    <>
      {enableEnvironment && <Environment preset="sunset" />}
      {enableControls && (
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      )}
      <PerspectiveCamera makeDefault position={cameraPosition || [0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6666ff" />
      {children}
    </>
  );
}

function AnimatedMesh({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { isLowEnd } = useDeviceCapabilities();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 2) * 0.2;
    }
  });

  useGSAP(() => {
    if (meshRef.current) {
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: isLowEnd ? 0.6 : 1.2,
        ease: 'elastic.out(1, 0.5)',
      });
    }
  }, []);

  return (
    <Float rotationIntensity={0.5} floatIntensity={0.5} speed={2}>
      <mesh ref={meshRef} position={position} castShadow receiveShadow>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#4a9eff"
          metalness={0.7}
          roughness={0.2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function FallbackScene() {
  return (
    <>
      <AnimatedMesh position={[-2, 0, 0]} />
      <AnimatedMesh position={[0, 0, 0]} />
      <AnimatedMesh position={[2, 0, 0]} />
    </>
  );
}

export default function ThreeCanvas({
  className = '',
  children,
  enableControls = true,
  enableEnvironment = true,
  cameraPosition = [0, 0, 5],
  backgroundColor = '#000000',
}: ThreeCanvasProps) {
  const [mounted, setMounted] = useState(false);
  const { isLowEnd } = useDeviceCapabilities();

  useEffect(() => {
    setMounted(true);
  }, []);

  const dpr = isLowEnd ? 1 : Math.min(window.devicePixelRatio, 2);

  if (!mounted) {
    return (
      <div className={`w-full h-full bg-black/50 flex items-center justify-center ${className}`}>
        <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        dpr={dpr}
        gl={{ antialias: !isLowEnd, alpha: true }}
        shadows
        className="outline-none"
      >
        <Suspense fallback={null}>
          <SceneContent
            enableControls={enableControls}
            enableEnvironment={enableEnvironment}
            cameraPosition={cameraPosition}
            backgroundColor={backgroundColor}
          >
            {children || <FallbackScene />}
          </SceneContent>
        </Suspense>
      </Canvas>
    </div>
  );
}
