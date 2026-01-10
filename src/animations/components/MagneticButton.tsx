'use client';

import { useRef, MouseEvent, ReactNode, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useDeviceCapabilities } from '@/animations/hooks/useDeviceCapabilities';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  damping?: number;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.4,
  damping = 0.1,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md'
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const rippleRefs = useRef<HTMLSpanElement[]>([]);
  
  const [isHovered, setIsHovered] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  
  const capabilities = useDeviceCapabilities();
  const shouldAnimate = !capabilities.isMobile && !capabilities.prefersReducedMotion && !capabilities.isLowEnd;

  const baseClasses = 'relative overflow-hidden transition-all duration-300';
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white',
    secondary: 'glass-effect hover:bg-white/10 border border-white/20 text-white',
    ghost: 'hover:bg-white/10 text-white'
  };
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl'
  };
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  useEffect(() => {
    if (!ripple || !buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    const rippleElement = document.createElement('span');
    rippleElement.className = 'absolute rounded-full bg-white/30 pointer-events-none';
    rippleElement.style.width = rippleElement.style.height = `${size}px`;
    rippleElement.style.left = `${ripple.x - size / 2}px`;
    rippleElement.style.top = `${ripple.y - size / 2}px`;
    
    button.appendChild(rippleElement);
    rippleRefs.current.push(rippleElement);

    gsap.fromTo(rippleElement,
      { scale: 0, opacity: 0.6 },
      {
        scale: 4,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all',
        onComplete: () => {
          if (button.contains(rippleElement)) {
            button.removeChild(rippleElement);
          }
        }
      }
    );

    setRipple(null);
  }, [ripple]);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!shouldAnimate || !buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(button, {
      x: deltaX,
      y: deltaY,
      duration: damping,
      ease: 'power2.out',
      force3D: true,
      willChange: 'transform'
    });

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        x: deltaX * 1.2,
        y: deltaY * 1.2,
        duration: damping,
        ease: 'power2.out',
        force3D: true
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    if (!shouldAnimate || !buttonRef.current) return;

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: 'elastic.out(1, 0.5)',
      force3D: true,
      clearProps: 'transform'
    });

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)',
        force3D: true,
        clearProps: 'transform'
      });
    }
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
    
    if (shouldAnimate && buttonRef.current) {
      gsap.fromTo(buttonRef.current,
        { scale: 0.95 },
        {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
          force3D: true
        }
      );
    }
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    if (shouldAnimate) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        ease: 'power2.in',
        force3D: true,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          gsap.set(button, { clearProps: 'transform' });
        }
      });
    }

    onClick?.();
  };

  return (
    <button
      ref={buttonRef}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled}
    >
      <span ref={iconRef} className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}
