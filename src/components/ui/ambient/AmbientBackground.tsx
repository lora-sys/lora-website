'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function AmbientBackground() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(
    scrollYProgress,
    [0, 1],
    useReducedMotion() ? [0, 30] : [0, 0]
  );

  const y2 = useReducedMotion() 
    ? useTransform(scrollYProgress, [0, 1], [0, -30])
    : useTransform(scrollYProgress, [0, 1], [0, 0]);

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    useReducedMotion() ? [1, 0] : [0.8, 0.2]
  );

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/12 via-black to-blue-900/12"
        style={{ opacity }}
      />

      <motion.div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-purple-500/8 md:bg-purple-500/6 rounded-full blur-[80px]"
        style={{ 
          y: y1,
          filter: useReducedMotion() ? 'blur(60px)' : 'blur(80px)',
          willChange: 'transform, opacity',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-blue-500/8 md:bg-blue-500/6 rounded-full blur-[80px]"
        style={{ 
          y: y2,
          filter: useReducedMotion() ? 'blur(60px)' : 'blur(80px)',
          willChange: 'transform, opacity',
        }}
      />

      {useReducedMotion() && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-500/5 to-transparent rounded-full blur-[120px]" style={{ opacity }} />
      )}
    </div>
  );
}
