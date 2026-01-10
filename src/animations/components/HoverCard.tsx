'use client';

import { useRef, useEffect, ReactNode, useCallback, useState } from 'react';
import gsap from 'gsap';
import { useDeviceCapabilities } from '@/animations/hooks/useDeviceCapabilities';
import { HOVER_PRESETS, type HoverIntensity } from '@/animations/physics/physics-presets';

export interface HoverCardProps {
  children: ReactNode;
  intensity?: HoverIntensity;
  tilt?: {
    enabled: boolean;
    intensity: number;
    perspective: number;
  };
  effects?: {
    glow?: boolean;
    shadow?: boolean;
    border?: boolean;
  };
  disabled?: boolean;
  className?: string;
}

export function HoverCard({
  children,
  intensity = 'medium',
  tilt = { enabled: true, intensity: 0.1, perspective: 1000 },
  effects = { glow: true, shadow: true, border: false },
  disabled = false,
  className = ''
}: HoverCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const capabilities = useDeviceCapabilities();
  
  const preset = HOVER_PRESETS[intensity];
  const scaleAmount = capabilities.shouldUse3D() ? preset.scale : Math.min(1.01, preset.scale);
  const actualDuration = capabilities.getAnimationDuration(preset.duration);

  const handleMouseMove = useCallback((e: unknown) => {
    if (!containerRef.current || !contentRef.current || disabled || !tilt.enabled) return;

    const mouseEvent = e as MouseEvent;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (mouseEvent.clientX - centerX) / rect.width;
    const deltaY = (mouseEvent.clientY - centerY) / rect.height;

    setTiltX(deltaX * tilt.intensity * 20);
    setTiltY(deltaY * tilt.intensity * 20);
  }, [disabled, tilt]);

  const handleMouseEnter = useCallback(() => {
    if (disabled) return;
    setIsHovered(true);
    
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: scaleAmount,
        duration: actualDuration,
        ease: preset.ease,
        transformOrigin: 'center center'
      });
    }
  }, [disabled, scaleAmount, actualDuration, preset.ease]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 1,
        duration: actualDuration,
        ease: preset.ease
      });
    }
    
    setTiltX(0);
    setTiltY(0);
  }, [actualDuration, preset.ease]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (disabled) return;
    setIsTouching(true);
    
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: scaleAmount * 1.1,
        duration: 0.2,
        ease: 'power2.out'
      });
    }
  }, [disabled, scaleAmount]);

  const handleTouchEnd = useCallback(() => {
    setIsTouching(false);
    
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 1,
        duration: actualDuration,
        ease: preset.ease
      });
    }
  }, [actualDuration, preset.ease]);

  useEffect(() => {
    if (!containerRef.current || disabled) return;

    const container = containerRef.current;

    if (capabilities.prefersReducedMotion) {
      return;
    }

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      gsap.killTweensOf(container);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleTouchStart, handleTouchEnd, disabled, capabilities]);

  const tiltTransform = tilt.enabled && !disabled
    ? `perspective(${tilt.perspective}px) rotateX(${-tiltY}deg) rotateY(${tiltX}deg)`
    : '';

  const statusClass = isHovered || isTouching ? 'is-animating' : 'idle';
  const tiltClass = tilt.enabled ? 'has-tilt' : '';
  const glowClass = effects.glow ? 'has-glow' : '';
  const shadowClass = effects.shadow ? 'has-shadow' : '';
  const borderClass = effects.border ? 'has-border' : '';

  return (
    <div
      ref={containerRef}
      className={`${className} hover-card ${statusClass} ${tiltClass} ${glowClass} ${shadowClass} ${borderClass}`}
      data-hover-intensity={intensity}
      data-tilt-enabled={tilt.enabled}
      data-effects-glow={effects.glow}
      data-effects-shadow={effects.shadow}
      style={{
        transform: tiltTransform,
        transformStyle: 'preserve-3d',
        transition: `transform ${actualDuration}s ${preset.ease}`
      }}
    >
      <div ref={contentRef} className="hover-card-content">
        {children}
      </div>
    </div>
  );
}
