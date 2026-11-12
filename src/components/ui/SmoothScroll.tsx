'use client';

import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
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
      window.removeEventListener('wheel', blockScroll);
      window.removeEventListener('touchmove', blockScroll);
    };
  }, []);

  return null;
}
