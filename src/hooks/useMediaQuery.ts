'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to match media queries
 * Consolidates mobile detection and other media query logic
 * Server-safe with proper hydration handling
 * 
 * @param query - Media query string (e.g., '(max-width: 768px)')
 * @returns boolean indicating if media query matches
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia(query);

        // Set initial value
        setMatches(mediaQuery.matches);

        // Listen for changes
        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        // Modern browsers
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
        // Fallback for older browsers
        else {
            mediaQuery.addListener(handleChange);
            return () => mediaQuery.removeListener(handleChange);
        }
    }, [query]);

    // Return false during SSR to avoid hydration mismatch
    return mounted ? matches : false;
}

/**
 * Predefined hook for mobile detection
 * @returns true if viewport width is less than 768px or device has touch support
 */
export function useIsMobile(): boolean {
    const isMobileWidth = useMediaQuery('(max-width: 767px)');
    const hasTouch = useMediaQuery('(hover: none) and (pointer: coarse)');

    return isMobileWidth || hasTouch;
}
