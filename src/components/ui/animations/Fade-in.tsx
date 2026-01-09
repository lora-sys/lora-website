'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.4,
  className = '',
}: FadeInProps) {
  const offset = {
    up: 30,
    down: -30,
    left: 30,
    right: -30,
    none: 0,
  };

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: offset[direction],
        x: direction === 'left' || direction === 'right' ? offset[direction] : 0,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
