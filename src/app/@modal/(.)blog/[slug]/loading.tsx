import { BlogModal } from '@/components/blog/BlogModal';
import { BlogSkeleton } from '@/components/blog/BlogSkeleton';

export default function Loading() {
    return (
        <BlogModal>
            <BlogSkeleton />
        </BlogModal>
    );
}
