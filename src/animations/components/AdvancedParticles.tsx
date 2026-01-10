'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useDeviceCapabilities } from '@/animations/hooks/useDeviceCapabilities';
import type { MouseEvent } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface AdvancedParticleSystemProps {
  className?: string;
  particleCount?: number;
  size?: { min: number; max: number };
  speed?: { min: number; max: number };
  life?: { min: number; max: number };
  colors?: string[];
  mode?: 'snow' | 'fireflies' | 'dust' | 'bubbles';
  mouseInteraction?: boolean;
  connectionDistance?: number;
  mouseRepelRadius?: number;
}

export function AdvancedParticleSystem({
  className = '',
  particleCount = 100,
  size = { min: 2, max: 4 },
  speed = { min: 0.5, max: 2 },
  life = { min: 100, max: 200 },
  colors = ['#ffffff', '#A855F7', '#3B82F6'],
  mode = 'snow',
  mouseInteraction = true,
  connectionDistance = 100,
  mouseRepelRadius = 150
}: AdvancedParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationIdRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef({ x: 0, y: 0, isHovering: false });
  const rafRef = useRef<number | null>(null);
  
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const capabilities = useDeviceCapabilities();

  const getAdjustedParticleCount = useCallback(() => {
    if (capabilities.isLowEnd) return Math.floor(particleCount * 0.3);
    if (capabilities.isMobile) return Math.floor(particleCount * 0.5);
    return particleCount;
  }, [particleCount, capabilities]);

  const getAdjustedSpeed = useCallback((baseSpeed: number) => {
    return baseSpeed * (capabilities.getAnimationDuration ? capabilities.getAnimationDuration(1) : 1);
  }, [capabilities]);

  const createParticle = useCallback((): Particle => {
    const adjustedSize = {
      min: size.min * (capabilities.isMobile ? 0.8 : 1),
      max: size.max * (capabilities.isMobile ? 0.8 : 1)
    };

    const adjustedSpeed = {
      min: getAdjustedSpeed(speed.min),
      max: getAdjustedSpeed(speed.max)
    };

    const x = Math.random() * dimensions.width;
    const y = Math.random() * dimensions.height;
    const pSize = adjustedSize.min + Math.random() * (adjustedSize.max - adjustedSize.min);
    const pSpeed = adjustedSpeed.min + Math.random() * (adjustedSpeed.max - adjustedSpeed.min);
    const angle = Math.random() * Math.PI * 2;
    const pLife = life.min + Math.random() * (life.max - life.min);

    let vx: number, vy: number;
    
    switch (mode) {
      case 'snow':
        vx = Math.sin(angle) * pSpeed * 0.5;
        vy = pSpeed;
        break;
      case 'fireflies':
        vx = Math.sin(angle) * pSpeed;
        vy = Math.cos(angle) * pSpeed;
        break;
      case 'dust':
        vx = Math.sin(angle) * pSpeed * 0.3;
        vy = Math.cos(angle) * pSpeed * 0.3;
        break;
      case 'bubbles':
        vx = Math.sin(angle) * pSpeed * 0.2;
        vy = -pSpeed;
        break;
      default:
        vx = Math.cos(angle) * pSpeed;
        vy = Math.sin(angle) * pSpeed;
    }

    return {
      x,
      y,
      vx,
      vy,
      size: pSize,
      alpha: 0,
      life: 0,
      maxLife: pLife
    };
  }, [dimensions, size, speed, life, mode, capabilities, getAdjustedSpeed]);

  const initializeParticles = useCallback(() => {
    const adjustedCount = getAdjustedParticleCount();
    particlesRef.current = Array.from({ length: adjustedCount }, () => createParticle());
  }, [createParticle, getAdjustedParticleCount]);

  const updateParticles = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const particles = particlesRef.current;

    particles.forEach((particle, index) => {
      particle.life++;

      const lifeProgress = particle.life / particle.maxLife;
      particle.alpha = Math.sin(lifeProgress * Math.PI) * 0.6;

      if (mouseInteraction && mouseRef.current.isHovering) {
        const dx = particle.x - mouseRef.current.x;
        const dy = particle.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRepelRadius) {
          const force = (mouseRepelRadius - distance) / mouseRepelRadius;
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * force * 2;
          particle.vy += Math.sin(angle) * force * 2;
        }
      }

      particle.x += particle.vx;
      particle.y += particle.vy;

      switch (mode) {
        case 'snow':
          if (particle.y > height + particle.size) {
            particle.y = -particle.size;
            particle.x = Math.random() * width;
          }
          if (particle.x < -particle.size) particle.x = width + particle.size;
          if (particle.x > width + particle.size) particle.x = -particle.size;
          break;
        case 'fireflies':
          if (particle.x < 0 || particle.x > width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > height) particle.vy *= -1;
          particle.vx += (Math.random() - 0.5) * 0.1;
          particle.vy += (Math.random() - 0.5) * 0.1;
          break;
        case 'dust':
          if (particle.x < 0 || particle.x > width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > height) particle.vy *= -1;
          break;
        case 'bubbles':
          if (particle.y < -particle.size) {
            particle.y = height + particle.size;
            particle.x = Math.random() * width;
          }
          if (particle.x < 0 || particle.x > width) particle.vx *= -1;
          break;
      }

      if (particle.life >= particle.maxLife) {
        particles[index] = createParticle();
      }

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = colors[index % colors.length];
      ctx.globalAlpha = particle.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    if (connectionDistance > 0) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.globalAlpha = (1 - distance / connectionDistance) * 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    }

    animationIdRef.current = requestAnimationFrame(updateParticles);
  }, [colors, mode, mouseInteraction, mouseRepelRadius, connectionDistance, createParticle, dimensions]);

  const handleMouseMove = useCallback((e: any) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovering: true
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.isHovering = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas.parentElement!);

    initializeParticles();
    updateParticles();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [initializeParticles, updateParticles]);

  if (capabilities.prefersReducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
}

export function SnowParticles(props: Omit<AdvancedParticleSystemProps, 'mode'>) {
  return <AdvancedParticleSystem {...props} mode="snow" />;
}

export function FirefliesParticles(props: Omit<AdvancedParticleSystemProps, 'mode'>) {
  return <AdvancedParticleSystem {...props} mode="fireflies" />;
}

export function DustParticles(props: Omit<AdvancedParticleSystemProps, 'mode'>) {
  return <AdvancedParticleSystem {...props} mode="dust" />;
}

export function BubblesParticles(props: Omit<AdvancedParticleSystemProps, 'mode'>) {
  return <AdvancedParticleSystem {...props} mode="bubbles" />;
}
