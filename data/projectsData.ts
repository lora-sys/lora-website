interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  techStack?: string[]
}

const projectsData: Project[] = [
  {
    title: 'Blog Platform',
    description: `A modern blog platform built with Next.js and Tailwind CSS. Features include dark mode, responsive design, and optimized performance.`,
    imgSrc: '/static/images/logo.png',
    href: 'https://github.com/lora-sys/lora-blog',
    techStack: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Vercel'],
  },
  {
    title: 'Task Management App',
    description: `A full-stack task management application with real-time updates, user authentication, and collaborative features.`,
    imgSrc: '/static/images/ocean.jpeg',
    href: '#',
    techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
  },
  {
    title: 'API Development Toolkit',
    description: `A comprehensive toolkit for building and testing RESTful APIs with automated documentation and testing capabilities.`,
    imgSrc: '/static/images/github-traffic.png',
    href: '#',
    techStack: ['Python', 'FastAPI', 'Docker', 'PostgreSQL'],
  },
]

export default projectsData
