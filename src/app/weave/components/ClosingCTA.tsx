'use client';

export default function ClosingCTA() {
  const openEnquiry = () => {
    const panel = document.getElementById('commission-panel');
    if (panel) {
      panel.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  return (
    <section
      id="cta"
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden flex flex-col items-center justify-center text-center"
      style={{ background: 'var(--loom-black-2)' }}
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(138,126,109,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(138,126,109,0.6) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
        {/* Eyebrow — matches other section eyebrows */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-12 h-px" style={{ background: '#8A7E6D', opacity: 0.6 }} />
          <span
            className="font-mono text-xs tracking-[0.2em] uppercase"
            style={{
              color: '#8A7E6D',
              fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif',
              fontWeight: 300,
            }}
          >
            Your Turn
          </span>
        </div>

        {/* Title — matches hero headline style */}
        <h2
          className="font-semibold leading-[0.9] tracking-tight mb-8"
          style={{
            fontSize: 'clamp(2.2rem, 5.5vw, 5rem)',
            fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
          }}
        >
          <span style={{ display: 'block', color: '#F5F1EA' }}>Ready to be</span>
          <span
            className="text-transparent"
            style={{
              display: 'block',
              WebkitTextStroke: '1px rgba(245,241,234,0.4)',
            }}
          >
            unforgettable?
          </span>
        </h2>

        {/* Subline — matches hero subline italic style */}
        <p
          className="max-w-md mb-12 tracking-wide text-base font-normal"
          style={{
            color: '#B8B0A4',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontStyle: 'italic',
          }}
        >
          Tell us what you&apos;re launching. We&apos;ll show you what it could look like.
        </p>

        {/* ENQUIRE button — exact hero style */}
        <button
          onClick={openEnquiry}
          className="px-8 py-4 rounded-full font-manrope font-semibold text-sm tracking-wide transition-all duration-300"
          style={{
            background: '#2A2622',
            color: '#F5F1EA',
            boxShadow: '0 0 32px rgba(42,38,34,0.5)',
            border: '1px solid rgba(255,255,255,0.35)',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
            fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
        >
          ENQUIRE
        </button>
      </div>
    </section>
  );
}
