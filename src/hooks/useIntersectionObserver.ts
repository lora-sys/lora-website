'use client';

import { useEffect, useState, RefObject } from 'react';

interface UseIntersectionObserverOptions {
    threshold?: number | number[];
    root?: Element | null;
    rootMargin?: string;
    freezeOnceVisible?: boolean;
}

/**
 * Hook to detect if an element is visible in the viewport
 * Used to pause animations when elements are off-screen
 * 
 * @param elementRef - Ref to the element to observe
 * @param options - IntersectionObserver options
 * @returns boolean indicating if element is visible
 */
export function useIntersectionObserver(
    elementRef: RefObject<Element | null>,
    {
        threshold = 0,
        root = null,
        rootMargin = '0px',
        freezeOnceVisible = false,
    }: UseIntersectionObserverOptions = {}
): boolean {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = elementRef.current;

        // Don't observe if element doesn't exist or IntersectionObserver is not supported
        if (!element || typeof IntersectionObserver === 'undefined') {
            return;
        }

        // Don't re-observe if frozen
        if (freezeOnceVisible && isVisible) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold, root, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [elementRef, threshold, root, rootMargin, freezeOnceVisible, isVisible]);

    return isVisible;
}
