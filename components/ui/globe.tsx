"use client"

import { useEffect, useRef } from "react"
import createGlobe, { COBEOptions } from "cobe"
import { useMotionValue, useSpring } from "motion/react"

import { cn } from "@/lib/utils"
import { useLazyAnimation } from "@/hooks/use-lazy-animation"

const MOVEMENT_DAMPING = 1400

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => { },
  devicePixelRatio: 1,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 5000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
  priority = false,
}: {
  className?: string
  config?: COBEOptions
  priority?: boolean
}) {
  let phi = 0
  let width = 0
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const globeInstance = useRef<ReturnType<typeof createGlobe> | null>(null)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const { ref, shouldRender } = useLazyAnimation({
    threshold: priority ? 0 : 0.1,
    rootMargin: priority ? "0px" : "300px",
  })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    if (!shouldRender || !canvasRef.current) return

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2 || 800,
      height: width * 2 || 800,
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.005
        state.phi = phi + rs.get()
        state.width = width * 2 || 800
        state.height = width * 2 || 800
      },
    })

    globeInstance.current = globe

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0)
    return () => {
      globe.destroy()
      globeInstance.current = null
      window.removeEventListener("resize", onResize)
    }
  }, [shouldRender, rs, config])

  if (!shouldRender) {
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={cn(
          "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
          className
        )}
      >
        <div className="w-full h-full animate-pulse bg-muted/30 rounded-lg" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size] will-change-transform"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}
