# GSAP Animation Library

Complete animation library with 23 components across 3 phases, built with GSAP for high performance and "克制优雅" (Restrained Elegance) animation style.

## Installation

```bash
npm install gsap @gsap/react
```

## Quick Start

```tsx
import { PageLoadTimeline } from '@/animations/components/PageLoadTimeline';
import { ScrollTriggerBatchEntrance } from '@/animations/components/BatchEntrance';
import { AnimationDashboard } from '@/animations/components/AnimationDashboard';
import { RouteTransitionProvider } from '@/animations/components/RouteTransition';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RouteTransitionProvider>
      <PageLoadTimeline>
        <ScrollTriggerBatchEntrance>
          {children}
        </ScrollTriggerBatchEntrance>
      </PageLoadTimeline>
      <AnimationDashboard />
    </RouteTransitionProvider>
  );
}
```

## Phase 1: Basic Animations

### OrbitSection
4-layer orbit animation with GPU acceleration.

```tsx
import { OrbitSection } from '@/animations/components/OrbitSection';

<OrbitSection />
```

### PageLoadTimeline
Global page entrance animation with 15-phase timeline.

```tsx
import { PageLoadTimeline } from '@/animations/components/PageLoadTimeline';

<PageLoadTimeline />
```

### BatchEntrance
Scroll-triggered batch entrance animations.

```tsx
import { ScrollTriggerBatchEntrance } from '@/animations/components/BatchEntrance';

<ScrollTriggerBatchEntrance>
  <div className="card">Card 1</div>
  <div className="card">Card 2</div>
  <div className="card">Card 3</div>
</ScrollTriggerBatchEntrance>
```

### SpringHover
Elastic hover effect with spring physics.

```tsx
import { SpringHover } from '@/animations/components/SpringHover';

<SpringHover hoverScale={1.02}>
  <div className="card">Hover me</div>
</SpringHover>
```

### MagneticLink
Magnetic attraction effect for links.

```tsx
import { MagneticLink } from '@/animations/components/MagneticLink';

<MagneticLink href="#about" strength={0.4}>
  About
</MagneticLink>
```

### ElasticReveal
Scroll-triggered elastic reveal animation.

```tsx
import { ElasticReveal } from '@/animations/components/ElasticReveal';

<ElasticReveal direction="up">
  <h2>Section Title</h2>
  <p>Content that reveals with elastic bounce</p>
</ElasticReveal>
```

## Phase 2: Enhanced Animations

### FLIPTransition
FLIP (First, Last, Invert, Play) layout transitions.

```tsx
import { FLIPTransition } from '@/animations/components/FLIPTransition';

<FLIPTransition id="my-element" duration={0.4}>
  <div>Content that animates on layout change</div>
</FLIPTransition>
```

### RouteTransition
Route transition provider for smooth page navigation.

```tsx
import { RouteTransitionProvider } from '@/animations/components/RouteTransition';

<RouteTransitionProvider>
  {children}
</RouteTransitionProvider>
```

### PulseSkeleton
Pulse skeleton screens with 5 variants.

```tsx
import { PulseSkeleton } from '@/animations/components/PulseSkeleton';

<PulseSkeleton variant="text" lines={3} />
<PulseSkeleton variant="rectangular" />
<PulseSkeleton variant="circular" />
<PulseSkeleton variant="rounded" />
```

### AnimationDashboard
Real-time performance monitoring dashboard.

```tsx
import { AnimationDashboard } from '@/animations/components/AnimationDashboard';

<AnimationDashboard />
```

### GSAPGlassCard
GSAP-powered glass card component.

```tsx
import { GSAPGlassCard } from '@/animations/components/GSAPGlassCard';

<GSAPGlassCard className="project-card">
  <h3>Card Title</h3>
  <p>Card content</p>
</GSAPGlassCard>
```

## Phase 3: Advanced Animations

### MagneticButton
Magnetic button with ripple effects and elastic return.

```tsx
import { MagneticButton } from '@/animations/components/MagneticButton';

<MagneticButton onClick={() => {}} className="bg-purple-600 px-6 py-3">
  Magnetic Button
</MagneticButton>
```

### ParallaxLayer
Parallax scrolling layers with ScrollTrigger.

```tsx
import { ParallaxLayer } from '@/animations/components/ParallaxLayer';

<ParallaxLayer speed={0.5} className="bg-white/5 rounded-xl p-6">
  <div>Background Layer</div>
</ParallaxLayer>
```

### AdvancedParticleSystem
Canvas-based particle system with 4 modes.

```tsx
import { AdvancedParticleSystem } from '@/animations/components/AdvancedParticles';

<AdvancedParticleSystem mode="snow" particleCount={100} />
<AdvancedParticleSystem mode="fireflies" particleCount={50} />
<AdvancedParticleSystem mode="dust" particleCount={75} />
<AdvancedParticleSystem mode="bubbles" particleCount={40} />
```

### WebGLBackground
WebGL shader backgrounds with 4 effects.

```tsx
import { WebGLBackground } from '@/animations/components/WebGLBackground';

<WebGLBackground type="gradient" intensity={1.5} />
<WebGLBackground type="noise" intensity={0.5} />
<WebGLBackground type="waves" intensity={2} />
<WebGLBackground type="plasma" intensity={1.8} />
```

