import { useCallback } from 'react';

/**
 * GSAP Animation Hook
 * Standardized hook for GSAP animations
 */

export interface UseGSAPAnimationOptions {
  name: string;
  create?: (element: HTMLElement) => any;
  cleanup?: () => void;
}

export function useGSAPAnimation(options: UseGSAPAnimationOptions) {
  const timelineRef = useRef<any>(null);
  const isPlaying = useRef(false);
  
  const play = useCallback(() => {
    if (timelineRef.current && !isPlaying.current) {
      try {
        if (typeof timelineRef.current === 'object' && 'play' in timelineRef.current) {
          timelineRef.current.play();
        } else {
          const anim = timelineRef.current;
          if ('play' in anim) {
            anim.play();
          }
        }
        isPlaying.current = true;
      } catch (error) {
        console.error(`[GSAP] Failed to play ${options.name}:`, error);
      }
    }
  }, [options.name]);
  
  const pause = useCallback(() => {
    if (timelineRef.current) {
      try {
        if (typeof timelineRef.current === 'object' && 'pause' in timelineRef.current) {
          timelineRef.current.pause();
        } else {
          const anim = timelineRef.current;
          if ('pause' in anim) {
            anim.pause();
          }
        }
        isPlaying.current = false;
      } catch (error) {
        console.error(`[GSAP] Failed to pause ${options.name}:`, error);
      }
    }
  }, [options.name]);
  
  const cleanup = useCallback(() => {
    if (timelineRef.current) {
      try {
        if (typeof timelineRef.current === 'object' && 'kill' in timelineRef.current) {
          timelineRef.current.kill();
        }
      } catch (error) {
        console.warn(`[GSAP] Failed to kill ${options.name}:`, error);
      }
    }
    timelineRef.current = null;
    options.cleanup?.();
  }, [options.name, options.cleanup]);
  
  return { timelineRef, isPlaying, play, pause, cleanup };
}

/**
 * Simplified hook for basic animations
 */
export function useAnimation(animation: any) {
  const animRef = useRef<any>(null);
  
  useEffect(() => {
    if (animation && !animRef.current) {
      animRef.current = animation;
      
      return () => {
        if (animRef.current) {
          try {
            if ('kill' in animRef.current) {
              animRef.current.kill();
            }
          } catch (error) {
            console.warn('Failed to kill animation:', error);
          }
          animRef.current = null;
        }
      };
    }
  }, [animation]);
  
  return animRef;
}

import { useEffect, useRef } from 'react';
