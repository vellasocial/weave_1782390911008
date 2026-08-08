'use client';
import { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [textVisible, setTextVisible] = useState(true);

  useEffect(() => {
    const textTimer = setTimeout(() => setTextVisible(true), 0);
    const fallback = setTimeout(() => setVideoReady(true), 1500);
    return () => {
      clearTimeout(textTimer);
      clearTimeout(fallback);
    };
  }, []);

  const fadeStyle = (delay: number, duration: number): React.CSSProperties => ({
    opacity: textVisible ? 1 : 0,
    transform: textVisible ? 'translate3d(0,0,0)' : 'translate3d(0,18px,0)',
    transition: `opacity ${duration}ms cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform ${duration}ms cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`,
    willChange: 'opacity, transform',
  });

  const words = [
    { text: 'Every', className: 'text-pearl' },
    { text: 'development', className: 'text-pearl' },
    { text: 'deserves', className: 'text-lavender' },
    { text: 'desire.', className: 'text-transparent', extra: { WebkitTextStroke: '1px rgba(232,228,240,0.4)' } as React.CSSProperties },
  ];
  const wordBaseDelay = 0;
  const wordStagger = 1200;
  const wordDuration = 3200;

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
      {/* Instant dark background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: 'linear-gradient(135deg, #0a0a0f 0%, #12101a 50%, #0d0b14 100%)',
        }}
      />

      {/* Hero video — autoplays, loops, muted */}
      <div
        className="absolute inset-0 z-1"
        style={{
          opacity: videoReady ? 1 : 0,
          transition: 'opacity 800ms ease',
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setVideoReady(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        >
          <source
            src="https://res.cloudinary.com/wle6dmxs/video/upload/v1786176594/4k_Vella_Social_-_The_Hum_zuia1l.mp4"
            type="video/mp4"
          />
        </video>
      </div>

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