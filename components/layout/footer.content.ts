import { t, type Dictionary } from "intlayer";

const footerContent = {
  key: "footer",
  content: {
    revealCard: {
      text: t({
        en: "You know the business",
        zh: "你了解业务",
      }),
      revealText: t({
        en: "I know the chemistry",
        zh: "我精通化学",
      }),
      title: t({
        en: "Everything is possible",
        zh: "万事皆有可能",
      }),
      description: t({
        en: "Hover to reveal the hidden truth.",
        zh: "悬停以揭示隐藏的真相。",
      }),
    },
    rightsReserved: t({
      en: "All rights reserved.",
      zh: "版权所有。",
    }),
  },
} satisfies Dictionary;

export default footerContent;
