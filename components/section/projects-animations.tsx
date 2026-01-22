"use client";

import { StripedPattern } from "@/components/magicui/striped-pattern";
import { LightRays } from "@/components/ui/light-rays";
import { Particles } from "@/components/ui/particles";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const TypewriterEffect = dynamic(
  () => import("@/components/ui/typewriter-effect").then((mod) => mod.TypewriterEffect),
  { ssr: false }
);

const ProjectsContent = dynamic(
  () => import("./projects-content").then((mod) => mod.ProjectsContent),
  { 
    ssr: false,
    loading: () => <ProjectsSkeleton />
  }
);

function ProjectsSkeleton() {
  return (
    <div className="relative z-10 text-center mb-12">
      <div className="h-[60px] animate-pulse bg-muted/30 rounded-lg mb-4" />
      <div className="h-[24px] animate-pulse bg-muted/30 rounded-lg w-2/3 mx-auto" />
    </div>
  );
}

interface ProjectsAnimationsProps {
  titleText: string;
  descriptionText: string;
  translatedItems: Array<{
    name: string;
    description: string;
    cta: string;
  }>;
}

export function ProjectsAnimations({ titleText, descriptionText, translatedItems }: ProjectsAnimationsProps) {
  const titleWords = [{ text: titleText, className: "text-foreground" }];
  const descriptionWords = String(descriptionText).split(" ").map((word: string) => ({
    text: word + " ",
    className: "text-muted-foreground"
  }));

  return (
    <>
      {/* Title */}
      <div className="relative z-10 text-center mb-12">
        <TypewriterEffect words={titleWords} className="text-3xl md:text-5xl font-bold tracking-tight" />
        <TypewriterEffect words={descriptionWords} className="text-base mt-4" />
      </div>
      
      {/* Content */}
      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsContent items={translatedItems} />
      </Suspense>
    </>
  );
}
