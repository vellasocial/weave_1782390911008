'use client';
import Image from 'next/image';

export default function WeaveFooter() {
  return (
    <footer
      className="py-10 px-6 md:px-12 border-t"
      style={{ borderColor: 'rgba(242,239,233,0.10)', background: '#0B0B0D' }}>

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
          {['Portfolio']?.map((link) =>
          <a
            key={link}
            href={`#${link?.toLowerCase()}`}
            className="inline-flex items-center transition-colors duration-300"
            style={{ minHeight: '44px', color: '#8A857C', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#F2EFE9'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = '#8A857C'}>

              {link}
            </a>
          )}
        </nav>

        {/* Copyright */}
        <p className="text-xs tracking-wider" style={{ color: '#8A857C', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>© 2026 VELLASOCIAL

        </p>
      </div>
    </footer>);

}