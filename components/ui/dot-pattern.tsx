"use client"

import React, { useEffect, useId, useRef, useState, useMemo } from "react"
import { motion, useInView } from "motion/react"

import { cn } from "@/lib/utils"

interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  x?: number
  y?: number
  cx?: number
  cy?: number
  cr?: number
  className?: string
  glow?: boolean
  sparse?: boolean
  [key: string]: unknown
}

export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = false,
  sparse = false,
  ...props
}: DotPatternProps) {
  const id = useId()
  const containerRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const isInView = useInView(containerRef, { once: true, margin: "100px" })
  const patternId = useMemo(() => `${id}-pattern`, [id])

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  if (!isInView || dimensions.width === 0 || dimensions.height === 0) {
    return null
  }

  const spacing = sparse ? Math.max(width, height) * 3 : Math.max(width, height)

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-neutral-400/80",
        className
      )}
      {...props}
    >
      <defs>
        <radialGradient id={`${id}-gradient`}>
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <pattern
          id={patternId}
          x={x}
          y={y}
          width={spacing}
          height={spacing}
          patternUnits="userSpaceOnUse"
        >
          <motion.circle
            cx={cx}
            cy={cy}
            r={cr}
            fill={glow ? `url(#${id}-gradient)` : "currentColor"}
            initial={glow ? { opacity: 0.4, scale: 1 } : {}}
            animate={
              glow
                ? {
                    opacity: [0.4, 1, 0.4],
                    scale: [1, 1.5, 1],
                  }
                : {}
            }
            transition={
              glow
                ? {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }
                : {}
            }
          />
        </pattern>
      </defs>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill={`url(#${patternId})`}
      />
    </svg>
  )
}
