import { aboutData } from "@/config/site-data";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import Image from "next/image";
import { Trophy, Star, Music, User, Globe, Code2, Bot } from "lucide-react";
import { Meteors } from "@/components/ui/meteors";
import { MagicCard } from "@/components/ui/magic-card";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { StatusCards } from "./about-animations";
import { useState } from "react";

interface AboutContentProps {
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
}

export function AboutContent({
  profileCtaText,
  contributionsNameText,
  contributionsDescriptionText,
  starsNameText,
  starsDescriptionText,
  musicCtaText,
  locationNameText,
  locationDescriptionText,
  techStackNameText,
  techStackDescriptionText,
}: AboutContentProps) {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  const features = [
    {
      name: aboutData.displayName,
      description: aboutData.username,
      href: aboutData.profileUrl,
      target: "_blank",
      cta: profileCtaText,
      Icon: User,
      className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2 md:col-span-2",
    },
    {
      name: locationNameText,
      description: locationDescriptionText,
      Icon: Globe,
      className: "lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-3",
    },
    {
      name: techStackNameText,
      description: techStackDescriptionText,
      href: "#skills",
      target: "_blank",
      Icon: Code2,
      cta: "Visit",
      className: "lg:row-start-2 lg:row-end-3 lg:col-start-2 lg:col-end-3",
    },
    {
      name: "3D Assistant",
      description: "Interactive Robot Scene",
      Icon: Bot,
      className: "lg:row-start-1 lg:row-end-3 lg:col-start-3 lg:col-end-4",
      isSpline: true,
    },
    {
      Icon: Music,
      name: "",
      description: "",
      href: "https://open.spotify.com",
      target: "_blank",
      cta: musicCtaText,
      dark: true,
      className: "lg:row-start-3 lg:row-end-4 lg:col-start-1 lg:col-end-2",
      musicData: aboutData.music[0],
    },
    {
      Icon: Music,
      name: "",
      description: "",
      href: "https://open.spotify.com",
      target: "_blank",
      cta: musicCtaText,
      className: "lg:row-start-3 lg:row-end-4 lg:col-start-2 lg:col-end-3",
      musicData: aboutData.music[1],
    },
  ];

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <BentoGrid className="lg:grid-rows-3">
          {features.map((feature, idx) => {
            const { Icon, ...rest } = feature;
          
            if (feature.isSpline) {
              const { isSpline, ...restWithoutSpline } = rest as any;
              return (
                <BentoCard
                  key={`${rest.name}-${idx}`}
                  {...restWithoutSpline}
                  Icon={
                    <Icon className="h-12 w-12 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75" />
                  }
                  background={
                    <div className="absolute inset-0">
                      {!isSplineLoaded ? (
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 cursor-pointer transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800"
                          onClick={() => setIsSplineLoaded(true)}
                          onMouseEnter={() => setIsSplineLoaded(true)}
                        >
                          <div className="text-center space-y-2">
                            <span className="text-4xl">🤖</span>
                            <p className="text-xs text-muted-foreground font-medium">Load 3D Scene</p>
                          </div>
                        </div>
                      ) : (
                        <iframe
                          src={aboutData.splineScene}
                          className="h-full w-full border-0 animate-in fade-in duration-700"
                          loading="lazy"
                          title="3D Robot Scene"
                        />
                      )}
                    </div>
                  }
                />
              );
            }

            if (feature.musicData) {
              const { musicData, ...restWithoutMusicData } = rest;
              return (
                <BentoCard
                  key={`${rest.name}-${idx}`}
                  {...restWithoutMusicData}
                  Icon={
                    <Icon
                      className={cn(
                        "h-12 w-12 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75",
                        rest.dark ? "text-white" : "text-neutral-700"
                      )}
                    />
                  }
                  background={
                    <div className="absolute inset-0">
                      <Image
                        src={feature.musicData.coverImage}
                        alt={feature.musicData.name}
                        fill
                        className="object-cover transition-all duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                      <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none z-20">
                        <p className="text-lg text-muted-foreground">
                          {feature.musicData.artist}
                        </p>
                        <p className="text-2xl font-semibold text-white">
                          {feature.musicData.name}
                        </p>
                      </div>
                    </div>
                  }
                />
              );
            }

            if (feature.name === techStackNameText) {
              return (
                <BentoCard
                  key={`${rest.name}-${idx}`}
                  {...rest}
                  Icon={
                    <Icon
                      className={cn(
                        "h-12 w-12 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75",
                        rest.dark ? "text-white" : "text-neutral-700"
                      )}
                    />
                  }
                  background={
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Meteors number={5} />
                    </div>
                  }
                />
              );
            }

            return (
              <BentoCard
                key={`${rest.name}-${idx}`}
                {...rest}
                Icon={
                  <Icon
                    className={cn(
                      "h-12 w-12 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75",
                      rest.dark ? "text-white" : "text-neutral-700"
                    )}
                  />
                }
                background={
                  feature.name === locationNameText ? (
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                      <Globe className="h-32 w-32 opacity-10" />
                    </div>
                  ) : undefined
                }
              />
            );
          })}
        </BentoGrid>
      </motion.div>
      
      <StatusCards />
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
