'use client';

import { useState, useMemo, useCallback } from 'react';
import { OrbitContainer } from '@/components/orbit/OrbitContainer';
import { OrbitSection } from '@/components/orbit/OrbitSection';
import { BentoGrid, BentoItem } from '@/components/bento/BentoGrid';
import { GlassCard } from '@/components/bento/GlassCard';
import { VirtualGrid } from '@/components/bento/VirtualScroll';
import { ContactForm } from '@/components/bento/ContactForm';
import { AboutSection } from '@/components/bento/AboutSection';
import { LifeSection } from '@/components/bento/LifeSection';
import { SkillsSection } from '@/components/bento/SkillsSection';
import { Typewriter } from '@/components/ui/Typewriter';
import { ParticleBackground } from '@/components/ui/ParticleBackground';
import { siteConfig, Project } from '@/config/site-config';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Calendar,
  ExternalLink,
  Search,
  X,
  Filter
} from 'lucide-react';

import { AnimationProvider } from '@/components/providers/AnimationProvider';
import { useBlogPreloader } from '@/hooks/useBlogPreloader';

export default function HomePage() {
  const blogSlugs = useMemo(() => siteConfig.projects.filter(p => p.blogSlug).map(p => p.blogSlug!), []);
  useBlogPreloader(blogSlugs);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get unique categories and tags
  const categories = ['all', ...Array.from(new Set(siteConfig.projects.map(p => p.category)))];
  const allTags = Array.from(new Set(siteConfig.projects.flatMap(p => p.tags)));

  // Filter projects with useMemo
  const filteredProjects = useMemo(() => {
    let filtered = siteConfig.projects;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(project =>
        selectedTags.every(tag => project.tags.includes(tag))
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedTags.length, JSON.stringify(selectedTags)]);

  const hasActiveFilters = searchTerm !== '' || selectedCategory !== null || selectedTags.length > 0;

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSelectedTags([]);
  }, []);

  // Render project card
  const renderProjectCard = useCallback((project: Project, index: number) => (
    <BentoItem key={project.id} size={project.size}>
      <GlassCard
        enable3D={true}
        onClick={project.link ? () => {
          if (project.link?.startsWith('http')) {
            window.open(project.link, '_blank');
          } else if (project.link?.startsWith('#')) {
            const element = document.querySelector(project.link);
            element?.scrollIntoView({ behavior: 'smooth' });
          }
        } : undefined}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <Badge variant="outline" className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30">
              {project.category}
            </Badge>
            {project.date && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                {project.date}
              </div>
            )}
            {project.tags.slice(0, 3).map((tag, tagIndex) => (
              <Badge key={tagIndex} className="text-xs bg-white/10 hover:bg-white/20 border-white/20">
                {tag}
              </Badge>
            ))}
          </div>

          <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">
            {project.title}
          </h3>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4 flex-grow">
            {project.description}
          </p>

          <div className="pt-4 flex items-center justify-between">
            {project.blogSlug ? (
              <Link
                href={`/blog/${project.blogSlug}`}
                className="flex items-center text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors"
              >
                <span>Read article</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            ) : (
              <span className="text-gray-500 text-sm">View project</span>
            )}
          </div>
        </div>
      </GlassCard>
    </BentoItem>
  ), []);

  // Get social icon
  const getSocialIcon = useCallback((iconName: string) => {
    const icons: Record<string, React.ElementType> = {
      Github,
      Linkedin,
      Twitter
    };
    const Icon = icons[iconName];
    return Icon ? <Icon className="w-5 h-5" /> : null;
  }, []);

  return (
    <OrbitContainer>
      <ParticleBackground />
      <main className="min-h-screen">
        {/* Hero Section */}
        <OrbitSection id="hero" className="min-h-screen flex flex-col justify-center items-center text-center px-4 -mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 tracking-tight font-mono"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #A855F7 50%, #3B82F6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              <Typewriter text={siteConfig.name} duration={1.5} loop={true} />
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Typewriter text={siteConfig.tagline} delay={1} duration={1.5} loop={true} />
            </motion.p>
            <motion.p
              className="text-lg text-gray-400 max-w-2xl mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {siteConfig.description}
            </motion.p>

            {/* Contact Info */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              {siteConfig.contact.available && (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Available for work
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                {siteConfig.contact.location}
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </div>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              className="flex justify-center gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {siteConfig.socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all hover:scale-110"
                  aria-label={social.platform}
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {[
                { value: siteConfig.stats.projects, label: 'Projects' },
                { value: siteConfig.stats.articles, label: 'Articles' },
                { value: `${siteConfig.stats.years}+`, label: 'Years' },
                { value: siteConfig.stats.technologies, label: 'Tech' }
              ].map((stat, index) => (
                <div key={index} className="glass-effect px-6 py-3 rounded-lg">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </OrbitSection>

        {/* About Me Section */}
        <div id="about">
          <AboutSection />
        </div>

        {/* Featured Work Section - Using Incremental Load */}
        <OrbitSection id="work" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Work
          </motion.h2>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects, articles, or tags..."
              className="w-full pl-12 pr-10 py-3 glass-effect rounded-xl text-white placeholder-gray-500 border-white/10 focus:border-purple-500/50 transition-all outline-none"
            />
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-all"
                title="Clear filters"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Filter className="w-4 h-4" />
              <span>Filter by:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(
                    selectedCategory === category ? null : category
                  )}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                    ${selectedCategory === category
                      ? 'bg-purple-500 hover:bg-purple-600'
                      : 'text-gray-300 bg-white/5 border border-white/20 hover:border-white/40 hover:bg-white/10'
                    }
                  `}
                >
                  {category === 'all' ? 'All' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Tag Filters */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm text-gray-400">Tags:</span>
              {allTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                  className={`
                    cursor-pointer transition-colors ${selectedTags.includes(tag)
                      ? 'bg-purple-500 text-white border-purple-500 hover:bg-purple-600'
                      : 'text-gray-400 border-white/20 hover:border-white/40 hover:text-white bg-white/5'
                    }
                  `}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center gap-2 text-sm mb-6"
            >
              <span className="text-gray-400">Active:</span>
              {searchTerm && (
                <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  Search: "{searchTerm}"
                </Badge>
              )}
              {selectedCategory && (
                <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  {selectedCategory}
                </Badge>
              )}
              {selectedTags.map(tag => (
                <Badge key={tag} variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  {tag}
                </Badge>
              ))}
            </motion.div>
          )}

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-6 text-sm text-gray-500"
          >
            Showing {filteredProjects.length} of {siteConfig.projects.length} items
            {filteredProjects.length !== siteConfig.projects.length && (
              <span className="ml-2">(filtered)</span>
            )}
          </motion.div>

          {/* Virtual Grid */}
          <VirtualGrid
            items={filteredProjects}
            renderItem={renderProjectCard}
            estimateHeight={450}
          />
        </OrbitSection>

        {/* Skills Section */}
        <div id="skills">
          <SkillsSection />
        </div>

        {/* Life Section */}
        <div id="life">
          <LifeSection />
        </div>

        {/* Contact Section */}
        <OrbitSection id="contact" className="py-20 px-4 md:px-8">
          <ContactForm />
        </OrbitSection>

        {/* Footer */}
        <footer className="py-12 px-4 text-center border-t border-white/10">
          <p className="text-gray-400 text-sm mb-4">
            © 2024 {siteConfig.name}. Crafted with passion and code.
          </p>
          <div className="flex justify-center gap-6 mb-6">
            {siteConfig.socialIcons.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                {getSocialIcon(social.icon)}
                <span>{social.platform}</span>
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-600">
            Based in {siteConfig.contact.location} · Working globally
          </p>
        </footer>
      </main>
    </OrbitContainer>
  );
}
