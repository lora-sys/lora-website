'use client';

import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { useDeviceCapabilities } from '@/animations/hooks/useDeviceCapabilities';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  duration?: number;
}

export function TextReveal({
  children,
  className = '',
  delay = 0,
  stagger = 0.02,
  direction = 'up',
  duration = 0.5
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<gsap.Context | null>(null);
  
  const capabilities = useDeviceCapabilities();
  const adjustedDuration = capabilities.getAnimationDuration ? capabilities.getAnimationDuration(duration) : duration;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (capabilities.prefersReducedMotion) return;

    gsapRef.current = gsap.context(() => {
      const words = children.split(' ');
      
      const directionProps = {
        up: { y: 50 },
        down: { y: -50 },
        left: { x: 50 },
        right: { x: -50 },
        fade: { opacity: 0 }
      };

      const fromProps = directionProps[direction];

      gsap.fromTo('.reveal-word',
        {
          ...fromProps,
          opacity: direction === 'fade' ? 0 : 0,
          skewY: 10
        },
        {
          y: 0,
          x: 0,
          opacity: 1,
          skewY: 0,
          duration: adjustedDuration,
          stagger: stagger,
          delay: delay,
          ease: 'power3.out',
          force3D: true,
          willChange: 'transform, opacity'
        }
      );

      return () => {
        gsap.killTweensOf('.reveal-word');
      };
    }, container);

    return () => {
      if (gsapRef.current) {
        gsapRef.current.revert();
      }
    };
  }, [children, delay, stagger, direction, adjustedDuration, capabilities]);

  if (capabilities.prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const words = children.split(' ');

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, index) => (
        <span key={index} className="reveal-word inline-block overflow-hidden">
          <span className="inline-block">{word}</span>
          {index < words.length - 1 && <span className="inline-block w-2">&nbsp;</span>}
        </span>
      ))}
    </div>
  );
}

interface TextScrambleProps {
  children: string;
  className?: string;
  delay?: number;
  speed?: number;
  chars?: string;
}

export function TextScramble({
  children,
  className = '',
  delay = 0,
  speed = 0.05,
  chars = '!<>-_\\/[]{}—=+*^?#'
}: TextScrambleProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const originalTextRef = useRef(children);
  
  const capabilities = useDeviceCapabilities();
  const adjustedSpeed = capabilities.getAnimationDuration ? capabilities.getAnimationDuration(speed) : speed;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (capabilities.prefersReducedMotion || capabilities.isLowEnd) {
      container.textContent = children;
      return;
    }

    let iterations = 0;
    const maxIterations = 10;
    const interval: any = setInterval(() => {
      container.textContent = originalTextRef.current
        .split('')
        .map((letter, index) => {
          if (index < iterations) {
            return originalTextRef.current[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iterations >= maxIterations) {
        clearInterval(interval);
      }

      iterations += 1 / 2;
    }, 50);

    return () => clearInterval(interval);
  }, [children, speed, chars, capabilities]);

  return <span ref={containerRef} className={className}>{children}</span>;
}

interface TextGlowProps {
  children: string;
  className?: string;
  color?: string;
  intensity?: number;
  speed?: number;
}

export function TextGlow({
  children,
  className = '',
  color = '#A855F7',
  intensity = 20,
  speed = 0.02
}: TextGlowProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  
  const capabilities = useDeviceCapabilities();
  const adjustedSpeed = capabilities.getAnimationDuration ? capabilities.getAnimationDuration(speed) : speed;

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    if (capabilities.prefersReducedMotion) return;

    gsap.to(glow, {
      textShadow: `0 0 ${intensity}px ${color}, 0 0 ${intensity * 2}px ${color}, 0 0 ${intensity * 3}px ${color}`,
      duration: adjustedSpeed,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    return () => {
      gsap.killTweensOf(glow);
    };
  }, [color, intensity, adjustedSpeed, capabilities]);

  return (
    <span ref={containerRef} className={`relative ${className}`}>
      <span ref={glowRef} className="relative z-10">{children}</span>
    </span>
  );
}

interface TextWaveProps {
  children: string;
  className?: string;
  amplitude?: number;
  frequency?: number;
  speed?: number;
}

export function TextWave({
  children,
  className = '',
  amplitude = 10,
  frequency = 0.5,
  speed = 0.02
}: TextWaveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  
  const capabilities = useDeviceCapabilities();
  const adjustedSpeed = capabilities.getAnimationDuration ? capabilities.getAnimationDuration(speed) : speed;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (capabilities.prefersReducedMotion || capabilities.isLowEnd) {
      charsRef.current.forEach(char => {
        gsap.set(char, { y: 0 });
      });
      return;
    }

    const chars = charsRef.current;
    
    gsap.to(chars, {
      y: (index) => Math.sin(index * frequency) * amplitude,
      duration: adjustedSpeed,
      repeat: -1,
      yoyo: true,
      stagger: 0.05,
      ease: 'sine.inOut'
    });

    return () => {
      gsap.killTweensOf(chars);
    };
  }, [amplitude, frequency, adjustedSpeed, capabilities]);

  return (
    <div ref={containerRef} className={className}>
      {children.split('').map((char, index) => (
        <span
          key={index}
          ref={(el) => { if (el) charsRef.current[index] = el; }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}

interface TextDistortProps {
  children: string;
  className?: string;
  intensity?: number;
  speed?: number;
  trigger?: 'hover' | 'always' | 'click';
}

export function TextDistort({
  children,
  className = '',
  intensity = 20,
  speed = 0.05,
  trigger = 'hover'
}: TextDistortProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  
  const capabilities = useDeviceCapabilities();
  const adjustedSpeed = capabilities.getAnimationDuration ? capabilities.getAnimationDuration(speed) : speed;

  const handleMouseEnter = () => {
    if (trigger !== 'hover' || !containerRef.current || capabilities.prefersReducedMotion) return;

    const chars = Array.from(containerRef.current.children);
    
    gsap.fromTo(chars,
      { 
        skewX: 0,
        scale: 1,
        letterSpacing: '0px'
      },
      {
        skewX: (i) => Math.random() * intensity - intensity / 2,
        scale: (i) => 1 + Math.random() * 0.2,
        letterSpacing: '2px',
        duration: adjustedSpeed,
        stagger: 0.02,
        ease: 'elastic.out(1, 0.5)',
        yoyo: true,
        repeat: 1,
        force3D: true
      }
    );
  };

  const handleClick = () => {
    if (trigger !== 'click' || !containerRef.current || capabilities.prefersReducedMotion) return;

    const chars = Array.from(containerRef.current.children);
    
    gsap.fromTo(chars,
      { 
        skewX: 0,
        skewY: 0,
        scale: 1
      },
      {
        skewX: (i) => Math.random() * intensity - intensity / 2,
        skewY: (i) => Math.random() * intensity - intensity / 2,
        scale: (i) => 1 + Math.random() * 0.3,
        duration: adjustedSpeed,
        stagger: 0.01,
        ease: 'elastic.out(1, 0.3)',
        yoyo: true,
        repeat: 1,
        force3D: true
      }
    );
  };

  useEffect(() => {
    if (trigger === 'always' && containerRef.current && !capabilities.prefersReducedMotion) {
      const interval = setInterval(() => {
        handleClick();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [trigger, capabilities]);

  return (
    <span
      ref={containerRef}
      className={`inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      {children.split('').map((char, index) => (
        <span key={index} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
