import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-xl border-2 border-dashed bg-gray-200" />
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {siteMetadata.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Software Development Blog
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <div className="mb-4 flex space-x-4">
                <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
                <SocialIcon kind="github" href={siteMetadata.github} size={6} />
                <SocialIcon kind="x" href={siteMetadata.x} size={6} />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} {siteMetadata.author}. All rights reserved.
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8 text-center dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Built with{' '}
              <Link
                href="https://nextjs.org/"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              >
                Next.js
              </Link>{' '}
              and{' '}
              <Link
                href="https://tailwindcss.com/"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              >
                Tailwind CSS
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
