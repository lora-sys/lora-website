import fs from 'fs';
import path from 'path';
import { MDXContent } from '@/components/mdx/MDXContent';
import Link from 'next/link';
import { siteConfig } from '@/config/site-config';

// Get blog posts from content directory
const contentDir = path.join(process.cwd(), 'content', 'blog');

export const revalidate = 3600; // Revalidate every hour


export async function generateStaticParams() {
  const files = fs.readdirSync(contentDir);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace('.mdx', ''),
    }));
}

async function getBlogPost(slug: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // Parse frontmatter with CRLF support
  const frontmatterMatch = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const frontmatter: any = {};

  if (frontmatterMatch) {
    const frontmatterStr = frontmatterMatch[1];
    frontmatterStr.split(/\r?\n/).forEach((line) => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim();
        // Remove quotes if present
        frontmatter[key.trim()] = value.replace(/^["']|["']$/g, '');
      }
    });
  }

  // Remove frontmatter from content - support CRLF
  const content = fileContent.replace(/^---\r?\n[\s\S]*?\r?\n---/, '');

  return { frontmatter, content };
}

import { getCachedContent } from '@/hooks/useBlogPreloader';

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Try server-side or cached
  const cached = typeof window !== 'undefined' ? getCachedContent(slug) : null;
  const { frontmatter, content } = cached
    ? { frontmatter: { title: slug.split('-').join(' ') }, content: cached } // Minimal stub for cached
    : await getBlogPost(slug);

  return (
    <main className="min-h-screen bg-[#050505] text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <article>
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
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
