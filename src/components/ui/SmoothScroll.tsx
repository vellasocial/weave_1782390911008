'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

declare global {
  interface Window {
    lenisInstance?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    // Disable smooth scroll on mobile/touch devices to prevent glitchiness
    const isMobile = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      anchors: true,
      allowNestedScroll: true,
    });

    window.lenisInstance = lenis;

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Block wheel and touch scroll events when the enquire panel is open
    const blockScroll = (e: Event) => {
      const panel = document.getElementById('commission-panel');
      if (panel && panel.classList.contains('open')) {
        const target = e.target as Node;
        if (!panel.contains(target)) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    window.addEventListener('wheel', blockScroll, { passive: false });
    window.addEventListener('touchmove', blockScroll, { passive: false });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenisInstance = undefined;
      window.removeEventListener('wheel', blockScroll);
      window.removeEventListener('touchmove', blockScroll);
    };
  }, []);

  return null;
}
