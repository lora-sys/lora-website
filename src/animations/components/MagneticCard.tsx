'use client';

import { useRef, useEffect, ReactNode, useCallback, useState } from 'react';
import gsap from 'gsap';
import { useDeviceCapabilities } from '@/animations/hooks/useDeviceCapabilities';
import { MAGNETIC_PRESETS, type MagneticStrength } from '@/animations/physics/physics-presets';

export interface MagneticCardProps {
  children: ReactNode;
  strength?: MagneticStrength;
  edgeBehavior?: 'attract' | 'repel' | 'none';
  proximity?: number;
  disabled?: boolean;
  className?: string;
}

export function MagneticCard({
  children,
  strength = 'medium',
  edgeBehavior = 'none',
  proximity = 100,
  disabled = false,
  className = ''
}: MagneticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);
  const capabilities = useDeviceCapabilities();
  const preset = MAGNETIC_PRESETS[strength];
  const actualDuration = capabilities.getAnimationDuration(preset.duration);
  const actualStrength = capabilities.getAnimationLevel() === 'minimal' ? preset.strength * 0.5 : preset.strength;

  const handleMouseMove = useCallback((e: unknown) => {
    if (!cardRef.current || disabled || capabilities.isMobile) return;

    const mouseEvent = e as MouseEvent;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (mouseEvent.clientX - centerX) * actualStrength;
    const deltaY = (mouseEvent.clientY - centerY) * actualStrength;

    setXOffset(deltaX);
    setYOffset(deltaY);

    gsap.to(cardRef.current, {
      x: deltaX,
      y: deltaY,
      duration: 0.2,
      ease: 'power2.out',
      force3D: true,
      willChange: 'transform'
    });
  }, [disabled, actualStrength, capabilities.isMobile]);

  const handleMouseEnter = useCallback(() => {
    if (disabled) return;
    setIsHovered(true);
    
    if (cardRef.current && !capabilities.isMobile) {
      gsap.to(cardRef.current, {
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out',
        force3D: true
      });
    }
  }, [disabled, capabilities.isMobile]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    
    if (!cardRef.current || disabled) return;

    gsap.to(cardRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: actualDuration,
      ease: preset.ease,
      force3D: true,
      willChange: 'transform',
      onComplete: () => {
        setXOffset(0);
        setYOffset(0);
      }
    });
  }, [disabled, actualDuration, preset.ease]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (disabled) return;
    setIsTouching(true);
    
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1.05,
        duration: 0.2,
        ease: 'power2.out',
        force3D: true
      });
    }
  }, [disabled]);

  const handleTouchEnd = useCallback(() => {
    setIsTouching(false);
    
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        duration: actualDuration,
        ease: preset.ease,
        force3D: true
      });
    }
  }, [actualDuration, preset.ease]);

  const handleClick = useCallback(() => {
    if (disabled) return;
    setIsActive(true);
    setTimeout(() => setIsActive(false), 300);
  }, [disabled]);

  useEffect(() => {
    if (!cardRef.current || disabled) return;

    const card = cardRef.current;

    if (capabilities.prefersReducedMotion || !capabilities.shouldUse3D() || capabilities.isMobile) {
      return;
    }

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('touchstart', handleTouchStart, { passive: true });
    card.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('touchstart', handleTouchStart);
      card.removeEventListener('touchend', handleTouchEnd);
      gsap.killTweensOf(card);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleTouchStart, handleTouchEnd, disabled, capabilities]);

  const activeClass = isActive ? 'magnetic-active' : '';
  const hoveredClass = isHovered ? 'magnetic-hovered' : '';
  const touchingClass = isTouching ? 'magnetic-touching' : '';

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className={`${className} magnetic-card ${activeClass} ${hoveredClass} ${touchingClass}`}
      data-magnetic-strength={strength}
      data-magnetic-enabled={!disabled}
      data-edge-behavior={edgeBehavior}
      data-proximity={proximity}
      style={{ transform: 'translate3d(0,0,0)' }}
    >
      {children}
    </div>
  );
}
