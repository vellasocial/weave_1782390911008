'use client';
import { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function ParallaxInterior() {
  const innerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          const section = sectionRef?.current;
          const inner = innerRef?.current;
          if (!section || !inner) return;
          const rect = section.getBoundingClientRect();
          const progress = -rect.top / (rect.height + window.innerHeight);
          inner.style.transform = `translateY(${progress * 80}px)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '85vh' }}>

      {/* Parallax image */}
      <div
        ref={innerRef}
        className="absolute inset-0 scale-110"
        style={{ willChange: 'transform' }}>
        {/* Mobile image */}
        <AppImage
          src="/assets/images/luke_mobile-1782429219637.jpg"
          alt="Luke, the designer behind Weave"
          fill
          className="object-cover w-full h-full md:hidden" />
        {/* Desktop image */}
        <AppImage
          src="/assets/images/mlmlm-1782425174123.jpg"
          alt="Luke, the designer behind Weave"
          fill
          className="object-cover w-full h-full hidden md:block" />
      </div>

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.10) 100%)'
        }} />

      {/* About Me content */}
      <div className="absolute inset-0 flex items-center">
        <div className="px-10 md:px-20 max-w-xl">
          {/* Label */}
          <p
            className="text-xs uppercase tracking-[0.25em] mb-4 font-medium"
            style={{ color: 'rgba(196,181,247,0.85)' }}>
            About Me
          </p>

          {/* Name */}
          <h2
            className="text-4xl md:text-5xl font-semibold text-white mb-2 leading-tight"
            style={{ letterSpacing: '-0.02em' }}>
            Luke
          </h2>

          {/* Title */}
          <p
            className="text-base md:text-lg font-light mb-6"
            style={{ color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>
            Founder &amp; Creative Director
          </p>

          {/* Divider */}
          <div
            className="w-12 h-px mb-6"
            style={{
              background: 'linear-gradient(90deg, rgba(196,181,247,0.8), rgba(217,70,168,0.6))'
            }} />

          {/* Bio */}
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.72)', maxWidth: '38ch' }}>I'm Luke, the founder of Vella Social. Recently i visited Bali and i couldn't ignore how many developments sat unfinished in a market this hot, often let down by marketing that never gave buyers a reason to act. I started this agency to change that, with cinematic AI-driven marketing campaigns built to sell projects before a buyer ever sets foot on site.

          </p>
        </div>
      </div>

      {/* Iridescent bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(196,181,247,0.5), rgba(217,70,168,0.5), rgba(196,181,247,0.3), transparent)'
        }} />

    </div>);

}