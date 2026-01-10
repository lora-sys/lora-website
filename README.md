# 🎨 Lora's Digital Studio

A modern digital portfolio and showcase website built with cutting-edge web technologies, featuring AI-powered capabilities and beautiful interactive UI components.

## ✨ Technology Stack

This project is built with modern web development technologies:

### 🎯 Core Framework
- **⚡ Next.js 16.1.1** - The React framework for production with App Router
- **📘 React 19.2.3** - Latest React for building user interfaces
- **📘 TypeScript 5** - Type-safe JavaScript for better developer experience
- **🎨 Tailwind CSS 4** - Utility-first CSS framework for rapid UI development

### 🧩 UI Components & Styling
- **🧩 shadcn/ui** - High-quality, accessible components built on Radix UI
- **🎯 Lucide React** - Beautiful & consistent icon library
- **🌈 Framer Motion** - Production-ready motion library for React
- **🎨 Next Themes** - Perfect dark mode support
- **🎨 Embla Carousel** - Modern carousel component
- **📦 Vaul** - Drawer/sheet component
- **📝 Sonner** - Toast notification component

### 📋 Forms & Validation
- **🎣 React Hook Form** - Performant forms with easy validation
- **✅ Zod** - TypeScript-first schema validation

### 🔄 State Management
- **🐻 Zustand** - Simple, scalable state management

### 🎨 Advanced UI Features
- **📅 React Day Picker** - Date picker component
- **🌈 React Markdown** - Markdown rendering

### 📦 Markdown & Content
- **📝 MDX** - Markdown with JSX support
- **📝 next-mdx-remote** - Remote MDX compilation
- **📝 @mdx-js/loader** - MDX loader for Webpack
- **📝 @mdx-js/react** - React components for MDX
- **🔧 rehype-highlight** - Highlight code in MDX
- **🔧 rehype-slug** - Add slugs to headings
- **🔧 remark-gfm** - GitHub Flavored Markdown

### 🗄️ Backend & Utilities
- **📦 Resend** - Email sending for contact forms
- **🖼️ Sharp** - High performance image processing

## 🎯 Why Lora's Digital Studio?

- **🏎️ Fast Development** - Pre-configured tooling and best practices
- **🎨 Beautiful UI** - Curated shadcn/ui component library with advanced interactions
- **🔒 Type Safety** - Full TypeScript configuration with Zod validation
- **📱 Responsive** - Mobile-first design principles with smooth animations
- **🎨 Bento Grid Layout** - Modern grid-based portfolio presentation
- **📝 MDX Blog** - File-based blog powered by MDX
- **🚀 Production Ready** - Optimized build and deployment settings

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Start production server
bun start

# Run linter
bun run lint
```

Open [http://localhost:3000](http://localhost:3000) to see your application running.

## 📁 Project Structure

```
/
├── content/                 # Content files
│   └── blog/               # Blog posts in MDX format
├── public/                 # Static assets
│   ├── icons/             # App icons
│   └── logo.svg           # Site logo
├── src/                    # Source code
│   ├── app/               # Next.js App Router
│   │   ├── api/          # API routes
│   │   ├── blog/         # Blog pages
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # React components
│   │   ├── animations/   # GSAP animation components
│   │   ├── bento/        # Bento grid components
│   │   ├── blog/         # Blog components
│   │   ├── mdx/          # MDX components
│   │   ├── orbit/        # Orbit animation
│   │   ├── providers/    # Context providers
│   │   └── ui/           # shadcn/ui components
│   ├── config/           # Configuration files
│   │   └── site-config.ts  # Site configuration
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utility functions
├── components.json       # shadcn/ui configuration
├── next.config.ts        # Next.js configuration
└── tsconfig.json         # TypeScript configuration
```

## 🎨 Available Components

### 🧩 UI Components (shadcn/ui)
- **Core**: Button, Input, Badge, Label, Form, Calendar
- **Overlay**: Sheet, Drawer
- **Display**: Skeleton, Sonner, Toast, Toaster
- **Navigation**: Sidebar
- **Data Display**: Command

### 🎨 Animation Components
- **GSAP Animations**: MagneticLink, MagneticButton, MagneticCard, SpringHover, ElasticReveal, ProgressiveReveal
- **3D Effects**: WebGLBackground, ThreeCanvas, AdvancedParticles, OrbitSection
- **Page Transitions**: PageLoadTimeline, BatchEntrance, RouteTransition
- **Text Effects**: TextReveal, Typewriter, ParticleBackground

## 🔧 Configuration

### Site Configuration
All site configuration is centralized in `src/config/site-config.ts`, including:
- Basic site information
- Contact details
- Social media links
- Skills and experience
- Projects and work
- Theme colors
- Reading list
- Statistics

### Component Configuration
- **shadcn/ui**: Configured in `components.json`
- **Tailwind CSS**: Configured in `tailwind.config.ts`
- **TypeScript**: Configured in `tsconfig.json`
- **Next.js**: Configured in `next.config.ts`

## 🌟 Key Features

- **🎨 Modern Design**: Sleek, modern UI with dark mode support
- **📱 Responsive**: Mobile-first responsive design
- **⚡ Fast Performance**: Optimized with Next.js 16 and React 19
- **🔒 Type Safe**: Full TypeScript coverage
- **🎯 Component Library**: Curated shadcn/ui components
- **📝 MDX Blog**: Blog with rich content and syntax highlighting
- **🔔 Notifications**: Toast notifications with Sonner
- **🎨 Animations**: Smooth animations with GSAP and Framer Motion
- **🎨 Bento Grid**: Modern portfolio grid layout
- **🌊 Orbit Animation**: Unique orbital animation
- **💎 Glass Effect**: Beautiful glassmorphism UI elements

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ for the digital creator community. Showcasing the power of modern web technologies.
