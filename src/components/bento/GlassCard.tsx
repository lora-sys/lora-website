'use client';

import { useRef, useState, ReactNode, MouseEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LiquidGlass } from './LiquidGlass';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  enable3D?: boolean;
  enableLiquid?: boolean;
  liquidColor?: string;
}

export function GlassCard({ children, className = '', onClick, enable3D = true, enableLiquid = false, liquidColor = '#A855F7' }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!enable3D || isMobile || !cardRef.current) return;

    const card = cardRef.current;
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
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`
        glass-effect
        glass-card-3d
        rounded-2xl
        p-6
        cursor-pointer
        transition-all
        duration-300
        ${isHovered ? 'glass-effect-hover' : ''}
        ${onClick ? 'hover:scale-[1.02]' : ''}
        ${className}
      `}
      style={{
        '--rotate-x': enable3D && !isMobile ? `${rotateX}deg` : '0deg',
        '--rotate-y': enable3D && !isMobile ? `${rotateY}deg` : '0deg',
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      whileTap={onClick ? { scale: 0.98 } : {}}
      whileHover={enable3D && !isMobile ? {
        scale: 1.02,
        boxShadow: isHovered ? '0 0 30px rgba(168, 85, 247, 0.2)' : 'none'
      } : {}}
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
          transition: 'transform 0.1s ease-out'
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
        />
      )}
    </motion.div>
  );
}
