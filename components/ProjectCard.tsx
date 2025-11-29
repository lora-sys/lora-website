'use client'

import Link from './Link'

interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="animate-fade-in-up transform overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="p-5">
        <div className="mb-3 flex items-center">
          {project.imgSrc ? (
            <img
              src={project.imgSrc}
              alt={project.title}
              className="h-10 w-10 rounded-lg object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-xl border-2 border-dashed bg-gray-200" />
          )}
          <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
            {project.title}
          </h3>
        </div>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">{project.description}</p>
        <Link
          href={project.href || '#'}
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 group inline-flex items-center text-sm font-medium transition-all duration-300"
        >
          View Project
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}
