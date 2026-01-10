'use client';

import { useRef, useState, ReactNode, MouseEvent, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LiquidGlass } from './LiquidGlass';
import { useDeviceCapabilities } from '@/animations/hooks/useDeviceCapabilities';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPGlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  enable3D?: boolean;
  enableLiquid?: boolean;
  liquidColor?: string;
  bookMode?: boolean;
}

export function GSAPGlassCard({ 
  children, 
  className = '', 
  onClick, 
  enable3D = false, 
  enableLiquid = false, 
  liquidColor = '#A855F7', 
  bookMode = false 
}: GSAPGlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  
  const [isHovered, setIsHovered] = useState(false);
  
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const capabilities = useDeviceCapabilities();

  const rafRef = useRef<number | null>(null);
  const gsapRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsapRef.current = gsap.context(() => {}, card);

    return () => {
      if (gsapRef.current) {
        gsapRef.current.revert();
      }
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const shouldAnimate = enable3D && !isMobile && !prefersReducedMotion && !capabilities.isLowEnd;
    if (!shouldAnimate || !cardRef.current) return;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateYVal = (mouseX / (rect.width / 2)) * 10;
      const rotateXVal = -(mouseY / (rect.height / 2)) * 10;

      gsap.to(card, {
        rotateX: rotateXVal,
        rotateY: rotateYVal,
        duration: 0.1,
        ease: 'power1.out',
        force3D: true,
        willChange: 'transform'
      });

      if (contentRef.current) {
        gsap.to(contentRef.current, {
          translateX: rotateYVal * 0.5,
          translateY: -rotateXVal * 0.5,
          duration: 0.1,
          ease: 'power1.out',
          force3D: true
        });
      }
    });
  };

  const handleMouseEnter = () => {
    if (prefersReducedMotion || capabilities.isLowEnd) return;

    setIsHovered(true);

    const duration = capabilities.getAnimationDuration(0.3);

    if (cardRef.current && enable3D && !isMobile) {
      gsap.to(cardRef.current, {
        scale: 1.02,
        boxShadow: '0 0 30px rgba(168, 85, 247, 0.2)',
        duration,
        ease: 'power2.out',
        force3D: true
      });
    }

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.2,
        duration,
        ease: 'power2.out'
      });
    }

    if (bookMode && !isMobile) {
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          scale: 1.05,
          opacity: 1,
          filter: 'blur(0px)',
          boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)',
          duration: 0.2,
          ease: 'power2.out'
        });
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const duration = capabilities.getAnimationDuration(0.3);

    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        boxShadow: 'none',
        duration,
        ease: 'power2.out',
        clearProps: 'transform,box-shadow'
      });
    }

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        translateX: 0,
        translateY: 0,
        duration,
        ease: 'power2.out',
        clearProps: 'transform'
      });
    }

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration,
        ease: 'power2.out'
      });
    }

    if (bookMode) {
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          scale: 0.95,
          opacity: 0.8,
          filter: 'blur(0.5px)',
          boxShadow: 'none',
          duration: 0.2,
          ease: 'power2.out'
        });
      }
    }
  };

  const handleMouseDown = () => {
    if (onClick && !prefersReducedMotion) {
      gsap.to(cardRef.current, {
        scale: 0.98,
        duration: 0.1,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseUp = () => {
    if (onClick && !prefersReducedMotion) {
      gsap.to(cardRef.current, {
        scale: isHovered ? (enable3D && !isMobile ? 1.02 : 1) : 1,
        duration: 0.15,
        ease: 'power2.out'
      });
    }
  };

  const cardClasses = `
    glass-effect
    rounded-2xl
    p-6
    cursor-pointer
    ${isHovered ? 'glass-effect-hover' : ''}
    ${onClick && !bookMode ? 'hover:scale-[1.02]' : ''}
    ${bookMode ? 'book-mode-card' : ''}
    ${className}
  `;

  const initialOpacity = bookMode && !prefersReducedMotion ? 0.8 : 0;
  const initialY = prefersReducedMotion ? 0 : 20;

  useEffect(() => {
    if (cardRef.current && !prefersReducedMotion) {
      gsap.fromTo(cardRef.current,
        { 
          opacity: initialOpacity,
          y: initialY,
          scale: bookMode ? 0.95 : 1,
          filter: bookMode ? 'blur(0.5px)' : 'none'
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: capabilities.getAnimationDuration(0.3),
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top bottom-=50px',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, [bookMode, prefersReducedMotion, capabilities]);

  return (
    <div
      ref={cardRef}
      className={cardClasses}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {enableLiquid && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <LiquidGlass color={liquidColor} intensity={0.6} />
        </div>
      )}

      <div
        ref={contentRef}
        className="glass-card-content preserve-3d relative z-10"
      >
        {children}
      </div>

      {!enableLiquid && (
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.4), transparent 50%)'
          }}
        />
      )}
    </div>
  );
}
