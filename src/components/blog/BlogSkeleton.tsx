import { Skeleton } from '@/components/ui/skeleton';

export function BlogSkeleton() {
    return (
        <div className="space-y-6">
            <header className="mb-6 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                    <Skeleton className="h-6 w-20 rounded-full bg-white/10" />
                    <Skeleton className="h-6 w-16 rounded-full bg-white/5" />
                    <Skeleton className="h-6 w-16 rounded-full bg-white/5" />
                </div>
                <Skeleton className="h-10 w-3/4 bg-white/10" />
                <Skeleton className="h-6 w-full bg-white/5" />
                <Skeleton className="h-4 w-32 bg-white/5" />
            </header>

            <div className="space-y-4">
                <Skeleton className="h-4 w-full bg-white/5" />
                <Skeleton className="h-4 w-full bg-white/5" />
                <Skeleton className="h-4 w-5/6 bg-white/5" />
                <Skeleton className="h-4 w-full bg-white/5" />
                <Skeleton className="h-40 w-full rounded-xl bg-white/5" />
                <Skeleton className="h-4 w-full bg-white/5" />
            </div>

            <footer className="pt-6 border-t border-white/10 space-y-4">
                <Skeleton className="h-4 w-40 bg-white/5" />
                <div className="flex gap-4">
                    <Skeleton className="h-4 w-16 bg-white/5" />
                    <Skeleton className="h-4 w-16 bg-white/5" />
                    <Skeleton className="h-4 w-16 bg-white/5" />
                </div>
            </footer>
        </div>
    );
}
