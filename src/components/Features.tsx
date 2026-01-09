'use client';

import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '@/components/ui/animations';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
}

interface FeaturesProps {
  features: Feature[];
}

export function Features({ features }: FeaturesProps) {
  return (
    <motion.section
      className="py-20 px-4 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.4 }}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        AI Features
      </motion.h2>

      <StaggerContainer staggerDelay={0.1}>
        {features.map((feature, index) => (
          <StaggerItem key={feature.id} delay={index * 0.1}>
            <motion.div
              className="relative bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 rounded-2xl p-6 cursor-pointer transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              layout
            >
              {feature.image && (
                <div className="relative h-48 overflow-hidden mb-4 rounded-lg">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              )}

              <div className={`mb-3 ${feature.image ? '' : 'flex items-center gap-3'}`}>
                {feature.icon && (
                  <span className="text-3xl">{feature.icon}</span>
                )}
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </motion.section>
  );
}
