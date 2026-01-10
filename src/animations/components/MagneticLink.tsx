'use client';

import { useRef, useEffect, ReactNode, useCallback, MouseEvent, TouchEvent, useState } from 'react';
import gsap from 'gsap';
import { useDeviceCapabilities } from '@/animations/hooks/useDeviceCapabilities';
import { MAGNETIC_PRESETS, type MagneticStrength } from '@/animations/physics/physics-presets';

export interface MagneticLinkProps {
  children: ReactNode;
  href?: string;
  strength?: MagneticStrength;
  duration?: number;
  ease?: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export function MagneticLink({
  children,
  href,
  strength = 'medium',
  duration,
  ease,
  disabled = false,
  className = '',
  onClick
}: MagneticLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const capabilities = useDeviceCapabilities();
  const preset = MAGNETIC_PRESETS[strength];
  const actualDuration = duration || preset.duration;
  const actualEase = ease || preset.ease;
  const actualStrength = capabilities.getAnimationLevel() === 'minimal' ? preset.strength * 0.5 : preset.strength;

  const handleMouseMove = useCallback((e: unknown) => {
    if (!linkRef.current || disabled || isTouching) return;

    const mouseEvent = e as MouseEvent;
    const rect = linkRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (mouseEvent.clientX - centerX) * actualStrength;
    const deltaY = (mouseEvent.clientY - centerY) * actualStrength;

    gsap.to(linkRef.current, {
      x: deltaX,
      y: deltaY,
      duration: 0.2,
      ease: 'power2.out',
      force3D: true,
      willChange: 'transform'
    });
  }, [disabled, isTouching, actualStrength]);

  const handleMouseEnter = useCallback(() => {
    if (disabled) return;
    setIsHovered(true);
    
    if (linkRef.current && !capabilities.isMobile) {
      gsap.to(linkRef.current, {
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out',
        force3D: true
      });
    }
  }, [disabled, capabilities.isMobile]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    
    if (!linkRef.current || disabled) return;

    gsap.to(linkRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: actualDuration,
      ease: actualEase,
      force3D: true,
      willChange: 'transform',
      clearProps: 'transform'
    });
  }, [disabled, actualDuration, actualEase]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (disabled) return;
    setIsTouching(true);
    
    if (linkRef.current) {
      gsap.to(linkRef.current, {
        scale: 1.05,
        duration: 0.2,
        ease: 'power2.out',
        force3D: true
      });
    }
  }, [disabled]);

  const handleTouchEnd = useCallback(() => {
    setIsTouching(false);
    
    if (linkRef.current) {
      gsap.to(linkRef.current, {
        scale: 1,
        duration: actualDuration,
        ease: actualEase,
        force3D: true,
        clearProps: 'transform'
      });
    }
  }, [actualDuration, actualEase]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    setIsActive(true);
    onClick?.();

    if (href) {
      setTimeout(() => setIsActive(false), 300);
    }
  }, [disabled, href, onClick]);

  useEffect(() => {
    if (!linkRef.current || disabled) return;

    const link = linkRef.current;

    if (capabilities.prefersReducedMotion || !capabilities.shouldUse3D() || capabilities.isMobile) {
      return;
    }

    link.addEventListener('mousemove', handleMouseMove);
    link.addEventListener('mouseenter', handleMouseEnter);
    link.addEventListener('mouseleave', handleMouseLeave);
    link.addEventListener('touchstart', handleTouchStart, { passive: true });
    link.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      link.removeEventListener('mousemove', handleMouseMove);
      link.removeEventListener('mouseenter', handleMouseEnter);
      link.removeEventListener('mouseleave', handleMouseLeave);
      link.removeEventListener('touchstart', handleTouchStart);
      link.removeEventListener('touchend', handleTouchEnd);
      gsap.killTweensOf(link);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleTouchStart, handleTouchEnd, disabled, capabilities]);

  const activeClass = isActive ? 'magnetic-active' : '';
  const hoverClass = isHovered ? 'magnetic-hovered' : '';
  const touchingClass = isTouching ? 'magnetic-touching' : '';

  if (href) {
    return (
      <a
        ref={linkRef}
        href={href}
        onClick={handleClick}
        className={`${className} magnetic-link ${activeClass} ${hoverClass} ${touchingClass}`}
        data-magnetic-strength={strength}
        data-magnetic-enabled={!disabled}
        style={{ transform: 'translate3d(0,0,0)' }}
      >
        {children}
      </a>
    );
  }

  return (
    <span
      ref={linkRef}
      onClick={handleClick}
      className={`${className} magnetic-link ${activeClass} ${hoverClass} ${touchingClass}`}
      data-magnetic-strength={strength}
      data-magnetic-enabled={!disabled}
      style={{ transform: 'translate3d(0,0,0)', cursor: 'pointer' }}
    >
      {children}
    </span>
  );
}
