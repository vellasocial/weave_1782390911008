'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface AudioState {
  muted: boolean;
  musicStarted: boolean;
  toggle: () => void;
}

export default function WeaveHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [audioState, setAudioState] = useState<AudioState | null>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Listen for audio state updates from HeroSection
    const handleAudioState = (e: Event) => {
      const { muted, musicStarted, toggle } = (e as CustomEvent).detail;
      setAudioState({ muted, musicStarted, toggle });
    };
    window.addEventListener('weave-audio-state', handleAudioState);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('weave-audio-state', handleAudioState);
    };
  }, []);

  const isScrolled = mounted && scrolled;
  const isMutedOrNotStarted = !audioState || audioState.muted || !audioState.musicStarted;

  return (
    <header
      suppressHydrationWarning
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-loom-black/90 backdrop-blur-md border-b border-lavender-border' :'py-6 bg-transparent'
      }`}
    >
      <div suppressHydrationWarning className="max-w-7xl mx-auto px-6 flex items-center justify-center md:justify-between">
        {/* Logo */}
        <div suppressHydrationWarning className="flex items-center gap-3">
          <Image
            src="/assets/images/VELLASOCIAL_logo_CONDENSED-1782391516452.png"
            alt="Vella Social Logo"
            width={187}
            height={62}
            className="object-contain brightness-0 invert"
          />
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['Portfolio', 'Process', 'About']?.map((item) => (
            <a
              key={item}
              href={`#${item?.toLowerCase()}`}
              className="font-mono text-xs text-pearl/50 hover:text-pearl transition-colors duration-300 tracking-wider uppercase"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA group: Mute + Enquire */}
        <div className="hidden md:flex items-center gap-3">
          {/* Mute/Unmute button */}
          <button
            onClick={() => audioState?.toggle()}
            aria-label={isMutedOrNotStarted ? 'Unmute music' : 'Mute music'}
            className="flex items-center gap-2 px-3 py-2 rounded-full border border-pearl/20 bg-loom-black/40 backdrop-blur-sm hover:border-lavender/50 hover:bg-loom-black/60 transition-all duration-300"
            style={{ WebkitTapHighlightColor: 'transparent' }}
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
                    background: isMutedOrNotStarted ? 'rgba(232,228,240,0.3)' : 'rgba(196,181,247,0.8)',
                    height: isMutedOrNotStarted ? '6px' : `${8 + i * 3}px`,
                    animation: isMutedOrNotStarted ? 'none' : `musicPulse ${0.6 + i * 0.15}s ${i * 0.1}s ease-in-out infinite`,
                    minHeight: '4px',
                    maxHeight: '16px',
                  }}
                />
              ))}
            </span>
            <span
              className="font-mono text-[10px] tracking-[0.15em] uppercase"
              style={{ color: isMutedOrNotStarted ? 'rgba(232,228,240,0.3)' : 'rgba(196,181,247,0.7)' }}
            >
              {isMutedOrNotStarted ? 'Unmute' : 'Mute'}
            </span>
          </button>

          {/* Enquire button */}
          <button
            onClick={() => {
              const panel = document.getElementById('commission-panel');
              if (panel) {
                panel?.classList?.add('open');
                document.body.style.overflow = 'hidden';
              }
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-magenta/50 text-magenta font-mono text-xs tracking-wider uppercase hover:bg-magenta/10 transition-all duration-300"
          >
            ENQUIRE
          </button>
        </div>
      </div>

      <style>{`
        @keyframes musicPulse {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.6); }
        }
      `}</style>
    </header>
  );
}