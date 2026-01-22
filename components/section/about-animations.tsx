"use client";

import { useState, useEffect } from "react";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { BentoGrid } from "@/components/ui/bento-grid";
import { MagicCard } from "@/components/ui/magic-card";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const AboutContent = dynamic(
  () => import("./about-content").then((mod) => mod.AboutContent),
  { 
    ssr: false,
    loading: () => <AboutSkeleton />
  }
);

interface AboutAnimationsProps {
  typingAnimationText: string;
  contentProps: {
    profileCtaText: string;
    contributionsNameText: string;
    contributionsDescriptionText: string;
    starsNameText: string;
    starsDescriptionText: string;
    musicCtaText: string;
    locationNameText: string;
    locationDescriptionText: string;
    techStackNameText: string;
    techStackDescriptionText: string;
  };
}

export function AboutAnimations({ typingAnimationText, contentProps }: AboutAnimationsProps) {
  return (
    <>
      <div className="flex h-[25%] items-start justify-center pt-4">
        <TypingAnimation className="text-wrap text-3xl font-bold md:text-5xl">
          {typingAnimationText}
        </TypingAnimation>
      </div>
      
      <Suspense fallback={<AboutSkeleton />}>
        <AboutContent {...contentProps} />
      </Suspense>
    </>
  );
}

interface StatusItem {
  emoji: string;
  title: string;
  subtitle: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  link?: string;
}

const statusItems: StatusItem[] = [
  {
    emoji: "🦀",
    title: "Learning Rust",
    subtitle: "WASM & CLI Tools",
    gradientFrom: "#f97316",
    gradientTo: "#fb923c",
    accentColor: "text-orange-500",
    link: "https://www.rust-lang.org/"
  },
  {
    emoji: "🤖",
    title: "Building AI Agent",
    subtitle: "Next.js + OpenAI API",
    gradientFrom: "#22c55e",
    gradientTo: "#4ade80",
    accentColor: "text-green-500",
    link: "https://platform.openai.com/"
  },
  {
    emoji: "⚡",
    title: "Ship v2.0",
    subtitle: "Portfolio Release",
    gradientFrom: "#3b82f6",
    gradientTo: "#60a5fa",
    accentColor: "text-blue-500",
    link: "https://nextjs.org/"
  },
  {
    emoji: "💼",
    title: "Open for Work",
    subtitle: "Full-Stack Developer",
    gradientFrom: "#a855f7",
    gradientTo: "#c084fc",
    accentColor: "text-purple-500",
    link: "https://github.com/lora-sys"
  },
];

export function StatusCards() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statusItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ 
              delay: index * 0.15, 
              duration: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative perspective-1000"
          >
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700/50 p-6 transition-all duration-500 hover:border-neutral-600 hover:shadow-2xl hover:shadow-orange-500/10 dark:bg-gradient-to-br dark:from-neutral-950 dark:to-neutral-900 dark:border-neutral-800/50 dark:hover:border-neutral-700">
                
                {/* Animated gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
                  style={{
                    background: `radial-gradient(circle at center, ${item.gradientFrom}20 0%, transparent 70%)`,
                  }}
                />
                
                {/* Gradient border effect */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, transparent 0%, ${item.gradientFrom}33 25%, ${item.gradientTo}66 75%, transparent 100%)`,
                    mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  {/* Icon with glow */}
                  <div
                    className={cn(
                      "relative mb-4 flex h-16 w-16 items-center justify-center rounded-xl text-3xl shadow-lg transition-all duration-500",
                      "bg-gradient-to-br from-neutral-800 to-neutral-900",
                      "border border-neutral-700/50",
                      "group-hover:shadow-xl"
                    )}
                    style={{
                      boxShadow: `0 0 30px ${item.gradientFrom}40`,
                    }}
                  >
                    <span className="filter drop-shadow-lg">{item.emoji}</span>
                    {/* Glow effect */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(circle at center, ${item.gradientFrom}40 0%, transparent 70%)`,
                      }}
                    />
                  </div>
                  
                  {/* Title with gradient */}
                  <h4
                    className="relative mb-2 text-xl font-bold tracking-tight transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${item.gradientFrom} 0%, ${item.gradientTo} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {item.title}
                  </h4>
                  
                  {/* Subtitle */}
                  <p className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">
                    {item.subtitle}
                  </p>
                  
                  {/* Decorative line */}
                  <div
                    className="absolute bottom-4 left-1/2 h-0.5 w-12 -translate-x-1/2 rounded-full opacity-50 transition-all duration-300 group-hover:scale-x-100 origin-center"
                    style={{
                      background: `linear-gradient(90deg, ${item.gradientFrom} 0%, ${item.gradientTo} 100%)`,
                      transform: "scaleX(0)",
                    }}
                  />
                </div>
                
                {/* Arrow indicator */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  <svg
                    className="h-5 w-5 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function AboutSkeleton() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="col-span-1 min-h-[12rem] animate-pulse bg-muted/30 rounded-xl"
        />
      ))}
    </BentoGrid>
  );
}
