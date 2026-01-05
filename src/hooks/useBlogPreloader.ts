'use client';

import { useEffect, useState } from 'react';

const blogCache: Record<string, string> = {};

export function useBlogPreloader(slugs: string[]) {
    useEffect(() => {
        const preload = async (slug: string) => {
            if (blogCache[slug]) return;
            try {
                const res = await fetch(`/api/blog-content?slug=${slug}`);
                if (res.ok) {
                    const data = await res.json();
                    blogCache[slug] = data.content;
                }
            } catch (e) {
                console.error('Preload failed', e);
            }
        };

        slugs.forEach(preload);
    }, [slugs]);

    return blogCache;
}

export function getCachedContent(slug: string) {
    return blogCache[slug];
}
