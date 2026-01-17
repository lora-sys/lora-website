"use client";

import { siteConfig } from "@/config/site";
import { WavyBackground } from "@/components/ui/wavy-background";
import { TextRevealCard, TextRevealCardDescription, TextRevealCardTitle } from "@/components/ui/text-reveal-card";
import { HyperText } from "@/components/ui/hyper-text";
import Link from "next/link";
import { Github, Twitter, Instagram, Video, Music } from "lucide-react";
import { useIntlayer } from "react-intlayer";

const iconMap: Record<string, any> = {
  github: Github,
  x: Twitter,
  instagram: Instagram,
  bilibili: Video,
  douyin: Music,
};

export function Footer() {
  const footer = useIntlayer("footer");
  const revealCard = footer?.revealCard;
  const rightsReserved = footer?.rightsReserved;

  const revealCardText = typeof revealCard?.text === 'string' ? revealCard.text : (revealCard?.text as any)?.value ?? "";
  const revealCardRevealText = typeof revealCard?.revealText === 'string' ? revealCard.revealText : (revealCard?.revealText as any)?.value ?? "";
  const revealCardTitle = typeof revealCard?.title === 'string' ? revealCard.title : (revealCard?.title as any)?.value ?? "";
  const revealCardDescription = typeof revealCard?.description === 'string' ? revealCard.description : (revealCard?.description as any)?.value ?? "";
  const rightsReservedText = typeof rightsReserved === 'string' ? rightsReserved : (rightsReserved as any)?.value ?? "";

  return (
    <footer className="relative w-full overflow-hidden border-t border-border/40 bg-background">
      <WavyBackground 
        className="max-w-4xl mx-auto pb-40" 
        containerClassName="h-[600px]"
        colors={["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"]}
        waveWidth={50}
        backgroundFill="transparent"
        blur={10}
        speed="fast"
        waveOpacity={0.5}
      >
        <div className="flex flex-col items-center justify-center gap-10 z-10">
            <TextRevealCard
                text={revealCardText}
                revealText={revealCardRevealText}
                className="bg-transparent border-none shadow-none"
            >
                <TextRevealCardTitle className="text-3xl text-center text-foreground">
                    {revealCardTitle}
                </TextRevealCardTitle>
                <TextRevealCardDescription className="text-center text-muted-foreground">
                    {revealCardDescription}
                </TextRevealCardDescription>
            </TextRevealCard>

            <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
                {Object.entries(siteConfig.socials).map(([key, url]) => {
                    const Icon = iconMap[key] || Github;
                    return (
                        <Link key={key} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
                             <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                             <HyperText text={key.charAt(0).toUpperCase() + key.slice(1)} className="text-muted-foreground group-hover:text-primary text-lg font-bold" />
                        </Link>
                    )
                })}
            </div>
             <div className="text-center text-sm text-muted-foreground mt-10">
                © {new Date().getFullYear()} {siteConfig.name}. {rightsReservedText}
            </div>
        </div>
      </WavyBackground>
    </footer>
  );
}
