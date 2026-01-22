"use client"
import { useMemo, useRef, useState, useEffect } from "react"

interface Meteor {
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
  width: string;
}

function generateMeteors(count: number, seed: number): Meteor[] {
  const meteors: Meteor[] = []
  for (let i = 0; i < count; i++) {
    const width = Math.floor((seed * (i + 1) * 12345) % 100) + 50
    meteors.push({
      left: Math.floor((seed * (i + 1) * 9302) % 100) + "%",
      top: Math.floor((seed * (i + 1) * 49297) % 100) + "%",
      animationDelay: Math.floor((seed * (i + 1) * 37189) % 3) + "s",
      animationDuration: Math.floor((seed * (i + 1) * 12345) % 2) + 3 + "s",
      width: width + "px",
    })
  }
  return meteors
}

export function Meteors({ number = 20 }: { number?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const meteors = useMemo(() => generateMeteors(number, 12345), [number]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden [contain:strict]">
      {shouldRender && meteors.map((meteor, idx) => (
        <div
          key={idx}
          className="animate-meteor-effect absolute h-px rounded-full bg-gradient-to-r from-transparent via-primary/50 to-transparent will-change-transform transform-gpu"
          style={{
            left: meteor.left,
            top: meteor.top,
            width: meteor.width,
            animationDelay: meteor.animationDelay,
            animationDuration: meteor.animationDuration,
          }}
        />
      ))}
    </div>
  )
}