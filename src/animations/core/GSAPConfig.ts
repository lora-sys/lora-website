import { gsap } from 'gsap';

/**
 * GSAP Global Configuration
 * Centralized animation settings for entire application
 */

gsap.config({
  force3D: true,
  targets: '.gsap-animated',
} as any);

/**
 * Animation Themes
 * Three levels of animation complexity
 */
export const animationThemes = {
  // Level 1: Minimal animations (low-end devices, battery saver)
  minimal: {
    duration: {
      instant: 0.1,
      fast: 0.15,
      normal: 0.2,
      slow: 0.3,
      verySlow: 0.5,
    },
    stagger: 0.05,
    ease: 'power1.out' as const,
    
    // Disable resource-intensive animations
    noRotation: true,
    noParallax: true,
    noParticles: true,
  },
  
  // Level 2: Balanced animations (default, recommended)
  balanced: {
    duration: {
      instant: 0.15,
      fast: 0.2,
      normal: 0.3,
      slow: 0.4,
      verySlow: 0.6,
    },
    stagger: 0.08,
    ease: 'power2.inOut' as const,
    
    // Enable some features
    enableRotation: true,
    enableParallax: true,
    particleDensity: 'medium',
  },
  
  // Level 3: Rich animations (high-end devices, "wow" factor)
  rich: {
    duration: {
      instant: 0.2,
      fast: 0.3,
      normal: 0.4,
      slow: 0.6,
      verySlow: 0.8,
    },
    stagger: 0.12,
    ease: 'back.out(1.7)' as const,
    
    // All features enabled
    enableRotation: true,
    enableParallax: true,
    particleDensity: 'high',
    enable3D: true,
  },
} as const;

/**
 * Performance Modes
 */
export const performanceMode = {
  quality: {
    willChange: true,
    layoutAware: true,
    gpuAcceleration: true,
  },
  balanced: {
    willChange: true,
    layoutAware: false,
    gpuAcceleration: true,
  },
  performance: {
    willChange: true,
    layoutAware: false,
    gpuAcceleration: true,
  },
} as const;

/**
 * Animation Presets
 * Reusable animation configurations for common use cases
 */
export const animationPresets = {
  // Hover effects
  hover: {
    subtle: {
      scale: 1.02,
      duration: 0.2,
      ease: 'power1.out' as const,
    },
    noticeable: {
      scale: 1.05,
      duration: 0.25,
      ease: 'power1.out' as const,
    },
    pop: {
      scale: 1.08,
      duration: 0.3,
      ease: 'back.out(1.7)' as const,
    },
  },
  
  // Entrance animations
  entrance: {
    fade: {
      opacity: { from: 0, to: 1 },
      duration: 0.4,
      ease: 'power2.out' as const,
    },
    slideUp: {
      y: { from: 30, to: 0 },
      opacity: { from: 0, to: 1 },
      duration: 0.5,
      ease: 'power2.out' as const,
    },
    scaleUp: {
      scale: { from: 0.8, to: 1 },
      opacity: { from: 0, to: 1 },
      duration: 0.5,
      ease: 'back.out(1.7)' as const,
    },
  },
  
  // Exit animations
  exit: {
    fade: {
      opacity: { from: 1, to: 0 },
      duration: 0.3,
      ease: 'power3.in' as const,
    },
    slideDown: {
      y: { from: 0, to: 30 },
      opacity: { from: 1, to: 0 },
      duration: 0.4,
      ease: 'power3.in' as const,
    },
    scaleDown: {
      scale: { from: 1, to: 0.8 },
      opacity: { from: 1, to: 0 },
      duration: 0.3,
      ease: 'power3.in' as const,
    },
  },
  
  // Special effects
  special: {
    pulse: {
      opacity: [0.5, 0.8, 0.5],
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut' as const,
    },
    shine: {
      backgroundPosition: ['0%', '100%', '0%'],
      duration: 2,
      repeat: -1,
      ease: 'linear' as const,
    },
    float: {
      y: -10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut' as const,
    },
  },
} as const;

/**
 * Get animation theme based on device performance
 */
export function getAnimationTheme() {
  if (typeof window === 'undefined') return animationThemes.balanced;
  
  const fps = (window as any).__GSAP_FPS || 60;
  const memory = (performance as any).memory?.limit || Infinity;
  
  if (fps < 30 || memory < 0.5) {
    return animationThemes.minimal;
  } else if (fps < 50 || memory < 0.7) {
    return animationThemes.balanced;
  } else {
    return animationThemes.rich;
  }
}

/**
 * Get animation duration based on theme
 */
export function getDuration(speed: keyof typeof animationThemes.minimal.duration) {
  const theme = getAnimationTheme();
  return theme.duration[speed];
}
