import Image from "next/image";
import { heroData } from "@/config/site-data";
import { Suspense } from "react";

export function HeroContent() {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="mb-4">
        <Image
          src={heroData.profileImage}
          alt="Profile"
          width={168}
          height={168}
          className="rounded-full border-2 border-primary shadow-lg shadow-primary/20"
          priority
        />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative flex h-[600px] w-full items-center justify-center overflow-hidden">
      <div className="z-10 flex flex-col items-center">
        <div className="mb-4">
          <div className="h-[168px] w-[168px] rounded-full bg-muted animate-pulse" />
        </div>
      </div>
    </div>
  );
}
