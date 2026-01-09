'use client';

import { ReactNode } from 'react';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)] ${className}`}
    >
      {children}
    </div>
  );
}

interface BentoItemProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function BentoItem({ children, size = 'md', className = '' }: BentoItemProps) {
  const sizeClasses = {
    sm: 'md:col-span-1',
    md: 'md:col-span-1 lg:col-span-2',
    lg: 'md:col-span-2 lg:col-span-3'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
}
