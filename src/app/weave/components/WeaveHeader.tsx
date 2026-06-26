'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';


export default function WeaveHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ?
      'py-3 bg-loom-black/90 backdrop-blur-md border-b border-lavender-border' : 'py-6 bg-transparent'}`
      }>

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-center md:justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/assets/images/VELLASOCIAL_logo_CONDENSED-1782391516452.png"
            alt="Vella Social Logo"
            width={187}
            height={62}
            className="object-contain brightness-0 invert" />

        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['Portfolio', 'Process', 'About']?.map((item) =>
          <a
            key={item}
            href={`#${item?.toLowerCase()}`}
            className="font-mono text-xs text-pearl/50 hover:text-pearl transition-colors duration-300 tracking-wider uppercase">

              {item}
            </a>
          )}
        </nav>

        {/* CTA */}
        <button
          onClick={() => {
            const panel = document.getElementById('commission-panel');
            if (panel) {
              panel?.classList?.add('open');
              document.body.style.overflow = 'hidden';
            }
          }}
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full border border-magenta/50 text-magenta font-mono text-xs tracking-wider uppercase hover:bg-magenta/10 transition-all duration-300">

          ENQUIRE
        </button>
      </div>
    </header>);

}