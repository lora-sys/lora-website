import AnimatedImage from './AnimatedImage'
import Link from './Link'

interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  techStack?: string[]
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group animate-fade-in-up flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
      <div className="flex-grow p-5">
        <div className="mb-4 flex items-center gap-4">
          {project.imgSrc ? (
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
              <AnimatedImage
                src={project.imgSrc}
                alt={project.title}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-12 w-12 flex-shrink-0 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700" />
          )}
          <h3 className="text-xl leading-tight font-bold text-gray-900 dark:text-white">
            {project.title}
          </h3>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {project.description}
        </p>

        {project.techStack && (
          <div className="mb-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="bg-primary-50 text-primary-700 ring-primary-700/10 dark:bg-primary-400/10 dark:text-primary-400 dark:ring-primary-400/20 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
        <Link
          href={project.href || '#'}
          className="group/link text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 flex items-center justify-between text-sm font-semibold transition-colors"
          aria-label={`View project: ${project.title}`}
        >
          View Project
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
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
