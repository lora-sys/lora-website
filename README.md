# 🎨 Lora's Digital Studio

A modern digital portfolio and showcase website built with cutting-edge web technologies, featuring AI-powered capabilities and beautiful interactive UI components.

## ✨ Technology Stack

This project is built with modern web development technologies:

### 🎯 Core Framework
- **⚡ Next.js 16.1.1** - The React framework for production with App Router (Upgraded from 15.3.5)
- **📘 React 19.2.3** - Latest React for building user interfaces (Upgraded from 19.2.1)
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
- **📋 Input OTP** - One-time password input component

### 🔄 State Management & Data Fetching
- **🐻 Zustand** - Simple, scalable state management
- **🔄 TanStack Query** - Powerful data synchronization for React
- **🔄 TanStack Table** - Headless UI for building tables and datagrids
- **🔄 TanStack Virtual** - Virtual scrolling for large lists

### 🎨 Advanced UI Features
- **📊 Recharts** - Redefined chart library built with React and D3
- **🖱️ DND Kit** - Modern drag and drop toolkit for React
- **📋 React Resizable Panels** - Resizable panel components
- **📅 React Day Picker** - Date picker component
- **🌈 React Markdown** - Markdown rendering
- **💡 React Syntax Highlighter** - Code syntax highlighting

### 📦 Markdown & Content
- **📝 MDX** - Markdown with JSX support
- **📝 next-mdx-remote** - Remote MDX compilation (configured with plugins for Next.js 16 compatibility)
- **📝 @mdx-js/loader** - MDX loader for Webpack
- **📝 @mdx-js/react** - React components for MDX
- **📝 @mdxeditor/editor** - MDX editor component
- **💡 Highlight.js** - Syntax highlighting
- **🔧 rehype-highlight** - Highlight code in MDX (configured in MDXContent component for Next.js 16)
- **🔧 rehype-slug** - Add slugs to headings
- **🔧 remark-gfm** - GitHub Flavored Markdown

### 🗄️ Backend & Authentication
- **🔐 NextAuth.js** - Authentication for Next.js
- **📦 next-pwa** - Progressive Web App support

### 🌍 Internationalization & Utilities
- **🌍 next-intl** - Internationalization library for Next.js
- **📅 date-fns** - Modern JavaScript date utility library
- **🪝 @reactuses/core** - Collection of essential React hooks

### 🤖 AI & Development SDK
- **🤖 z-ai-web-dev-sdk** - Z.ai Web Development SDK for AI capabilities

### 🖼️ Image Processing
- **🖼️ Sharp** - High performance image processing

## 🎯 Why Lora's Digital Studio?

- **🏎️ Fast Development** - Pre-configured tooling and best practices
- **🎨 Beautiful UI** - Complete shadcn/ui component library with advanced interactions
- **🔒 Type Safety** - Full TypeScript configuration with Zod validation
- **📱 Responsive** - Mobile-first design principles with smooth animations
- **🎨 Bento Grid Layout** - Modern grid-based portfolio presentation
- **📝 MDX Blog** - File-based blog powered by MDX
- **🤖 AI-Powered Skills** - Integrated AI capabilities for content generation, image creation, and more
- **🌍 i18n Ready** - Multi-language support with next-intl
- **🚀 Production Ready** - Optimized build and deployment settings

## 🤖 AI Skills

This project includes a comprehensive set of AI-powered skills in the `skills/` directory:

### 🎤 ASR (Speech to Text)
- Transcribe audio files to text using AI
- Support for various audio formats (WAV, MP3, M4A, FLAC, OGG)
- Base64 audio processing
- Batch transcription capabilities

### 🗣️ TTS (Text to Speech)
- Convert text to natural-sounding speech
- Multiple voice options
- Real-time text-to-speech generation

### 💬 LLM (Large Language Model)
- Chat completions and conversational AI
- Multi-turn conversations with context management
- Custom system prompts
- Content generation, code assistance, and more

### 👁️ VLM (Vision Language Model)
- Image understanding and analysis
- Visual question answering
- Image description and captioning

### 🎨 Image Generation
- Create images from text descriptions
- Multiple image sizes (1024x1024, 1344x768, 768x1344, etc.)
- Batch image generation
- Website asset generation

