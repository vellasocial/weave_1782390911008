'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { vibrate } from '@/lib/vibrate';

export default function WeaveHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  const isScrolled = mounted && scrolled;

  const navItems = [
    { label: 'Work', id: 'services', fallback: 'portfolio' },
    { label: 'Pricing', id: 'pricing', fallback: 'cta' },
    { label: 'Process', id: 'process', fallback: 'cta' }];

  const handleMobileLink = (item: { id: string; fallback: string }) => {
    setMenuOpen(false);
    setTimeout(() => {
      const target = document.getElementById(item.id) || document.getElementById(item.fallback);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const handleMobileEnquire = () => {
    vibrate();
    setMenuOpen(false);
    setTimeout(() => {
      const panel = document.getElementById('commission-panel');
      if (panel) {
        panel.classList.add('open');
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      }
    }, 60);
  };

  return (
    <>
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
      <div suppressHydrationWarning className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-center md:justify-between relative">
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

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
          className="md:hidden absolute right-6 top-1/2 -translate-y-1/2 flex items-center justify-center"
          style={{ width: '44px', height: '44px', color: '#F5F1EA', touchAction: 'manipulation' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        {/* Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {navItems?.map((item) => (
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

    {/* Mobile full-screen menu */}
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!menuOpen}
      className="md:hidden fixed inset-0 z-[70] flex flex-col"
      style={{
        background: '#0D0D12',
        opacity: menuOpen ? 1 : 0,
        visibility: menuOpen ? 'visible' : 'hidden',
        pointerEvents: menuOpen ? 'auto' : 'none',
        transition: 'opacity 0.3s ease, visibility 0.3s ease'
      }}
    >
      <div className="flex items-center justify-end px-6" style={{ paddingTop: '24px' }}>
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="flex items-center justify-center"
          style={{ width: '44px', height: '44px', color: '#F5F1EA', touchAction: 'manipulation' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="flex-1 flex flex-col items-start justify-center gap-6 px-6 pb-16">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              handleMobileLink(item);
            }}
            style={{
              color: '#F5F1EA',
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 600,
              fontSize: '40px',
              letterSpacing: '-0.8px',
              lineHeight: 1.15,
              minHeight: '44px',
              touchAction: 'manipulation'
            }}
          >
            {item.label}
          </a>
        ))}
        <button
          type="button"
          onClick={handleMobileEnquire}
          className="btn-primary mt-4"
        >
          ENQUIRE
        </button>
      </nav>
    </div>
    </>
  );
}