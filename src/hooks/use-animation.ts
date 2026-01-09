import { useMemo } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useAnimationConfig() {
  const prefersReducedMotion = useReducedMotion();
  
  const level = useMemo(() => {
    if (prefersReducedMotion) return 'minimal';
    
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return isMobile ? 'mobile' : 'full';
  }, [prefersReducedMotion]);
  
  return {
    level,
    
    enable3D: level === 'full',
    enableParallax: level !== 'minimal',
    enableStagger: level === 'full',
    enableParticles: level === 'full',
    
    duration: {
      micro: 0.1,
      fast: 0.2,
      normal: 0.4,
      slow: 0.6,
      verySlow: 0.8,
    },
    
    scroll: {
      once: true,
      margin: '-15%',
    },
    
    parallax: {
      speed: 0.3,
    },
    
    performance: {
      willChange: true,
      layoutAware: true,
      gpuAcceleration: true,
      reduceMotion: true,
    },
  };
}
