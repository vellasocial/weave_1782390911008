'use client';
import { useState, useEffect } from 'react';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(32); // default 8 * 4 = 32px

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = window.innerHeight * 0.5;
      setVisible(scrolled > threshold);
      setPulsing(scrolled > window.innerHeight * 2.5);

      // Calculate how close we are to the footer
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer?.getBoundingClientRect();
        const buttonHeight = 56; // approximate button height
        const gap = 32; // desired gap from footer top
        const viewportHeight = window.innerHeight;

        // Distance from bottom of viewport to top of footer
        const distanceFromBottom = viewportHeight - footerRect?.top;

        if (distanceFromBottom > 0) {
          // Footer is visible — push button up
          setBottomOffset(distanceFromBottom + gap);
        } else {
          setBottomOffset(32);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openPanel = () => {
    const panel = document.getElementById('commission-panel');
    if (panel) {
      panel?.classList?.add('open');
      // Lock both html and body to prevent any native scroll
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      // Stop Lenis smooth scroll
      if (window.lenisInstance) {
        window.lenisInstance?.stop();
      }
    }
  };

  return (
    <button
      onClick={openPanel}
      aria-label="Commission a Pattern"
      className={`fixed right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-full font-manrope font-semibold text-sm text-white transition-all duration-300 ${
        pulsing ? 'cta-pulse' : ''
      } ${visible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}`}
      style={{
        bottom: `${bottomOffset}px`,
        transition: 'bottom 0.3s ease, opacity 0.3s ease, transform 0.3s ease',
        background: 'linear-gradient(135deg, #D946A8, #C026A0)',
        boxShadow: pulsing
          ? '0 0 32px rgba(217,70,168,0.5), 0 8px 24px rgba(0,0,0,0.4)'
          : '0 8px 24px rgba(217,70,168,0.35), 0 4px 12px rgba(0,0,0,0.3)',
      }}
    >
      ENQUIRE
    </button>
  );
}