'use client';

import { useRef, useEffect, ReactNode, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDeviceCapabilities } from '@/animations/hooks/useDeviceCapabilities';
import { REVEAL_PRESETS, type RevealMode } from '@/animations/physics/physics-presets';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ProgressiveRevealProps {
  children: ReactNode;
  steps?: number;
  stagger?: number;
  delay?: number;
  duration?: number;
  mode?: RevealMode;
  direction?: 'up' | 'down' | 'left' | 'right';
  start?: string;
  cascade?: boolean;
  ease?: string;
  disabled?: boolean;
  once?: boolean;
  className?: string;
}

export function ProgressiveReveal({
  children,
  steps = 1,
  stagger = 0.1,
  delay = 0,
  duration,
  direction = 'up',
  start = 'top 85%',
  mode = 'elastic',
  cascade = false,
  ease,
  disabled = false,
  once = false,
  className = ''
}: ProgressiveRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const capabilities = useDeviceCapabilities();
  const preset = REVEAL_PRESETS[mode] || REVEAL_PRESETS['elastic'];
  const actualDuration = duration ?? preset.duration;
  const actualEase = ease ?? preset.ease;

  const mobileDuration = capabilities.isMobile ? actualDuration * 0.7 : actualDuration;
  const mobileEase = capabilities.isMobile ? 'power1.out' : actualEase;

  const getInitialState = useCallback(() => {
    const offset = capabilities.isMobile ? 30 : 40;
    return {
      up: { y: offset },
      down: { y: -offset },
      left: { x: offset },
      right: { x: -offset }
    }[direction];
  }, [direction, capabilities.isMobile]);

  useEffect(() => {
    if (!containerRef.current || disabled) return;

    const container = containerRef.current;
    const children = Array.from(container.children);
    
    if (children.length === 0) return;

    if (capabilities.prefersReducedMotion) {
      gsap.fromTo(
        children,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          stagger: cascade ? stagger : 0,
          delay
        }
      );
      setHasRevealed(true);
      return;
    }

    setIsAnimating(true);
    
    const initialState = getInitialState();
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: 'play none none reverse',
        onEnter: () => setHasRevealed(true),
        onLeave: () => setHasRevealed(false)
      },
      onComplete: () => {
        setIsAnimating(false);
        setHasRevealed(true);
      }
    });

    if (cascade) {
      children.forEach((child, index) => {
        gsap.fromTo(
          child,
          {
            opacity: 0,
            ...initialState
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: mobileDuration,
            delay: delay + (index * stagger),
            ease: mobileEase,
            force3D: true,
            willChange: 'transform'
          }
        );
      });
    } else {
      const actualSteps = Math.min(steps, children.length);
      const groupSize = Math.ceil(children.length / actualSteps);

      for (let i = 0; i < actualSteps; i++) {
        const startIdx = i * groupSize;
        const endIdx = Math.min(startIdx + groupSize, children.length);
        const stepChildren = Array.from(children).slice(startIdx, endIdx);

        gsap.fromTo(
          stepChildren,
          {
            opacity: 0,
            ...initialState
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: mobileDuration,
            delay: delay + (i * stagger * 2),
            ease: mobileEase,
            force3D: true,
            willChange: 'transform'
          }
        );
      }
    }

    return () => {
      gsap.killTweensOf(children);
      const triggers = ScrollTrigger.getAll();
      const containerTrigger = triggers.find(t => t.trigger === container);
      if (containerTrigger) {
        containerTrigger.kill();
      }
      setHasRevealed(false);
      setIsAnimating(false);
    };
  }, [steps, stagger, delay, duration, direction, start, mode, cascade, ease, once, disabled, capabilities, getInitialState]);

  const statusClass = isAnimating ? 'is-animating' : 'idle';
  const revealedClass = hasRevealed ? 'was-revealed' : 'not-revealed';
  const modeClass = `reveal-mode-${mode}`;
  const directionClass = `reveal-${direction}`;

  return (
    <div
      ref={containerRef}
      className={`${className} progressive-reveal ${statusClass} ${revealedClass} ${modeClass} ${directionClass}`}
      data-reveal-direction={direction}
      data-reveal-mode={mode}
      data-reveal-cascade={cascade}
      data-reveal-steps={steps}
      data-reveal-stagger={stagger}
    >
      {children}
    </div>
  );
}
