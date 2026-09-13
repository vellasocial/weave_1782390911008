'use client';
import Image from 'next/image';

export default function WeaveFooter() {
  return (
    <footer
      className="py-10 px-6 md:px-12 border-t"
      style={{ borderColor: 'rgba(138,126,109,0.15)', background: 'var(--loom-black)' }}>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo mark */}
        <div className="flex items-center gap-3">
          <Image
            src="/assets/images/VELLASOCIAL_logo_CONDENSED-1782391516452.png"
            alt="Vella Social Logo"
            width={120}
            height={40}
            className="object-contain brightness-0 invert opacity-60" />

        </div>

        {/* Links */}
        <nav className="flex items-center gap-6">
          {['Portfolio', 'Process', 'About']?.map((link) =>
          <a
            key={link}
            href={`#${link?.toLowerCase()}`}
            className="font-mono text-xs tracking-wider transition-colors duration-300"
            style={{ color: 'rgba(245,241,234,0.3)' }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = 'rgba(245,241,234,0.7)'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = 'rgba(245,241,234,0.3)'}>

              {link}
            </a>
          )}
        </nav>

        {/* Copyright */}
        <p className="font-mono text-xs tracking-wider" style={{ color: 'rgba(245,241,234,0.25)' }}>© 2026 VELLASOCIAL

        </p>
      </div>
    </footer>);

}