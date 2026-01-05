'use client';

import { motion } from 'framer-motion';

interface LiquidGlassProps {
  className?: string;
  intensity?: number;
  color?: string;
}

export function LiquidGlass({ className = '', intensity = 0.5, color = '#A855F7' }: LiquidGlassProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        animate={{
          x: [0, 20, 0, -20, 0],
          y: [0, -20, 0, 20, 0],
          scale: [1, 1.1, 1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 50%)`,
          filter: 'blur(60px)',
          opacity: 0.15 * intensity,
        }}
      />
      <motion.div
        animate={{
          x: [0, -30, 0, 30, 0],
          y: [0, 30, 0, -30, 0],
          scale: [1, 1.2, 1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
          delay: 2
        }}
        className="absolute -bottom-1/2 -right-1/2 w-[200%] h-[200%] opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 50%)`,
          filter: 'blur(80px)',
          opacity: 0.1 * intensity,
        }}
      />
    </div>
  );
}
