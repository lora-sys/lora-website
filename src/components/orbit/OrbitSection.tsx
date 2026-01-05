'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface OrbitSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export function OrbitSection({ children, className = '', delay = 0, id }: OrbitSectionProps) {
  return (
    <motion.section
      id={id}
      className={`preserve-3d ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.section>
  );
}
