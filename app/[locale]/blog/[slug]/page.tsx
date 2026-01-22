import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, CalendarIcon } from 'lucide-react';
import { Meteors } from '@/components/ui/meteors';
import { BlogMDXWrapper } from '@/components/blog/mdx-wrapper';
import { cn } from '@/lib/utils';

export default async function Page(props: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await props.params;
  const isEn = locale.startsWith('en');

  let post = allPosts.find((p) => p.slug === slug);

  if (!post && isEn && !slug.endsWith('-en')) {
    post = allPosts.find((p) => p.slug === `${slug}-en`);
  }

  if (!post && !isEn && slug.endsWith('-en')) {
    post = allPosts.find((p) => p.slug === slug.replace(/-en$/, ''));
  }

  if (!post) notFound();

  const backText = isEn ? "Back to Blog" : "返回博客";
  const dateLocale = isEn ? 'en-US' : 'zh-CN';
  const toc = (post.headings ?? []).filter(
    (h: any) => h && typeof h.depth === 'number' && h.depth >= 2 && h.depth <= 3
  );

  return (
    <div className="relative w-full min-h-screen bg-background overflow-x-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none [contain:strict]">
        <Meteors number={20} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 mb-8 group hover:-translate-x-1"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              {backText}
            </Link>

            <header className="mb-10">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-4 uppercase tracking-widest">
                <CalendarIcon className="w-4 h-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString(dateLocale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
                {post.title}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed border-l-4 border-primary/50 pl-6 py-2">
                {post.description}
              </p>
            </header>

            <article className="rounded-2xl border bg-background/80 backdrop-blur-sm shadow-2xl shadow-black/[0.06] dark:shadow-black/30 overflow-hidden">
              <div className="p-6 md:p-8 lg:p-10">
                <BlogMDXWrapper code={post.body.code} />
              </div>
            </article>
          </div>

          {toc.length > 0 ? (
            <aside className="hidden xl:block">
              <div className="sticky top-28">
                <div className="rounded-xl border bg-background/80 backdrop-blur-md p-5 shadow-lg shadow-black/[0.04] dark:shadow-black/20">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                    On this page
                  </p>
                  <nav aria-label="Table of contents" className="space-y-1">
                    {toc.map((h: any, index: number) => (
                      <a
                        key={h.url || index}
                        href={h.url}
                        className={cn(
                          "block text-sm transition-all duration-200 hover:text-primary",
                          h.depth === 3 ? 'pl-4' : '',
                          "text-muted-foreground hover:translate-x-1"
                        )}
                      >
                        {h.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const locales = ['en', 'zh']; // Define your locales here or import from config
  const params = [];

  for (const post of allPosts) {
    for (const locale of locales) {
      params.push({
        slug: post.slug,
        locale: locale,
      });
    }
  }

  return params;
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
