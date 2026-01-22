"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedGlobeProps {
  className?: string;
  variant?: "subtle" | "medium" | "bold";
}

export function AnimatedGlobe({
  className,
  variant = "medium",
}: AnimatedGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const config = {
    subtle: {
      dotColor: "#3b82f6",
      lineColor: "rgba(59, 130, 246, 0.3)",
      glowColor: "rgba(59, 130, 246, 0.15)",
      dotCount: 40,
      radiusMultiplier: 0.3,
      lineWidth: 0.5,
    },
    medium: {
      dotColor: "#2563eb",
      lineColor: "rgba(59, 130, 246, 0.5)",
      glowColor: "rgba(59, 130, 246, 0.2)",
      dotCount: 50,
      radiusMultiplier: 0.35,
      lineWidth: 0.8,
    },
    bold: {
      dotColor: "#1d4ed8",
      lineColor: "rgba(59, 130, 246, 0.7)",
      glowColor: "rgba(59, 130, 246, 0.25)",
      dotCount: 60,
      radiusMultiplier: 0.4,
      lineWidth: 1,
    },
  }[variant];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width = canvas.offsetWidth * 2;
    const height = canvas.height = canvas.offsetHeight * 2;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * config.radiusMultiplier;

    const dots: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      baseSize: number;
    }> = [];

    for (let i = 0; i < config.dotCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      dots.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
        size: Math.random() * 3 + 2,
        baseSize: Math.random() * 3 + 2,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.0005 * 16.67;

      const projectedDots = dots.map((dot) => {
        const rotatedX = dot.x * Math.cos(time) - dot.z * Math.sin(time);
        const rotatedZ = dot.x * Math.sin(time) + dot.z * Math.cos(time);
        
        const screenX = centerX + rotatedX * radius;
        const screenY = centerY + dot.y * radius * 0.85;
        const scale = (rotatedZ + 2) / 3;
        const size = dot.size * scale;

        return { x: screenX, y: screenY, size, z: rotatedZ, dot };
      });

      // Draw connections first (behind dots)
      // Optimized: Only check nearby dots in sorted order, reduce iterations
      const sortedByX = [...projectedDots].sort((a, b) => a.x - b.x);
      const maxDist = 60; // Reduced from 80 for better performance

      for (let i = 0; i < sortedByX.length; i++) {
        for (let j = i + 1; j < sortedByX.length; j++) {
          const d1 = sortedByX[i];
          const d2 = sortedByX[j];

          // Early exit if x distance already exceeds threshold
          if (d2.x - d1.x > maxDist) break;

          const dx = d1.x - d2.x;
          const dy = d1.y - d2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist && d1.z > -0.3 && d2.z > -0.3) {
            const opacity = (1 - dist / maxDist) * 0.4;
            ctx.beginPath();
            ctx.moveTo(d1.x, d1.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.strokeStyle = config.lineColor;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = config.lineWidth;
            ctx.stroke();
          }
        }
      }

      // Draw dots with glow effect
      projectedDots.forEach((dot) => {
        const opacity = Math.max(0.5, (dot.z + 1.2) / 2.2);
        
        // Glow effect
        const gradient = ctx.createRadialGradient(
          dot.x, dot.y, 0,
          dot.x, dot.y, dot.size * 3
        );
        gradient.addColorStop(0, `${config.dotColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.4, `${config.dotColor}${Math.floor(opacity * 0.3 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 1;
        ctx.fill();

        // Solid dot center
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, Math.max(1.5, dot.size), 0, Math.PI * 2);
        ctx.fillStyle = config.dotColor;
        ctx.globalAlpha = opacity;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, config]);

  return (
    <div 
      ref={containerRef} 
      className={cn("relative w-full h-full flex items-center justify-center", className)}
    >
      {/* Background glow */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl"
        style={{ 
          background: `radial-gradient(circle at center, ${config.glowColor} 0%, transparent 70%)`,
        }}
      />
      
      {/* Inner glow ring */}
      <div 
        className="absolute inset-0 rounded-full border"
        style={{
          borderColor: `${config.dotColor}30`,
          boxShadow: `0 0 40px ${config.glowColor}, inset 0 0 40px ${config.glowColor}`,
        }}
      />

      {isVisible ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full max-w-[500px] aspect-square relative z-10"
        />
      ) : (
        <div className="w-full h-full max-w-[500px] aspect-square flex items-center justify-center">
          <div 
            className="w-32 h-32 rounded-full animate-pulse"
            style={{
              background: `radial-gradient(circle at center, ${config.dotColor}40 0%, transparent 70%)`,
            }}
          />
        </div>
      )}
    </div>
  );
}

// Static version for better performance
export function StaticGlobe({
  className,
  color = "#2563eb",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div className={cn("relative w-full h-full flex items-center justify-center", className)}>
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        {/* Outer glow */}
        <div 
          className="absolute inset-0 rounded-full blur-2xl"
          style={{ 
            background: `radial-gradient(circle at center, ${color}30 0%, transparent 70%)`,
          }}
        />
        
        {/* Main circle */}
        <div 
          className="absolute inset-4 rounded-full border-2"
          style={{
            borderColor: `${color}60`,
            boxShadow: `0 0 30px ${color}20, inset 0 0 30px ${color}10`,
          }}
        />
        
        {/* Inner circle */}
        <div 
          className="absolute inset-12 rounded-full border"
          style={{
            borderColor: `${color}40`,
          }}
        />
        
        {/* Center glow */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${color}20 0%, transparent 50%)`,
          }}
        />

        {/* Orbiting dots */}
        <div className="absolute inset-0">
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full shadow-lg"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 10px ${color}, 0 0 20px ${color}60`,
                top: "50%",
                left: "50%",
                transform: `rotate(${angle}deg) translateX(${60 + i * 5}px) translateY(-50%)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
