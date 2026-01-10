'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration, Glitch } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useDeviceCapabilities } from '@/animations/hooks/useDeviceCapabilities';

export interface PostProcessingProps {
  enableBloom?: boolean;
  enableNoise?: boolean;
  enableVignette?: boolean;
  enableChromaticAberration?: boolean;
  enableGlitch?: boolean;
  bloomIntensity?: number;
  bloomRadius?: number;
  bloomThreshold?: number;
  noiseOpacity?: number;
  vignetteDarkness?: number;
  chromaticOffset?: number;
  className?: string;
  children?: React.ReactNode;
}

function PostProcessingEffects({
  enableBloom = true,
  enableNoise = false,
  enableVignette = false,
  enableChromaticAberration = false,
  enableGlitch = false,
  bloomIntensity = 1.5,
  bloomRadius = 0.8,
  bloomThreshold = 0.2,
  noiseOpacity = 0.1,
  vignetteDarkness = 0.5,
  chromaticOffset = 0.005,
}: PostProcessingProps) {
  const { isLowEnd } = useDeviceCapabilities();

  const actualBloomIntensity = isLowEnd ? 0 : bloomIntensity;
  const actualBloomRadius = isLowEnd ? 0 : bloomRadius;
  const actualNoiseOpacity = isLowEnd ? 0 : noiseOpacity;
  const actualVignetteDarkness = isLowEnd ? 0 : vignetteDarkness;
  const actualChromaticOffset = isLowEnd || !enableChromaticAberration ? 0 : chromaticOffset;
  const glitchStrength = enableGlitch && !isLowEnd ? new THREE.Vector2(0.1, 0.5) : new THREE.Vector2(0, 0);

  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={bloomThreshold}
        mipmapBlur
        intensity={actualBloomIntensity}
        radius={actualBloomRadius}
      />
      <Noise opacity={actualNoiseOpacity} />
      <Vignette eskil={false} offset={0.1} darkness={actualVignetteDarkness} />
      <ChromaticAberration offset={actualChromaticOffset} />
      <Glitch
        delay={new THREE.Vector2(0.5, 2)}
        duration={new THREE.Vector2(0.1, 0.3)}
        strength={glitchStrength}
        mode={'CONSTANT' as any}
      />
    </EffectComposer>
  );
}

export function BloomEffect({ children, className }: { children?: React.ReactNode; className?: string }) {
  const { isLowEnd } = useDeviceCapabilities();

  if (isLowEnd) {
    return <div className={`w-full h-full ${className}`}>{children}</div>;
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas>
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={2} radius={1} />
        </EffectComposer>
      </Canvas>
      {children}
    </div>
  );
}

export function GlitchEffect({ children, className }: { children?: React.ReactNode; className?: string }) {
  const { isLowEnd } = useDeviceCapabilities();

  if (isLowEnd) {
    return <div className={`w-full h-full ${className}`}>{children}</div>;
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas>
        <EffectComposer>
          <Glitch
            delay={new THREE.Vector2(0.5, 2)}
            duration={new THREE.Vector2(0.1, 0.3)}
            strength={new THREE.Vector2(0.1, 0.5)}
            mode={'CONSTANT' as any}
          />
        </EffectComposer>
      </Canvas>
      {children}
    </div>
  );
}

export function CinematicEffect({ children, className }: { children?: React.ReactNode; className?: string }) {
  const { isLowEnd } = useDeviceCapabilities();

  if (isLowEnd) {
    return <div className={`w-full h-full ${className}`}>{children}</div>;
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas>
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1} radius={0.5} />
          <Noise opacity={0.05} />
          <Vignette eskil={false} offset={0.1} darkness={0.3} />
          <ChromaticAberration offset={0.003} />
        </EffectComposer>
      </Canvas>
      {children}
    </div>
  );
}

export default function PostProcessing({
  enableBloom = true,
  enableNoise = false,
  enableVignette = false,
  enableChromaticAberration = false,
  enableGlitch = false,
  bloomIntensity = 1.5,
  bloomRadius = 0.8,
  bloomThreshold = 0.2,
  noiseOpacity = 0.1,
  vignetteDarkness = 0.5,
  chromaticOffset = 0.005,
  className = '',
  children,
}: PostProcessingProps) {
  const { isLowEnd } = useDeviceCapabilities();

  if (isLowEnd) {
    return <div className={`w-full h-full ${className}`}>{children}</div>;
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas>
        <PostProcessingEffects
          enableBloom={enableBloom}
          enableNoise={enableNoise}
          enableVignette={enableVignette}
          enableChromaticAberration={enableChromaticAberration}
          enableGlitch={enableGlitch}
          bloomIntensity={bloomIntensity}
          bloomRadius={bloomRadius}
          bloomThreshold={bloomThreshold}
          noiseOpacity={noiseOpacity}
          vignetteDarkness={vignetteDarkness}
          chromaticOffset={chromaticOffset}
        />
        {children}
      </Canvas>
    </div>
  );
}

export function PostProcessingOverlay({
  intensity = 1,
  className = '',
}: {
  intensity?: number;
  className?: string;
}) {
  const { isLowEnd } = useDeviceCapabilities();
  const actualIntensity = isLowEnd ? 0 : intensity;

  return (
    <div className={`w-full h-full pointer-events-none ${className}`}>
      <Canvas>
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={actualIntensity} radius={0.8} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export function NoiseOverlay({ opacity = 0.1, className = '' }: { opacity?: number; className?: string }) {
  const { isLowEnd } = useDeviceCapabilities();
  const actualOpacity = isLowEnd ? 0 : opacity;

  return (
    <div className={`w-full h-full pointer-events-none ${className}`}>
      <Canvas>
        <EffectComposer>
          <Noise opacity={actualOpacity} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export function VignetteOverlay({
  darkness = 0.5,
  className = '',
}: {
  darkness?: number;
  className?: string;
}) {
  const { isLowEnd } = useDeviceCapabilities();
  const actualDarkness = isLowEnd ? 0 : darkness;

  return (
    <div className={`w-full h-full pointer-events-none ${className}`}>
      <Canvas>
        <EffectComposer>
          <Vignette eskil={false} offset={0.1} darkness={actualDarkness} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export function RGBShift({
  offset = 0.005,
  className = '',
}: {
  offset?: number;
  className?: string;
}) {
  const { isLowEnd } = useDeviceCapabilities();
  const actualOffset = isLowEnd ? 0 : offset;

  return (
    <div className={`w-full h-full pointer-events-none ${className}`}>
      <Canvas>
        <EffectComposer>
          <ChromaticAberration offset={actualOffset} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
