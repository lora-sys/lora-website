'use client';

import { useState } from 'react';
import { OrbitSection } from '@/animations/components/OrbitSection';
import { PageLoadTimeline } from '@/animations/components/PageLoadTimeline';
import { PulseSkeleton } from '@/animations/components/PulseSkeleton';
import { MagneticButton } from '@/animations/components/MagneticButton';
import { SpringHover } from '@/animations/components/SpringHover';
import { MagneticLink } from '@/animations/components/MagneticLink';
import { ElasticReveal } from '@/animations/components/ElasticReveal';
import { HoverCard } from '@/animations/components/HoverCard';
import { MagneticCard } from '@/animations/components/MagneticCard';
import { ProgressiveReveal } from '@/animations/components/ProgressiveReveal';
import { TextReveal } from '@/animations/components/TextEffects';

export default function AnimationShowcase() {
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced' | '3d'>('basic');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white">
      <PageLoadTimeline>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2 text-center">GSAP Animation Showcase</h1>
          <p className="text-center text-gray-400 mb-8">
            Complete animation library with 26 components
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('basic')}
              className={`px-6 py-2 rounded-lg transition-all ${
                activeTab === 'basic' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              Basic
            </button>
            <button
              onClick={() => setActiveTab('advanced')}
              className={`px-6 py-2 rounded-lg transition-all ${
                activeTab === 'advanced'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              Advanced
            </button>
            <button
              onClick={() => setActiveTab('3d')}
              className={`px-6 py-2 rounded-lg transition-all ${
                activeTab === '3d'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              3D & WebGL
            </button>
          </div>

          {activeTab === 'basic' && (
            <div className="space-y-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Phase 1: Basic Animations</h2>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold mb-4">Orbit Section</h3>
                  <OrbitSection>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">4-layer orbit animation with particles</p>
                    </div>
                  </OrbitSection>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Pulse Skeleton</h2>
                <div className="space-y-4">
                  <PulseSkeleton variant="text" lines={3} />
                  <PulseSkeleton variant="rectangular" />
                  <PulseSkeleton variant="circular" />
                  <PulseSkeleton variant="rounded" />
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Spring Hover (NEW)</h2>
                <div className="grid grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SpringHover key={i} intensity="medium">
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-lg font-semibold mb-2">Card {i + 1}</h3>
                        <p className="text-sm text-gray-400">Hover to see spring effect</p>
                      </div>
                    </SpringHover>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Magnetic Link (NEW)</h2>
                <div className="flex gap-4 flex-wrap justify-center">
                  <MagneticLink href="#" strength="subtle" className="px-4 py-2 text-white">
                    Home
                  </MagneticLink>
                  <MagneticLink href="#" strength="medium" className="px-4 py-2 text-white">
                    About
                  </MagneticLink>
                  <MagneticLink href="#" strength="strong" className="px-4 py-2 text-white">
                    Projects
                  </MagneticLink>
                  <MagneticLink href="#" strength="medium" className="px-4 py-2 text-white">
                    Contact
                  </MagneticLink>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Elastic Reveal (NEW)</h2>
                <div className="space-y-4">
                  <ElasticReveal direction="up" delay={0.1}>
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold">Reveal from Bottom</h3>
                      <p className="text-gray-400">Scrolls up with elastic bounce</p>
                    </div>
                  </ElasticReveal>
                  <ElasticReveal direction="left" delay={0.2}>
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold">Reveal from Left</h3>
                      <p className="text-gray-400">Slides in from left with elasticity</p>
                    </div>
                  </ElasticReveal>
                  <ElasticReveal direction="right" delay={0.3}>
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold">Reveal from Right</h3>
                      <p className="text-gray-400">Slides in from right with bounce</p>
                    </div>
                  </ElasticReveal>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Advanced Cards (NEW)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <HoverCard intensity="subtle" tilt={{ enabled: true, intensity: 0.1, perspective: 1000 }} effects={{ glow: true, shadow: true }}>
                    <div className="glass-effect rounded-xl p-6 h-40 flex flex-col justify-center items-center border border-white/10">
                      <h3 className="text-xl font-semibold mb-2">Hover Card - Subtle</h3>
                      <p className="text-sm text-gray-400">3D tilt with subtle hover</p>
                    </div>
                  </HoverCard>
                  
                  <HoverCard intensity="medium" tilt={{ enabled: true, intensity: 0.15, perspective: 800 }} effects={{ glow: true, border: true }}>
                    <div className="glass-effect rounded-xl p-6 h-40 flex flex-col justify-center items-center border border-white/10">
                      <h3 className="text-xl font-semibold mb-2">Hover Card - Medium</h3>
                      <p className="text-sm text-gray-400">Stronger tilt with border</p>
                    </div>
                  </HoverCard>
                  
                  <MagneticCard strength="medium">
                    <div className="glass-effect rounded-xl p-6 h-40 flex flex-col justify-center items-center border border-white/10">
                      <h3 className="text-xl font-semibold mb-2">Magnetic Card</h3>
                      <p className="text-sm text-gray-400">Magnetic attraction effect</p>
                    </div>
                  </MagneticCard>
                  
                  <MagneticCard strength="strong" edgeBehavior="attract">
                    <div className="glass-effect rounded-xl p-6 h-40 flex flex-col justify-center items-center border border-white/10">
                      <h3 className="text-xl font-semibold mb-2">Magnetic - Strong</h3>
                      <p className="text-sm text-gray-400">Stronger magnetic force</p>
                    </div>
                  </MagneticCard>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Progressive Reveal (NEW)</h2>
                <ProgressiveReveal steps={3} stagger={0.2} direction="up">
                  <div className="space-y-4">
                    <div className="glass-effect rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold mb-2">Step 1 - Revealed</h3>
                      <p className="text-gray-400">First card reveals</p>
                    </div>
                    <div className="glass-effect rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold mb-2">Step 2 - Revealed</h3>
                      <p className="text-gray-400">Second card reveals</p>
                    </div>
                    <div className="glass-effect rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold mb-2">Step 3 - Revealed</h3>
                      <p className="text-gray-400">Third card reveals</p>
                    </div>
                  </div>
                </ProgressiveReveal>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Text Effects</h2>
                <div className="space-y-4">
                  <TextReveal direction="up">Reveal Animation - Up</TextReveal>
                  <TextReveal direction="left">Left Reveal Animation</TextReveal>
                  <TextReveal direction="right">Right Reveal Animation</TextReveal>
                  <TextReveal direction="fade">Fade Reveal Animation</TextReveal>
                  <TextReveal direction="down">Down Reveal Animation</TextReveal>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'advanced' && (
            <div className="space-y-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Magnetic Button</h2>
                <div className="flex gap-4 flex-wrap justify-center">
                  <MagneticButton onClick={() => {}} className="bg-purple-600 px-6 py-3">
                    Magnetic Button
                  </MagneticButton>
                  <MagneticButton onClick={() => {}} className="bg-blue-600 px-6 py-3">
                    With Ripple
                  </MagneticButton>
                  <MagneticButton onClick={() => {}} className="bg-green-600 px-6 py-3">
                    Elastic Return
                  </MagneticButton>
                </div>
              </section>
            </div>
          )}

          {activeTab === '3d' && (
            <div className="space-y-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">3D & WebGL Components</h2>
                <p className="text-gray-400">Three.js components available in the main app</p>
              </section>
            </div>
          )}
        </div>
      </PageLoadTimeline>
    </div>
  );
}
