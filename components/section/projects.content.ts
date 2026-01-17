import { t, type Dictionary } from "intlayer";

const projectsContent = {
  key: "projects",
  content: {
    title: t({
      en: "Featured Projects",
      zh: "精选项目",
    }),
    description: t({
      en: "Things I've built",
      zh: "我构建的一些成果",
    }),
    items: [
      {
        name: t({
          en: "AI Chat Agent",
          zh: "AI 聊天智能体",
        }),
        description: t({
          en: "LLM-powered conversational agent with memory and context awareness",
          zh: "具有记忆和上下文感知能力的 LLM 驱动型对话代理",
        }),
        cta: t({
          en: "View Project",
          zh: "查看项目",
        }),
      },
      {
        name: t({
          en: "E-commerce API",
          zh: "电子商务 API",
        }),
        description: t({
          en: "Full-stack e-commerce backend with payment integration",
          zh: "具有支付集成功能的全栈电子商务后端",
        }),
        cta: t({
          en: "View Project",
          zh: "查看项目",
        }),
      },
      {
        name: t({
          en: "Analytics Dashboard",
          zh: "分析仪表板",
        }),
        description: t({
          en: "Real-time data visualization and analytics platform",
          zh: "实时数据可视化和分析平台",
        }),
        cta: t({
          en: "View Project",
          zh: "查看项目",
        }),
      },
      {
        name: t({
          en: "Mobile Flashcards",
          zh: "移动端闪卡应用",
        }),
        description: t({
          en: "Cross-platform flashcard app with spaced repetition",
          zh: "具有间隔重复功能的跨平台闪卡应用",
        }),
        cta: t({
          en: "View Project",
          zh: "查看项目",
        }),
      },
      {
        name: t({
          en: "Dev Tools CLI",
          zh: "开发工具命令行",
        }),
        description: t({
          en: "Developer productivity CLI with multiple utilities",
          zh: "具有多种实用程序的开发人员效率命令行工具",
        }),
        cta: t({
          en: "View Project",
          zh: "查看项目",
        }),
      },
    ],
  },
} satisfies Dictionary;

export default projectsContent;
