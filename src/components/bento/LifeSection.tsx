'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/bento/GlassCard';

interface Photo {
  id: string;
  src: string;
  title: string;
  date: string;
  location: string;
  rotation: number;
}

const lifePhotos: Photo[] = [
  { id: '1', src: '/life/photo1.jpg.svg', title: 'Bali Sunrise', date: '2024-01', location: 'Bali, Indonesia', rotation: -3 },
  { id: '2', src: '/life/photo2.jpg.svg', title: 'Coding by the Beach', date: '2024-02', location: 'Phuket, Thailand', rotation: 2 },
  { id: '3', src: '/life/photo3.jpg.svg', title: 'Mountain Retreat', date: '2024-03', location: 'Chiang Mai, Thailand', rotation: -1 },
  { id: '4', src: '/life/photo4.jpg.svg', title: 'City Lights', date: '2024-04', location: 'Singapore', rotation: 3 },
  { id: '5', src: '/life/photo5.jpg.svg', title: 'Coffee & Code', date: '2024-05', location: 'Da Nang, Vietnam', rotation: -2 },
  { id: '6', src: '/life/photo6.jpg.svg', title: 'Old Town Charm', date: '2024-06', location: 'Hoi An, Vietnam', rotation: 1 },
];

interface PolaroidPhotoProps {
  photo: Photo;
  index: number;
}

function PolaroidPhoto({ photo, index }: PolaroidPhotoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Liquid mask effect
  const renderLiquidMask = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create liquid wave pattern
    const time = Date.now() * 0.001;

    for (let y = 0; y < canvas.height; y += 4) {
      for (let x = 0; x < canvas.width; x += 4) {
        const dist = Math.sqrt(
          Math.pow((mousePosition.x * canvas.width) - x, 2) +
          Math.pow((mousePosition.y * canvas.height) - y, 2)
        );

        const maxDist = 150;
        const waveInfluence = Math.max(0, 1 - dist / maxDist);

        const wave1 = Math.sin((x + time * 50) * 0.02) * 0.5;
        const wave2 = Math.cos((y + time * 50) * 0.02) * 0.5;
        const wave3 = Math.sin((x + y + time * 100) * 0.01) * 0.3;

        const offset = (wave1 + wave2 + wave3) * waveInfluence * 10;

        const alpha = isHovered
          ? Math.max(0, 0.3 - waveInfluence * 0.3 + offset * 0.02)
          : 0.8;

        ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
        ctx.fillRect(x, y, 4, 4);
      }
    }

    if (isHovered) {
      requestAnimationFrame(renderLiquidMask);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    renderLiquidMask();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      className="preserve-3d"
      initial={{ opacity: 0, rotate: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        transform: `perspective(1000px) rotate(${photo.rotation}deg)`,
      }}
    >
      <GlassCard
        className={`relative bg-[#1a1a1a] p-3 pt-12 ${isHovered ? 'scale-105' : ''}`}
        enable3D={false}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Photo Container with 3D Parallax */}
        <motion.div
          className="relative w-full aspect-[4/5] bg-[#2a2a2a] rounded overflow-hidden"
          animate={{
            translateZ: isHovered ? 60 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Placeholder for photo */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/30 to-blue-900/30">
            {isLoaded ? (
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover"
                onLoad={() => setIsLoaded(true)}
                onError={() => setIsLoaded(false)}
              />
            ) : (
              <div className="text-center p-6">
                <div className="text-6xl mb-4">📸</div>
                <p className="text-sm text-gray-400">{photo.title}</p>
                <p className="text-xs text-gray-500 mt-2">{photo.location}</p>
              </div>
            )}
          </div>

          {/* Liquid Mask Overlay */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply"
            width={400}
            height={500}
            onMouseMove={handleMouseMove}
          />
        </motion.div>

        {/* Polaroid Caption */}
        <div className="mt-3 text-center">
          <h3 className="text-lg font-bold text-white mb-1">{photo.title}</h3>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <span>{photo.date}</span>
            <span>•</span>
            <span>{photo.location}</span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export function LifeSection() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Life
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Moments captured while traveling the world as a digital nomad.
          Each photo tells a story of places, people, and experiences.
        </p>
      </motion.div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 perspective-[1200px]">
        {lifePhotos.map((photo, index) => (
          <PolaroidPhoto
            key={photo.id}
            photo={photo}
            index={index}
          />
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <p className="text-gray-400 text-sm mb-6">
          More moments coming soon as I continue my journey around the world.
        </p>
        <div className="glass-effect inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm text-gray-300">
          <span className="text-2xl">🌍</span>
          <span>12 Countries • 45 Cities • Endless Stories</span>
        </div>
      </motion.div>
    </section>
  );
}
