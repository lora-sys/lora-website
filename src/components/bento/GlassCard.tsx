'use client';

import { useRef, useState, ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { LiquidGlass } from './LiquidGlass';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  enable3D?: boolean;
  enableLiquid?: boolean;
  liquidColor?: string;
  bookMode?: boolean;
}

export function GlassCard({ children, className = '', onClick, enable3D = false, enableLiquid = false, liquidColor = '#A855F7', bookMode = false }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  // Optimized mouse move handler with requestAnimationFrame
  const rafRef = useRef<number | null>(null);
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!enable3D || isMobile || prefersReducedMotion || !cardRef.current) return;

    // Cancel previous RAF if exists to prevent backlog
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Calculate rotation based on mouse position (max 10 degrees)
      const rotateYVal = (mouseX / (rect.width / 2)) * 10;
      const rotateXVal = -(mouseY / (rect.height / 2)) * 10;

      setRotateX(rotateXVal);
      setRotateY(rotateYVal);
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);

    // Clean up RAF
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const bookModeInitial = bookMode && !prefersReducedMotion ? {
    scale: 0.95,
    opacity: 0.8,
    filter: 'blur(0.5px)'
  } : {
    opacity: 0,
    y: prefersReducedMotion ? 0 : 20
  };

  const bookModeWhileHover = bookMode && !isMobile && !prefersReducedMotion ? {
    scale: 1.05,
    opacity: 1,
    filter: 'blur(0px)',
    boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)',
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] as any }
  } : {};

  return (
    <motion.div
      ref={cardRef}
      className={`
        glass-effect
        rounded-2xl
        p-6
        cursor-pointer
        ${isHovered ? 'glass-effect-hover' : ''}
        ${onClick && !bookMode ? 'hover:scale-[1.02]' : ''}
        ${bookMode ? 'book-mode-card' : ''}
        ${className}
      `}
      style={{
        '--rotate-x': enable3D && !isMobile && !prefersReducedMotion ? `${rotateX}deg` : '0deg',
        '--rotate-y': enable3D && !isMobile && !prefersReducedMotion ? `${rotateY}deg` : '0deg',
        willChange: isHovered && !prefersReducedMotion ? 'transform' : 'auto',
      } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
      initial={bookModeInitial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.2 }} // Reduced from 0.5 to 0.2
      whileTap={onClick && !prefersReducedMotion ? { scale: 0.98 } : {}}
      whileHover={bookMode ? bookModeWhileHover : (enable3D && !isMobile && !prefersReducedMotion ? {
        scale: 1.02,
        boxShadow: isHovered ? '0 0 30px rgba(168, 85, 247, 0.2)' : 'none'
      } : {})}
    >
      {/* Liquid Glass Effect */}
      {enableLiquid && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <LiquidGlass color={liquidColor} intensity={0.6} />
        </div>
      )}

      <div
        className="glass-card-content preserve-3d relative z-10"
        style={{
          transform: `translateX(${rotateY * 0.5}px) translateY(${-rotateX * 0.5}px)`,
          transition: 'transform 0.05s ease-out' // Reduced from 0.1s to 0.05s for smoother feel
        }}
      >
        {children}
      </div>

      {/* Glow effect on hover */}
      {!enableLiquid && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.4), transparent 50%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 0.1 }}
        />
      )}
    </motion.div>
  );
}
