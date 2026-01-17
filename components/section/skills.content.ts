import { t, type Dictionary } from "intlayer";

const skillsContent = {
  key: "skills",
  content: {
    title: t({
      en: "skills & technologies",
      zh: "技能与技术",
    }),
    description: t({
      en: "Technologies I work with",
      zh: "我所使用的技术栈",
    }),
  },
} satisfies Dictionary;

export default skillsContent;
