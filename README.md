# Lora's Blog

Welcome to my personal blog! This is a modern, responsive blog built with Next.js and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, Tailwind CSS 4, and TypeScript
- **Responsive Design**: Works beautifully on all device sizes
- **Dark Mode**: Automatic dark/light theme based on system preference
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Cards support
- **Markdown Support**: Write posts in Markdown with MDX support
- **Syntax Highlighting**: Beautiful code snippets with Prism.js
- **Image Optimization**: Next.js Image component with optimized loading
- **Analytics Ready**: Integrated with Umami analytics (privacy-friendly)
- **Search Functionality**: Built-in search with kbar
- **Social Media Integration**: Easy sharing and social links
- **GSAP Animations**: Professional animations with GSAP (GreenSock)
- **Server-Side Rendering**: Optimized SSR with client-side animations

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework with hybrid static & server rendering
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Contentlayer](https://www.contentlayer.dev/) - Content management
- [MDX](https://mdxjs.com/) - Markdown with JSX
- [Prism.js](https://prismjs.com/) - Syntax highlighting
- [GSAP](https://gsap.com/) - Professional-grade animation library

## 🎨 Custom Features

### Homepage

- **Typewriter Effect**: Dynamic title with typing animation
- **Animated Skills Cloud**: Interactive skill tags with stagger animations
- **Enhanced Project Cards**:
  - Animated thumbnails with scale-in effects
  - Technology stack badges
  - Hover effects with smooth transitions
  - Optimized Next.js Image components

### About Page

- **Animated Profile Section**: Smooth fade-in animations for avatar and bio
- **GitHub Contribution Graph**: Real-time contribution visualization
- **Career Timeline**: Interactive timeline component with:
  - Work experience
  - Education milestones
  - Achievements and certifications
  - Animated entry reveals
  - Color-coded event types

### Architecture

- **Data-View Separation**: Skills and content data in separate files for easy maintenance
- **Reusable Animation Components**: `FadeIn`, `StaggerContainer`, `AnimatedImage`
- **Hydration-Safe Animations**: Proper SSR/client hydration handling
- **Performance Optimized**: Lazy loading, code splitting, optimized images

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/lora-sys/lora-website.git
   ```

2. Install dependencies (using Bun):

   ```bash
   bun install
   ```

3. Run the development server:

   ```bash
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Writing Blog Posts

Create new blog posts in the `data/blog/` directory using Markdown or MDX format.

## 📈 Analytics

The blog is ready for analytics integration with Umami. To enable:

1. Set up a free Umami account at [umami.is](https://umami.is)
2. Add your website to Umami dashboard
3. Set environment variables in `.env.local`:
   ```bash
   NEXT_UMAMI_ID=your-website-id
   NEXT_UMAMI_SCRIPT_URL=https://analytics.umami.is/script.js
   ```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Author

**Lora** - Software Engineer

- GitHub: [@lora-sys](https://github.com/lora-sys)
- Twitter: [@MierPiter33280](https://x.com/MierPiter33280)
