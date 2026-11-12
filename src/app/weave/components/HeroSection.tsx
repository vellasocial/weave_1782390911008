'use client';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const fallback = setTimeout(() => setVideoReady(true), 1500);
    return () => clearTimeout(fallback);
  }, []);

  const videoStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    minWidth: '100%',
    minHeight: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
  };

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '100svh', minHeight: '640px', background: '#0B0B0D' }}>
      {/* Background video */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 1, opacity: videoReady ? 1 : 0, transition: 'opacity 800ms ease' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setVideoReady(true)}
          className="hidden md:block"
          style={videoStyle}>
          <source
            src="https://res.cloudinary.com/wle6dmxs/video/upload/v1786177782/new_site_hero_cdhtvq.mp4"
            type="video/mp4" />
        </video>
        <video
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setVideoReady(true)}
          className="block md:hidden"
          style={videoStyle}>
          <source
            src="https://res.cloudinary.com/wle6dmxs/video/upload/v1786180400/mobile_hero_kced32.mp4"
            type="video/mp4" />
        </video>
      </div>

      {/* Darkening overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 2,
          background:
            'linear-gradient(to bottom, rgba(11,11,13,0.72) 0%, rgba(11,11,13,0.62) 45%, rgba(11,11,13,0.92) 100%)'
        }} />

      {/* Hero content */}
      <div className="absolute inset-0 flex flex-col justify-end" style={{ zIndex: 10 }}>
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <p
            className="type-label hero-fade mb-6"
            style={{ animationDelay: '0ms' }}>
            PREMIUM AI CREATIVE STUDIO
          </p>

          <h1 className="type-hero mb-8 max-w-[1100px]" style={{ color: '#F2EFE9' }}>
            <span className="hero-line" style={{ animationDelay: '150ms' }}>Every brand</span>
            <span className="hero-line" style={{ animationDelay: '300ms' }}>deserves desire.</span>
          </h1>

          <p
            className="type-body hero-fade max-w-[560px] mb-10"
            style={{ animationDelay: '600ms' }}>
            Most brands in your field look the same. Yours shouldn&apos;t. Cinematic AI films, characters and ads, with no shoot day.
          </p>

          <div
            className="hero-fade flex flex-col md:flex-row md:items-center gap-4"
            style={{ animationDelay: '800ms' }}>
            <button
              type="button"
              onClick={() => {
                const target = document.getElementById('cta');
                target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="btn-primary btn-block-mobile">
              BOOK A CALL
            </button>
            <button
              type="button"
              onClick={() => {
                const target = document.getElementById('services') || document.getElementById('portfolio');
                target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="btn-secondary btn-block-mobile">
              VIEW THE WORK
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}