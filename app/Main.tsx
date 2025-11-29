import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import TypewriterTitle from '@/components/TypewriterTitle'
import projectsData from '@/data/projectsData'
import ProjectCard from '@/components/ProjectCard'

// 定义技能标签数组
const skills = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Python',
  'Tailwind CSS',
  'HTML/CSS',
  'Git',
  'RESTful APIs',
  'MongoDB',
  'PostgreSQL',
  'Docker',
  'AWS',
  'CI/CD',
  'Testing',
  'Agile',
  'UI/UX',
  'Responsive Design',
  'Performance Optimization',
]

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      {/* 背景装饰元素 */}
      <div className="pointer-events-none absolute top-0 left-0 -z-10 h-full w-full overflow-hidden opacity-5 dark:opacity-10">
        <div className="from-primary-500 to-primary-300 absolute top-20 right-10 h-64 w-64 rounded-full bg-gradient-to-br opacity-20 blur-3xl filter"></div>
        <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-gradient-to-tr from-blue-400 to-cyan-300 opacity-20 blur-3xl filter"></div>
      </div>

      <div className="animate-fade-in divide-y divide-gray-200 dark:divide-gray-700">
        <div className="animate-slide-up space-y-2 pt-6 pb-8 md:space-y-5">
          <div className="animate-fade-in-down">
            <TypewriterTitle />
          </div>
          <p className="animate-fade-in-up font-sans text-lg leading-7 text-gray-500 delay-100 dark:text-gray-400">
            Welcome to my digital space where I share my journey in software development
          </p>

          {/* 技能标签云 */}
          <div className="animate-fade-in-up pt-6 delay-200">
            <h2 className="pb-4 text-xl font-bold text-gray-900 dark:text-gray-100">My Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={skill}
                  className="animate-pulse rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 transition-all duration-300 hover:scale-110 hover:animate-none hover:shadow-md dark:bg-gray-800 dark:text-gray-200"
                  style={{
                    fontSize: `${0.8 + (index % 5) * 0.1}rem`,
                    animationDelay: `${index * 0.1}s`,
                    animationDuration: '2s',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="animate-fade-in-up flex flex-wrap gap-4 pt-6 delay-300">
            <Link
              href={siteMetadata.github}
              className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 transition-all duration-300 hover:scale-105 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              GitHub Profile
            </Link>
            <Link
              href={siteMetadata.x}
              className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 transition-all duration-300 hover:scale-105 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Follow on X
            </Link>
          </div>
        </div>

        {/* 项目展示模块 */}
        <div className="animate-fade-in-up py-12 delay-400">
          <h2 className="animate-fade-in mb-6 border-b border-gray-200 pb-4 text-2xl font-bold text-gray-900 dark:border-gray-700 dark:text-gray-100">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projectsData.map((project, index) => (
              <div
                key={index}
                style={{
                  animationDelay: `${index * 0.1 + 0.5}s`,
                }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base leading-6 font-medium">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
