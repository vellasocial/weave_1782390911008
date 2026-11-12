'use client';
import { useState, useRef, useEffect } from 'react';

interface VideoCard {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  accent?: boolean;
  // Replace these src values with your actual bundled video file paths in /public/assets/videos/
  src: string;
  poster: string;
  size: 'normal' | 'tall' | 'wide';
}

const videos: VideoCard[] = [
  {
    id: 1,
    title: 'Midnight Jacquard',
    subtitle: 'SS2025 Collection',
    tag: 'Jacquard',
    src: '/assets/videos/video-1.mp4',
    poster: 'https://images.unsplash.com/photo-1636545703053-b5cad2bfb499?w=400&q=80',
    size: 'tall',
  },
  {
    id: 2,
    title: 'Coral Ikat',
    subtitle: 'Handwoven sampling',
    tag: 'Handwoven',
    src: '/assets/videos/video-2.mp4',
    poster: 'https://images.unsplash.com/photo-1643641016147-d2526c3678af?w=400&q=80',
    size: 'normal',
  },
  {
    id: 3,
    title: 'Linen Repeat',
    subtitle: 'Interior upholstery',
    tag: 'Interiors',
    accent: true,
    src: '/assets/videos/video-3.mp4',
    poster: 'https://img.rocket.new/generatedImages/rocket_gen_img_12f3cc34e-1769726837923.png',
    size: 'normal',
  },
  {
    id: 4,
    title: 'Digital Floral',
    subtitle: 'Print-on-demand',
    tag: 'Digital',
    src: '/assets/videos/video-4.mp4',
    poster: 'https://images.unsplash.com/photo-1587828999533-2c49ab3e53ad?w=400&q=80',
    size: 'tall',
  },
  {
    id: 5,
    title: 'Velvet Brocade',
    subtitle: 'Luxury fashion house',
    tag: 'Brocade',
    accent: true,
    src: '/assets/videos/video-5.mp4',
    poster: 'https://images.unsplash.com/photo-1582414195114-4086602f75d4?w=400&q=80',
    size: 'normal',
  },
  {
    id: 6,
    title: 'Silk Shibori',
    subtitle: 'Tie-dye technique',
    tag: 'Shibori',
    src: '/assets/videos/video-6.mp4',
    poster: 'https://img.rocket.new/generatedImages/rocket_gen_img_1b224ec88-1771858509468.png',
    size: 'normal',
  },
];

function VideoCard({ card }: { card: VideoCard }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && !hasError) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {
        // Autoplay with sound may be blocked; fall back to muted
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => setHasError(true));
        }
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const heightClass = card.size === 'tall' ? 'row-span-2' : 'row-span-1';

  return (
    <div
      className={`relative rounded-2xl overflow-hidden cursor-pointer group ${heightClass}`}
      style={{
        border: '1px solid rgba(196,181,247,0.1)',
        background: 'var(--loom-black-2)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 9:16 video container */}
      <div className="relative w-full h-full" style={{ aspectRatio: '9/16' }}>
        {/* Poster image shown when not hovered */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.poster}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: isHovered ? 0 : 1 }}
        />

        {/* Video element */}
        <video
          ref={videoRef}
          src={card.src}
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: isHovered && !hasError ? 1 : 0 }}
          onError={() => setHasError(true)}
        />

        {/* Iridescent overlay on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{
            opacity: isHovered ? 1 : 0,
            background:
              'linear-gradient(135deg, rgba(196,181,247,0.08) 0%, rgba(217,70,168,0.06) 50%, transparent 100%)',
          }}
        />

        {/* Tag badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="font-mono text-[10px] px-2 py-1 rounded-full tracking-wider uppercase"
            style={{
              background: card.accent
                ? 'rgba(217,70,168,0.3)'
                : 'rgba(196,181,247,0.15)',
              border: `1px solid ${card.accent ? 'rgba(217,70,168,0.5)' : 'rgba(196,181,247,0.3)'}`,
              color: card.accent ? '#D946A8' : '#C4B5F7',
            }}
          >
            {card.tag}
          </span>
        </div>

        {/* Sound indicator */}
        <div
          className="absolute top-3 right-3 z-10 transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(13,13,18,0.7)', border: '1px solid rgba(196,181,247,0.2)' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-lavender">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
            </svg>
          </div>
        </div>

        {/* Bottom info gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 p-4 transition-all duration-400"
          style={{
            background: 'linear-gradient(to top, rgba(13,13,18,0.95) 0%, transparent 100%)',
            transform: isHovered ? 'translateY(0)' : 'translateY(4px)',
            opacity: isHovered ? 1 : 0.7,
          }}
        >
          <p className="font-manrope font-semibold text-pearl text-sm leading-tight">{card.title}</p>
          <p className="font-mono text-[10px] text-lavender/70 mt-0.5">{card.subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export default function VideoPortfolioPage() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const items = sectionRef.current?.querySelectorAll('.reveal-up');
    items?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen" style={{ background: 'var(--loom-black)' }}>
      {/* Back link */}
      <div className="pt-8 px-6 md:px-12">
        <a
          href="/home"
          className="inline-flex items-center gap-2 font-mono text-xs text-pearl/40 hover:text-pearl/80 transition-colors duration-300 tracking-wider uppercase"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M5 12l7-7M5 12l7 7" />
          </svg>
          Back
        </a>
      </div>

      <section ref={sectionRef} className="py-16 px-6 md:px-12">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-12 reveal-up">
          <span className="font-mono text-xs text-lavender/60 tracking-[0.2em] uppercase block mb-3">
            — Video Portfolio
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h1
              className="font-manrope font-semibold text-pearl leading-none tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Motion Library
            </h1>
            <p className="font-mono text-sm text-pearl/40 max-w-xs leading-relaxed">
              Hover any card to play. Sound on.
            </p>
          </div>
        </div>

        {/* Upload note */}
        <div
          className="max-w-7xl mx-auto mb-10 reveal-up px-5 py-4 rounded-xl"
          style={{ background: 'rgba(196,181,247,0.06)', border: '1px solid rgba(196,181,247,0.12)' }}
        >
          <p className="font-mono text-xs text-lavender/60 leading-relaxed">
            <span className="text-lavender/90">To add your videos:</span> place your{' '}
            <code className="text-magenta/80">.mp4</code> files in{' '}
            <code className="text-magenta/80">public/assets/videos/</code> named{' '}
            <code className="text-magenta/80">video-1.mp4</code> through{' '}
            <code className="text-magenta/80">video-6.mp4</code>, then update the{' '}
            <code className="text-magenta/80">poster</code> images and titles in{' '}
            <code className="text-magenta/80">video-portfolio/page.tsx</code>.
          </p>
        </div>

        {/* Bento grid — asymmetric, 9:16 cards */}
        <div
          className="max-w-7xl mx-auto reveal-up"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gridAutoRows: '280px',
            gap: '16px',
          }}
        >
          {videos.map((card) => (
            <VideoCard key={card.id} card={card} />
          ))}
        </div>

        {/* Stats row */}
        <div
          className="max-w-7xl mx-auto mt-16 pt-12 border-t reveal-up"
          style={{ borderColor: 'rgba(196,181,247,0.1)' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { value: '9:16', label: 'Aspect Ratio' },
              { value: '6', label: 'Video Slots' },
              { value: '∞', label: 'Loop Playback' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <span
                  className="font-manrope font-semibold"
                  style={{
                    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                    background: 'linear-gradient(135deg, #C4B5F7, #D946A8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {stat.value}
                </span>
                <span className="font-mono text-xs text-pearl/40 tracking-wider uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
