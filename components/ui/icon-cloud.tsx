"use client"

import React, { useEffect, useRef, useState, useCallback, memo } from "react"
import { renderToString } from "react-dom/server"
import { useLazyAnimation } from "@/hooks/use-lazy-animation"

interface Icon {
  x: number
  y: number
  z: number
  scale: number
  opacity: number
  id: number
}

interface IconCloudProps {
  icons?: React.ReactNode[]
  images?: string[]
  priority?: boolean
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export const IconCloud = memo(function IconCloud({ icons, images, priority = false }: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [iconPositions, setIconPositions] = useState<Icon[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const rotationRef = useRef({ x: 0, y: 0 })
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([])
  const imagesLoadedRef = useRef<boolean[]>([])
  const animationFrameRef = useRef<number>(0)
  const svgCacheRef = useRef<Map<string, string>>(new Map())

  const targetRotationRef = useRef<{
    x: number
    y: number
    startX: number
    startY: number
    distance: number
    startTime: number
    duration: number
  } | null>(null)

  const isDraggingRef = useRef(false)
  const lastMousePosRef = useRef({ x: 0, y: 0 })
  const mousePosRef = useRef({ x: 0, y: 0 })

  const { ref, shouldRender } = useLazyAnimation({
    threshold: priority ? 0 : 0.1,
    rootMargin: priority ? "0px" : "200px",
  })

  const createIconCanvases = useCallback(() => {
    if (!icons && !images) return

    const items = icons || images || []
    imagesLoadedRef.current = new Array(items.length).fill(false)

    const newIconCanvases = items.map((item, index) => {
      const offscreen = document.createElement("canvas")
      offscreen.width = 40
      offscreen.height = 40
      const offCtx = offscreen.getContext("2d")

      if (offCtx) {
        if (images) {
          const img = new Image()
          img.src = items[index] as string
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
            offCtx.beginPath()
            offCtx.arc(20, 20, 20, 0, Math.PI * 2)
            offCtx.closePath()
            offCtx.clip()
            offCtx.drawImage(img, 0, 0, 40, 40)
            imagesLoadedRef.current[index] = true
          }
          img.onerror = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
            offCtx.beginPath()
            offCtx.arc(20, 20, 18, 0, Math.PI * 2)
            offCtx.fillStyle = "#4444ff"
            offCtx.fill()
            offCtx.fillStyle = "white"
            offCtx.font = "12px Arial"
            offCtx.textAlign = "center"
            offCtx.textBaseline = "middle"
            offCtx.fillText(`${index + 1}`, 20, 20)
            imagesLoadedRef.current[index] = true
          }
        } else {
          offCtx.scale(0.4, 0.4)
          const svgString = renderToString(item as React.ReactElement)
          
          let cachedSrc = svgCacheRef.current.get(svgString)
          if (!cachedSrc) {
            cachedSrc = "data:image/svg+xml;base64," + btoa(svgString)
            svgCacheRef.current.set(svgString, cachedSrc)
          }
          
          const img = new Image()
          img.src = cachedSrc
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
            offCtx.drawImage(img, 0, 0)
            imagesLoadedRef.current[index] = true
          }
        }
      }
      return offscreen
    })

    iconCanvasesRef.current = newIconCanvases
  }, [icons, images])

