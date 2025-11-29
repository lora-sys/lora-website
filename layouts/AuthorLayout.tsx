import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import GithubContributionGraph from '@/components/GithubContributionGraph'
import Timeline from '@/components/Timeline'
import timelineData from '@/data/timelineData'
import { FadeIn } from '@/components/GsapWrapper'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            About
          </h1>
        </div>
        <div className="space-y-2 xl:grid xl:grid-cols-3 xl:items-start xl:space-y-0 xl:gap-x-8">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )}
            <h3 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="x" href={twitter} />
              <SocialIcon kind="bluesky" href={bluesky} />
            </div>
            <div className="w-full pt-8">
              <GithubContributionGraph />
            </div>
          </div>
          <FadeIn
            delay={0.4}
            y={30}
            className="prose dark:prose-invert max-w-none pt-8 pb-8 xl:col-span-2"
          >
            {children}

            {/* Timeline Section */}
            <div className="not-prose mt-12">
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">My Journey</h2>
              <Timeline events={timelineData} />
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  )
}
