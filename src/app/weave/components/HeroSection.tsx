'use client';
import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef?.current;
    if (!el) return;

    let rafId: number;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          const scrolled = lastScrollY;
          if (scrolled < window.innerHeight) {
            el.style.transform = `translateY(${scrolled * 0.3}px)`;
            el.style.opacity = String(1 - scrolled / window.innerHeight);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden grain-overlay">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://www.canva.com/design/DAHOTHvgE4s/bvEcb-cUvP02h1DZZRLJvA/watch?embed&autoplay=1&loop=1"
          allow="autoplay; fullscreen"
          allowFullScreen={true}
          title="Hero video"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 'max(100%, 177.78vh)',
            height: 'max(100%, 56.25vw)',
            transform: 'translate(-50%, -50%)',
            border: 0,
            pointerEvents: 'none',
          }}
        />
        {/* Full overlay to block any player UI/watermarks — covers bottom controls bar */}
        <div className="absolute inset-0" style={{ pointerEvents: 'none', zIndex: 2 }} />

        {/* Dark overlay with iridescent tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-loom-black/70 via-loom-black/40 to-loom-black/90" />
        <div className="absolute inset-0 bg-gradient-to-br from-lavender/5 via-transparent to-magenta/5" />
      </div>
      {/* Animated warp/weft grid lines */}
      <div
        className="absolute inset-0 z-1 pointer-events-none opacity-10"
        style={{
          backgroundImage:
          'linear-gradient(rgba(196,181,247,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(196,181,247,0.4) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage:
          'radial-gradient(ellipse at center, black 30%, transparent 70%)'
        }} />

      {/* Hero Content */}
      <div ref={heroRef} suppressHydrationWarning className="absolute inset-0 z-10 flex flex-col justify-end px-8 md:px-16 pb-20" style={{ willChange: 'transform, opacity' }}>
        {/* Label */}
        <div className="mb-6 flex items-center gap-3">
          <span className="w-12 h-px bg-lavender/60" />
          <span className="font-mono text-xs text-lavender/70 tracking-[0.2em] uppercase">PROPERTY MARKETING CAMPAIGNS</span>
        </div>

        {/* Main headline */}
        <h1 className="pulse-opacity font-manrope font-semibold text-pearl leading-[0.9] tracking-tight mb-8 max-w-3xl"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}>
          Every development
          <br />
          <span className="text-lavender">deserves</span>
          <br />
          <span
            className="text-transparent"
            style={{
              WebkitTextStroke: '1px rgba(232,228,240,0.4)'
            }}>
            desire.
          </span>
        </h1>

        {/* Sub-copy */}
        <p className="font-mono text-sm text-pearl/50 max-w-md leading-relaxed mb-10 tracking-wide">
          We turn your project into content that does the selling before anyone picks up the phone.
        </p>

        {/* CTA row */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => {
              const panel = document.getElementById('commission-panel');
              if (panel) {
                panel?.classList?.add('open');
                document.body.style.overflow = 'hidden';
              }
            }}
            className="px-8 py-4 rounded-full bg-magenta text-white font-manrope font-semibold text-sm tracking-wide hover:bg-magenta/90 transition-all duration-300"
            style={{ boxShadow: '0 0 32px rgba(217,70,168,0.4)' }}>
            ENQUIRE
          </button>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] text-pearl/30 tracking-[0.3em] uppercase rotate-90 mb-4">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-lavender/40 to-transparent" />
      </div>
    </section>
  );
}