'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const el = heroRef?.current;
    if (!el) return;

    // Disable parallax on mobile — it's the primary cause of scroll jank
    if (isMobile) {
      el.style.transform = 'translate3d(0,0,0)';
      el.style.opacity = '1';
      return;
    }

    let rafId: number;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          ticking = false;
          const scrolled = lastScrollY;
          if (scrolled < window.innerHeight) {
            // Use translate3d for GPU compositing layer
            el.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0)`;
            el.style.opacity = String(Math.max(0, 1 - scrolled / window.innerHeight));
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  const handleIframeLoad = () => {
    setTimeout(() => setVideoReady(true), 300);
  };

  useEffect(() => {
    // Trigger text fade-in immediately on mount
    const textTimer = setTimeout(() => setTextVisible(true), 0);
    // Fallback: ensure video becomes visible even if onLoad never fires
    const fallback = setTimeout(() => setVideoReady(true), 1500);
    return () => {
      clearTimeout(textTimer);
      clearTimeout(fallback);
    };
  }, []);

  // Each element fades in over a different duration but all end at ~1400ms
  // label: starts at 0ms, duration 800ms → ends 800ms
  // headline: starts at 200ms, duration 900ms → ends 1100ms
  // sub-copy: starts at 400ms, duration 900ms → ends 1300ms
  // CTA: starts at 500ms, duration 900ms → ends 1400ms
  const fadeStyle = (delay: number, duration: number): React.CSSProperties => ({
    opacity: textVisible ? 1 : 0,
    transform: textVisible ? 'translate3d(0,0,0)' : 'translate3d(0,18px,0)',
    transition: `opacity ${duration}ms cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform ${duration}ms cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`,
    willChange: 'opacity, transform',
  });

  // Word-by-word fade for h1: "Every" "development" "deserves" "desire."
  const words = [
    { text: 'Every', className: 'text-pearl' },
    { text: 'development', className: 'text-pearl' },
    { text: 'deserves', className: 'text-lavender' },
    { text: 'desire.', className: 'text-transparent', extra: { WebkitTextStroke: '1px rgba(232,228,240,0.4)' } as React.CSSProperties },
  ];
  const wordBaseDelay = 0;
  const wordStagger = 1200; // ms between each word
  const wordDuration = 3200; // ms fade duration per word

  const wordFadeStyle = (index: number): React.CSSProperties => ({
    display: 'inline-block',
    opacity: 0,
    willChange: 'opacity, transform',
    animation: `wordFadeIn ${wordDuration}ms cubic-bezier(0.25,0.46,0.45,0.94) forwards`,
    animationDelay: `${wordBaseDelay + index * wordStagger}ms`,
  });

  return (
    <section className="relative w-full h-screen overflow-hidden grain-overlay">
      <style>{`
        @keyframes wordFadeIn {
          from { opacity: 0; transform: translate3d(0,12px,0); }
          to   { opacity: 1; transform: translate3d(0,0,0); }
        }
      `}</style>
      {/* Instant dark background — visible immediately, no waiting */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: 'linear-gradient(135deg, #0a0a0f 0%, #12101a 50%, #0d0b14 100%)',
        }}
      />

      {/* Desktop hero image — shown immediately */}
      {isMobile === false && (
        <div className="absolute inset-0 z-1">
          <Image
            src="/assets/images/3_bedroom_pool_2-1784806692203.png"
            alt="Luxury poolside villa hero background"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
        </div>
      )}

      {/* Mobile hero image — shown immediately, no fade */}
      {isMobile === true && (
        <div className="absolute inset-0 z-1">
          <Image
            src="/assets/images/3_bedroom_pool_2-1784806692203.png"
            alt="Luxury poolside villa hero background"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
        </div>
      )}

      {/* Fallback hero image shown during SSR / before isMobile resolves */}
      {isMobile === null && (
        <div className="absolute inset-0 z-1">
          <Image
            src="/assets/images/3_bedroom_pool_2-1784806692203.png"
            alt="Luxury poolside villa hero background"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
        </div>
      )}

      {/* Dark overlay with iridescent tint — always visible for text legibility */}
      <div className="absolute inset-0 z-2 bg-gradient-to-b from-loom-black/70 via-loom-black/40 to-loom-black/90" />
      <div className="absolute inset-0 z-2 bg-gradient-to-br from-lavender/5 via-transparent to-magenta/5" />

      {/* Animated warp/weft grid lines */}
      <div
        className="absolute inset-0 z-3 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(196,181,247,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(196,181,247,0.4) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }}
      />

      {/* Hero Content */}
      <div
        ref={heroRef}
        suppressHydrationWarning
        className="absolute inset-0 z-10 flex flex-col justify-end px-8 md:px-16 pb-20"
        style={{ willChange: 'transform, opacity', transform: 'translate3d(0,0,0)' }}
      >
        {/* Label — fades in first */}
        <div className="mb-6 flex items-center gap-3" style={fadeStyle(0, 600)}>
          <span className="w-12 h-px bg-lavender/60" />
          <span className="font-mono text-xs text-lavender/70 tracking-[0.2em] uppercase">PROPERTY MARKETING CAMPAIGNS</span>
        </div>

        {/* Main headline — each word fades in sequentially */}
        <h1
          className="pulse-opacity font-manrope font-semibold text-pearl leading-[0.9] tracking-tight mb-8 max-w-3xl"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
        >
          <span style={{ display: 'block', whiteSpace: 'nowrap' }}>
            <span className="text-pearl" style={{ ...wordFadeStyle(0) }}>Every</span>
            {' '}
            <span className="text-pearl" style={{ ...wordFadeStyle(1) }}>development</span>
          </span>
          <span style={{ display: 'block' }}>
            <span className="text-lavender" style={{ ...wordFadeStyle(2) }}>deserves</span>
          </span>
          <span style={{ display: 'block' }}>
            <span className="text-transparent" style={{ ...wordFadeStyle(3), WebkitTextStroke: '1px rgba(232,228,240,0.4)' }}>desire.</span>
          </span>
        </h1>

        {/* Sub-copy */}
        <p className="font-mono text-sm text-pearl/50 max-w-md leading-relaxed mb-10 tracking-wide" style={fadeStyle(300, 700)}>
          We turn your project into content that does the selling before anyone picks up the phone.
        </p>

        {/* CTA row */}
        <div className="flex flex-wrap items-center gap-4" style={fadeStyle(400, 700)}>
          <button
            onClick={() => {
              const panel = document.getElementById('commission-panel');
              if (panel) {
                panel?.classList?.add('open');
                document.body.style.overflow = 'hidden';
              }
            }}
            className="px-8 py-4 rounded-full bg-magenta text-white font-manrope font-semibold text-sm tracking-wide hover:bg-magenta/90 transition-all duration-300"
            style={{ boxShadow: '0 0 32px rgba(217,70,168,0.4)', WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
          >
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