import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeSlug from 'rehype-slug'

const isDev =
  process.env.NODE_ENV === 'development' || process.env.npm_lifecycle_event === 'dev'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    author: { type: 'string' },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
    slugAsParams: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
    headings: {
      type: 'json',
      resolve: (doc) => {
        // Simple regex to extract headings (h1-h6)
        const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
            ({ groups }) => {
              const flag = groups?.flag;
              const content = groups?.content;
              const slug = content ? content.toLowerCase().replace(/\s+/g, '-') : '';
              return {
                depth: flag ? flag.length : 1,
                text: content,
                url: `#${slug}`,
                title: content // Fumadocs expects 'title'
              };
            }
        );
        return headings;
      }
    }
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [rehypeSlug],
    mdxOptions: (options) => ({
      ...options,
      development: isDev,
    }),
  },
})
