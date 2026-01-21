import { HeroSection } from "@/components/section/hero";
import dynamic from "next/dynamic";

const SkillsSection = dynamic(
  () => import("@/components/section/skills").then((mod) => mod.SkillsSection),
  { loading: () => <div className="h-[60vh]" /> }
);
const ProjectsSection = dynamic(
  () => import("@/components/section/projects").then((mod) => mod.ProjectsSection),
  { loading: () => <div className="h-[60vh]" /> }
);
const TimelineSection = dynamic(
  () => import("@/components/section/timeline").then((mod) => mod.TimelineSection),
  { loading: () => <div className="h-[60vh]" /> }
);
const BlogSection = dynamic(
  () => import("@/components/section/blog").then((mod) => mod.BlogSection),
  { loading: () => <div className="h-[60vh]" /> }
);
const AboutSection = dynamic(
  () => import("@/components/section/about").then((mod) => mod.AboutSection),
  { loading: () => <div className="h-[60vh]" /> }
);
const LifeSection = dynamic(
  () => import("@/components/section/life").then((mod) => mod.LifeSection),
  { loading: () => <div className="h-[60vh]" /> }
);
const ContactSection = dynamic(
  () => import("@/components/section/contact").then((mod) => mod.ContactSection),
  { loading: () => <div className="h-[40vh]" /> }
);

export default function Home() {
  return (
    <main>
      <div className="[content-visibility:auto] [contain-intrinsic-size:1px_900px]">
        <HeroSection />
      </div>
      <div id="skills" className="scroll-mt-28 [content-visibility:auto] [contain-intrinsic-size:1px_800px]">
        <SkillsSection />
      </div>
      <div id="projects" className="scroll-mt-28 [content-visibility:auto] [contain-intrinsic-size:1px_900px]">
        <ProjectsSection />
      </div>
      <div id="timeline" className="scroll-mt-28 [content-visibility:auto] [contain-intrinsic-size:1px_900px]">
        <TimelineSection />
      </div>
      <div className="[content-visibility:auto] [contain-intrinsic-size:1px_900px]">
        <BlogSection />
      </div>
      <div id="about" className="scroll-mt-28 [content-visibility:auto] [contain-intrinsic-size:1px_900px]">
        <AboutSection />
      </div>
      <div id="life" className="scroll-mt-28 [content-visibility:auto] [contain-intrinsic-size:1px_900px]">
        <LifeSection />
      </div>
      <div id="contact" className="scroll-mt-28 [content-visibility:auto] [contain-intrinsic-size:1px_600px]">
        <ContactSection />
      </div>
    </main>
  );
}
