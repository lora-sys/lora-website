'use client';

import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';

interface PulseSkeletonProps {
  children?: ReactNode;
  className?: string;
  width?: string | number;
  height?: string | number;
  lines?: number;
  variant?: 'text' | 'rectangular' | 'circular' | 'rounded';
  animationSpeed?: number;
  colorStart?: string;
  colorEnd?: string;
}

export function PulseSkeleton({
  children,
  className = '',
  width = '100%',
  height = 'auto',
  lines = 1,
  variant = 'rounded',
  animationSpeed = 1.5,
  colorStart = 'rgba(255, 255, 255, 0.05)',
  colorEnd = 'rgba(255, 255, 255, 0.15)'
}: PulseSkeletonProps) {
  const skeletonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const skeleton = skeletonRef.current;
    if (!skeleton) return;

    const gradient = document.createElement('div');
    gradient.className = 'skeleton-gradient';
    gradient.style.cssText = `
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        ${colorEnd},
        transparent
      );
      pointer-events: none;
      z-index: 1;
    `;

    skeleton.appendChild(gradient);

    const timeline = gsap.timeline({ repeat: -1, yoyo: true });
    
    timeline.to(gradient, {
      left: '100%',
      duration: animationSpeed,
      ease: 'linear',
      force3D: true,
      willChange: 'transform'
    });

    return () => {
      timeline.kill();
      if (skeleton.contains(gradient)) {
        skeleton.removeChild(gradient);
      }
    };
  }, [animationSpeed, colorEnd]);

  const baseClasses = 'relative overflow-hidden';
  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded-none',
    circular: 'rounded-full',
    rounded: 'rounded-lg'
  };

  return (
    <div
      ref={skeletonRef}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{
        width,
        height: height === 'auto' && lines > 1 ? `${lines * 16}px` : height,
        backgroundColor: colorStart
      }}
    >
      {children}
    </div>
  );
}

export function TextSkeleton({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <PulseSkeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  );
}

export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`space-y-4 ${className}`}>
      <PulseSkeleton variant="rounded" height={200} width="100%" />
      <div className="space-y-2">
        <PulseSkeleton variant="text" width="70%" />
        <PulseSkeleton variant="text" />
        <PulseSkeleton variant="text" width="80%" />
      </div>
    </div>
  );
}

export function AvatarSkeleton({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <PulseSkeleton
      variant="circular"
      width={size}
      height={size}
      className={className}
    />
  );
}

export function ListSkeleton({ count = 5, className = '' }: { count?: number; className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <AvatarSkeleton size={40} />
          <div className="flex-1 space-y-2">
            <PulseSkeleton variant="text" width="60%" />
            <PulseSkeleton variant="text" width="40%" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ImageSkeleton({ width = '100%', height = 200, className = '' }: { width?: string | number; height?: string | number; className?: string }) {
  return (
    <PulseSkeleton
      variant="rounded"
      width={width}
      height={height}
      className={className}
    />
  );
}
