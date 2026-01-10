import { useMemo } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Animation Level Hook
 * Returns the current animation level based on device capabilities and user preferences
 */

export function useAnimationLevel() {
  const prefersReduced = useReducedMotion();
  
  const level = useMemo(() => {
    if (prefersReduced) return 'minimal';
    
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return isMobile ? 'minimal' : 'balanced';
  }, [prefersReduced]);
  
  return level;
}

/**
 * Animation durations based on level
 */
export const animationDurations = {
  minimal: {
    instant: 0.1,
    fast: 0.15,
    normal: 0.2,
    slow: 0.3,
  },
  balanced: {
    instant: 0.15,
    fast: 0.2,
    normal: 0.3,
    slow: 0.4,
  },
  rich: {
    instant: 0.2,
    fast: 0.3,
    normal: 0.4,
    slow: 0.6,
  },
};

/**
 * Get duration for current level
 */
export function getDuration(speed: keyof typeof animationDurations.minimal) {
  const level = useAnimationLevel();
  return animationDurations[level][speed];
}
