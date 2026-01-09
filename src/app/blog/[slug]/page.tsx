import { MDXContent } from '@/components/mdx/MDXContent';
import { siteConfig } from '@/config/site-config';
import { notFound } from 'next/navigation';
import { getBlogPost as getBlogPostLib, getAllSlugs } from '@/lib/blog';

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await getBlogPostLib(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;

  return (
    <main className="min-h-screen bg-[#050505] text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <article>
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-1.5 mb-4">
              <span className="px-3 py-1 text-xs font-medium bg-purple-500/20 text-purple-300 rounded-full">
                {frontmatter.category || 'Blog'}
              </span>
              {frontmatter.tags && (() => {
                try {
                  const tagsArray = typeof frontmatter.tags === 'string'
                    ? JSON.parse(frontmatter.tags)
                    : Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
                  return (Array.isArray(tagsArray) ? tagsArray : []).map((tag: string, index: number) => (
                    <span key={index} className="px-3 py-1 text-xs font-medium bg-white/10 text-gray-300 rounded-full">
                      {tag}
                    </span>
                  ));
                } catch (e) {
                  return null;
                }
              })()}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {frontmatter.title}
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              {frontmatter.description}
            </p>
            {frontmatter.date && (
              <p className="text-sm text-gray-500">
                {frontmatter.date}
              </p>
            )}
          </header>

          <div className="glass-effect rounded-xl p-8 mb-8">
            <MDXContent source={content} />
          </div>

          <footer className="mt-12 pt-8 border-t border-white/10">
            <p className="text-sm text-gray-400 mb-4">
              Written by {siteConfig.name}
            </p>
            <div className="flex gap-4">
              {siteConfig.socialIcons.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}
