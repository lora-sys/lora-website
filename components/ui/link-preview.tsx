"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { encode } from "qss";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  quality = 50,
  layout = "fixed",
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  const isHttpUrl = /^https?:\/\//i.test(url);

  if (!isHttpUrl && !isStatic) {
    return (
      <a href={url} className={cn("text-black dark:text-white", className)}>
        {children}
      </a>
    );
  }

  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const preloadImage = useCallback((src: string) => {
    if (hasLoaded || isLoading) return;
    
    setIsLoading(true);
    const img = new Image();
    imgRef.current = img;
    
    img.onload = () => {
      setImageUrl(src);
      setIsLoading(false);
      setHasLoaded(true);
    };
    
    img.onerror = () => {
      setIsLoading(false);
    };
    
    img.src = src;
  }, [hasLoaded, isLoading]);

  const generateMicrolinkUrl = useCallback((targetUrl: string) => {
    const params = encode({
      url: targetUrl,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
    });
    return `https://api.microlink.io/?${params}`;
  }, [width, height]);

  const handleMouseEnter = useCallback(() => {
    if (isStatic) {
      setImageUrl(imageSrc);
      setHasLoaded(true);
      return;
    }

    hoverTimeoutRef.current = setTimeout(() => {
      const src = generateMicrolinkUrl(url);
      preloadImage(src);
    }, 100);
  }, [isStatic, imageSrc, url, generateMicrolinkUrl, preloadImage]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);

  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: any) => {
    const targetRect = event.target.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  return (
    <HoverCardPrimitive.Root
      openDelay={50}
      closeDelay={100}
      onOpenChange={(open) => {
        if (open && !isStatic && !hasLoaded && !isLoading) {
          const src = generateMicrolinkUrl(url);
          preloadImage(src);
        }
      }}
    >
      <HoverCardPrimitive.Trigger
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn("text-black dark:text-white", className)}
        asChild
      >
        <a href={url} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Content
        className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
        side="top"
        align="center"
        sideOffset={10}
      >
        <AnimatePresence>
          {(isStatic ? hasLoaded : imageUrl) && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              className="shadow-xl rounded-xl"
              style={{
                x: translateX,
              }}
            >
              <a
                href={url}
                className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
                style={{ fontSize: 0 }}
              >
                <img
                  src={isStatic ? imageSrc : imageUrl}
                  width={width}
                  height={height}
                  className="rounded-lg"
                  alt="preview image"
                />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  );
};
