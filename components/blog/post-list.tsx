'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { CalendarIcon, ArrowRightIcon, SearchIcon } from 'lucide-react';
import type { Post } from 'contentlayer/generated';
import { cn } from '@/lib/utils';

import { useLocale } from 'next-intlayer';

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  const { locale } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts;
    const lowerQuery = searchQuery.toLowerCase();
    return posts.filter((post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.description?.toLowerCase().includes(lowerQuery)
    );
  }, [posts, searchQuery]);

  return (
    <div className="space-y-8">
      <div className="relative max-w-md mx-auto md:mx-0">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
          <SearchIcon className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg leading-5 bg-background/80 backdrop-blur-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary sm:text-sm transition-all duration-300"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className="group relative flex flex-col justify-between bg-card/40 backdrop-blur-md border border-border/50 hover:border-primary/50 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden gpu-accelerated"
              onMouseEnter={() => setHoveredPost(post.slug)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-4 uppercase tracking-widest">
                  <CalendarIcon className="w-3 h-3" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>

                <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {post.description}
                </p>

                <div className={cn(
                  "flex items-center text-sm font-medium text-primary mt-auto transition-all duration-300",
                  hoveredPost === post.slug ? "group-hover:translate-x-1" : ""
                )}>
                  Read Article
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </div>
              </div>

              {/* Bottom border line animation */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No articles found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
