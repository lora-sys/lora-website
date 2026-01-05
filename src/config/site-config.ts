// Lora's Digital Studio - Site Configuration
// This is the single source of truth for all Lora's data

export interface ContactInfo {
  email: string;
  location: string;
  available: boolean;
}

export interface Skill {
  name: string;
  level: number; // 1-5
  category: 'frontend' | 'backend' | 'design' | 'other';
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  size: 'sm' | 'md' | 'lg';
  category: 'blog' | 'project' | 'showcase';
  image?: string;
  tags: string[];
  link?: string;
  blogSlug?: string;
  date?: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  period: string;
  description: string[];
}

export const siteConfig = {
  // Basic Info
  name: 'Lora',
  tagline: 'Digital Studio',
  description: 'A digital space where creativity meets technology. Building beautiful experiences with code and design.',
  url: 'https://lora.studio',

  // Contact Information
  contact: {
    email: 'hello@lora.studio',
    location: 'San Francisco, CA',
    available: true
  } as ContactInfo,

  // Social Icons (Lucide icons)
  socialIcons: [
    { platform: 'GitHub', url: 'https://github.com/lora', icon: 'Github' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/lora', icon: 'Linkedin' },
    { platform: 'Twitter', url: 'https://twitter.com/lora', icon: 'Twitter' }
  ],

  // Skills
  skills: [
    { name: 'TypeScript', level: 5, category: 'frontend', icon: 'Code' },
    { name: 'React', level: 5, category: 'frontend', icon: 'Atom' },
    { name: 'Next.js', level: 5, category: 'frontend', icon: 'Cpu' },
    { name: 'Node.js', level: 4, category: 'backend', icon: 'Server' },
    { name: 'Prisma', level: 4, category: 'backend', icon: 'Database' },
    { name: 'Framer Motion', level: 5, category: 'design', icon: 'Sparkles' },
    { name: 'Tailwind CSS', level: 5, category: 'design', icon: 'Palette' },
    { name: 'Figma', level: 4, category: 'design', icon: 'PenTool' },
    { name: 'WebGL', level: 3, category: 'other', icon: 'Box' },
    { name: 'Three.js', level: 3, category: 'other', icon: 'Cube' }
  ] as Skill[],

  // Work Experience
  work: [
    {
      company: 'Tech Startup',
      position: 'Senior Frontend Developer',
      period: '2022 - Present',
      description: [
        'Built and maintained the core product using Next.js 15 and TypeScript',
        'Implemented 3D visualizations and interactive UI components',
        'Mentored junior developers and established coding standards'
      ]
    },
    {
      company: 'Digital Agency',
      position: 'Frontend Developer',
      period: '2020 - 2022',
      description: [
        'Developed responsive websites for Fortune 500 clients',
        'Created reusable component libraries and design systems',
        'Optimized web performance achieving 90+ Lighthouse scores'
      ]
    }
  ] as WorkExperience[],

  // Projects (Bento Grid)
  projects: [
    {
      id: '1',
      title: 'The Art of UI',
      description: 'Exploring the intersection of design and code. A deep dive into creating beautiful user interfaces.',
      size: 'lg',
      category: 'blog',
      blogSlug: 'the-art-of-ui',
      date: '2024-01-15',
      tags: ['Design', 'UI/UX', 'Frontend']
    },
    {
      id: '2',
      title: 'Digital Nomad Journey',
      description: 'My experiences and lessons from 3 years of remote work across 10 countries.',
      size: 'md',
      category: 'blog',
      blogSlug: 'digital-nomad-journey',
      date: '2024-01-10',
      tags: ['Lifestyle', 'Travel', 'Remote Work']
    },
    {
      id: '3',
      title: 'Portfolio Website',
      description: 'A curated collection of creative work and personal projects with stunning animations.',
      size: 'md',
      category: 'showcase',
      link: '#portfolio',
      tags: ['Showcase', 'Design', 'Code']
    },
    {
      id: '4',
      title: 'E-Commerce Dashboard',
      description: 'Modern dashboard with real-time analytics and beautiful visualizations.',
      size: 'md',
      category: 'project',
      link: '#ecommerce',
      tags: ['Project', 'Dashboard', 'Analytics']
    },
    {
      id: '5',
      title: 'Tech Stack 2024',
      description: 'An overview of the technologies I use to build modern web applications.',
      size: 'md',
      category: 'blog',
      blogSlug: 'tech-stack-2024',
      date: '2024-01-05',
      tags: ['Technology', 'Tutorial']
    },
    {
      id: '6',
      title: 'Contact',
      description: 'Let\'s work together. Available for freelance projects and collaborations.',
      size: 'sm',
      category: 'showcase',
      link: '#contact',
      tags: ['Contact']
    }
  ] as Project[],

  // Theme Colors (as specified in specs)
  colors: {
    background: '#050505', // Deep Graphite
    foreground: '#FFFFFF', // Pure White
    accent: '#A855F7', // Purple Glow
    secondary: '#3B82F6' // Ice Blue
  },

  // Reading List
  reading: [
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Technical' },
    { title: 'Refactoring UI', author: 'Adam Wathan', category: 'Design' },
    { title: 'Design Systems', author: 'Alla Kholmatova', category: 'Design' },
    { title: 'Clean Code', author: 'Robert C. Martin', category: 'Technical' },
    { title: 'The Design of Everyday Things', author: 'Don Norman', category: 'Design' }
  ],

  // Stats
  stats: {
    projects: 50,
    articles: 30,
    years: 4,
    technologies: 20
  }
};
