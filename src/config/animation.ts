export const animationConfig = {
  easing: {
    gentle: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    bouncy: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
    smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
    spring: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  },

  duration: {
    micro: 0.1,
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
    verySlow: 0.8,
  },

  scroll: {
    once: true,
    margin: '-15%',
    amount: 'some',
  },

  parallax: {
    speed: 0.3,
    layers: 3,
  },

  performance: {
    willChange: true,
    layoutAware: true,
    gpuAcceleration: true,
    reduceMotion: true,
  },
} as const;
