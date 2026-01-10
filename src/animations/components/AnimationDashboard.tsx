'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { useDeviceCapabilities } from '../hooks/useDeviceCapabilities';

interface PerformanceMetrics {
  fps: number;
  droppedFrames: number;
  avgFps: number;
  totalFrames: number;
  animationDuration: number;
  memoryUsage: number;
}

export function AnimationDashboard({ children }: { children?: ReactNode }) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    droppedFrames: 0,
    avgFps: 60,
    totalFrames: 0,
    animationDuration: 0,
    memoryUsage: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const droppedFramesRef = useRef(0);
  const totalFramesRef = useRef(0);
  const totalFpsRef = useRef(0);
  
  const capabilities = useDeviceCapabilities();

  useEffect(() => {
    let animationFrameId: number;

    const updateMetrics = (timestamp: number) => {
      const delta = timestamp - lastTime.current;
      frameCount.current++;

      if (delta >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / delta);
        const expectedFrames = Math.round(delta / (1000 / 60));
        const dropped = Math.max(0, expectedFrames - frameCount.current);

        droppedFramesRef.current += dropped;
        totalFramesRef.current += frameCount.current;
        totalFpsRef.current += fps;

        const avgFps = Math.round(totalFpsRef.current / (totalFramesRef.current / frameCount.current));

        setMetrics(prev => ({
          ...prev,
          fps,
          droppedFrames: droppedFramesRef.current,
          avgFps,
          totalFrames: totalFramesRef.current,
          animationDuration: delta,
          memoryUsage: (performance as any).memory?.usedJSHeapSize / (1024 * 1024) || 0
        }));

        frameCount.current = 0;
        lastTime.current = timestamp;
      }

      animationFrameId = requestAnimationFrame(updateMetrics);
    };

    animationFrameId = requestAnimationFrame(updateMetrics);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const resetMetrics = () => {
    frameCount.current = 0;
    droppedFramesRef.current = 0;
    totalFramesRef.current = 0;
    totalFpsRef.current = 0;
    lastTime.current = performance.now();
    setMetrics({
      fps: 60,
      droppedFrames: 0,
      avgFps: 60,
      totalFrames: 0,
      animationDuration: 0,
      memoryUsage: 0
    });
  };

  const getFpsColor = (fps: number) => {
    if (fps >= 50) return 'text-green-400';
    if (fps >= 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPerformanceRating = () => {
    if (metrics.avgFps >= 55) return { label: 'Excellent', color: 'bg-green-500' };
    if (metrics.avgFps >= 45) return { label: 'Good', color: 'bg-blue-500' };
    if (metrics.avgFps >= 30) return { label: 'Fair', color: 'bg-yellow-500' };
    return { label: 'Poor', color: 'bg-red-500' };
  };

  const rating = getPerformanceRating();

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all"
        aria-label="Show performance dashboard"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </button>
    );
  }

  return (
    <>
      <div
        className={`fixed bottom-4 right-4 z-50 glass-effect rounded-2xl border border-white/20 transition-all duration-300 ${
          isMinimized ? 'w-12 h-12 overflow-hidden' : 'w-80'
        }`}
      >
        {!isMinimized && (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Performance Monitor</h3>
              <div className="flex gap-2">
                <button
                  onClick={resetMetrics}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                  aria-label="Reset metrics"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                  aria-label="Minimize"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Current FPS</span>
                <span className={`text-2xl font-bold ${getFpsColor(metrics.fps)}`}>{metrics.fps}</span>
              </div>

              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${rating.color}`}
                  style={{ width: `${(metrics.fps / 60) * 100}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="glass-effect rounded-lg p-2">
                  <div className="text-gray-400">Avg FPS</div>
                  <div className={`font-semibold ${getFpsColor(metrics.avgFps)}`}>{metrics.avgFps}</div>
                </div>
                <div className="glass-effect rounded-lg p-2">
                  <div className="text-gray-400">Dropped</div>
                  <div className="font-semibold text-red-400">{metrics.droppedFrames}</div>
                </div>
                <div className="glass-effect rounded-lg p-2">
                  <div className="text-gray-400">Total Frames</div>
                  <div className="font-semibold">{metrics.totalFrames}</div>
                </div>
                <div className="glass-effect rounded-lg p-2">
                  <div className="text-gray-400">Memory</div>
                  <div className="font-semibold">{metrics.memoryUsage.toFixed(1)} MB</div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <div className="text-sm text-gray-400 mb-2">Device Info</div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">CPU Cores:</span>
                    <span className="text-gray-300">{capabilities.cores}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Memory:</span>
                    <span className="text-gray-300">{capabilities.memory} GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Network:</span>
                    <span className="text-gray-300">{capabilities.networkType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Animation Level:</span>
                    <span className="text-gray-300">{capabilities.getAnimationLevel()}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${rating.color}`} />
                  <span className="text-sm text-gray-400">Rating: {rating.label}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {isMinimized && (
          <button
            onClick={() => setIsMinimized(false)}
            className="w-full h-full flex items-center justify-center"
            aria-label="Expand dashboard"
          >
            <div className={`w-3 h-3 rounded-full ${rating.color}`} />
          </button>
        )}
      </div>
      {children}
    </>
  );
}

export function AnimationMetrics({ onMetricsUpdate }: { onMetricsUpdate?: (metrics: PerformanceMetrics) => void }) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    droppedFrames: 0,
    avgFps: 60,
    totalFrames: 0,
    animationDuration: 0,
    memoryUsage: 0
  });

  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const droppedFramesRef = useRef(0);
  const totalFramesRef = useRef(0);
  const totalFpsRef = useRef(0);

  useEffect(() => {
    let animationFrameId: number;

    const updateMetrics = (timestamp: number) => {
      const delta = timestamp - lastTime.current;
      frameCount.current++;

      if (delta >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / delta);
        const expectedFrames = Math.round(delta / (1000 / 60));
        const dropped = Math.max(0, expectedFrames - frameCount.current);

        droppedFramesRef.current += dropped;
        totalFramesRef.current += frameCount.current;
        totalFpsRef.current += fps;

        const avgFps = Math.round(totalFpsRef.current / (totalFramesRef.current / frameCount.current));

        const newMetrics = {
          fps,
          droppedFrames: droppedFramesRef.current,
          avgFps,
          totalFrames: totalFramesRef.current,
          animationDuration: delta,
          memoryUsage: (performance as any).memory?.usedJSHeapSize / (1024 * 1024) || 0
        };

        setMetrics(newMetrics);
        onMetricsUpdate?.(newMetrics);

        frameCount.current = 0;
        lastTime.current = timestamp;
      }

      animationFrameId = requestAnimationFrame(updateMetrics);
    };

    animationFrameId = requestAnimationFrame(updateMetrics);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onMetricsUpdate]);

  return null;
}
