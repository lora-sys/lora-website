'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { Badge } from '@/components/ui/badge';
import { siteConfig } from '@/config/site-config';

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');

  const categories = ['all', ...Array.from(new Set(siteConfig.skills.map(s => s.category)))];

  const filteredSkills = selectedCategory === 'all'
    ? siteConfig.skills
    : siteConfig.skills.filter(s => s.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      frontend: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      backend: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      design: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      other: 'bg-green-500/20 text-green-300 border-green-500/30'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  const getSkillLevelColor = (level: number, index: number) => {
    if (index < level) {
      if (level >= 4) return 'text-purple-400';
      if (level >= 3) return 'text-blue-400';
      return 'text-green-400';
    }
    return 'text-gray-700';
  };

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Skills & Expertise
      </motion.h2>

      {/* Category Filter */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-6 py-2 rounded-full text-sm font-medium transition-all
              ${selectedCategory === category
                ? `${getCategoryColor(category as string)} bg-opacity-30`
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }
            `}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            layout
          >
            <GlassCard
              className="h-full"
              enable3D={true}
            >
              <div className="h-full flex flex-col">
                {/* Category Badge */}
                <div className="mb-3">
                  <Badge
                    variant="outline"
                    className={`text-xs ${getCategoryColor(skill.category)}`}
                  >
                    {skill.category}
                  </Badge>
                </div>

                {/* Skill Name */}
                <h3 className="text-lg font-semibold text-white mb-3">
                  {skill.name}
                </h3>

                {/* Skill Level Dots */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.2 }}
                      className={`w-2 h-2 rounded-full ${getSkillLevelColor(skill.level, i)} transition-colors`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-400">{skill.level}/5</span>
                </div>

                {/* Progress Bar */}
                <div className="mt-auto">
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className={`h-full rounded-full ${
                        skill.level >= 4 ? 'bg-purple-500' :
                        skill.level >= 3 ? 'bg-blue-500' :
                        'bg-green-500'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Skills Summary */}
      <motion.div
        className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {[
          { label: 'Total Skills', value: siteConfig.skills.length, color: 'purple' },
          { label: 'Expert Level', value: siteConfig.skills.filter(s => s.level >= 4).length, color: 'blue' },
          { label: 'Advanced', value: siteConfig.skills.filter(s => s.level === 3).length, color: 'pink' },
          { label: 'Categories', value: categories.length - 1, color: 'green' }
        ].map((stat, index) => (
          <GlassCard
            key={index}
            className="text-center p-6"
            enable3D={false}
          >
            <div className={`text-3xl font-bold text-${stat.color}-400 mb-2`}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wide">
              {stat.label}
            </div>
          </GlassCard>
        ))}
      </motion.div>
    </section>
  );
}
