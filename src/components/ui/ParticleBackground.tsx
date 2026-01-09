'use client';

import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobile } from '@/hooks/useMediaQuery';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
}

export function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(containerRef, {
        threshold: 0,
        rootMargin: '100px',
    });
    const prefersReducedMotion = useReducedMotion();
    const isMobile = useIsMobile();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        // Reduce particle count on mobile for better battery life
        const particleCount = isMobile ? 20 : 40;

        // Distance threshold for connecting particles
        const connectionDistance = 150;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 0.5,
                });
            }
        };

        const drawStatic = () => {
            // Draw static particles when reduced motion is enabled
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(168, 85, 247, 0.3)';

            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
        };

        const draw = () => {
            // Don't animate if not visible or user prefers reduced motion
            if (!isVisible || prefersReducedMotion) {
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(168, 85, 247, 0.3)'; // Purple particles

            // Update and draw particles
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around screen edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Connect particles with lines (optimized to avoid unnecessary calculations)
            // Only check connections for particles that are close enough
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];

                // Skip if this particle is too far from center (optimization)
                const distFromCenterX = Math.abs(p1.x - canvas.width / 2);
                const distFromCenterY = Math.abs(p1.y - canvas.height / 2);
                if (distFromCenterX > connectionDistance || distFromCenterY > connectionDistance) {
                    continue;
                }

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const opacity = 0.1 * (1 - dist / connectionDistance);
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        createParticles();

        // If reduced motion is enabled, draw static particles once
        if (prefersReducedMotion) {
            drawStatic();
        } else {
            draw();
        }

        return () => {
            window.removeEventListener('resize', resize);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [isVisible, prefersReducedMotion, isMobile]);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ opacity: 0.6 }}
                aria-hidden="true"
            />
        </div>
    );
}