  const generateIconPositions = useCallback(() => {
    const items = icons || images || []
    const newIcons: Icon[] = []
    const numIcons = items.length || 20

    const offset = 2 / numIcons
    const increment = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2
      const r = Math.sqrt(1 - y * y)
      const phi = i * increment

      const x = Math.cos(phi) * r
      const z = Math.sin(phi) * r

      newIcons.push({
        x: x * 100,
        y: y * 100,
        z: z * 100,
        scale: 1,
        opacity: 1,
        id: i,
      })
    }
    setIconPositions(newIcons)
  }, [icons, images])

  useEffect(() => {
    if (!shouldRender) return
    createIconCanvases()
    generateIconPositions()
    setIsLoaded(true)
  }, [shouldRender, createIconCanvases, generateIconPositions])

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect || !canvasRef.current) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    iconPositions.forEach((icon) => {
      const cosX = Math.cos(rotationRef.current.x)
      const sinX = Math.sin(rotationRef.current.x)
      const cosY = Math.cos(rotationRef.current.y)
      const sinY = Math.sin(rotationRef.current.y)

      const rotatedX = icon.x * cosY - icon.z * sinY
      const rotatedZ = icon.x * sinY + icon.z * cosY
      const rotatedY = icon.y * cosX + rotatedZ * sinX

      const screenX = canvasRef.current!.width / 2 + rotatedX
      const screenY = canvasRef.current!.height / 2 + rotatedY

      const scale = (rotatedZ + 200) / 300
      const radius = 20 * scale
      const dx = x - screenX
      const dy = y - screenY

      if (dx * dx + dy * dy < radius * radius) {
        const targetX = -Math.atan2(icon.y, Math.sqrt(icon.x * icon.x + icon.z * icon.z))
        const targetY = Math.atan2(icon.x, icon.z)

        const currentX = rotationRef.current.x
        const currentY = rotationRef.current.y
        const distance = Math.sqrt(Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2))
        const duration = Math.min(2000, Math.max(800, distance * 1000))

        targetRotationRef.current = {
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          distance,
          startTime: performance.now(),
          duration,
        }
        return
      }
    })

    isDraggingRef.current = true
    lastMousePosRef.current = { x: e.clientX, y: e.clientY }
  }, [iconPositions])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      mousePosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    if (isDraggingRef.current) {
      const deltaX = e.clientX - lastMousePosRef.current.x
      const deltaY = e.clientY - lastMousePosRef.current.y

      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,
        y: rotationRef.current.y + deltaX * 0.002,
      }

      lastMousePosRef.current = { x: e.clientX, y: e.clientY }
    }
  }, [])

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false
  }, [])

  useEffect(() => {
    if (!shouldRender || !isLoaded) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)
      const dx = mousePosRef.current.x - centerX
      const dy = mousePosRef.current.y - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const speed = 0.003 + (distance / maxDistance) * 0.01

      if (targetRotationRef.current) {
        const elapsed = performance.now() - targetRotationRef.current.startTime
        const progress = Math.min(1, elapsed / targetRotationRef.current.duration)
        const easedProgress = easeOutCubic(progress)

        rotationRef.current = {
          x: targetRotationRef.current.startX + (targetRotationRef.current.x - targetRotationRef.current.startX) * easedProgress,
          y: targetRotationRef.current.startY + (targetRotationRef.current.y - targetRotationRef.current.startY) * easedProgress,
        }

        if (progress >= 1) {
          targetRotationRef.current = null
        }
      } else if (!isDraggingRef.current) {
        rotationRef.current = {
          x: rotationRef.current.x + (dy / canvas.height) * speed,
          y: rotationRef.current.y + (dx / canvas.width) * speed,
        }
      }

      iconPositions.forEach((icon, index) => {
        const cosX = Math.cos(rotationRef.current.x)
        const sinX = Math.sin(rotationRef.current.x)
        const cosY = Math.cos(rotationRef.current.y)
        const sinY = Math.sin(rotationRef.current.y)

        const rotatedX = icon.x * cosY - icon.z * sinY
        const rotatedZ = icon.x * sinY + icon.z * cosY
        const rotatedY = icon.y * cosX + rotatedZ * sinX

        const scale = (rotatedZ + 200) / 300
        const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 150) / 200))

        ctx.save()
        ctx.translate(canvas.width / 2 + rotatedX, canvas.height / 2 + rotatedY)
        ctx.scale(scale, scale)
        ctx.globalAlpha = opacity

        if (icons || images) {
          if (iconCanvasesRef.current[index] && imagesLoadedRef.current[index]) {
            ctx.drawImage(iconCanvasesRef.current[index], -20, -20, 40, 40)
          }
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, 20, 0, Math.PI * 2)
          ctx.fillStyle = "#4444ff"
          ctx.fill()
          ctx.fillStyle = "white"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.font = "16px Arial"
          ctx.fillText(`${icon.id + 1}`, 0, 0)
        }

        ctx.restore()
      })
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const handleVisibility = () => {
      if (document.hidden) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      } else {
        animate()
      }
    }

    document.addEventListener("visibilitychange", handleVisibility)
    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [shouldRender, isLoaded, iconPositions, icons, images])

  if (!shouldRender) {
    return (
      <div ref={ref as React.RefObject<HTMLDivElement>} className="relative z-10 scale-75 md:scale-100 min-h-[400px] flex items-center justify-center">
        <div className="w-[400px] h-[400px] animate-pulse bg-muted/30 rounded-lg" />
      </div>
    )
  }

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="rounded-lg will-change-transform"
      style={{ willChange: "transform" }}
      aria-label="Interactive 3D Icon Cloud"
      role="img"
    />
  )
})
