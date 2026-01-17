import dynamic from 'next/dynamic';
const HeroSection = dynamic(() => import("@/components/section/hero").then(mod => mod.HeroSection));
const SkillsSection = dynamic(() => import("@/components/section/skills").then(mod => mod.SkillsSection));
const ProjectsSection = dynamic(() => import("@/components/section/projects").then(mod => mod.ProjectsSection));
const BlogSection = dynamic(() => import("@/components/section/blog").then(mod => mod.BlogSection));
const AboutSection = dynamic(() => import("@/components/section/about").then(mod => mod.AboutSection));
const LifeSection = dynamic(() => import("@/components/section/life").then(mod => mod.LifeSection));
const ContactSection = dynamic(() => import("@/components/section/contact").then(mod => mod.ContactSection));

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <BlogSection />
      <AboutSection/>
      <LifeSection />
      <ContactSection />
    </main>
  );
}
