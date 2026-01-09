'use client';

import { useRef, ReactNode } from 'react';

interface OrbitContainerProps {
  children: ReactNode;
  className?: string;
}

export function OrbitContainer({ children, className = '' }: OrbitContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Completely simplified container to eliminate all performance issues
  // Removed all 3D transforms, scroll listeners, and observers
  return (
    <div className={`min-h-screen ${className}`}>
      <div ref={containerRef} className="relative">
        {children}
      </div>
    </div>
  );
}
