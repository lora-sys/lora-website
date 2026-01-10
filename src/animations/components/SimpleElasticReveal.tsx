'use client';

import { useRef, useEffect, ReactNode, useState } from 'react';
import gsap from 'gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface SimpleElasticRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  disabled?: boolean;
  className?: string;
}

export function SimpleElasticReveal({
  children,
  delay = 0,
  duration = 0.6,
  disabled = false,
  className = ''
}: SimpleElasticRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasRevealed, setHasRevealed] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current || disabled) return;

    const container = containerRef.current;
    
    gsap.fromTo(
      container,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay,
        force3D: true,
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          onEnter: () => setHasRevealed(true)
        }
      }
    );
    
    return () => {
      gsap.killTweensOf(containerRef.current);
    };
  }, [delay, duration, disabled]);
  
  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
