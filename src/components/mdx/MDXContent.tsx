

import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents as components } from '@/components/blog/MDXComponents';

import remarkGfm from 'remark-gfm';

interface MDXContentProps {
  source: string;
  initialSource?: string;
}

export function MDXContent({ source, initialSource }: MDXContentProps) {
  const contentToRender = source || initialSource;
  if (!contentToRender) return null;

  return (
    <MDXRemote
      source={contentToRender}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [],
        },
      }}
    />
  );
}
