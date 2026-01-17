import { t, type Dictionary } from "intlayer";

const contactContent = {
  key: "contact",
  content: {
    title: t({
      en: "Get in Touch",
      zh: "与我联系",
    }),
    description: t({
      en: "Connect with me on social media or send me an email.",
      zh: "在社交媒体上关注我，或者给我发邮件。",
    }),
    emailLabel: t({
      en: "Email",
      zh: "电子邮箱",
    }),
  },
} satisfies Dictionary;

export default contactContent;
