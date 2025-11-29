interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Blog Platform',
    description: `A modern blog platform built with Next.js and Tailwind CSS. Features include dark mode, responsive design, and optimized performance.`,
    imgSrc: '/static/images/logo.png',
    href: 'https://github.com/lora-sys/lora-blog',
  },
  {
    title: 'Task Management App',
    description: `A full-stack task management application with real-time updates, user authentication, and collaborative features.`,
    imgSrc: '/static/images/ocean.jpeg',
    href: '#',
  },
  {
    title: 'API Development Toolkit',
    description: `A comprehensive toolkit for building and testing RESTful APIs with automated documentation and testing capabilities.`,
    imgSrc: '/static/images/github-traffic.png',
    href: '#',
  },
]

export default projectsData