### 🎬 Video Generation
- Generate videos from text prompts
- AI-powered video creation

### 📖 Web Reader
- Extract and analyze web content
- Read and process web pages

### 🔍 Web Search
- Search the web programmatically
- Real-time web data retrieval

### 📄 PDF Processing
- PDF form field detection and filling
- PDF to image conversion
- Bounding box validation
- Form field information extraction

### 📊 DOCX Processing
- Create and manipulate Word documents
- Template-based document generation
- OOXML manipulation

### 📊 PPTX Processing
- Create PowerPoint presentations
- HTML to PPTX conversion
- Template-based presentation generation

### 📊 XLSX Processing
- Excel spreadsheet manipulation
- Formula recalculation

### 🎨 Canvas Design
- Create beautiful visual art
- Generate posters and design assets
- Custom typography and layouts

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
│   ├── logo.svg           # Site logo
│   └── manifest.json      # PWA manifest
├── skills/                 # AI-powered skills
│   ├── ASR/               # Speech to text
│   ├── LLM/               # Large language model
│   ├── TTS/               # Text to speech
│   ├── VLM/               # Vision language model
│   ├── image-generation/  # AI image generation
│   ├── video-generation/  # AI video generation
│   ├── web-reader/        # Web content reader
│   ├── web-search/        # Web search
│   ├── pdf/               # PDF processing
│   ├── docx/              # DOCX processing
│   ├── pptx/              # PPTX processing
│   ├── xlsx/              # XLSX processing
│   └── canvas-design/     # Visual design
├── src/                    # Source code
│   ├── app/               # Next.js App Router
│   │   ├── @modal/       # Modal routes
│   │   ├── api/          # API routes
│   │   ├── blog/         # Blog pages
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # React components
│   │   ├── analytics/    # Analytics components
│   │   ├── bento/       # Bento grid components
│   │   ├── blog/        # Blog components
│   │   ├── mdx/         # MDX components
│   │   ├── orbit/       # Orbit animation
│   │   ├── providers/   # Context providers
│   │   └── ui/          # shadcn/ui components
│   ├── config/          # Configuration files
│   │   └── site-config.ts  # Site configuration
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utility functions
├── Caddyfile            # Caddy configuration
├── components.json      # shadcn/ui configuration
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 🎨 Available Features & Components

### 🧩 UI Components (shadcn/ui)
- **Layout**: Card, Separator, Aspect Ratio, Resizable Panels, Sheet
- **Forms**: Input, Textarea, Select, Checkbox, Radio Group, Switch, Input OTP
- **Feedback**: Alert, Toast (Sonner), Progress, Skeleton
- **Navigation**: Breadcrumb, Menubar, Navigation Menu, Pagination
- **Overlay**: Dialog, Sheet, Popover, Tooltip, Hover Card
- **Data Display**: Badge, Avatar, Calendar
- **Typography**: Blockquote

### 📊 Advanced Data Features
- **Tables**: Powerful data tables with sorting, filtering, pagination (TanStack Table)
- **Charts**: Beautiful visualizations with Recharts
- **Forms**: Type-safe forms with React Hook Form + Zod validation
- **Virtual Scrolling**: Efficient rendering of large lists (TanStack Virtual)

### 🎨 Interactive Features
- **Animations**: Smooth micro-interactions with Framer Motion
- **Drag & Drop**: Modern drag-and-drop functionality with DND Kit
- **Theme Switching**: Built-in dark/light mode support
- **Carousels**: Embla Carousel for image/content sliders
- **Bento Grid**: Modern grid layout for portfolio items
- **Orbit Animation**: Unique orbit animation component

### 🔐 Backend Integration
- **📝 MDX Content** - File-based content management with MDX
- **📁 File-based CMS** - Blog and content powered by MDX files
- **🔐 Authentication** - NextAuth.js for secure authentication
- **API Client**: HTTP requests with Fetch + TanStack Query
- **State Management**: Simple and scalable with Zustand

