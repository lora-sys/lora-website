import { Locales } from "intlayer";
import { HeroSection } from "@/components/section/hero";
import dynamic from "next/dynamic";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ResizableNavbar } from "@/components/layout/resizable-navbar";
import { Footer } from "@/components/layout/footer";
import { IntlayerClientProvider } from "next-intlayer";
import { GridPattern } from "@/components/ui/grid-pattern";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lora | Full-Stack Developer",
  description: "Personal portfolio of Lora, showcasing projects in AI, Web Development, and more.",
};

// 找回之前的动态导入优化和占位符
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

export default function IndexPage() {
  const locale = Locales.ENGLISH; // 默认英文版

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground" style={{ overflowX: "hidden" }} suppressHydrationWarning>
        <IntlayerClientProvider locale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="fixed inset-0 z-[-1] pointer-events-none">
              <GridPattern
                width={40}
                height={40}
                className="opacity-[0.03] dark:opacity-[0.05] [mask-image:linear-gradient(to_bottom,transparent,white_20%,white_90%,transparent)]"
                squares={[
                  [4, 4],
                  [5, 1],
                  [8, 2],
                  [6, 6],
                  [12, 12],
                  [15, 15],
                  [20, 20],
                ]}
              />
            </div>
            <ResizableNavbar />
            <div id="main-content">
              <main>
                <div className="content-visibility-auto">
                   <HeroSection />
                </div>
                {/* 找回所有性能优化项 */}
                <div id="skills" className="scroll-mt-28 content-visibility-auto">
                  <SkillsSection />
                </div>
                <div id="projects" className="scroll-mt-28 content-visibility-auto">
                  <ProjectsSection />
                </div>
                <div id="timeline" className="scroll-mt-28 content-visibility-auto">
                  <TimelineSection />
                </div>
                <div className="content-visibility-auto">
                  <BlogSection />
                </div>
                <div id="about" className="scroll-mt-28 content-visibility-auto">
                  <AboutSection />
                </div>
                <div id="life" className="scroll-mt-28 content-visibility-auto">
                  <LifeSection />
                </div>
                <div id="contact" className="scroll-mt-28 content-visibility-auto">
                  <ContactSection />
                </div>
              </main>
            </div>
            <Footer />
          </ThemeProvider>
        </IntlayerClientProvider>
      </body>
    </html>
  );
}
