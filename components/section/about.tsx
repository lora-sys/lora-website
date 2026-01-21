"use client";
import { cn } from "@/lib/utils";
import { useMemo, useEffect, useState } from "react";
import { Trophy, Star, Music, User, Globe, Code2 } from "lucide-react";
import Image from "next/image";
import { Meteors } from "@/components/ui/meteors";
import { NumberTicker } from "@/components/ui/number-ticker";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { aboutData } from "@/config/site-data";
import { TypingAnimation } from "../ui/typing-animation";
import { useIntlayer } from "react-intlayer";
import { MagicCard } from "@/components/ui/magic-card";
import { Particles } from "@/components/ui/particles";

interface GitHubStats {
  contributions: number;
  stars: number;
}

export function AboutSection() {
  const { typingAnimation, profileCta, contributions, stars: starsContent, music, location, techStack } = useIntlayer("about");
  const typingAnimationText = typeof typingAnimation === 'string' ? typingAnimation : (typingAnimation as any).value;

  const profileCtaText = typeof profileCta === 'string' ? profileCta : (profileCta as any).value;
  const contributionsNameText = typeof contributions.name === 'string' ? contributions.name : (contributions.name as any).value;
  const contributionsDescriptionText = typeof contributions.description === 'string' ? contributions.description : (contributions.description as any).value;
  const starsNameText = typeof starsContent.name === 'string' ? starsContent.name : (starsContent.name as any).value;
  const starsDescriptionText = typeof starsContent.description === 'string' ? starsContent.description : (starsContent.description as any).value;
  const musicCtaText = typeof music.cta === 'string' ? music.cta : (music.cta as any).value;
  const locationNameText = typeof location.name === 'string' ? location.name : (location.name as any).value;
  const locationDescriptionText = typeof location.description === 'string' ? location.description : (location.description as any).value;
  const techStackNameText = typeof techStack.name === 'string' ? techStack.name : (techStack.name as any).value;
  const techStackDescriptionText = typeof techStack.description === 'string' ? techStack.description : (techStack.description as any).value;

  const [stats, setStats] = useState<GitHubStats>({
    contributions: 0,
    stars: 0,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchGitHubData() {
      // 先检查缓存
      const cached = localStorage.getItem("github-stats");
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        // 缓存有效期 1 小时
        if (Date.now() - timestamp < 60 * 60 * 1000) {
          setStats(data);
          setLoading(false);
          return;
        }
      }

      try {
        const [reposRes, eventsRes] = await Promise.all([
          fetch(
            "https://api.github.com/users/lora-sys/repos?per_page=100&sort=updated"
          ),
          fetch(
            "https://api.github.com/users/lora-sys/events/public?per_page=100"
          ),
        ]);
        const [reposData, eventsData] = await Promise.all([
          reposRes.json(),
          eventsRes.json(),
        ]);
        const totalStars = reposData.reduce(
          (acc: number, repo: { stargazers_count: number }) =>
            acc + repo.stargazers_count,
          0
        );
        const pushEvents = eventsData.filter(
          (e: { type: string }) => e.type === "PushEvent"
        );
        const contributions = pushEvents.reduce(
          (acc: number, e: { commits?: unknown[] }) =>
            acc + (e.commits?.length || 0),
          0
        );
        setStats({ contributions, stars: totalStars });
        // 保存到缓存
        localStorage.setItem(
          "github-stats",
          JSON.stringify({
            data: { contributions, stars: totalStars },
            timestamp: Date.now(),
          })
        );
      } catch (error) {
        console.warn("Failed to fetch GitHub data, using default values:", error);
        setStats({ contributions: 1024, stars: 128 });
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, []);

  const backgroundContent = useMemo(() => (
    <div className="absolute inset-0 flex flex-col">
      <div className="h-[75%] w-full">
        <iframe
          src={aboutData.splineScene}
          className="h-full w-full border-0"
          loading="lazy"
        />
      </div>
      <div className="flex h-[25%] items-start justify-center pt-4">
        <TypingAnimation className="text-wrap text-3xl font-bold md:text-5xl">
          {typingAnimationText}
        </TypingAnimation>
      </div>
    </div>
  ), [typingAnimationText]);

  const features = [
    {
      name: aboutData.displayName,
      description: aboutData.username,
      href: aboutData.profileUrl,
      target: "_blank",
      cta: profileCtaText,
      Icon: User,
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-1 lg:col-end-2",
      background: backgroundContent,
    },
    {
      Icon: Trophy,
      name: contributionsNameText,
      description: contributionsDescriptionText,
      href: aboutData.profileUrl,
      target: "_blank",
      cta: profileCtaText,
      className: "lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-3",
      background: (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
          {loading ? (
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          ) : (
            <>
              <NumberTicker
                value={stats.contributions}
                className="text-6xl font-bold tracking-tighter text-primary"
              />
              <p className="mt-2 text-sm text-muted-foreground">
                {contributionsNameText}
              </p>
            </>
          )}
        </div>
      ),
    },
    {
      Icon: Star,
      name: starsNameText,
      description: starsDescriptionText,
      href: aboutData.profileUrl,
      target: "_blank",
      cta: profileCtaText,
      className: "lg:row-start-1 lg:row-end-2 lg:col-start-3 lg:col-end-4",
      background: (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
          {loading ? (
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          ) : (
            <>
              <NumberTicker
                value={stats.stars}
                className="text-6xl font-bold tracking-tighter text-primary"
              />
              <p className="mt-2 text-sm text-muted-foreground">{starsNameText}</p>
            </>
          )}
        </div>
      ),
    },
    {
      Icon: Music,
      name: "", // Hide default name
      description: "", // Hide default description
      href: "https://open.spotify.com",
      target: "_blank",
      cta: musicCtaText,
      dark: true,
      className: "lg:row-start-2 lg:row-end-3 lg:col-start-2 lg:col-end-3",
      background: (
        <div className="absolute inset-0">
          <Image
            src={aboutData.music[0].coverImage}
            alt={aboutData.music[0].name}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
          <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none z-20">
            <p className="text-lg text-muted-foreground">
              {aboutData.music[0].artist}
            </p>
            <p className="text-2xl font-semibold text-white">
              {aboutData.music[0].name}
            </p>
          </div>
        </div>
      ),
    },
    {
      Icon: Music,
      name: "", // Hide default name
      description: "", // Hide default description
      href: "https://open.spotify.com",
      target: "_blank",
      cta: musicCtaText,
      className: "lg:row-start-2 lg:row-end-3 lg:col-start-3 lg:col-end-4",
      background: (
        <div className="absolute inset-0">
          <Image
            src={aboutData.music[1].coverImage}
            alt={aboutData.music[1].name}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
          <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none z-20">
            <p className="text-lg text-muted-foreground">
              {aboutData.music[1].artist}
            </p>
            <p className="text-2xl font-semibold text-white">
              {aboutData.music[1].name}
            </p>
          </div>
        </div>
      ),
    },
    {
      name: locationNameText,
      description: locationDescriptionText,
      Icon: Globe,
      className: "lg:row-start-3 lg:row-end-4 lg:col-start-2 lg:col-end-3",
      background: (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <Globe className="h-32 w-32 opacity-10" />
        </div>
      ),
    },
    {
      name: techStackNameText,
      description: techStackDescriptionText,
      href: "#skills",
      target: "_blank",
      Icon: Code2,
      cta: "Visit",
      className: "lg:row-start-3 lg:row-end-4 lg:col-start-3 lg:col-end-4",
      background: (
        <div className="absolute inset-0 flex items-center justify-center">
          <Meteors number={10} />
          <TextHoverEffect text="Tech" />
        </div>
      ),
    },
  ];

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center py-20">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Particles className="absolute inset-0" quantity={100} color="#808080" />
      </div>

      <div className="w-full max-w-7xl px-4">
        <BentoGrid className="lg:grid-rows-3">
          {features.map((feature, idx) => {
            const { Icon, ...rest } = feature;
            // Use MagicCard for specific features (Stats) to make them pop
            if (feature.name === contributionsNameText || feature.name === starsNameText) {
                return (
                    <MagicCard key={`${rest.name}-${idx}`} className={cn(rest.className, "col-span-1 min-h-[12rem]")}>
                        <div className="relative h-full w-full p-6 flex flex-col items-center justify-center">
                            {rest.background}
                        </div>
                    </MagicCard>
                )
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
              />
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}

