import 'github-markdown-css/github-markdown.css';
import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, CalendarIcon } from 'lucide-react';
import { Meteors } from '@/components/ui/meteors';
import { MDXContent } from '@/components/mdx-content';

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = allPosts.find((p) => p.slug === params.slug);

  if (!post) notFound();

  return (
    <div className="relative w-full min-h-screen bg-background overflow-hidden">
      {/* Meteors Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Meteors number={40} />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link 
            href="/blog" 
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-4 uppercase tracking-widest">
              <CalendarIcon className="w-4 h-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
              {post.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed border-l-4 border-primary/50 pl-6 py-2">
              {post.description}
            </p>
          </header>

          {/* Content */}
          <article className="markdown-body bg-transparent! text-foreground! font-sans!
          ">
            <MDXContent code={post.body.code} />
          </article>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post) return;
  return {
    title: post.title,
    description: post.description,
  };
}
