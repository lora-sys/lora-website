'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/bento/GlassCard';
import { Badge } from '@/components/ui/badge';
import { siteConfig } from '@/config/site-config';

interface IdentityTag {
  id: string;
  label: string;
  color: string;
  description: string;
}

const identityTags: IdentityTag[] = [
  { id: 'developer', label: 'Developer', color: '#A855F7', description: 'Crafting digital experiences with code' },
  { id: 'designer', label: 'Designer', color: '#3B82F6', description: 'Creating beautiful and functional interfaces' },
  { id: 'nomad', label: 'Digital Nomad', color: '#EC4899', description: 'Exploring the world while building products' },
  { id: 'creator', label: 'Creator', color: '#10B981', description: 'Sharing knowledge and building communities' },
  { id: 'innovator', label: 'Innovator', color: '#F59E0B', description: 'Pushing boundaries of what is possible' },
];

export function AboutSection() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [liquidColor, setLiquidColor] = useState('#A855F7');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 3 + 1,
        alpha: Math.random() * 0.6 + 0.3
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background based on active tag color
      const gradient = ctx.createRadialGradient(
        mousePosition.x * canvas.width,
        mousePosition.y * canvas.height,
        0,
        mousePosition.x * canvas.width,
        mousePosition.y * canvas.height,
        canvas.width * 0.7
      );

      const color = activeTag ? liquidColor : '#A855F7';
      gradient.addColorStop(0, `${color}40`);
      gradient.addColorStop(0.5, `${color}20`);
      gradient.addColorStop(1, '#05050500');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        // Connect nearby particles
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `${color}${Math.floor(0.1 * (1 - distance / 100) * 255).toString(16).padStart(2, '0')}`;
            ctx.stroke();
          }
        });
      });

      // Draw liquid wave effect
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x <= canvas.width; x += 10) {
        const wave1 = Math.sin((x + time) * 0.015) * 15;
        const wave2 = Math.sin((x + time * 0.8) * 0.02) * 10;
        const wave3 = Math.sin((x + time * 1.2) * 0.01) * 8;
        const y = canvas.height - 30 + wave1 + wave2 + wave3;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fillStyle = `${color}15`;
      ctx.fill();

      time += 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [activeTag, liquidColor, mousePosition]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    }
  };

  const handleTagClick = (tag: IdentityTag) => {
    if (activeTag === tag.id) {
      setActiveTag(null);
      setLiquidColor('#A855F7');
    } else {
      setActiveTag(tag.id);
      setLiquidColor(tag.color);
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Avatar Container */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard className="h-full min-h-[400px] flex items-center justify-center relative overflow-hidden" enable3D={true}>
            {/* Liquid Glass Background */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
              width={400}
              height={600}
              onMouseMove={handleMouseMove}
            />

            {/* Avatar */}
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4"
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <span className="text-6xl md:text-7xl font-bold text-white">
                  {siteConfig.name[0]}
                </span>
              </motion.div>

              <motion.h3
                className="text-3xl font-bold text-white mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                {siteConfig.name}
              </motion.h3>

              <p className="text-gray-400 text-center px-4">
                {activeTag
                  ? identityTags.find(t => t.id === activeTag)?.description
                  : 'Tap a tag to discover more about me'
                }
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Right: Description & Tags */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Description Card */}
          <GlassCard className="p-6" enable3D={false}>
            <h3 className="text-2xl font-bold text-white mb-4">
              Who I Am
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              {siteConfig.description}
            </p>
            <p className="text-gray-400 leading-relaxed">
              Based in {siteConfig.contact.location}, I'm passionate about creating beautiful digital experiences.
              I believe that great design is not just about aesthetics—it's about solving real problems
              and making technology accessible to everyone.
            </p>
          </GlassCard>

          {/* Digital Tags */}
          <GlassCard className="p-6" enable3D={false}>
            <h3 className="text-2xl font-bold text-white mb-4">
              Digital Tags
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Click a tag to explore different aspects of my identity
            </p>

            <div className="flex flex-wrap gap-3">
              {identityTags.map((tag, index) => (
                <motion.button
                  key={tag.id}
                  onClick={() => handleTagClick(tag)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${activeTag === tag.id
                      ? 'ring-2 ring-offset-2 ring-offset-black'
                      : 'hover:scale-105'
                    }
                  `}
                  style={{
                    backgroundColor: activeTag === tag.id ? `${tag.color}30` : `${tag.color}15`,
                    color: activeTag === tag.id ? tag.color : `${tag.color}aa`,
                    borderColor: activeTag === tag.id ? tag.color : 'transparent',
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tag.label}
                </motion.button>
              ))}
            </div>

            {activeTag && (
              <motion.div
                className="mt-6 p-4 rounded-lg"
                style={{
                  backgroundColor: `${liquidColor}10`,
                  border: `1px solid ${liquidColor}30`,
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <p className="text-sm text-gray-300">
                  <span style={{ color: liquidColor }} className="font-semibold">
                    {identityTags.find(t => t.id === activeTag)?.label}
                  </span>
                  : {identityTags.find(t => t.id === activeTag)?.description}
                </p>
              </motion.div>
            )}
          </GlassCard>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { value: siteConfig.stats.years, label: 'Years' },
              { value: siteConfig.stats.projects, label: 'Projects' },
              { value: siteConfig.stats.articles, label: 'Articles' },
            ].map((stat, index) => (
              <GlassCard key={index} className="text-center p-4" enable3D={false}>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
