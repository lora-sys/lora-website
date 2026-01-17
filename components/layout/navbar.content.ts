import { t, type Dictionary } from "intlayer";

const navbarContent = {
  key: "navbar",
  content: {
    navItems: [
      {
        name: t({
          en: "Home",
          zh: "首页",
        }),
        link: "/",
      },
      {
        name: t({
          en: "Skills",
          zh: "技能",
        }),
        link: "/#skills",
      },
      {
        name: t({
          en: "Projects",
          zh: "项目",
        }),
        link: "/#projects",
      },
      {
        name: t({
          en: "About",
          zh: "关于",
        }),
        link: "/#about",
      },
      {
        name: t({
          en: "Life",
          zh: "生活",
        }),
        link: "/#life",
      },
      {
        name: t({
          en: "Blog",
          zh: "博客",
        }),
        link: "/blog",
      },
      {
        name: t({
          en: "Contact",
          zh: "联系",
        }),
        link: "/#contact",
      },
    ],
  },
} satisfies Dictionary;

export default navbarContent;
