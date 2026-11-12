'use client';
import { useState, useEffect } from 'react';
import { vibrate } from '@/lib/vibrate';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(32);
  const [videoOpen, setVideoOpen] = useState(false);
  const [hiddenBySection, setHiddenBySection] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = window.innerHeight * 0.5;
      setVisible(scrolled > threshold);

      const cta = document.getElementById('cta');
      if (cta) {
        const r = cta?.getBoundingClientRect();
        setHiddenBySection(r?.top < window.innerHeight && r?.bottom > 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setVideoOpen(document.body.hasAttribute('data-video-open'));
    });
    observer?.observe(document.body, { attributes: true, attributeFilter: ['data-video-open'] });
    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    const panel = document.getElementById('commission-panel');
    if (!panel) return;
    const sync = () => setPanelOpen(panel?.classList?.contains('open'));
    sync();
    const observer = new MutationObserver(sync);
    observer?.observe(panel, { attributes: true, attributeFilter: ['class'] });
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

  const hidden = hiddenBySection || panelOpen;

  return (
    <button
      type="button"
      onClick={openPanel}
      aria-label="Enquire"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      className={`btn-primary fixed right-4 md:right-8 z-50 ${
        visible && !hidden
          ? videoOpen
            ? 'translate-y-16 opacity-0 pointer-events-none md:translate-y-0 md:opacity-100 md:pointer-events-auto' :'opacity-100' :'translate-y-16 opacity-0 pointer-events-none'
      }`}
      style={{
        bottom: `${bottomOffset}px`,
        transition: 'bottom 0.3s ease, opacity 0.3s ease, transform 0.2s ease, background-color 0.2s ease',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      }}
    >
      ENQUIRE
    </button>
  );
}