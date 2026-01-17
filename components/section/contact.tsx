"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { BorderBeam } from "@/components/ui/border-beam";
import { HyperText } from "@/components/ui/hyper-text";
import { Icons } from "@/components/ui/icons";
import { Github, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { SiBilibili, SiTiktok } from "react-icons/si";
import { ShineBorder } from "@/components/ui/shine-border";
import dynamic from "next/dynamic";
import { useIntlayer } from "react-intlayer";

const Globe = dynamic(() => import("@/components/ui/globe").then((m) => m.Globe), {
  ssr: false,
});

export function ContactSection() {
  const { title, description, emailLabel } = useIntlayer("contact");

  return (
    <section id="contact" className="relative h-screen w-full overflow-hidden bg-background">
      <div className="grid h-full w-full grid-cols-1 lg:grid-cols-2">
        {/* Globe Column */}
        <div className="relative flex h-[300px] lg:h-full w-full items-center justify-center order-1 lg:order-none">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden h-full w-full">
             <Globe className="opacity-100 h-full w-full" />
          </div>
        </div>

        {/* Content Column */}
        <div className="z-10 flex h-full w-full flex-col items-center justify-center gap-8 px-4 bg-background/50 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none order-2 lg:order-none pb-20 lg:pb-0">
          {/* Contact Card */}
          <div className="relative flex w-full max-w-[400px] flex-col items-center justify-center overflow-hidden rounded-xl bg-background/30 backdrop-blur-md border border-white/10 p-8 shadow-2xl">
            <BorderBeam size={250} duration={12} delay={9} />
            
            <h2 className="text-3xl font-bold tracking-tighter text-foreground mb-2">{title}</h2>
            <p className="text-muted-foreground text-center mb-6">
                {description}
            </p>

            <div className="grid grid-cols-3 gap-4 w-full">
                {siteConfig.socials.github && (
                    <Link href={siteConfig.socials.github} target="_blank" className="flex flex-col items-center gap-2 group">
                        <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                             <Github className="w-6 h-6" />
                        </div>
                        <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">GitHub</span>
                    </Link>
                )}
                {siteConfig.socials.x && (
                     <Link href={siteConfig.socials.x} target="_blank" className="flex flex-col items-center gap-2 group">
                        <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                             <Twitter className="w-6 h-6" />
                        </div>
                         <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Twitter</span>
                    </Link>
                )}
                 {siteConfig.socials.instagram && (
                     <Link href={siteConfig.socials.instagram} target="_blank" className="flex flex-col items-center gap-2 group">
                        <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                             <Instagram className="w-6 h-6" />
                        </div>
                         <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Instagram</span>
                    </Link>
                )}
                 {siteConfig.socials.bilibili && (
                     <Link href={siteConfig.socials.bilibili} target="_blank" className="flex flex-col items-center gap-2 group">
                        <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                             <SiBilibili className="w-6 h-6" />
                        </div>
                         <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Bilibili</span>
                    </Link>
                )}
                 {siteConfig.socials.douyin && (
                     <Link href={siteConfig.socials.douyin} target="_blank" className="flex flex-col items-center gap-2 group">
                        <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                             <SiTiktok className="w-6 h-6" />
                        </div>
                         <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Douyin</span>
                    </Link>
                )}
                 <Link href="mailto:hello@loralg.com" className="flex flex-col items-center gap-2 group">
                    <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                         <Mail className="w-6 h-6" />
                    </div>
                     <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{emailLabel}</span>
                </Link>
            </div>
        </div>

        <Link href="mailto:mierpiter@gmail.com" className="relative w-full max-w-[400px] group overflow-hidden rounded-xl">
            <ShineBorder 
                className="z-0"
                shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            />
            <div className="relative z-10 flex w-full flex-col items-center justify-center bg-background/30 backdrop-blur-md p-6">
                <div className="flex flex-col items-center gap-3">
                    <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Mail className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Primary Email</p>
                        <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                            mierpiter@gmail.com
                        </p>
                    </div>
                </div>
            </div>
        </Link>
      </div>
      </div>
      
      {/* Bottom Hyper Text */}
      <div className="absolute bottom-8 z-10">
        <HyperText
            className="text-4xl font-bold text-foreground/80"
            text="Let's Build Something Amazing"
        />
      </div>
    </section>
  );
}