### 🌍 Production Features
- **Internationalization**: Multi-language support with next-intl
- **Image Optimization**: Automatic image processing with Sharp
- **Type Safety**: End-to-end TypeScript with Zod validation
- **PWA Support**: Progressive Web App capabilities with next-pwa
- **Essential Hooks**: Useful React hooks with @reactuses/core

### 🎨 Content Features
- **Blog**: MDX-powered blog with syntax highlighting
- **Blog Modal**: Modal-based blog reading experience
- **MDX Components**: Custom components for MDX rendering
- **Code Highlighting**: Syntax highlighting for code blocks

### 🔄 Next.js 16 Upgrade (January 2026)
**Successfully upgraded from Next.js 15.3.5 to Next.js 16.1.1**

#### Key Changes:
- ✅ **Core Framework**: Next.js 15.3.5 → 16.1.1
- ✅ **React Version**: 19.2.1 → 19.2.3
- ✅ **Type Definitions**: @types/react 19 → 19.2.7, @types/react-dom 19 → 19.2.3
- ✅ **Turbopack**: Now default in Next.js 16 (no flags needed)
- ✅ **ESLint Configuration**: Removed from `next.config.ts`, migrated to standalone ESLint v9

#### MDX Configuration Fixed:
- ✅ **rehype-highlight**: Configured for code syntax highlighting
- ✅ **rehype-slug**: Added automatic heading anchors
- ✅ **remark-gfm**: GitHub Flavored Markdown support (tables, task lists, strikethrough)
- ✅ **globals.css**: Updated to support both `.hljs-*` and `.language-*` class names

#### Migration Notes:
- **Breaking Change**: Next.js 16 uses Turbopack by default, which requires serializable configuration options
- **Solution**: MDX plugins configured in `MDXContent.tsx` component instead of `next.config.ts`
- **Result**: Full MDX functionality restored with syntax highlighting and GFM support

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

## 🤖 AI Skills Usage

Each skill in the `skills/` directory includes comprehensive documentation and example scripts:

1. **ASR**: Transcribe audio files to text
   ```bash
   # Use CLI
   z-ai asr --file ./audio.wav -o result.json
   ```

2. **LLM**: Generate text responses
   ```bash
   # Use CLI
   z-ai chat --prompt "What is the capital of France?"
   ```

3. **Image Generation**: Create images from text
   ```bash
   # Use CLI
   z-ai image --prompt "A beautiful landscape" --output "./image.png"
   ```

See individual `SKILL.md` files in each skill directory for detailed documentation and examples.

## 🎨 Frontend Design

The project includes a `frontend-design/` folder with:
- **Templates**: Global CSS styles and Tailwind configuration
- **Examples**: CSS and TypeScript examples for common patterns
- **Optimization**: Performance optimization guidelines

## 📝 Development Scripts

```bash
# Development
bun run dev              # Start development server on port 3000

# Build & Production
bun run build            # Build for production
bun start               # Start production server

# Code Quality
bun run lint            # Run ESLint

# Database (Prisma)
bun run db:push         # Push schema changes
bun run db:generate     # Generate Prisma client
bun run db:migrate      # Run migrations
bun run db:reset        # Reset database
```

## 🌟 Key Features

- **🎨 Modern Design**: Sleek, modern UI with dark mode support
- **📱 Responsive**: Mobile-first responsive design
- **⚡ Fast Performance**: Optimized with Next.js 15 and React 19
- **🔒 Type Safe**: Full TypeScript coverage
- **🎯 Component Library**: Comprehensive shadcn/ui components
- **📝 MDX Blog**: Blog with rich content and syntax highlighting
- **🤖 AI Integration**: Multiple AI-powered capabilities
- **🔐 Authentication**: NextAuth.js for secure auth
- **🌍 i18n Support**: Multi-language ready
- **📊 Analytics**: Web vitals tracking
- **🔔 Notifications**: Toast notifications with Sonner
- **🎨 Animations**: Smooth animations with Framer Motion
- **🎨 Bento Grid**: Modern portfolio grid layout
- **🌊 Orbit Animation**: Unique orbital animation
- **💎 Glass Effect**: Beautiful glassmorphism UI elements

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ for the digital creator community. Showcasing the power of modern web technologies and AI integration.
