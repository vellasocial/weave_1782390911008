'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { vibrate } from '@/lib/vibrate';

export default function WeaveHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isScrolled = mounted && scrolled;

  return (
    <header
      suppressHydrationWarning
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-loom-black/90 backdrop-blur-md' :'py-6 bg-transparent'
      }`}
      style={isScrolled ? { borderBottom: '1px solid rgba(138,126,109,0.2)' } : {}}
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
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-8">
            {['Portfolio', 'Process']?.map((item) => (
              <a
                key={item}
                href={`#${item?.toLowerCase()}`}
                className="font-mono text-xs tracking-wider uppercase transition-colors duration-300"
                style={{ color: 'rgba(245,241,234,0.6)' }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#F5F1EA'}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = 'rgba(245,241,234,0.6)'}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <button
            onClick={() => {
              vibrate();
              const panel = document.getElementById('commission-panel');
              if (panel) {
                panel?.classList?.add('open');
                document.body.style.overflow = 'hidden';
              }
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-300"
            style={{
              background: '#2A2622',
              color: '#F5F1EA',
              border: '1px solid rgba(255,255,255,0.35)'
            }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = '0.85'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = '1'}
          >
            ENQUIRE
          </button>
        </div>
      </div>
    </header>
  );
}