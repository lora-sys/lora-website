'use client';

import { useRef, useEffect, ReactNode, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDeviceCapabilities } from '@/animations/hooks/useDeviceCapabilities';
import { REVEAL_PRESETS, type RevealMode } from '@/animations/physics/physics-presets';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ElasticRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  start?: string;
  mode?: RevealMode;
  ease?: string;
  disabled?: boolean;
  once?: boolean;
  stagger?: number;
  className?: string;
}

export function ElasticReveal({
  children,
  delay = 0,
  duration,
  direction = 'up',
  start = 'top 85%',
  mode = 'elastic',
  ease,
  disabled = false,
  once = false,
  stagger = 0,
  className = ''
}: ElasticRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const capabilities = useDeviceCapabilities();
  const preset = REVEAL_PRESETS[mode] || REVEAL_PRESETS['elastic'];
  const actualDuration = duration ?? preset.duration;
  const actualEase = ease ?? preset.ease;

  const mobileDuration = capabilities.isMobile ? actualDuration * 0.7 : actualDuration;
  const mobileEase = capabilities.isMobile ? 'power1.out' : actualEase;

  const getInitialState = () => {
    const offset = capabilities.isMobile ? 30 : 40;
    return {
      up: { y: offset },
      down: { y: -offset },
      left: { x: offset },
      right: { x: -offset }
    }[direction];
  };

  useEffect(() => {
    if (!containerRef.current || disabled) return;

    const container = containerRef.current;

    if (capabilities.prefersReducedMotion) {
      gsap.fromTo(
        container,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          delay,
          ease: 'power2.out'
        }
      );
      setHasRevealed(true);
      return;
    }

    const initialState = getInitialState();

    setIsAnimating(true);

    const onComplete = () => {
      setIsAnimating(false);
      setHasRevealed(true);
    };

    gsap.fromTo(
      container,
      {
        opacity: 0,
        ...initialState
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: mobileDuration,
        delay,
        ease: mobileEase,
        force3D: true,
        willChange: 'transform',
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: 'play none none reverse',
          onEnter: () => setHasRevealed(true),
          onLeave: () => setHasRevealed(false),
          onEnterBack: () => setHasRevealed(true),
          onLeaveBack: () => setHasRevealed(false)
        },
        onComplete
      }
    );

    return () => {
      gsap.killTweensOf(containerRef.current);
      const triggers = ScrollTrigger.getAll();
      const containerTrigger = triggers.find(t => t.trigger === containerRef.current);
      if (containerTrigger) {
        containerTrigger.kill();
      }
      setHasRevealed(false);
      setIsAnimating(false);
    };
  }, [delay, duration, direction, start, mode, ease, disabled, capabilities]);

  const statusClass = isAnimating ? 'is-animating' : 'idle';
  const revealedClass = hasRevealed ? 'was-revealed' : 'not-revealed';
  const modeClass = `reveal-mode-${mode}`;
  const directionClass = `reveal-${direction}`;

  return (
    <div
      ref={containerRef}
      className={`${className} elastic-reveal ${statusClass} ${revealedClass} ${modeClass} ${directionClass}`}
      data-reveal-direction={direction}
      data-reveal-mode={mode}
      data-reveal-once={once}
      style={{ touchAction: 'manipulation' }}
    >
      {children}
    </div>
  );
}