### TextReveal
Character-by-character text animations.

```tsx
import { TextReveal } from '@/animations/components/TextEffects';

<TextReveal effect="reveal" children="Reveal Animation" />
<TextReveal effect="scramble" children="Scramble Effect" />
<TextReveal effect="glow" children="Glow Effect" />
<TextReveal effect="wave" children="Wave Animation" />
<TextReveal effect="distort" children="Distort Effect" />
```

### ThreeCanvas & ThreeMesh

Interactive 3D scenes with React Three Fiber.

```tsx
import ThreeCanvas from '@/animations/components/ThreeCanvas';
import { AnimatedGrid, type MeshGeometry } from '@/animations/components/ThreeMesh';

<ThreeCanvas enableControls enableEnvironment>
  <AnimatedGrid count={5} spacing={2.5} />
</ThreeCanvas>

<AnimatedGrid
  count={1}
  spacing={0}
  position={[0, 0, 0]}
  color="#4a9eff"
  geometry="icosahedron"
/>
```

### PostProcessing Effects

Post-processing effects for Three.js scenes.

```tsx
import { BloomEffect, GlitchEffect, CinematicEffect } from '@/animations/components/PostProcessing';

<BloomEffect>
  <ThreeCanvas>{/* 3D content */}</ThreeCanvas>
</BloomEffect>

<GlitchEffect>
  <ThreeCanvas>{/* 3D content */}</ThreeCanvas>
</GlitchEffect>

<CinematicEffect>
  <ThreeCanvas>{/* 3D content */}</ThreeCanvas>
</CinematicEffect>
```

## Hooks

### useGSAPAnimation
Hook wrapper for GSAP animations.

```tsx
import { useGSAPAnimation } from '@/animations/hooks/useGSAPAnimation';

useGSAPAnimation(() => {
  gsap.to('.element', { opacity: 1, duration: 0.5 });
});
```

### useAnimationLevel
Device-adaptive animation level management.

```tsx
import { useAnimationLevel } from '@/animations/hooks/useAnimationLevel';

const { getAnimationLevel, getAnimationDuration } = useAnimationLevel();

// Returns: 'none' | 'minimal' | 'moderate' | 'full'
console.log(getAnimationLevel());

// Automatically scales duration based on device
const duration = getAnimationDuration(1); // May return 0, 0.5, 0.75, or 1
```

### useDeviceCapabilities
Device capability detection for performance optimization.

```tsx
import { useDeviceCapabilities } from '@/animations/hooks/useDeviceCapabilities';

const {
  isLowEnd,
  isMobile,
  hasTouch,
  prefersReducedMotion,
  networkType,
  cores,
  memory,
  gpuTier
} = useDeviceCapabilities();

// Automatically reduces animation intensity on low-end devices
if (isLowEnd) {
  // Use fewer particles, shorter durations, etc.
}
```

## Configuration

### GSAPConfig
Animation themes, presets, and performance modes.

```tsx
import { animationThemes, animationPresets, performanceModes } from '@/animations/core/GSAPConfig';

// Use predefined themes
const preset = animationPresets.elegant;

// Configure performance mode
const mode = performanceModes.balanced;
```

### AnimationManager
Central timeline manager for coordinated animations.

```tsx
import { AnimationManager } from '@/animations/core/AnimationManager';

const manager = AnimationManager.getInstance();
manager.createTimeline('hero');
manager.addToTimeline('hero', '.hero-element', { y: 0, opacity: 0 });
manager.playTimeline('hero');
```

## Animation Style

All animations follow the "克制优雅" (Restrained Elegance) philosophy:

- **Subtle**: Animations are smooth, not flashy
- **Professional**: Moderate speeds (0.3-0.6s for transitions)
- **Elegant**: Use `power2.out` and `elastic.out(1, 0.5)` easing
- **Purposeful**: Every animation serves a functional purpose (feedback, guidance, delight)

## Performance Best Practices

1. **GPU Acceleration**: All components use `force3D: true`, `willChange: 'transform'`
2. **Device Adaptation**: Low-end devices get 30-50% fewer particles
3. **ScrollTrigger**: Only animate visible elements
4. **Memory Management**: GSAP context cleanup in useEffect returns
5. **Reduced Motion**: Respects `prefers-reduced-motion` setting

## TypeScript Support

Full TypeScript support with exported interfaces for all components.

## Demo Page

Visit `/animation-showcase` to see all 20 components in action with interactive examples.

## Project Status

- **Phase 1**: ✅ 100% (7 components)
- **Phase 2**: ✅ 100% (6 components)
- **Phase 3**: ✅ 100% (7 components)
- **Total**: ✅ 100% (20 components)

## Dependencies

- `gsap@3.14.2` - Core animation library
- `@gsap/react@2.1.2` - React integration
- `@react-three/fiber@8.17.12` - React 3D rendering
- `@react-three/drei@10.7.7` - Three.js helpers
- `three@0.168.0` - 3D graphics library
- `@react-three/postprocessing@3.0.4` - Post-processing effects

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## License

MIT License - Feel free to use in your projects!

---

**Built with**: Next.js 16, TypeScript, Tailwind CSS, GSAP 3.14

**Animation Style**: 克制优雅 (Restrained Elegance)

**Project Completion**: 100% (20/20 components)
