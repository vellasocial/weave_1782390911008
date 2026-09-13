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
    willChange: 'opacity, transform'
  });

  const wordBaseDelay = 0;
  const wordStagger = 1200;
  const wordDuration = 3200;

  const wordFadeStyle = (index: number): React.CSSProperties => ({
    display: 'inline-block',
    opacity: 0,
    willChange: 'opacity, transform',
    animation: `wordFadeIn ${wordDuration}ms cubic-bezier(0.25,0.46,0.45,0.94) forwards`,
    animationDelay: `${wordBaseDelay + index * wordStagger}ms`
  });

  return (
    <section className="relative w-full h-screen overflow-hidden grain-overlay">
      <style>{`
        @keyframes wordFadeIn {
          from { opacity: 0; transform: translate3d(0,12px,0); }
          to   { opacity: 1; transform: translate3d(0,0,0); }
        }
        @keyframes musicPulse {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.6); }
        }
      `}</style>
      {/* Instant dark background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: 'linear-gradient(135deg, #0a0a0f 0%, #12101a 50%, #0d0b14 100%)'
        }} />


      {/* Hero video — autoplays, loops, muted */}
      <div
        className="absolute inset-0 z-1"
        style={{
          opacity: videoReady ? 1 : 0,
          transition: 'opacity 800ms ease'
        }}>

        {/* Desktop video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setVideoReady(true)}
          className="hidden md:block"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            minWidth: '100%',
            minHeight: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}>

          <source
            src="https://res.cloudinary.com/wle6dmxs/video/upload/v1786177782/new_site_hero_cdhtvq.mp4"
            type="video/mp4" />

        </video>
        {/* Mobile video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setVideoReady(true)}
          className="block md:hidden"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            minWidth: '100%',
            minHeight: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}>

          <source
            src="https://res.cloudinary.com/wle6dmxs/video/upload/v1786180400/mobile_hero_kced32.mp4"
            type="video/mp4" />

        </video>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-2 bg-gradient-to-b from-loom-black/70 via-loom-black/40 to-loom-black/90" />

      {/* Animated warp/weft grid lines — warm neutral tint */}
      <div
        className="absolute inset-0 z-3 pointer-events-none opacity-10"
        style={{
          backgroundImage:
          'linear-gradient(rgba(138,126,109,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(138,126,109,0.4) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)'
        }} />


      {/* Hero Content */}
      <div
        ref={heroRef}
        suppressHydrationWarning
        className="absolute inset-0 z-10 flex flex-col justify-end px-8 md:px-16 pb-20"
        style={{ willChange: 'transform, opacity', transform: 'translate3d(0,0,0)' }}>

        {/* Label */}
        <div className="mb-6 flex items-center gap-3" style={fadeStyle(0, 600)}>
          <span className="w-12 h-px" style={{ background: '#8A7E6D', opacity: 0.6 }} />
          <span className="text-xs tracking-[0.2em] uppercase" style={{ color: '#8A7E6D', fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}>PROPERTY MARKETING CAMPAIGNS</span>
        </div>

        {/* Main headline */}
        <h1
          className="pulse-opacity font-manrope font-semibold leading-[0.9] tracking-tight mb-8 max-w-3xl"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', color: '#F5F1EA' }}>

          <span style={{ display: 'block', whiteSpace: 'nowrap' }}>
            <span style={{ color: '#F5F1EA', ...wordFadeStyle(0) }}>Every</span>
            {' '}
            <span style={{ color: '#F5F1EA', ...wordFadeStyle(1) }}>development</span>
          </span>
          <span style={{ display: 'block' }}>
            <span style={{ color: '#F5F1EA', ...wordFadeStyle(2) }}>deserves</span>
          </span>
          <span style={{ display: 'block' }}>
            <span className="text-transparent" style={{ ...wordFadeStyle(3), WebkitTextStroke: '1px rgba(245,241,234,0.4)' }}>desire.</span>
          </span>
        </h1>

        {/* Sub-copy */}
        <p className="max-w-md mb-10 tracking-wide text-base font-normal" style={{ color: '#B8B0A4', fontFamily: 'Helvetica, Arial, sans-serif', fontStyle: 'oblique' }} suppressHydrationWarning>
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
            className="px-8 py-4 rounded-full font-manrope font-semibold text-sm tracking-wide transition-all duration-300"
            style={{
              background: '#2A2622',
              color: '#F5F1EA',
              boxShadow: '0 0 32px rgba(42,38,34,0.5)',
              border: '1px solid rgba(255,255,255,0.35)',
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation'
            }}>

            ENQUIRE
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase rotate-90 mb-4" style={{ color: 'rgba(245,241,234,0.3)' }}>Scroll</span>
        <div className="w-px h-16" style={{ background: 'linear-gradient(to bottom, rgba(138,126,109,0.4), transparent)' }} />
      </div>
    </section>);

}