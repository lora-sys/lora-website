'use client';

import { useState, useEffect, useCallback } from 'react';

export interface DeviceCapabilities {
  isLowEnd: boolean;
  isMobile: boolean;
  hasTouch: boolean;
  prefersReducedMotion: boolean;
  networkType: string;
  connectionSpeed: string;
  cores: number;
  memory: number;
  gpuTier: number;
}

export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isLowEnd: false,
    isMobile: false,
    hasTouch: false,
    prefersReducedMotion: false,
    networkType: 'unknown',
    connectionSpeed: 'unknown',
    cores: 4,
    memory: 4,
    gpuTier: 1
  });

  useEffect(() => {
    const checkCapabilities = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;

      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const networkType = connection?.effectiveType || 'unknown';
      const connectionSpeed = connection?.downlink || 'unknown';

      const cores = navigator.hardwareConcurrency || 4;

      const memory = (navigator as any).deviceMemory || 4;

      const isLowEnd = 
        cores < 4 || 
        memory < 4 || 
        networkType === 'slow-2g' || 
        networkType === '2g' ||
        connectionSpeed < 1.5;

      const canvas = document.createElement('canvas');
      const webglContext = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as any;
      let gpuTier = 1;
      
      if (webglContext) {
        const debugInfo = webglContext.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = webglContext.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          if (renderer && (renderer.toLowerCase().includes('nvidia') || renderer.toLowerCase().includes('amd'))) {
            gpuTier = 3;
          } else if (renderer && renderer.toLowerCase().includes('intel')) {
            gpuTier = 2;
          }
        }
      }

      setCapabilities({
        isLowEnd,
        isMobile,
        hasTouch,
        prefersReducedMotion,
        networkType,
        connectionSpeed,
        cores,
        memory,
        gpuTier
      });
    };

    checkCapabilities();

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkCapabilities);

    return () => {
      mediaQuery.removeEventListener('change', checkCapabilities);
    };
  }, []);

  const getAnimationLevel = useCallback(() => {
    if (capabilities.prefersReducedMotion) return 'none';
    if (capabilities.isLowEnd) return 'minimal';
    if (capabilities.isMobile) return 'moderate';
    return 'full';
  }, [capabilities]);

  const getAnimationDuration = useCallback((baseDuration: number) => {
    const level = getAnimationLevel();
    switch (level) {
      case 'none':
        return 0;
      case 'minimal':
        return baseDuration * 0.5;
      case 'moderate':
        return baseDuration * 0.75;
      default:
        return baseDuration;
    }
  }, [getAnimationLevel]);

  const shouldUse3D = useCallback(() => {
    return !capabilities.isLowEnd && !capabilities.prefersReducedMotion;
  }, [capabilities]);

  return {
    ...capabilities,
    getAnimationLevel,
    getAnimationDuration,
    shouldUse3D
  };
}
