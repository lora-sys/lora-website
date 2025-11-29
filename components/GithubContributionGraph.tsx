import Link from '@/components/Link'

export default function GithubContributionGraph() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          GitHub Contribution Graph
        </h2>
        <Link
          href="https://github.com/lora-sys"
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
        >
          View Profile
        </Link>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">Recent contributions to GitHub</p>
      </div>

      {/* GitHub贡献图 - 使用GitHub提供的SVG */}
      <div className="flex justify-center">
        <img
          src="https://ghchart.rshah.org/lora-sys"
          alt="GitHub Contribution Graph"
          className="w-full rounded-md"
        />
      </div>
    </div>
  )
}
