'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import AnimationManager from '@/animations/core/AnimationManager';

interface OrbitSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function OrbitSection({ children, className = '', id }: OrbitSectionProps) {
  const orbitRef = useRef<HTMLDivElement>(null);
  const manager = AnimationManager.getInstance();
  
  useEffect(() => {
    if (!orbitRef.current) return;
    
    const orbitTimeline = manager.createTimeline('orbit');
    
    const outerOrbit = gsap.to('#orbit-outer', {
      rotation: 360,
      duration: 60,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center',
      force3D: true,
    });
    
    const innerOrbit = gsap.to('#orbit-inner', {
      rotation: -360,
      duration: 30,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center',
      force3D: true,
      delay: 0.1,
    });
    
    const planets = gsap.to('.orbit-planet', {
      y: '-=10',
      yoyo: true,
      repeat: -1,
      duration: 2,
      ease: 'sine.inOut',
      delay: 0.2,
    });
    
    const particles = gsap.to('.orbit-particles', {
      opacity: 0.6,
      yoyo: true,
      repeat: -1,
      duration: 1.5,
      ease: 'sine.inOut',
      delay: 0.3,
    });
    
    orbitTimeline.add(outerOrbit, 0);
    orbitTimeline.add(innerOrbit, 0);
    orbitTimeline.add(planets, 0);
    orbitTimeline.add(particles, 0);
    
    gsap.set(['#orbit-outer', '#orbit-inner'], {
      transformOrigin: 'center center',
      willChange: 'transform',
    });
    
    orbitTimeline.play();
    
    return () => {
      manager.kill('orbit');
    };
  }, []);
  
  return (
    <section 
      id={id}
      ref={orbitRef}
      className={`orbit-container gsap-animated ${className}`}
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform, opacity',
      }}
    >
      <div 
        id="orbit-outer"
        className="orbit-layer-outer absolute inset-0 border-2 border-white/10 rounded-full"
        style={{
          width: '70%',
          height: '70%',
          top: '15%',
          left: '15%',
        }}
      />
      
      <div 
        id="orbit-inner"
        className="orbit-layer-inner absolute inset-0 border border-purple-500/30 rounded-full"
        style={{
          width: '40%',
          height: '40%',
          top: '30%',
          left: '30%',
        }}
      />
      
      <div className="orbit-planets relative">
        {children}
      </div>
      
      <div 
        id="orbit-particles"
        className="orbit-particles absolute inset-0 pointer-events-none"
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${10 + Math.random() * 80}%`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>
    </section>
  );
}
