import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content', 'blog');

export interface BlogPost {
  frontmatter: Record<string, any>;
  content: string;
  slug: string;
}

export async function getAllSlugs(): Promise<string[]> {
  if (!fs.existsSync(contentDir)) {
    return [];
  }
  const files = fs.readdirSync(contentDir);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace('.mdx', ''));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(contentDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const frontmatterMatch = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const frontmatter: Record<string, any> = {};

  if (frontmatterMatch) {
    const frontmatterStr = frontmatterMatch[1];
    frontmatterStr.split(/\r?\n/).forEach((line) => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim();
        frontmatter[key.trim()] = value.replace(/^["']|["']$/g, '');
      }
    });
  }

  const content = fileContent.replace(/^---\r?\n[\s\S]*?\r?\n---/, '');

  return { frontmatter, content, slug };
}
