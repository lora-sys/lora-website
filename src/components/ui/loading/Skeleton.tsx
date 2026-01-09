'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: number | string;
  height?: number | string;
}

export function Skeleton({
  className = '',
  variant = 'rectangular',
  width = '100%',
  height = 20,
}: SkeletonProps) {
  const variants = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <motion.div
      className={`bg-white/10 ${variants[variant]} ${className}`}
      style={{ width, height }}
      animate={{
        opacity: [0.4, 0.6, 0.4],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 space-y-6">
      <Skeleton className="h-16 md:h-24 w-64 md:w-96" variant="text" />
      <Skeleton className="h-8 w-48 md:w-64" variant="text" />
      <Skeleton className="h-6 w-full max-w-2xl" variant="text" />
      <div className="flex gap-4 mt-8">
        <Skeleton className="h-10 w-32 rounded-full" variant="circular" />
        <Skeleton className="h-10 w-32 rounded-full" variant="circular" />
        <Skeleton className="h-10 w-32 rounded-full" variant="circular" />
        <Skeleton className="h-10 w-32 rounded-full" variant="circular" />
      </div>
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-48 w-full" variant="rectangular" />
          <Skeleton className="h-6 w-3/4" variant="text" />
          <Skeleton className="h-4 w-full" variant="text" />
          <Skeleton className="h-4 w-2/3" variant="text" />
        </div>
      ))}
    </div>
  );
}
