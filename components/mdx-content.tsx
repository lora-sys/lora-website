'use client';

import * as React from 'react';
import { useMemo, Component, ErrorInfo, ReactNode } from 'react';

// Custom components to override default MDX components if needed
const customComponents = {
};

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: (error: Error | null) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class MDXErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('MDX Content Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.state.error);
    }

    return this.props.children;
  }
}

export function MDXContent({ code, components }: { code: string, components?: any }) {
  const MDXComponent = useMemo(() => {
    if (!code) return null;
    
    try {
      // Contentlayer's code is a self-executing bundle that returns the component
      // We evaluate it in a sandbox-like environment
      const fn = new Function('React', 'exports', `
        ${code}
        return exports.default || exports.Component || (typeof Component !== 'undefined' ? Component : null);
      `);
      
      const exports = {};
      const result = fn(React, exports);
      return result;
    } catch (error) {
      console.error('Error evaluating MDX code:', error);
      return null;
    }
  }, [code]);

  const getFallback = (error: Error | null) => (
    <div className="p-6 border border-destructive/20 rounded-xl bg-destructive/5 my-8">
      <h3 className="text-lg font-semibold text-destructive mb-2">Content Display Error</h3>
      <p className="text-muted-foreground text-sm mb-4">
        This content could not be displayed. This is often due to a compatibility issue between the content format and the current site version.
      </p>
      {error && (
        <pre className="text-xs p-4 bg-destructive/10 rounded overflow-auto max-h-40 text-destructive/80">
          {error.message}
        </pre>
      )}
    </div>
  );

  if (!MDXComponent) return getFallback(null);

  return (
    <MDXErrorBoundary fallback={getFallback}>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MDXComponent components={{ ...customComponents, ...components }} />
      </div>
    </MDXErrorBoundary>
  );
}
