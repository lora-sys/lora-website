'use client';

import { useState } from 'react';
import { OrbitSection } from '@/animations/components/OrbitSection';
import { PageLoadTimeline } from '@/animations/components/PageLoadTimeline';
import { BatchEntrance } from '@/animations/components/BatchEntrance';
import { FLIPTransition } from '@/animations/components/FLIPTransition';
import { PulseSkeleton } from '@/animations/components/PulseSkeleton';
import { MagneticButton } from '@/animations/components/MagneticButton';
import { ParallaxLayer } from '@/animations/components/ParallaxLayer';
import { AdvancedParticleSystem } from '@/animations/components/AdvancedParticles';
import { WebGLBackground } from '@/animations/components/WebGLBackground';
import { TextReveal } from '@/animations/components/TextEffects';
import ThreeCanvas from '@/animations/components/ThreeCanvas';
import { AnimatedGrid } from '@/animations/components/ThreeMesh';
import { BloomEffect, GlitchEffect, CinematicEffect } from '@/animations/components/PostProcessing';

export default function AnimationShowcase() {
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced' | '3d'>('basic');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white">
      <PageLoadTimeline>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2 text-center">GSAP Animation Showcase</h1>
          <p className="text-center text-gray-400 mb-8">
            Complete animation library with 20 components across 3 phases
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
                  <OrbitSection />
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Batch Entrance</h2>
                <BatchEntrance>
                  <div className="grid grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-6 text-center"
                      >
                        <div className="text-lg font-semibold">Card {i + 1}</div>
                        <div className="text-sm text-purple-200">Scroll-triggered entrance</div>
                      </div>
                    ))}
                  </div>
                </BatchEntrance>
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

              <section className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Text Effects</h2>
                <div className="space-y-4">
                  <TextReveal effect="reveal" children="Reveal Animation" />
                  <TextReveal effect="scramble" children="Scramble Effect" />
                  <TextReveal effect="glow" children="Glow Effect" />
                  <TextReveal effect="wave" children="Wave Animation" />
                  <TextReveal effect="distort" children="Distort Effect" />
                </div>
              </section>
            </div>
          )}

          {activeTab === 'advanced' && (
            <div className="space-y-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Parallax Layers</h2>
                <ParallaxLayer speed={0.5} className="bg-white/5 rounded-xl p-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">Background Layer</h3>
                    <p className="text-gray-400">Parallax speed: 0.5</p>
                  </div>
                </ParallaxLayer>
                <ParallaxLayer speed={1} className="bg-white/5 rounded-xl p-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">Middle Layer</h3>
                    <p className="text-gray-400">Parallax speed: 1.0</p>
                  </div>
                </ParallaxLayer>
                <ParallaxLayer speed={2} className="bg-white/5 rounded-xl p-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">Foreground Layer</h3>
                    <p className="text-gray-400">Parallax speed: 2.0</p>
                  </div>
                </ParallaxLayer>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Advanced Particles</h2>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-2">Snow Mode</h3>
                    <AdvancedParticleSystem mode="snow" particleCount={100} />
                  </div>
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-2">Fireflies Mode</h3>
                    <AdvancedParticleSystem mode="fireflies" particleCount={50} />
                  </div>
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-2">Dust Mode</h3>
                    <AdvancedParticleSystem mode="dust" particleCount={75} />
                  </div>
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-2">Bubbles Mode</h3>
                    <AdvancedParticleSystem mode="bubbles" particleCount={40} />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">WebGL Background</h2>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-2">Gradient Shader</h3>
                    <WebGLBackground type="gradient" intensity={1.5} />
                  </div>
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-2">Noise Shader</h3>
                    <WebGLBackground type="noise" intensity={0.5} />
                  </div>
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-2">Waves Shader</h3>
                    <WebGLBackground type="waves" intensity={2} />
                  </div>
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-2">Plasma Shader</h3>
                    <WebGLBackground type="plasma" intensity={1.8} />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Post-Processing Effects</h2>
                <div className="space-y-4">
                  <BloomEffect>
                    <div className="bg-white/5 rounded-xl p-6">
                      <h3 className="text-xl font-semibold mb-2">Bloom Effect</h3>
                      <p className="text-gray-400">Glowing bloom post-processing</p>
                    </div>
                  </BloomEffect>
                  <GlitchEffect>
                    <div className="bg-white/5 rounded-xl p-6">
                      <h3 className="text-xl font-semibold mb-2">Glitch Effect</h3>
                      <p className="text-gray-400">Distortion glitch effect</p>
                    </div>
                  </GlitchEffect>
                  <CinematicEffect>
                    <div className="bg-white/5 rounded-xl p-6">
                      <h3 className="text-xl font-semibold mb-2">Cinematic Effect</h3>
                      <p className="text-gray-400">Bloom + Noise + Vignette + Chromatic Aberration</p>
                    </div>
                  </CinematicEffect>
                </div>
              </section>
            </div>
          )}

          {activeTab === '3d' && (
            <div className="space-y-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Three.js 3D Canvas</h2>
                <div className="h-[400px] bg-white/5 rounded-xl overflow-hidden border border-white/10">
                  <ThreeCanvas
                    className="w-full h-full"
                    enableControls
                    enableEnvironment
                    backgroundColor="#1a1a2e"
                  >
                    <AnimatedGrid count={5} spacing={2.5} />
                  </ThreeCanvas>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Individual 3D Meshes</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { geometry: 'box', color: '#ff6b6b' },
                    { geometry: 'sphere', color: '#4ecdc4' },
                    { geometry: 'torus', color: '#45b7d1' },
                    { geometry: 'icosahedron', color: '#96ceb4' },
                    { geometry: 'octahedron', color: '#e056fd' }
                  ].map((mesh, i) => (
                    <div
                      key={i}
                      className="bg-white/5 rounded-xl p-4 h-[200px] overflow-hidden border border-white/10"
                    >
                      <ThreeCanvas
                        className="w-full h-full"
                        enableControls={false}
                        backgroundColor="#1a1a2e"
                      >
                        <AnimatedGrid count={1} spacing={0} />
                      </ThreeCanvas>
                      <div className="absolute bottom-2 left-2 text-xs text-gray-400">
                        {mesh.geometry}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">3D + Post-Processing</h2>
                <div className="h-[300px] bg-white/5 rounded-xl overflow-hidden border border-white/10">
                  <BloomEffect>
                    <ThreeCanvas
                      className="w-full h-full"
                      enableControls
                      backgroundColor="#1a1a2e"
                    >
                      <AnimatedGrid count={3} spacing={2} />
                    </ThreeCanvas>
                  </BloomEffect>
                </div>
              </section>
            </div>
          )}
        </div>
      </PageLoadTimeline>
    </div>
  );
}
