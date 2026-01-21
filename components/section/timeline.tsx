"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { Meteors } from "@/components/ui/meteors";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { Timeline } from "@/components/ui/timeline";
import { useIntlayer } from "react-intlayer";

export function TimelineSection() {
  const { title, description, tags, items } = useIntlayer("timeline");

  // 确保数据存在且是数组
  const tagsList = Array.isArray(tags) ? tags : [];
  const itemsList = Array.isArray(items) ? items : [];

  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden py-20"
    >
      <Meteors number={25} />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="mb-12 text-center space-y-4">
          <TypingAnimation className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
            {title?.value?.toString() || ""}
          </TypingAnimation>
          <p className="mx-auto max-w-[760px] text-muted-foreground md:text-xl">
            {description?.value?.toString() || ""}
          </p>
        </div>

        <div className="relative mb-10 flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background/70 backdrop-blur-sm md:shadow-xl">
          <Marquee pauseOnHover className="[--duration:18s]">
            {tagsList.map((tag: any, idx: number) => (
              <div
                key={idx}
                className={cn(
                  "relative cursor-pointer overflow-hidden rounded-full border px-6 py-3",
                  "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                  "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium tracking-wide">
                    {tag?.value?.toString() || ""}
                  </span>
                </div>
              </div>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
        </div>

        <div className="rounded-2xl border bg-background/40 backdrop-blur-sm md:shadow-2xl overflow-hidden">
          <Timeline
            header={null}
            className="bg-transparent dark:bg-transparent md:px-0"
            data={itemsList.map((item: any) => ({
              title: item?.title?.value?.toString() || "",
              content: (
                <div className="space-y-5">
                  <p className="text-neutral-700 dark:text-neutral-300 text-base leading-relaxed">
                    {item?.description?.value?.toString() || ""}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {item?.link ? (
                      <Link
                        href={item.link.href?.value?.toString() || "#"}
                        target={/^https?:\/\//i.test(item.link.href?.value?.toString() || "") ? "_blank" : undefined}
                        rel={/^https?:\/\//i.test(item.link.href?.value?.toString() || "") ? "noopener noreferrer" : undefined}
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium",
                          "border-gray-950/[.12] bg-gray-950/[.02] hover:bg-gray-950/[.06]",
                          "dark:border-gray-50/[.14] dark:bg-gray-50/[.08] dark:hover:bg-gray-50/[.14]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        )}
                      >
                        {item.link.label?.value?.toString() || "Link"}
                        <span aria-hidden="true">→</span>
                      </Link>
                    ) : null}
                    {Array.isArray(item?.links) && item.links.map((link: any, idx: number) => (
                      <Link
                        key={idx}
                        href={link.href?.value?.toString() || "#"}
                        target={/^https?:\/\//i.test(link.href?.value?.toString() || "") ? "_blank" : undefined}
                        rel={/^https?:\/\//i.test(link.href?.value?.toString() || "") ? "noopener noreferrer" : undefined}
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium",
                          "border-gray-950/[.12] bg-gray-950/[.02] hover:bg-gray-950/[.06]",
                          "dark:border-gray-50/[.14] dark:bg-gray-50/[.08] dark:hover:bg-gray-50/[.14]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        )}
                      >
                        {link.label?.value?.toString() || "Link"}
                        <span aria-hidden="true">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      </div>
    </section>
  );
}
