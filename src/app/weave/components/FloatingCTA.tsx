'use client';
import { useState, useEffect } from 'react';
import { vibrate } from '@/lib/vibrate';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(32);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = window.innerHeight * 0.5;
      setVisible(scrolled > threshold);
      setPulsing(scrolled > window.innerHeight * 2.5);

      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer?.getBoundingClientRect();
        const gap = 32;
        const viewportHeight = window.innerHeight;
        const distanceFromBottom = viewportHeight - footerRect?.top;

        if (distanceFromBottom > 0) {
          setBottomOffset(distanceFromBottom + gap);
        } else {
          setBottomOffset(32);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setVideoOpen(document.body.hasAttribute('data-video-open'));
    });
    observer?.observe(document.body, { attributes: true, attributeFilter: ['data-video-open'] });
    return () => observer?.disconnect();
  }, []);

  const openPanel = () => {
    vibrate();
    const panel = document.getElementById('commission-panel');
    if (panel) {
      panel?.classList?.add('open');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (window.lenisInstance) {
        window.lenisInstance?.stop();
      }
    }
  };

  // Show button: must be scrolled past threshold AND (not on mobile OR no video open)
  const showButton = visible && !(videoOpen);
  // On desktop (md+), always show if scrolled past threshold regardless of video
  // We achieve this via CSS: hide on mobile when videoOpen, always respect visible on desktop

  return (
    <button
      onClick={openPanel}
      aria-label="Commission a Pattern"
      className={`fixed right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-full font-manrope font-semibold text-sm text-white transition-all duration-300 ${
        pulsing ? 'cta-pulse' : ''
      } ${
        visible
          ? videoOpen
            ? 'translate-y-16 opacity-0 pointer-events-none md:translate-y-0 md:opacity-100 md:pointer-events-auto' :'translate-y-0 opacity-100' :'translate-y-16 opacity-0 pointer-events-none'
      }`}
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