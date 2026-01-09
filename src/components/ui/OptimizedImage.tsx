'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
    fallbackSrc?: string;
}

/**
 * Optimized Image Component
 * Wrapper around next/image with automatic optimization, lazy loading, and error handling
 */
export function OptimizedImage({
    src,
    alt,
    fallbackSrc = '/placeholder.png',
    priority = false,
    loading,
    ...props
}: OptimizedImageProps) {
    const [imgSrc, setImgSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="relative overflow-hidden">
            <Image
                {...props}
                src={imgSrc}
                alt={alt}
                priority={priority}
                loading={loading || (priority ? undefined : 'lazy')}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setImgSrc(fallbackSrc);
                    setIsLoading(false);
                }}
                className={`
          ${props.className || ''}
          ${isLoading ? 'blur-sm' : 'blur-0'}
          transition-all duration-300
        `}
            />
            {isLoading && (
                <div className="absolute inset-0 bg-gray-800 animate-pulse" />
            )}
        </div>
    );
}
