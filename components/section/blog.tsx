"use client";

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { AnimatedList } from "@/components/ui/animated-list";
import { BorderBeam } from "@/components/ui/border-beam";
import { Meteors } from "@/components/ui/meteors";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useIntlayer, useLocale } from "react-intlayer";
import dynamic from "next/dynamic";

const TypingAnimation = dynamic(
  () => import("@/components/ui/typing-animation").then((mod) => mod.TypingAnimation),
  { ssr: false }
);

interface NotificationProps {
  title: string;
  description: string;
  date: string;
  tag: string;
  color: string;
}

const Notification = ({ title, description, date, tag, color }: NotificationProps) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[1.03]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className={cn(
            "flex size-10 items-center justify-center rounded-2xl",
            color
          )}
        >
          <span className="text-lg font-bold">{tag[0]}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{title}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{date}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function BlogSection() {
  const { hero, tags, latestArticles, posts } = useIntlayer("blog");
  const { locale } = useLocale();

  return (
    <section id="blog" className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden py-20">
      <Meteors number={15} />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="mb-12 text-center space-y-4">
          <TypingAnimation className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
            {hero.title.value}
          </TypingAnimation>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            {hero.subtitle.value}
          </p>
        </div>

        <div className="relative mb-16 flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
          <Marquee pauseOnHover className="[--duration:10s]">
            {tags.map((tag: { value: string }) => (
              <div
                key={tag.value}
                className={cn(
                  "relative cursor-pointer overflow-hidden rounded-xl border p-4",
                  "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                  "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                )}
              >
                <div className="flex flex-row items-center gap-2">
                  <span className="text-sm font-medium">{tag.value}</span>
                </div>
              </div>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">{latestArticles.title.value}</h3>
              <p className="text-muted-foreground text-lg">
                {latestArticles.description.value}
              </p>
            </div>
          </div>

          <div className="relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm md:shadow-2xl">
            <div className="absolute top-6 right-6 z-20">
              <Link
                href={`/${locale}/blog`}
                className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border shadow-sm"
              >
                {latestArticles.viewAll?.value}
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <AnimatedList>
                {posts.map((post: { title: { value: string }; description: { value: string }; date: { value: string }; tag: { value: string }; color: { value: string } }) => (
                  <Notification
                    title={post.title.value}
                    description={post.description.value}
                    date={post.date.value}
                    tag={post.tag.value}
                    color={post.color.value}
                    key={post.title.value}
                  />
                ))}
              </AnimatedList>
            </div>
            <BorderBeam size={250} duration={12} delay={9} />
          </div>
        </div>
      </div>
    </section >
  );
}
