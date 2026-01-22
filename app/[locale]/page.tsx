import { HeroSection } from "@/components/section/hero";
import dynamic from "next/dynamic";
import { Locales } from "intlayer";
import skillsContent from "@/components/section/skills.content";
import projectsContent from "@/components/section/projects.content";
import aboutContent from "@/components/section/about.content";

export function generateStaticParams() {
  return [
    { locale: Locales.ENGLISH },
    { locale: Locales.CHINESE },
  ];
}

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

function getHeroData(locale: string) {
  const typingTextEn = ["Hi, I'm lora", "I build things for the web", "I create intelligent agents"];
  const typingTextZh = ["你好，我是 lora", "我为 Web 构建应用", "我致力于开发智能体"];
  const cardTextsEn = ["Full-Stack Developer", "AI Enthusiast", "Tech Blogger"];
  const cardTextsZh = ["全栈开发工程师", "AI 爱好者", "技术博主"];
  
  const isZh = locale.includes('zh');
  
  return {
    typingText: { value: isZh ? typingTextZh : typingTextEn },
    cardTexts: (isZh ? cardTextsZh : cardTextsEn).map(v => ({ value: v }))
  };
}

function getSkillsData(locale: string) {
  const title = (skillsContent.content.title as unknown as { en: string; zh: string });
  const description = (skillsContent.content.description as unknown as { en: string; zh: string });
  const isZh = locale.includes('zh');
  
  return {
    title: isZh ? title.zh : title.en,
    description: isZh ? description.zh : description.en
  };
}

function getProjectsData(locale: string) {
  const title = (projectsContent.content.title as unknown as { en: string; zh: string });
  const description = (projectsContent.content.description as unknown as { en: string; zh: string });
  const items = (projectsContent.content.items as unknown as Array<{
    name: { en: string; zh: string };
    description: { en: string; zh: string };
    cta: { en: string; zh: string };
  }>);
  const isZh = locale.includes('zh');
  
  return {
    title: isZh ? title.zh : title.en,
    description: isZh ? description.zh : description.en,
    items: items.map(item => ({
      name: isZh ? item.name.zh : item.name.en,
      description: isZh ? item.description.zh : item.description.en,
      cta: isZh ? item.cta.zh : item.cta.en
    }))
  };
}

function getAboutData(locale: string) {
  const content = aboutContent.content as unknown as {
    typingAnimation: { en: string; zh: string };
    profileCta: { en: string; zh: string };
    contributions: { name: { en: string; zh: string }; description: { en: string; zh: string } };
    stars: { name: { en: string; zh: string }; description: { en: string; zh: string } };
    music: { cta: { en: string; zh: string } };
    location: { name: { en: string; zh: string }; description: { en: string; zh: string } };
    techStack: { name: { en: string; zh: string }; description: { en: string; zh: string } };
  };
  const isZh = locale.includes('zh');
  
  return {
    typingAnimationText: isZh ? content.typingAnimation.zh : content.typingAnimation.en,
    profileCtaText: isZh ? content.profileCta.zh : content.profileCta.en,
    contributionsNameText: isZh ? content.contributions.name.zh : content.contributions.name.en,
    contributionsDescriptionText: isZh ? content.contributions.description.zh : content.contributions.description.en,
    starsNameText: isZh ? content.stars.name.zh : content.stars.name.en,
    starsDescriptionText: isZh ? content.stars.description.zh : content.stars.description.en,
    musicCtaText: isZh ? content.music.cta.zh : content.music.cta.en,
    locationNameText: isZh ? content.location.name.zh : content.location.name.en,
    locationDescriptionText: isZh ? content.location.description.zh : content.location.description.en,
    techStackNameText: isZh ? content.techStack.name.zh : content.techStack.name.en,
    techStackDescriptionText: isZh ? content.techStack.description.zh : content.techStack.description.en,
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const heroData = getHeroData(locale);
  const skillsData = getSkillsData(locale);
  const projectsData = getProjectsData(locale);
  const aboutData = getAboutData(locale);

  return (
    <main>
      <div className="[content-visibility:auto] [contain-intrinsic-size:1px_900px]">
        <HeroSection typingText={heroData.typingText} cardTexts={heroData.cardTexts} />
      </div>
      <div id="skills" className="scroll-mt-28">
        <SkillsSection title={skillsData.title} description={skillsData.description} />
      </div>
      <div id="projects" className="scroll-mt-28 [content-visibility:auto] [contain-intrinsic-size:1px_900px]">
        <ProjectsSection title={projectsData.title} description={projectsData.description} items={projectsData.items} />
      </div>
      <div id="timeline" className="scroll-mt-28 [content-visibility:auto] [contain-intrinsic-size:1px_900px]">
        <TimelineSection />
      </div>
      <div className="[content-visibility:auto] [contain-intrinsic-size:1px_900px]">
        <BlogSection />
      </div>
        <div id="about" className="scroll-mt-28 [content-visibility:auto] [contain-intrinsic-size:1px_900px]">
          <AboutSection 
            typingAnimationText={aboutData.typingAnimationText}
            profileCtaText={aboutData.profileCtaText}
            contributionsNameText={aboutData.contributionsNameText}
            contributionsDescriptionText={aboutData.contributionsDescriptionText}
            starsNameText={aboutData.starsNameText}
            starsDescriptionText={aboutData.starsDescriptionText}
            musicCtaText={aboutData.musicCtaText}
            locationNameText={aboutData.locationNameText}
            locationDescriptionText={aboutData.locationDescriptionText}
            techStackNameText={aboutData.techStackNameText}
            techStackDescriptionText={aboutData.techStackDescriptionText}
          />
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
