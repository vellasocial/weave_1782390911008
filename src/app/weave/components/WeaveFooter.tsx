'use client';
import Image from 'next/image';

export default function WeaveFooter() {
  return (
    <footer
      className="py-10 px-6 md:px-12 border-t"
      style={{ borderColor: 'rgba(138,126,109,0.25)', background: '#0D0D12' }}>

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
            style={{ minHeight: '44px', color: 'rgba(245,241,234,0.6)', fontFamily: 'Manrope, sans-serif', fontWeight: 500, fontSize: '12px', letterSpacing: '0.6px', textTransform: 'uppercase' }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#F5F1EA'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = 'rgba(245,241,234,0.6)'}>
              {link}
            </a>
          )}
        </nav>

        {/* Copyright */}
        <p className="text-xs tracking-wider" style={{ color: 'rgba(245,241,234,0.45)', fontFamily: 'Manrope, sans-serif', fontWeight: 400 }}>© 2026 VELLASOCIAL

        </p>
      </div>
    </footer>);

}