"use client";
import { skillsData } from "@/config/site-data";
import { IconCloud } from "@/components/ui/icon-cloud";
import { LightRays } from "@/components/ui/light-rays";
import { StripedPattern } from "@/components/magicui/striped-pattern";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { useIntlayer } from "react-intlayer";

export function SkillsSection() {
  const { title, description } = useIntlayer("skills");
  const titleText = typeof title === 'string' ? title : (title as any).value;
  const descriptionText = typeof description === 'string' ? description : (description as any).value;

  const titleWords = [
    { text: titleText, className: "text-foreground" }
  ];
  const descriptionWords = String(descriptionText).split(" ").map((word: string)  => ({
    text: word + " ",
    className: "text-muted-foreground"
  }));
  const images = skillsData.slugs.map((slug : any) => `/skills/${slug}.svg`);
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center py-20">
      {/* 背景 */}
      <div className="absolute inset-0 -z-10">
        <StripedPattern className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]" />
        <LightRays />
      </div>
      
      {/* 标题 */}
      <div className="relative z-10 text-center mb-12">
<TypewriterEffect words={titleWords} className="text-3xl md:text-5xl font-bold tracking-tight" />
<TypewriterEffect words={descriptionWords} className="text-base mt-4" />
      </div>
      
      {/* IconCloud */}
      <div className="relative z-10">
        <IconCloud images={images} />
      </div>
    </section>
  );
}