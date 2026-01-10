'use client';

import { useRef, ReactNode, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useDeviceCapabilities } from '@/animations/hooks/useDeviceCapabilities';

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  triggerOffset?: string;
  smoothness?: number;
}

gsap.registerPlugin(ScrollTrigger);

export function ParallaxLayer({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  triggerOffset = '-100px',
  smoothness = 0.1
}: ParallaxLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<gsap.Context | null>(null);
  
  const capabilities = useDeviceCapabilities();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsapRef.current = gsap.context(() => {
      const content = contentRef.current;
      if (!content) return;

      const handleResize = () => {
        const rect = container.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      };

      handleResize();
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);

      const isReduced = capabilities.prefersReducedMotion || capabilities.isLowEnd;
      
      if (!isReduced) {
        const parallaxAmount = dimensions.height * speed;

        const animateProperty = (direction === 'up' || direction === 'down') ? 'y' : 'x';
        const propertyValue = (direction === 'up' || direction === 'left') ? parallaxAmount : -parallaxAmount;

        ScrollTrigger.create({
          trigger: container,
          start: `top bottom${triggerOffset}`,
          end: `bottom top${triggerOffset}`,
          scrub: smoothness,
          onUpdate: (self) => {
            if (!content) return;
            const progress = self.progress;
            const value = propertyValue * progress;
            
            gsap.to(content, {
              [animateProperty]: value,
              duration: smoothness,
              ease: 'none',
              force3D: true,
              willChange: 'transform'
            });
          },
          onRefresh: () => {
            const newRect = container.getBoundingClientRect();
            setDimensions({ width: newRect.width, height: newRect.height });
          }
        });
      }

      return () => {
        resizeObserver.disconnect();
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === container) {
            trigger.kill();
          }
        });
      };
    }, container);

    return () => {
      if (gsapRef.current) {
        gsapRef.current.revert();
      }
    };
  }, [speed, direction, triggerOffset, smoothness, capabilities, dimensions]);

  const isReduced = capabilities.prefersReducedMotion || capabilities.isLowEnd;

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ overflow: 'hidden' }}>
      <div
        ref={contentRef}
        style={{
          transform: isReduced ? 'none' : undefined,
          willChange: isReduced ? 'auto' : 'transform'
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface ParallaxContainerProps {
  children: ReactNode;
  className?: string;
}

export function ParallaxContainer({ children, className = '' }: ParallaxContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<gsap.Context | null>(null);
  
  const capabilities = useDeviceCapabilities();
  const isReduced = capabilities.prefersReducedMotion || capabilities.isLowEnd;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isReduced) return;

    gsapRef.current = gsap.context(() => {
      const layers = container.querySelectorAll('[data-parallax-layer]');
      
      layers.forEach((layer, index) => {
        const speed = parseFloat(layer.getAttribute('data-parallax-speed') || '0.5');
        const direction = (layer.getAttribute('data-parallax-direction') || 'up') as 'up' | 'down';
        
        gsap.to(layer, {
          y: direction === 'up' ? -window.innerHeight * speed : window.innerHeight * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === container) {
            trigger.kill();
          }
        });
      };
    }, container);

    return () => {
      if (gsapRef.current) {
        gsapRef.current.revert();
      }
    };
  }, [isReduced]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

interface ParallaxItemProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  className?: string;
}

export function ParallaxItem({ 
  children, 
  speed = 0.5, 
  direction = 'up', 
  className = '' 
}: ParallaxItemProps) {
  return (
    <div
      data-parallax-layer
      data-parallax-speed={speed}
      data-parallax-direction={direction}
      className={className}
    >
      {children}
    </div>
  );
}
