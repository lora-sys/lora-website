'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimationManager from '@/animations/core/AnimationManager';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface BatchEntranceProps {
  children: React.ReactNode;
  threshold?: number;
  stagger?: number;
}

export function BatchEntrance({ children, threshold = 0.1, stagger = 0.1 }: BatchEntranceProps) {
  const batchRef = useRef<HTMLDivElement>(null);
  const manager = AnimationManager.getInstance();
  
  useEffect(() => {
    if (!batchRef.current) return;
    
    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'power2.out',
        duration: 0.5,
        force3D: true,
      },
    });
    
    const cards = document.querySelectorAll('.project-card');
    
    if (cards.length === 0) return;
    
    cards.forEach((card, index) => {
      const animation = gsap.fromTo(card, 
        { opacity: 0, y: 30, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)', delay: index * stagger }
      );
      
      gsap.set(card, {
        transformOrigin: 'center center',
        willChange: 'transform',
      });
      
      tl.add(animation, index * stagger);
    });
    
    tl.play();
    
    return () => {
      if (batchRef.current) {
        tl.kill();
        manager.kill('batch-entrance');
      }
    };
  }, [stagger]);
  
  return (
    <div ref={batchRef} className="batch-entrance">
      {children}
    </div>
  );
}

export function ScrollTriggerBatchEntrance({ children, threshold = 0.1, stagger = 0.1 }: BatchEntranceProps) {
  const batchRef = useRef<HTMLDivElement>(null);
  const manager = AnimationManager.getInstance();
  
  useEffect(() => {
    if (!batchRef.current) return;
    
    const cards = document.querySelectorAll('.project-card');
    
    if (cards.length === 0) return;
    
    const triggers: ScrollTrigger[] = [];
    
    cards.forEach((card, index) => {
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top bottom-=100px',
        onEnter: () => {
          gsap.fromTo(card, 
            { opacity: 0, y: 30, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)', delay: index * 0.05, force3D: true }
          );
        },
      });
      triggers.push(trigger);
    });
    
    return () => {
      triggers.forEach(t => t.kill());
      gsap.killTweensOf('.project-card');
      if (batchRef.current) {
        manager.kill('scrolltrigger-batch-entrance');
      }
    };
  }, []);
  
  return (
    <div ref={batchRef} className="scrolltrigger-batch-entrance">
      {children}
    </div>
  );
}
