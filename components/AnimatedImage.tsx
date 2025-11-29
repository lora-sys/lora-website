'use client'

import { useRef, useState, useEffect } from 'react'
import Image from './Image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import type { ImageProps } from 'next/image'

interface AnimatedImageProps extends ImageProps {
  delay?: number
}

const AnimatedImage = ({ delay = 0, ...props }: AnimatedImageProps) => {
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
            scale: 0.8,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: delay,
            ease: 'back.out(1.2)',
          }
        )
      }
    },
    { scope: ref, dependencies: [isMounted] }
  )

  return (
    <div ref={ref}>
      <Image {...props} />
    </div>
  )
}

export default AnimatedImage
