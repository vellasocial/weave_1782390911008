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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        padding: isScrolled ? '12px 0' : '24px 0',
        background: isScrolled ? 'rgba(13,13,18,0.92)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(138,126,109,0.25)' : '1px solid transparent'
      }}
    >
      <div suppressHydrationWarning className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-center md:justify-between">
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
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {[
            { label: 'Work', id: 'services', fallback: 'portfolio' },
            { label: 'Pricing', id: 'pricing', fallback: 'cta' },
            { label: 'Process', id: 'process', fallback: 'cta' }]?.map((item) => (
              <a
                key={item.label}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id) || document.getElementById(item.fallback);
                  target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-flex items-center transition-colors duration-300"
                style={{
                  minHeight: '44px',
                  color: 'rgba(245,241,234,0.6)',
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 500,
                  fontSize: '12px',
                  letterSpacing: '0.6px',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#F5F1EA'}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = 'rgba(245,241,234,0.6)'}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <button
            type="button"
            onClick={() => {
              vibrate();
              const panel = document.getElementById('commission-panel');
              if (panel) {
                panel?.classList?.add('open');
                document.body.style.overflow = 'hidden';
              }
            }}
            className="btn-primary"
            style={{ height: '44px', minHeight: '44px', padding: '0 24px', fontSize: '12px' }}
          >
            ENQUIRE
          </button>
        </div>
      </div>
    </header>
  );
}