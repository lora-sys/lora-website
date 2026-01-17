'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';
// import defaultComponents from 'fumadocs-ui/mdx';

// Custom components to override default MDX components if needed
const customComponents = {
  // ...defaultComponents,
};

interface MDXContentProps {
  code: string;
  components?: Record<string, React.ComponentType<any>>;
}

export function MDXContent({ code, components }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return <Component components={{ ...customComponents, ...components }} />;
}
