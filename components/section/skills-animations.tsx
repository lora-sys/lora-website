"use client";

import { IconCloud } from "@/components/ui/icon-cloud";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import dynamic from "next/dynamic";

interface SkillsAnimationsProps {
  titleText: string;
  descriptionText: string;
  images: string[];
}

const TypewriterEffectStatic = dynamic(
  () => import("@/components/ui/typewriter-effect").then((mod) => mod.TypewriterEffect),
  { ssr: false }
);

export function SkillsAnimations({ titleText = "", descriptionText = "", images = [] }: SkillsAnimationsProps) {
  const titleWords = [
    { text: titleText, className: "text-foreground" }
  ];
  const descriptionWords = String(descriptionText || "").split(" ").map((word: string) => ({
    text: word + " ",
    className: "text-muted-foreground"
  }));

  return (
    <>
      {/* Title */}
      <div className="relative z-10 text-center mb-12">
        <TypewriterEffectStatic words={titleWords} className="text-3xl md:text-5xl font-bold tracking-tight" />
        <TypewriterEffectStatic words={descriptionWords} className="text-base mt-4" />
      </div>
      
      {/* IconCloud - Lazy loaded */}
      <div className="relative z-10 scale-75 md:scale-100 min-h-[400px]">
        <IconCloud images={images} />
      </div>
    </>
  );
}
