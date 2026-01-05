'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        <div className="flex min-h-[400px] flex-col items-center justify-center p-4 text-center">
            <div className="glass-effect rounded-2xl p-8 max-w-md w-full border border-red-500/20 bg-red-500/5">
                <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-red-500/10 text-red-500">
                        <AlertCircle className="w-12 h-12" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3">Something went wrong!</h2>
                <p className="text-gray-400 mb-8">
                    {error.message || 'An unexpected error occurred. Please try again later.'}
                </p>

                <div className="flex gap-4 justify-center">
                    <Button
                        onClick={() => window.location.reload()}
                        variant="outline"
                        className="border-white/10 hover:bg-white/5"
                    >
                        Reload Page
                    </Button>
                    <Button
                        onClick={() => reset()}
                        className="bg-red-500 hover:bg-red-600 text-white border-0"
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        </div>
    );
}
