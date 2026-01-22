'use client';

import * as React from 'react';
import * as _jsx_runtime from 'react/jsx-runtime';
  import * as _jsx_dev_runtime from 'react/jsx-dev-runtime';
import { useMemo, Component, ErrorInfo, ReactNode } from 'react';
import { cn } from '@/lib/utils';

const customComponents = {
  a: ({
    href,
    className,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = typeof href === 'string' && /^https?:\/\//i.test(href);
    return (
      <a
        href={href}
        {...props}
        target={isExternal ? '_blank' : props.target}
        rel={isExternal ? 'noopener noreferrer' : props.rel}
        className={cn(
          'underline underline-offset-4 decoration-primary/40 hover:decoration-primary',
          className
        )}
      />
    );
  },
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      className={cn('scroll-mt-28 border-b border-border/60 pb-2', className)}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className={cn('scroll-mt-28', className)} />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className={cn(
        'not-prose overflow-x-auto rounded-xl border bg-muted/30 p-4',
        className
      )}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className={
        typeof className === 'string' && className.includes('language-')
          ? cn('block text-sm', className)
          : cn(
              'rounded-md border border-border/60 bg-muted/40 px-1.5 py-0.5 text-[0.95em]',
              className
            )
      }
    />
  ),
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

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.state.error);
    }

    return this.props.children;
  }
}

export function MDXContent({ code, components }: { code: string, components?: any }) {
  const { MDXComponent, evaluationError } = useMemo(() => {
    if (!code) return { MDXComponent: null, evaluationError: null };
    
    try {
      const exports: any = {};
      const module = { exports };
      
      const require = (name: string) => {
        if (name === 'react') return React;
        if (name === 'react/jsx-runtime') return _jsx_runtime;
        if (name === 'react/jsx-dev-runtime') return _jsx_dev_runtime;
        if (name === '@mdx-js/react') return { useMDXComponents: () => ({}) };
        throw new Error(`Module not found: ${name}`);
      };

      const fn = new Function('React', 'require', 'exports', 'module', '_jsx_runtime', '_jsx_dev_runtime', `
        try {
          return (function() {
            ${code}
          })();
        } catch (e) {
          throw e;
        }
      `);
      
      const resultFromFn = fn(React, require, exports, module, _jsx_runtime, _jsx_dev_runtime);
      
      const possibleExports = [
        resultFromFn,
        resultFromFn?.default,
        resultFromFn?.default?.default,
        resultFromFn?.Component,
        module.exports.default,
        module.exports.Component,
        module.exports,
        exports.default,
        exports.Component,
        module.exports.default?.default
      ];
      
      let finalComponent = null;
      for (const exp of possibleExports) {
        if (typeof exp === 'function') {
          finalComponent = exp;
          break;
        }
      }

      if (!finalComponent && typeof module.exports === 'object' && module.exports !== null) {
        const values = Object.values(module.exports);
        finalComponent = values.find(v => typeof v === 'function');
      }

      if (!finalComponent && resultFromFn && typeof resultFromFn === 'object') {
        const values = Object.values(resultFromFn as Record<string, unknown>);
        finalComponent =
          (values.find((v) => typeof v === 'function') as any) ??
          ((values.find((v) => v && typeof v === 'object' && typeof (v as any).default === 'function') as any)?.default ?? null);
      }

      if (!finalComponent) {
        const exportKeys = Object.keys(module.exports).join(', ');
        const resultKeys =
          resultFromFn && typeof resultFromFn === 'object'
            ? Object.keys(resultFromFn as Record<string, unknown>).join(', ')
            : '';
        throw new Error(
          `Failed to extract a valid React component from MDX. Available exports: [${exportKeys}]. Result from fn: ${typeof resultFromFn}${resultKeys ? ` (keys: [${resultKeys}])` : ''}`
        );
      }

      return { MDXComponent: finalComponent, evaluationError: null };
    } catch (error: any) {
      return { MDXComponent: null, evaluationError: error };
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
          {error.stack || error.message || 'Unknown Error'}
        </pre>
      )}
      <div className="mt-4 text-xs text-muted-foreground">
        Tip: If you are the developer, check if the MDX content is being correctly bundled and exported.
      </div>
    </div>
  );

  if (!MDXComponent) return getFallback(evaluationError);

  return (
    <MDXErrorBoundary fallback={getFallback}>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MDXComponent components={{ ...customComponents, ...components }} />
      </div>
    </MDXErrorBoundary>
  );
}
