'use client';

import { Component, ReactNode } from 'react';
import { RotateCcwIcon, TriangleAlertIcon } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class GlobalErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack?: string }) {
    console.error('Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-background">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
            <TriangleAlertIcon className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Something went wrong!</h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            We encountered an unexpected error. Please try refreshing the page.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            <RotateCcwIcon className="w-4 h-4 mr-2" />
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
