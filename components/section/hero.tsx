"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { HeroContent, HeroSkeleton } from "./hero-content";
import { HeroAnimations } from "./hero-animations";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const HeroAnimationsWrapper = dynamic(
  () => import("./hero-animations").then((mod) => mod.HeroAnimations),
  { 
    ssr: false,
    loading: () => <HeroSkeleton />
  }
);

export function HeroSection({ typingText, cardTexts }: { 
  typingText: { value: string | string[] }
  cardTexts: Array<{ value: string }>
}) {
  const typingWords = Array.isArray(typingText?.value)
    ? typingText.value.map(String)
    : [String(typingText?.value || "Hi, I'm lora")];

  return (
    <AuroraBackground className="min-h-screen w-full py-20 overflow-hidden">
      <HeroContent />
      <Suspense fallback={<HeroSkeleton />}>
        <HeroAnimationsWrapper typingWords={typingWords} cardTexts={cardTexts} />
      </Suspense>
    </AuroraBackground>
  );
}
