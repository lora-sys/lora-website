'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import type { TimelineEvent } from '@/data/timelineData'

interface TimelineProps {
  events: TimelineEvent[]
}

const Timeline = ({ events }: TimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const items = timelineRef.current?.querySelectorAll('.timeline-item')
      if (items) {
        gsap.fromTo(
          items,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
        )
      }
    },
    { scope: timelineRef }
  )

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work':
        return 'bg-primary-500'
      case 'education':
        return 'bg-blue-500'
      case 'achievement':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div ref={timelineRef} className="relative">
      {/* Vertical line */}
      <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-200 dark:bg-gray-700" />

      <div className="space-y-8">
        {events.map((event, index) => (
          <div key={index} className="timeline-item relative pl-12">
            {/* Dot */}
            <div
              className={`absolute top-1.5 left-2 h-4 w-4 rounded-full ${getTypeColor(event.type)} ring-4 ring-white dark:ring-gray-950`}
            />

            {/* Content */}
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-2 flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{event.title}</h3>
                <span className="text-primary-500 text-sm font-semibold">{event.year}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{event.description}</p>
              <span
                className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium text-white capitalize ${getTypeColor(event.type)}`}
              >
                {event.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline
