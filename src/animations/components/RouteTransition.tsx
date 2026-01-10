'use client';

import { createContext, useContext, useRef, ReactNode, useCallback, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

interface RouteTransitionContextType {
  isTransitioning: boolean;
  triggerTransition: (callback: () => void) => void;
}

const RouteTransitionContext = createContext<RouteTransitionContextType | null>(null);

export function useRouteTransition() {
  const context = useContext(RouteTransitionContext);
  if (!context) {
    throw new Error('useRouteTransition must be used within RouteTransitionProvider');
  }
  return context;
}

export function RouteTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const triggerTransition = useCallback((callback: () => void) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    const timeline = gsap.timeline({
      onComplete: () => {
        callback();
        setIsTransitioning(false);
      }
    });

    timeline
      .to(mainRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.inOut',
        force3D: true,
        willChange: 'transform, opacity'
      })
      .fromTo(mainRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          force3D: true,
          willChange: 'transform, opacity',
          clearProps: 'transform, opacity'
        }
      );
  }, [isTransitioning]);

  return (
    <RouteTransitionContext.Provider value={{ isTransitioning, triggerTransition }}>
      <div ref={mainRef} className="route-transition-container">
        {children}
      </div>
    </RouteTransitionContext.Provider>
  );
}

export function RouteTransitionWrapper({ children, className = '' }: { children: ReactNode; className?: string }) {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    gsap.fromTo(wrapper,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        force3D: true,
        willChange: 'transform, opacity'
      }
    );

    return () => {
      gsap.to(wrapper, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: 'power2.in',
        force3D: true
      });
    };
  }, [pathname]);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
}
