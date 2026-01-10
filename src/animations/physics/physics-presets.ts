/**
 * Physics Animation Presets
 * Unified configuration system for physics animations
 */

export type HoverIntensity = 'subtle' | 'medium' | 'strong' | 'aggressive';

export type MagneticStrength = 'subtle' | 'medium' | 'strong';

export type RevealMode = 'elastic' | 'smooth' | 'fade';

export type EasingPreset = 'gentle' | 'elastic' | 'bouncy' | 'smooth' | 'snappy';

export const HOVER_PRESETS: Record<HoverIntensity, {
  scale: number;
  duration: number;
  ease: string;
}> = {
  subtle: {
    scale: 1.01,
    duration: 0.3,
    ease: 'elastic.out(1, 0.5)'
  },
  medium: {
    scale: 1.02,
    duration: 0.4,
    ease: 'elastic.out(1, 0.5)'
  },
  strong: {
    scale: 1.04,
    duration: 0.45,
    ease: 'elastic.out(1, 0.4)'
  },
  aggressive: {
    scale: 1.06,
    duration: 0.5,
    ease: 'elastic.out(1, 0.3)'
  }
};

export const MAGNETIC_PRESETS: Record<MagneticStrength, {
  strength: number;
  duration: number;
  ease: string;
}> = {
  subtle: {
    strength: 0.2,
    duration: 0.5,
    ease: 'elastic.out(1, 0.5)'
  },
  medium: {
    strength: 0.4,
    duration: 0.5,
    ease: 'elastic.out(1, 0.5)'
  },
  strong: {
    strength: 0.6,
    duration: 0.6,
    ease: 'elastic.out(1, 0.4)'
  }
};

export const EASING_PRESETS: Record<EasingPreset, string> = {
  gentle: 'power1.out',
  elastic: 'elastic.out(1, 0.5)',
  bouncy: 'elastic.out(1, 0.3)',
  smooth: 'power2.out',
  snappy: 'power3.out'
};

export const REVEAL_PRESETS: Record<RevealMode, {
  duration: number;
  ease: string;
}> = {
  elastic: {
    duration: 0.6,
    ease: 'elastic.out(1, 0.75)'
  },
  smooth: {
    duration: 0.5,
    ease: 'power2.out'
  },
  fade: {
    duration: 0.3,
    ease: 'power1.out'
  }
};

export const ANIMATION_STATUS = {
  idle: 'idle',
  animating: 'animating',
  disabled: 'disabled'
} as const;

export type AnimationStatus = typeof ANIMATION_STATUS[keyof typeof ANIMATION_STATUS];
