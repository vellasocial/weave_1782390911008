'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicStarted, setMusicStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  // Track whether audio was muted before a video started playing
  const mutedBeforeVideoRef = useRef(false);
  const musicStartedRef = useRef(false);

  // Dispatch audio state to WeaveHeader
  const dispatchAudioState = useCallback((currentMuted: boolean, currentStarted: boolean, toggleFn: () => void) => {
    window.dispatchEvent(new CustomEvent('weave-audio-state', {
      detail: { muted: currentMuted, musicStarted: currentStarted, toggle: toggleFn }
    }));
  }, []);

  useEffect(() => {
    const textTimer = setTimeout(() => setTextVisible(true), 0);
    const fallback = setTimeout(() => setVideoReady(true), 1500);

    const bgAudio = new Audio();
    bgAudio.src = 'https://res.cloudinary.com/wle6dmxs/video/upload/v1786187128/fkjjjj_qnuvwj.wav';
    bgAudio.loop = true;
    bgAudio.volume = 0.35;
    bgAudio.preload = 'auto';
    audioRef.current = bgAudio;

    const startMusic = () => {
      if (musicStartedRef.current || !audioRef.current) return;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          musicStartedRef.current = true;
          setMusicStarted(true);
          // Remove all triggers once started
          window.removeEventListener('scroll', startMusic);
          window.removeEventListener('touchstart', startMusic);
          window.removeEventListener('click', startMusic);
          window.removeEventListener('keydown', startMusic);
        }).catch(() => {
          // Play failed (autoplay policy), keep listeners active for next interaction
        });
      }
    };

    window.addEventListener('scroll', startMusic, { passive: true });
    window.addEventListener('touchstart', startMusic, { passive: true });
    window.addEventListener('click', startMusic, { passive: true });
    window.addEventListener('keydown', startMusic, { passive: true });

    // Listen for video playing events from BentoPortfolio
    const handleVideoPlaying = (e: Event) => {
      const { playing } = (e as CustomEvent).detail;
      if (!audioRef.current) return;
      if (playing) {
        // Remember current mute state, then mute
        mutedBeforeVideoRef.current = audioRef.current.muted;
        audioRef.current.muted = true;
        setMuted(true);
      } else {
        // Restore previous mute state
        audioRef.current.muted = mutedBeforeVideoRef.current;
        setMuted(mutedBeforeVideoRef.current);
      }
    };

    window.addEventListener('weave-video-playing', handleVideoPlaying);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(fallback);
      window.removeEventListener('scroll', startMusic);
      window.removeEventListener('touchstart', startMusic);
      window.removeEventListener('click', startMusic);
      window.removeEventListener('keydown', startMusic);
      window.removeEventListener('weave-video-playing', handleVideoPlaying);
      bgAudio.pause();
      bgAudio.src = '';
    };
  }, []);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    if (!musicStarted) {
      audioRef.current.play().then(() => {
        setMusicStarted(true);
        setMuted(false);
        audioRef.current!.muted = false;
        dispatchAudioState(false, true, toggleMute);
      }).catch(() => {});
      return;
    }
    const next = !muted;
    audioRef.current.muted = next;
    setMuted(next);
    dispatchAudioState(next, musicStarted, toggleMute);
  }, [muted, musicStarted, dispatchAudioState]);

  // Dispatch audio state whenever it changes so WeaveHeader stays in sync
  useEffect(() => {
    dispatchAudioState(muted, musicStarted, toggleMute);
  }, [muted, musicStarted, toggleMute, dispatchAudioState]);

  const fadeStyle = (delay: number, duration: number): React.CSSProperties => ({
    opacity: textVisible ? 1 : 0,
    transform: textVisible ? 'translate3d(0,0,0)' : 'translate3d(0,18px,0)',
    transition: `opacity ${duration}ms cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform ${duration}ms cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`,
    willChange: 'opacity, transform',
  });

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
            objectPosition: 'center',
          }}
        >
          <source
            src="https://res.cloudinary.com/wle6dmxs/video/upload/v1786177782/new_site_hero_cdhtvq.mp4"
            type="video/mp4"
          />
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
            objectPosition: 'center',
          }}
        >
          <source
            src="https://res.cloudinary.com/wle6dmxs/video/upload/v1786180400/mobile_hero_kced32.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Dark overlay with iridescent tint */}
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
        {/* Label */}
        <div className="mb-6 flex items-center gap-3" style={fadeStyle(0, 600)}>
          <span className="w-12 h-px bg-lavender/60" />
          <span className="font-mono text-xs text-lavender/70 tracking-[0.2em] uppercase">PROPERTY MARKETING CAMPAIGNS</span>
        </div>

        {/* Main headline */}
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

        {/* CTA row — ENQUIRE only; Mute button is now in WeaveHeader */}
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

      {/* Mobile mute/unmute button — fixed bottom-left, mobile only */}
      <button
        onClick={toggleMute}
        aria-label={!musicStarted || muted ? 'Unmute music' : 'Mute music'}
        className="md:hidden fixed bottom-6 left-6 z-50 flex items-center gap-2 px-3 py-2 rounded-full border border-pearl/20 bg-loom-black/60 backdrop-blur-sm hover:border-lavender/50 hover:bg-loom-black/80 transition-all duration-300"
        style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
      >
        {/* Equaliser bars */}
        <span className="flex items-end gap-[2px] h-4">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '3px',
                borderRadius: '2px',
                background: (!musicStarted || muted) ? 'rgba(232,228,240,0.3)' : 'rgba(196,181,247,0.8)',
                height: (!musicStarted || muted) ? '6px' : `${8 + i * 3}px`,
                animation: (!musicStarted || muted) ? 'none' : `musicPulse ${0.6 + i * 0.15}s ${i * 0.1}s ease-in-out infinite`,
                minHeight: '4px',
                maxHeight: '16px',
              }}
            />
          ))}
        </span>
        <span
          className="font-mono text-[10px] tracking-[0.15em] uppercase"
          style={{ color: (!musicStarted || muted) ? 'rgba(232,228,240,0.3)' : 'rgba(196,181,247,0.7)' }}
        >
          {(!musicStarted || muted) ? 'Unmute' : 'Mute'}
        </span>
      </button>
    </section>
  );
}