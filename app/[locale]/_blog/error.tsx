'use client';

import { useEffect } from 'react';
import { RotateCcwIcon, TriangleAlertIcon } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
        <TriangleAlertIcon className="w-8 h-8 text-destructive" />
      </div>
      <h2 className="text-2xl font-bold mb-3">Something went wrong!</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        We encountered an error while loading this blog post. Please try again later.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
      >
        <RotateCcwIcon className="w-4 h-4 mr-2" />
        Try again
      </button>
    </div>
  );
}
