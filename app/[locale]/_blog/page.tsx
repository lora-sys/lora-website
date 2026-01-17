import { allPosts } from 'contentlayer/generated';
import { Meteors } from '@/components/ui/meteors';
import { PostList } from '@/components/blog/post-list';

export default function BlogIndex() {
  const sortedPosts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      {/* Meteors Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Meteors number={40} />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
            Blog
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
            Thoughts, tutorials, and insights about web development, 3D art, and more.
          </p>
        </div>
        
        <PostList posts={sortedPosts} />
      </div>
    </div>
  );
}
