'use client';

import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useDeviceCapabilities } from '@/animations/hooks/useDeviceCapabilities';

export type MeshGeometry = 'box' | 'sphere' | 'torus' | 'icosahedron' | 'octahedron';

export type MeshAnimation = 'float' | 'rotate' | 'pulse' | 'wave';

export interface ThreeMeshProps {
  position?: [number, number, number];
  geometry?: MeshGeometry;
  color?: string;
  scale?: number;
  wireframe?: boolean;
  animation?: MeshAnimation;
  distort?: boolean;
  distortSpeed?: number;
  distortStrength?: number;
  onClick?: () => void;
  onHover?: (hovered: boolean) => void;
  castShadow?: boolean;
  receiveShadow?: boolean;
}

export default function ThreeMesh({
  position = [0, 0, 0],
  geometry = 'icosahedron',
  color = '#4a9eff',
  scale = 1,
  wireframe = false,
  animation = 'float',
  distort = true,
  distortSpeed = 2,
  distortStrength = 0.5,
  onClick,
  onHover,
  castShadow = true,
  receiveShadow = true,
}: ThreeMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { isLowEnd } = useDeviceCapabilities();
  const { clock } = useThree();

  const actualScale = isLowEnd ? scale * 0.7 : scale;
  const actualDistort = isLowEnd ? distortStrength * 0.5 : distortStrength;

  useFrame(() => {
    if (!meshRef.current) return;

    const time = clock.getElapsedTime();

    switch (animation) {
      case 'float':
        meshRef.current.position.y = position[1] + Math.sin(time * 2) * 0.2;
        meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
        meshRef.current.rotation.y = time * 0.5;
        break;
      case 'rotate':
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.02;
        break;
      case 'pulse':
        const pulseScale = actualScale + Math.sin(time * 3) * 0.1;
        meshRef.current.scale.setScalar(pulseScale);
        break;
      case 'wave':
        meshRef.current.position.y = position[1] + Math.sin(time * 3 + position[0] * 2) * 0.15;
        meshRef.current.rotation.y = time * 0.3;
        break;
    }
  });

  useGSAP(() => {
    if (meshRef.current && !hovered) {
      gsap.to(meshRef.current.rotation, {
        x: Math.PI * 2,
        duration: isLowEnd ? 0.8 : 1.5,
        ease: 'power2.out',
      });
    }
  }, [hovered, isLowEnd]);

  const handleClick = () => {
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: actualScale * 1.2,
        y: actualScale * 1.2,
        z: actualScale * 1.2,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });
    }
    onClick?.();
  };

  const handlePointerOver = () => {
    setHovered(true);
    onHover?.(true);
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: actualScale * 1.1,
        y: actualScale * 1.1,
        z: actualScale * 1.1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handlePointerOut = () => {
    setHovered(false);
    onHover?.(false);
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: actualScale,
        y: actualScale,
        z: actualScale,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const getGeometry = () => {
    switch (geometry) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[0.7, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[0.6, 0.2, 16, 100]} />;
      case 'octahedron':
        return <octahedronGeometry args={[0.7, 0]} />;
      case 'icosahedron':
      default:
        return <icosahedronGeometry args={[0.7, 0]} />;
    }
  };

  return (
    <Float
      rotationIntensity={animation === 'float' ? 0.5 : 0}
      floatIntensity={animation === 'float' ? 0.5 : 0}
      speed={2}
    >
      <mesh
        ref={meshRef}
        position={position}
        castShadow={castShadow}
        receiveShadow={receiveShadow}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {getGeometry()}
        {distort ? (
          <MeshDistortMaterial
            color={color}
            distort={actualDistort}
            speed={distortSpeed}
            wireframe={wireframe}
            metalness={0.7}
            roughness={0.2}
          />
        ) : (
          <meshStandardMaterial
            color={color}
            wireframe={wireframe}
            metalness={0.7}
            roughness={0.2}
          />
        )}
      </mesh>
    </Float>
  );
}

export function AnimatedGrid({ count = 10, spacing = 2 }: { count?: number; spacing?: number }) {
  const { isLowEnd } = useDeviceCapabilities();
  const actualCount = isLowEnd ? Math.floor(count * 0.5) : count;

  return (
    <group>
      {Array.from({ length: actualCount * actualCount }).map((_, i) => {
        const x = (i % actualCount - actualCount / 2) * spacing;
        const z = (Math.floor(i / actualCount) - actualCount / 2) * spacing;
        const y = Math.sin(i * 0.5) * 0.5;
        const hue = (i / (actualCount * actualCount)) * 0.3 + 0.5;

        return (
          <ThreeMesh
            key={i}
            position={[x, y, z]}
            geometry={geometryByIndex(i)}
            color={`hsl(${hue * 360}, 70%, 60%)`}
            scale={0.5}
            animation="wave"
            distort={true}
          />
        );
      })}
    </group>
  );
}

function geometryByIndex(index: number): MeshGeometry {
  const geometries: MeshGeometry[] = ['box', 'sphere', 'torus', 'icosahedron', 'octahedron'];
  return geometries[index % geometries.length];
}
