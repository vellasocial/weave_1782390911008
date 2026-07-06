'use client';
import { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [textVisible, setTextVisible] = useState(true);

  // Parallax scroll effect
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

  // HLS video setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // The Bunny CDN HLS playlist URL derived from the embed URL
    // Library: 696225, Video: 4edc5b21-3a28-4f7d-aef2-1278eed38905
    const hlsUrl = 'https://vz-b9a0e5e7-d8f.b-cdn.net/4edc5b21-3a28-4f7d-aef2-1278eed38905/playlist.m3u8';

    const setupVideo = async () => {
      // iOS Safari natively supports HLS
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = hlsUrl;
        video.load();
        try {
          await video.play();
          setVideoReady(true);
        } catch {
          setVideoReady(true);
        }
        return;
      }

      // Other browsers: use hls.js
      try {
        const Hls = (await import('hls.js')).default;
        if (Hls.isSupported()) {
          const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: false,
          });
          hls.loadSource(hlsUrl);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, async () => {
            try {
              await video.play();
            } catch {
              // autoplay blocked — still show video
            }
            setVideoReady(true);
          });
          hls.on(Hls.Events.ERROR, () => {
            setVideoReady(true);
          });
          return () => hls.destroy();
        }
      } catch {
        setVideoReady(true);
      }
    };

    const cleanup = setupVideo();
    // Fallback: show video area after 2s regardless
    const fallback = setTimeout(() => setVideoReady(true), 2000);
    return () => {
      clearTimeout(fallback);
      cleanup?.then?.((fn) => fn?.());
    };
  }, []);

  const fadeStyle = (delay: number, duration: number): React.CSSProperties => ({
    opacity: textVisible ? 1 : 0,
    transform: textVisible ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`,
  });

  const wordFadeStyle = (index: number): React.CSSProperties => ({
    display: 'inline-block',
    opacity: 0,
    animation: `wordFadeIn 3200ms ease forwards`,
    animationDelay: `${index * 1200}ms`,
  });

  return (
    <section className="relative w-full h-screen overflow-hidden grain-overlay">
      <style>{`
        @keyframes wordFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
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

      {/* Native video element — no player UI, no play button */}
      <div
        className="absolute inset-0 z-1"
        style={{
          opacity: videoReady ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-2 bg-gradient-to-b from-loom-black/70 via-loom-black/40 to-loom-black/90" />
      <div className="absolute inset-0 z-2 bg-gradient-to-br from-lavender/5 via-transparent to-magenta/5" />

      {/* Grid lines */}
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
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="mb-6 flex items-center gap-3" style={fadeStyle(0, 600)}>
          <span className="w-12 h-px bg-lavender/60" />
          <span className="font-mono text-xs text-lavender/70 tracking-[0.2em] uppercase">PROPERTY MARKETING CAMPAIGNS</span>
        </div>

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

        <p className="font-mono text-sm text-pearl/50 max-w-md leading-relaxed mb-10 tracking-wide" style={fadeStyle(300, 700)}>
          We turn your project into content that does the selling before anyone picks up the phone.
        </p>

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
            style={{ boxShadow: '0 0 32px rgba(217,70,168,0.4)' }}
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