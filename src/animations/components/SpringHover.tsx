'use client';

import { useRef, useEffect, ReactNode, useCallback, useState } from 'react';
import gsap from 'gsap';
import { useDeviceCapabilities } from '@/animations/hooks/useDeviceCapabilities';
import { HOVER_PRESETS, type HoverIntensity } from '@/animations/physics/physics-presets';

export interface SpringHoverProps {
  children: ReactNode;
  intensity?: HoverIntensity;
  transformOrigin?: string;
  hoverDelay?: number;
  disabled?: boolean;
  className?: string;
}

export function SpringHover({
  children,
  intensity = 'medium',
  transformOrigin = 'center',
  hoverDelay = 0,
  disabled = false,
  className = ''
}: SpringHoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const capabilities = useDeviceCapabilities();
  
  const preset = HOVER_PRESETS[intensity];
  
  const scaleAmount = capabilities.shouldUse3D() ? preset.scale : Math.min(1.01, preset.scale);
  const actualDuration = capabilities.getAnimationDuration(preset.duration);

  const handleMouseEnter = useCallback(() => {
    if (disabled || isAnimating) return;
    setIsHovered(true);
    setIsAnimating(true);
    
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: scaleAmount,
        duration: hoverDelay > 0 ? hoverDelay : actualDuration,
        ease: preset.ease,
        transformOrigin,
        force3D: true,
        willChange: 'transform',
        delay: hoverDelay / 1000
      });
    }
  }, [disabled, scaleAmount, actualDuration, preset.ease, transformOrigin, hoverDelay, isAnimating]);

  const handleMouseLeave = useCallback(() => {
    if (!containerRef.current) return;
    setIsHovered(false);
    
    gsap.to(containerRef.current, {
      scale: 1,
      duration: actualDuration,
      ease: preset.ease,
      transformOrigin,
      force3D: true,
      willChange: 'transform',
      onComplete: () => setIsAnimating(false)
    });
  }, [actualDuration, preset.ease, transformOrigin]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (disabled || isAnimating || !containerRef.current) return;
    setIsHovered(true);
    setIsAnimating(true);
    
    gsap.to(containerRef.current, {
      scale: scaleAmount,
      duration: actualDuration,
      ease: preset.ease,
      transformOrigin,
      force3D: true,
      willChange: 'transform'
    });
  }, [disabled, scaleAmount, actualDuration, preset.ease, transformOrigin, isAnimating]);

  const handleTouchEnd = useCallback(() => {
    if (!containerRef.current) return;
    setIsHovered(false);
    
    gsap.to(containerRef.current, {
      scale: 1,
      duration: actualDuration,
      ease: preset.ease,
      transformOrigin,
      force3D: true,
      willChange: 'transform',
      onComplete: () => setIsAnimating(false)
    });
  }, [actualDuration, preset.ease, transformOrigin]);

  useEffect(() => {
    if (!containerRef.current || disabled) return;

    const container = containerRef.current;

    if (capabilities.prefersReducedMotion) {
      return;
    }

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      gsap.killTweensOf(container);
    };
  }, [handleMouseEnter, handleMouseLeave, handleTouchStart, handleTouchEnd, disabled, capabilities]);

  const statusClass = isAnimating ? 'is-animating' : 'idle';
  const hoverClass = isHovered ? 'is-hovered' : '';

  return (
    <div
      ref={containerRef}
      className={`${className} spring-hover ${statusClass} ${hoverClass}`}
      data-hover-intensity={intensity}
      style={{ 
        transform: 'translate3d(0,0,0)',
        touchAction: 'manipulation',
        pointerEvents: 'auto'
      }}
    >
      {children}
    </div>
  );
}
