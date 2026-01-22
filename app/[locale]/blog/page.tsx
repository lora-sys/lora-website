import { allPosts } from 'contentlayer/generated';
import { Meteors } from '@/components/ui/meteors';
import { PostList } from '@/components/blog/post-list';
import { Locales } from 'intlayer';

export function generateStaticParams() {
  return [
    { locale: Locales.ENGLISH },
    { locale: Locales.CHINESE },
  ];
}

const blogIndexContent = {
  en: {
    title: "Blog",
    description: "Thoughts, tutorials, and insights about web development, 3D art, and more."
  },
  zh: {
    title: "博客",
    description: "关于 Web 开发、3D 艺术等方面的见解、教程和深入探讨。"
  }
};

export default async function BlogIndex(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const isEn = locale.startsWith('en');
  const t = locale.startsWith('zh') ? blogIndexContent.zh : blogIndexContent.en;

  const sortedPosts = allPosts
    .filter((post) => {
      const hasEnSuffix = post.slug.endsWith('-en');

      if (isEn) {
        if (hasEnSuffix) return true;
        const hasEnVersion = allPosts.some(p => p.slug === `${post.slug}-en`);
        return !hasEnVersion;
      }

      const hasEnVersion = allPosts.some(p => p.slug === `${post.slug}-en`);
      return (hasEnVersion && !hasEnSuffix) || (!hasEnVersion && !hasEnSuffix);
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none [contain:strict]">
        <Meteors number={20} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {t.description}
          </p>
        </div>

        <PostList posts={sortedPosts} />
      </div>
    </div>
  );
}
