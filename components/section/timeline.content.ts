import { t, type Dictionary } from "intlayer";

const timelineContent = {
  key: "timeline",
  content: {
    title: t({
      en: "Hackathon Timeline",
      zh: "黑客松时间线",
    }),
    description: t({
      en: "A timeline recording my journey from registration to roadshow. Feel free to add more nodes and photos.",
      zh: "用时间线记录我从报名到路演的全过程，你可以随时添加更多节点和照片。",
    }),
    tags: t({
      en: ["Hackathon", "Award"],
      zh: ["黑客松", "获奖"],
    }),
    items: t({
      en: [
        {
          title: "2025-09-20 | Monad Blitz Hackathon",
          description: "Won 1st place at Monad Blitz Hackathon (Chengdu) with the 'Blockchain Certificate System'. Built on Monad testnet, the project ensures certificate authenticity through NFT and secure validation mechanisms.",
          links: [
            { href: "https://github.com/lora-sys/demo", label: "View Code (GitHub)" },
            { href: "https://www.xxpie.com/m/album?id=68cd19e6c4b884328e315ecd&source=SHARE_LINK", label: "Event Photos" },
          ],
        },
        {
          title: "Registration / Teaming",
          description: "Defining theme, roles, and MVP. Setting the goal to 'get it running' first.",
          link: { href: "/#projects", label: "View Related Projects" },
        },
        {
          title: "Sprint Development",
          description: "Rapid feature iteration: Prototype → Interaction → API integration → Bugfix. Visible progress every hour.",
          link: { href: "/blog", label: "Read Review Article" },
        },
        {
          title: "Roadshow / Review",
          description: "Telling the story: Problem, Solution, Highlights, Results. Organizing demo path and review notes.",
          link: { href: "https://github.com/lora-sys", label: "Open Demo / Code" },
        },
      ],
      zh: [
        {
          title: "2025-09-20 | Monad Blitz 黑客松",
          description: "参加 Monad Blitz 黑客松（成都站），凭借项目《区块链证书系统》荣获一等奖。该项目基于 Monad 测试网构建，通过 NFT 和安全验证机制确保证书真实性。",
          links: [
            { href: "https://github.com/lora-sys/demo", label: "查看代码 (GitHub)" },
            { href: "https://www.xxpie.com/m/album?id=68cd19e6c4b884328e315ecd&source=SHARE_LINK", label: "现场照片" },
          ],
        },
        {
          title: "报名 / 组队",
          description: "确定主题方向、组队分工、快速梳理 MVP。先把“能跑起来”的目标定清楚。",
          link: { href: "/#projects", label: "查看相关项目" },
        },
        {
          title: "冲刺开发",
          description: "快速迭代功能：原型 → 交互 → 接口联调 → Bugfix。每个小时都要有可见进展。",
          link: { href: "/blog", label: "读复盘文章" },
        },
        {
          title: "路演 / 复盘",
          description: "把故事讲清楚：问题、方案、亮点、结果。最后整理 demo 路径和复盘笔记。",
          link: { href: "https://github.com/lora-sys", label: "打开 Demo / 代码" },
        },
      ],
    }),
  },
} satisfies Dictionary;

export default timelineContent;
