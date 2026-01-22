"use client";

import { BentoGrid } from "@/components/ui/bento-grid";
import { StripedPattern } from "@/components/magicui/striped-pattern";
import { LightRays } from "@/components/ui/light-rays";
import { Particles } from "@/components/ui/particles";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ProjectsAnimations = dynamic(
  () => import("./projects-animations").then((mod) => mod.ProjectsAnimations),
  { 
    ssr: false,
    loading: () => <ProjectsSkeleton />
  }
);

function ProjectsSkeleton() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center py-20">
      <div className="absolute inset-0 -z-10">
        <StripedPattern className="mask-[radial_gradient(400px_circle_at_center,white,transparent)]" />
        <LightRays />
      </div>
      <div className="relative z-10 text-center mb-12">
        <div className="h-[60px] animate-pulse bg-muted/30 rounded-lg mb-4" />
        <div className="h-[24px] animate-pulse bg-muted/30 rounded-lg w-2/3 mx-auto" />
      </div>
      <div className="relative z-10 w-full max-w-6xl px-4">
        <BentoGridSkeleton />
      </div>
    </section>
  );
}

function BentoGridSkeleton() {
  return (
    <BentoGrid className="mx-auto">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="col-span-3 lg:col-span-1 min-h-[22rem] animate-pulse bg-muted/30 rounded-xl"
        />
      ))}
    </BentoGrid>
  );
}

export function ProjectsSection({ 
  title, 
  description, 
  items 
}: { 
  title: string; 
  description: string;
  items: Array<{
    name: string;
    description: string;
    cta: string;
  }>;
}) {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center py-20">
      {/* Background - Static */}
      <div className="absolute inset-0 -z-10">
        <StripedPattern className="mask-[radial_gradient(400px_circle_at_center,white,transparent)]" />
        <LightRays />
        <Particles className="absolute inset-0" color="#3B82F6" quantity={30} />
      </div>
      
      {/* Animated content - Lazy loaded */}
      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsAnimations 
          titleText={title}
          descriptionText={description}
          translatedItems={items}
        />
      </Suspense>
    </section>
  );
}
