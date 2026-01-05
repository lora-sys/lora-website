'use client';

import { siteConfig } from '@/config/site-config';
import { Search, X, Filter } from 'lucide-react';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useDebounce } from '@/hooks/use-debounce';

export function ProjectFilter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const categories = useMemo(() => ['all', ...Array.from(new Set(siteConfig.projects.map(p => p.category)))], []);
  const allTags = useMemo(() => Array.from(new Set(siteConfig.projects.flatMap(p => p.tags))), []);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSelectedTags([]);
  };

  const hasActiveFilters = searchTerm !== '' || selectedCategory !== null || selectedTags.length > 0;

  // Filter projects based on debounced search term and other filters
  // This logic is implicitly handled by the parent component or whoever consumes this state?
  // Wait, ProjectFilter seems to just be the UI controls. It doesn't seem to filtering the list itself here.
  // The list is likely in another component reacting to some global state or prop?
  // Checking the file content provided earlier, it DOES NOT output filtered projects. 
  // It just manages local state. 
  // Ah, looking at the code, it seems it MIGHT be incomplete or just a UI demo? 
  // OR, this component is supposed to accept props to notify parent?
  // The current implementation just has local state that goes nowhere!
  // "optimization" here implies making it cheaper to render or handle input.
  // Since it doesn't do anything with the state, the optimization is purely for the input responsiveness.

  // However, usually a filter component takes `onFilterChange` or similar.
  // I will assume for now I just optimize the local performance as requested "Optimize ProjectFilter setState calls".

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
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
      <div className="flex flex-wrap items-center gap-3">
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
        <div className="flex flex-wrap items-center gap-2">
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
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-wrap items-center gap-2 text-sm"
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
      </AnimatePresence>
    </div>
  );
}
