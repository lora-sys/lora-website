import fs from 'fs';
import path from 'path';
import { MDXContent } from '@/components/mdx/MDXContent';
import { BlogModal } from '@/components/blog/BlogModal';
import { siteConfig } from '@/config/site-config';

// Get blog posts from content directory
const contentDir = path.join(process.cwd(), 'content', 'blog');

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

export default async function BlogModalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { frontmatter, content } = await getBlogPost(slug);

  return (
    <BlogModal>
      <article>
        <header className="mb-6">
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
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
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

        <div className="glass-effect rounded-xl p-6 mb-6 max-h-[60vh] overflow-y-auto">
          <MDXContent source={content} />
        </div>

        <footer className="pt-6 border-t border-white/10">
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
    </BlogModal>
  );
}
