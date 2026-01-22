import { Marquee } from "@/components/ui/marquee";
import { skillsData } from "@/config/site-data";

export function SkillsContent() {
  return (
    <>
      {/* Static Marquee - no client interactivity needed */}
      <div className="absolute bottom-10 w-full z-10 opacity-60 hover:opacity-100 transition-opacity">
        <Marquee pauseOnHover className="[--duration:15s]">
          {skillsData.slugs.map((slug: string) => (
            <span key={slug} className="mx-4 text-sm font-mono text-muted-foreground uppercase tracking-widest">
              {slug}
            </span>
          ))}
        </Marquee>
      </div>
    </>
  );
}

export function SkillsSkeleton() {
  return (
    <div className="relative z-10 scale-75 md:scale-100 min-h-[400px] flex items-center justify-center">
      <div className="w-[400px] h-[400px] animate-pulse bg-muted/30 rounded-lg" />
    </div>
  );
}
