'use client';

import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';

interface FLIPTransitionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  duration?: number;
  ease?: string;
}

export function FLIPTransition({ 
  children, 
  className = '', 
  id = 'flip-element',
  duration = 0.4,
  ease = 'power2.out'
}: FLIPTransitionProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const firstPos = useRef<{ x: number; y: number; width: number; height: number } | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    firstPos.current = {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height
    };

    return () => {
      if (firstPos.current) {
        const currentRect = element.getBoundingClientRect();
        const deltaX = firstPos.current.x - currentRect.left;
        const deltaY = firstPos.current.y - currentRect.top;
        const deltaScaleX = currentRect.width / firstPos.current.width;
        const deltaScaleY = currentRect.height / firstPos.current.height;

        if (deltaX !== 0 || deltaY !== 0 || deltaScaleX !== 1 || deltaScaleY !== 1) {
          gsap.fromTo(element, 
            {
              x: deltaX,
              y: deltaY,
              scaleX: deltaScaleX,
              scaleY: deltaScaleY,
              transformOrigin: '0 0'
            },
            {
              x: 0,
              y: 0,
              scaleX: 1,
              scaleY: 1,
              duration,
              ease,
              force3D: true,
              willChange: 'transform',
              clearProps: 'transform'
            }
          );
        }
      }
    };
  }, []);

  return (
    <div ref={elementRef} className={className} id={id}>
      {children}
    </div>
  );
}

export function createFlipAnimation(element: HTMLElement, duration: number = 0.4, ease: string = 'power2.out') {
  const first = element.getBoundingClientRect();

  return {
    to: () => {
      const last = element.getBoundingClientRect();
      const deltaX = first.left - last.left;
      const deltaY = first.top - last.top;
      const deltaScaleX = last.width / first.width;
      const deltaScaleY = last.height / first.height;

      if (deltaX !== 0 || deltaY !== 0 || deltaScaleX !== 1 || deltaScaleY !== 1) {
        gsap.fromTo(element,
          {
            x: deltaX,
            y: deltaY,
            scaleX: deltaScaleX,
            scaleY: deltaScaleY,
            transformOrigin: '0 0'
          },
          {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            duration,
            ease,
            force3D: true,
            willChange: 'transform',
            clearProps: 'transform'
          }
        );
      }
    }
  };
}
