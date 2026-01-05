'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface OrbitContainerProps {
  children: ReactNode;
  className?: string;
}

export function OrbitContainer({ children, className = '' }: OrbitContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const { scrollYProgress } = useScroll();
  const [scrollY, setScrollY] = useState(0);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Monitor body style for modal detection
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'style') {
          setIsPaused(document.body.style.overflow === 'hidden');
        }
      });
    });

    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Track scroll position for custom mapping
  useEffect(() => {
    const handleScroll = () => {
      if (!isPaused) {
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPaused]);

  // Map scroll to 3D transforms
  // When scroll 0% -> 25%, rotateX goes 0deg -> 15deg and translateZ goes 0px -> -200px
  const rotateX = useTransform(scrollYProgress, [0, 0.25, 0.5, 1], [0, 15, 5, 0]);
  const translateZ = useTransform(scrollYProgress, [0, 0.25, 0.5, 1], [0, -200, -100, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.5, 1], [1, 0.95, 0.98, 1]);

  return (
    <div className={`orbit-perspective min-h-screen ${className}`}>
      <motion.div
        ref={containerRef}
        className="orbit-container"
        style={{
          rotateX: (isMobile || isPaused) ? 0 : rotateX,
          translateZ: (isMobile || isPaused) ? 0 : translateZ,
          scale: (isMobile || isPaused) ? 1 : scale,
          transformOrigin: 'center center'
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
