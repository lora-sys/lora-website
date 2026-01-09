'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/bento/GlassCard';
import { Code, Music, BookOpen, Camera, Heart, ExternalLink, Play, Pause } from 'lucide-react';

// Preferences data
interface PreferenceItem {
  id: string;
  title: string;
  description: string;
  category: 'tool' | 'music' | 'animation' | 'photo';
  icon?: React.ReactNode;
  link?: string;
  image?: string;
  tags?: string[];
}

const preferencesData: PreferenceItem[] = [
  // Tools
  {
    id: 'tool-1',
    title: 'VS Code',
    description: 'My go-to code editor with powerful extensions',
    category: 'tool',
    icon: <Code className="w-5 h-5" />,
    link: 'https://code.visualstudio.com',
    tags: ['Editor', 'Productivity']
  },
  {
    id: 'tool-2',
    title: 'Figma',
    description: 'Collaborative design tool for UI/UX',
    category: 'tool',
    icon: <BookOpen className="w-5 h-5" />,
    link: 'https://www.figma.com',
    tags: ['Design', 'Collaboration']
  },
  {
    id: 'tool-3',
    title: 'Notion',
    description: 'All-in-one workspace for notes and tasks',
    category: 'tool',
    icon: <BookOpen className="w-5 h-5" />,
    link: 'https://www.notion.so',
    tags: ['Productivity', 'Organization']
  },

  // Music
  {
    id: 'music-1',
    title: 'Lo-Fi Beats',
    description: 'Relaxing background music for coding',
    category: 'music',
    icon: <Music className="w-5 h-5" />,
    tags: ['Focus', 'Chill']
  },
  {
    id: 'music-2',
    title: 'Jazz Classics',
    description: 'Timeless jazz for creative inspiration',
    category: 'music',
    icon: <Music className="w-5 h-5" />,
    tags: ['Jazz', 'Inspiration']
  },

  // Animation/Comics
  {
    id: 'anim-1',
    title: 'Studio Ghibli',
    description: 'Beautiful hand-drawn animations and stories',
    category: 'animation',
    tags: ['Anime', 'Fantasy']
  },
  {
    id: 'anim-2',
    title: 'Spider-Verse',
    description: 'Revolutionary animation style and storytelling',
    category: 'animation',
    tags: ['Movies', 'Visuals']
  },

  // Photos
  {
    id: 'photo-1',
    title: 'Bali Sunrise',
    description: 'Golden hour at the beach in Indonesia',
    category: 'photo',
    icon: <Camera className="w-5 h-5" />,
    tags: ['Travel', 'Nature']
  },
  {
    id: 'photo-2',
    title: 'Tokyo Nights',
    description: 'Neon lights and city vibes',
    category: 'photo',
    icon: <Camera className="w-5 h-5" />,
    tags: ['City', 'Travel']
  },
];

interface PreferenceCardProps {
  item: PreferenceItem;
  index: number;
}

function PreferenceCard({ item, index }: PreferenceCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (item.category === 'music') {
      setIsPlaying(!isPlaying);
    }
  };

  const categoryColors = {
    tool: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    music: 'from-pink-500/20 to-rose-500/20 border-pink-500/30',
    animation: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30',
    photo: 'from-orange-500/20 to-yellow-500/20 border-orange-500/30',
  };

  const categoryIcons = {
    tool: <Code className="w-4 h-4" />,
    music: <Music className="w-4 h-4" />,
    animation: <BookOpen className="w-4 h-4" />,
    photo: <Camera className="w-4 h-4" />,
  };

  return (
    <GlassCard
      enable3D={false}
      className="relative group"
      onClick={item.link ? undefined : togglePlay}
    >
      {/* Category Badge */}
      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryColors[item.category]} text-white`}>
        {categoryIcons[item.category]}
      </div>

      {/* Icon/Image */}
      {item.icon && (
        <div className="w-16 h-16 mb-4 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl group-hover:scale-110 transition-transform">
          {item.icon}
        </div>
      )}

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Tags */}
        {item.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-1 text-xs bg-white/5 text-gray-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
              Visit
            </a>
          ) : item.category === 'music' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Play
                </>
              )}
            </button>
          )}
          <button
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </GlassCard>
  );
}

export function PreferencesSection() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'All', icon: null },
    { id: 'tool', label: 'Tools', icon: <Code className="w-4 h-4" /> },
    { id: 'music', label: 'Music', icon: <Music className="w-4 h-4" /> },
    { id: 'animation', label: 'Animation', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'photo', label: 'Photos', icon: <Camera className="w-4 h-4" /> },
  ];

  const filteredItems = activeFilter === 'all'
    ? preferencesData
    : preferencesData.filter(item => item.category === activeFilter);

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Preferences
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Tools I use, music I love, animations that inspire me, and moments I've captured.
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              activeFilter === filter.id
                ? 'bg-purple-500 text-white scale-105'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {filter.icon}
            {filter.label}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <PreferenceCard item={item} index={index} />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400">No items found in this category.</p>
        </motion.div>
      )}

      {/* Footer */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <p className="text-gray-400 text-sm mb-4">
          Always discovering new tools, music, and inspirations
        </p>
        <div className="glass-effect inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm text-gray-300">
          <Heart className="w-5 h-5 text-pink-500" />
          <span>Crafted with passion</span>
        </div>
      </motion.div>
    </section>
  );
}
