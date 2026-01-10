'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import AnimationManager from '@/animations/core/AnimationManager';

interface PageLoadTimelineProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function PageLoadTimeline({ children, className = '', delay = 0 }: PageLoadTimelineProps) {
  const timelineRef = useRef<any>(null);
  
  useEffect(() => {
    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'power2.out',
        duration: 0.4,
      },
    });
    
    const elements = document.querySelectorAll('.gsap-animated > *');
    elements.forEach((el, index) => {
      tl.fromTo(el, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4 },
        index * 0.1
      );
    });
    
    gsap.set(elements, {
      willChange: 'transform, opacity',
    });
    
    timelineRef.current = tl;
    
    if (delay > 0) {
      setTimeout(() => {
        tl.play();
      }, delay * 1000);
    } else {
      tl.play();
    }
    
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);
  
  return (
    <section 
      id="page-load-timeline"
      className={`page-load-timeline ${className}`}
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </section>
  );
}
