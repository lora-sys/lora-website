'use client'

import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  y?: number
  className?: string
}

export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.5,
  y = 20,
  className = '',
}: FadeInProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useGSAP(
    () => {
      if (isMounted && ref.current) {
        gsap.fromTo(
          ref.current,
          {
            y: y,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: duration,
            delay: delay,
            ease: 'power2.out',
          }
        )
      }
    },
    { scope: ref, dependencies: [isMounted] }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface StaggerContainerProps {
  children: React.ReactNode
  stagger?: number
  delay?: number
  duration?: number
  className?: string
  triggerId?: string // Optional ID to use as scroll trigger if we add ScrollTrigger later
}

export const StaggerContainer = ({
  children,
  stagger = 0.1,
  delay = 0,
  duration = 0.5,
  className = '',
}: StaggerContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useGSAP(
    () => {
      if (isMounted && containerRef.current) {
        const elements = containerRef.current.children
        if (elements) {
          gsap.fromTo(
            elements,
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: duration,
              stagger: stagger,
              delay: delay,
              ease: 'power2.out',
            }
          )
        }
      }
    },
    { scope: containerRef, dependencies: [isMounted] }
  )

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
