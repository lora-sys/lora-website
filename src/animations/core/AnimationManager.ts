import { gsap } from 'gsap';

/**
 * Animation Manager
 * Simplified version with corrected GSAP Timeline types
 */

class AnimationManager {
  private static instance: AnimationManager | null = null;
  
  private timelines: Map<string, any>;
  private animations: Map<string, any>;
  
  constructor() {
    this.timelines = new Map();
    this.animations = new Map();
  }
  
  static getInstance(): AnimationManager {
    if (!AnimationManager.instance) {
      AnimationManager.instance = new AnimationManager();
    }
    return AnimationManager.instance;
  }
  
  createTimeline(name: string, config?: any): any {
    const existing = this.timelines.get(name);
    if (existing) {
      try {
        existing.kill();
      } catch (e) {
        console.warn(`Failed to kill timeline: ${name}`);
      }
    }
    
    const tl = gsap.timeline(config || {});
    this.timelines.set(name, tl);
    
    return tl;
  }
  
  getTimeline(name: string): any | null {
    return this.timelines.get(name) || null;
  }
  
  kill(name: string) {
    const tl = this.timelines.get(name);
    if (!tl) return;
    
    try {
      tl.kill();
    } catch (e) {
      console.warn(`Failed to kill timeline: ${name}`);
      }
    
    this.timelines.delete(name);
  }
  
  killAll() {
    this.timelines.forEach((tl) => {
      try {
        tl.kill();
      } catch (e) {
        console.warn(`Failed to kill timeline`);
      }
    });
    this.timelines.clear();
    this.animations.clear();
  }
}

export default AnimationManager;
