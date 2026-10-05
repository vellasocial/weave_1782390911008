'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import AppImage from '@/components/ui/AppImage';
import CharactersLocations from './CharactersLocations';

type FilterType = 'All';

interface BentoCell {
  id: number;
  title: string;
  subtitle: string;
  category: FilterType[];
  size: 'small' | 'medium' | 'wide' | 'tall' | 'large';
  image: string;
  alt: string;
  tag?: string;
  accent?: boolean;
  video?: string;
}

const cells: BentoCell[] = [
{
  id: 18,
  title: 'The Sanctuary',
  subtitle: 'Tranquility Bali',
  category: ['All'],
  size: 'wide',
  image: "https://res.cloudinary.com/wle6dmxs/image/upload/v1785847539/3_bedroom_Pool_iegaig.png",
  alt: 'The Sanctuary - Tranquility Bali campaign video',
  tag: 'ad',
  video: 'https://res.cloudinary.com/wle6dmxs/video/upload/03._The_Investor_Numbers_Ad_-_The_Three-Bedroom_By_the_Figures_ylttga.mp4'
},
{
  id: 19,
  title: 'The Sanctuary',
  subtitle: 'Tranquility Bali',
  category: ['All'],
  size: 'wide',
  image: "https://res.cloudinary.com/wle6dmxs/image/upload/v1785847592/1_dipir9.png",
  alt: 'The Sanctuary - Tranquility Bali original campaign video',
  tag: 'ad',
  video: 'https://res.cloudinary.com/wle6dmxs/video/upload/Three_Bedroom_Hero_evdphr.mp4'
},
{
  id: 1,
  title: 'Nara Villas',
  subtitle: 'Balitecture',
  category: ['All'],
  size: 'wide',
  image: "https://res.cloudinary.com/wle6dmxs/image/upload/v1785846311/Balitecture_-_Nara_Villas_3_bedroom_fzc2g6_poster.jpg",
  alt: 'Close-up of midnight blue jacquard weave with gold thread repeats',
  tag: 'ad',
  video: 'https://res.cloudinary.com/wle6dmxs/video/upload/Balitecture_-_Nara_Villas_3_bedroom_fzc2g6.mp4'
},
{
  id: 15,
  title: 'The Nest',
  subtitle: 'Roam International',
  category: ['All'],
  size: 'small',
  image: "https://res.cloudinary.com/wle6dmxs/image/upload/v1785847664/hf_20260516_101101_9ba0c234-0cb5-4a27-ad08-8a601ac33e47_xyohvg.png",
  alt: 'Digital campaign video reel',
  tag: 'ad',
  video: 'https://res.cloudinary.com/wle6dmxs/video/upload/The_Nest_5_xyo8ln.mp4'
}];

// ─── AI Films ────────────────────────────────────────────────────────────────
const aiFilmsData: BentoCell[] = [
  {
    id: 1001,
    video: 'https://res.cloudinary.com/wle6dmxs/video/upload/v1791172771/Bali_Beans_Reel_pgvb3x.mp4',
    image: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791173786/BB_Thumbnail_pact37.png',
    title: 'Bali Beans',
    subtitle: 'Client Feature',
    alt: 'Bali Beans Reel',
    category: ['All'],
    size: 'wide',
    tag: 'ai film',
  },
  {
    id: 1002,
    video: 'https://res.cloudinary.com/wle6dmxs/video/upload/v1791172768/The_Hum_Reel_tu7u7m.mp4',
    image: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791173786/Hum_Thumbnail_g5wzbs.png',
    title: 'The Hum',
    subtitle: 'Client Feature',
    alt: 'The Hum Reel',
    category: ['All'],
    size: 'wide',
    tag: 'ai film',
  },
  {
    id: 1003,
    video: 'https://res.cloudinary.com/wle6dmxs/video/upload/v1791172768/Sanaya_Reel_dohd3g.mp4',
    image: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791173786/Sanaya_Thumbnail_mjghvk.png',
    title: 'Sanaya',
    subtitle: 'Client Feature',
    alt: 'Sanaya Reel',
    category: ['All'],
    size: 'wide',
    tag: 'ai film',
  },
];
// ─────────────────────────────────────────────────────────────────────────────

const FILTERS: FilterType[] = ['All'];

const sizeClasses: Record<BentoCell['size'], string> = {
  small: 'col-span-2 row-span-1',
  medium: 'col-span-3 row-span-2',
  wide: 'col-span-5 row-span-2',
  tall: 'col-span-2 row-span-3',
  large: 'col-span-4 row-span-2'
};

const heightClasses: Record<BentoCell['size'], string> = {
  small: 'h-44',
  medium: 'h-64',
  wide: 'h-64',
  tall: 'h-96',
  large: 'h-64'
};

// Returns true if the URL is a direct video file (not an embed page)
function isDirectMp4(url: string): boolean {
  return url.includes('res.cloudinary.com') && url.includes('/video/upload/') && url.endsWith('.mp4');
}

// Build iframe src for Cloudinary embed URLs
function buildIframeSrc(url: string): string {
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}autoplay=1&muted=0&controls=1&loop=0`;
}

export default function BentoPortfolio() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [visibleCells, setVisibleCells] = useState<BentoCell[]>(cells);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const nativeVideoRef = useRef<HTMLVideoElement>(null);

  const closeVideo = useCallback(() => {
    // Pause and reset native video
    if (nativeVideoRef.current) {
      nativeVideoRef.current.pause();
      nativeVideoRef.current.currentTime = 0;
    }
    setPlayingVideo(null);
    setIsMuted(false);
    window.dispatchEvent(new CustomEvent('weave-video-playing', { detail: { playing: false } }));
  }, []);

  const handlePlayClick = useCallback((cell: BentoCell) => {
    if (!cell.video) return;

    // Stop any currently playing native video
    if (nativeVideoRef.current) {
      nativeVideoRef.current.pause();
      nativeVideoRef.current.currentTime = 0;
    }

    setIsMuted(false);
    setPlayingVideo(cell.video);
    window.dispatchEvent(new CustomEvent('weave-video-playing', { detail: { playing: true } }));
  }, []);

  // When a native video is ready, attempt to play with sound; fall back to muted
  const handleNativeVideoReady = useCallback(() => {
    const video = nativeVideoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Browser blocked unmuted autoplay — play muted instead
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {});
      });
    }
  }, []);

  const handleUnmute = useCallback(() => {
    const video = nativeVideoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    setIsMuted(false);
  }, []);

  useEffect(() => {
    if (playingVideo) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.setAttribute('data-video-open', 'true');
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.removeAttribute('data-video-open');
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.removeAttribute('data-video-open');
    };
  }, [playingVideo]);

  useEffect(() => {
    if (activeFilter === 'All') {
      setVisibleCells(cells);
    } else {
      setVisibleCells(cells.filter((c) => c.category.includes(activeFilter)));
    }
  }, [activeFilter]);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.reveal-up');
    items?.forEach((el) => el.classList.add('visible'));
  }, [visibleCells]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const items = sectionRef.current?.querySelectorAll('.reveal-up');
    items?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [visibleCells]);

  const isNative = playingVideo ? isDirectMp4(playingVideo) : false;

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-24 px-6 md:px-12"
      style={{ background: 'var(--loom-black)' }}>
      
      {/* ── VIDEO LIGHTBOX MODAL ─────────────────────────────────────────────── */}
      {playingVideo && (
        <div
          ref={videoContainerRef}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.95)' }}
          onClick={closeVideo}>

          {/* Close button */}
          <button
            onClick={(e) => { e.stopPropagation(); closeVideo(); }}
            className="fixed top-4 right-4 z-[9999] flex items-center gap-1.5 text-white font-mono text-sm tracking-wider uppercase transition-colors"
            style={{
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '999px',
              padding: '8px 16px',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              touchAction: 'manipulation'
            }}>
            ✕ Close
          </button>

          <div
            className="relative w-full max-w-2xl mx-4"
            style={{ aspectRatio: '9/16', maxHeight: '85vh' }}
            onClick={(e) => e.stopPropagation()}>

            {isNative ? (
              /* ── Native <video> for direct .mp4 files (AI Films) ── */
              <>
                <video
                  ref={nativeVideoRef}
                  key={playingVideo}
                  src={playingVideo}
                  playsInline
                  controls
                  preload="auto"
                  onCanPlay={handleNativeVideoReady}
                  className="absolute inset-0 w-full h-full rounded-2xl"
                  style={{ objectFit: 'contain', background: '#000' }}
                />
                {/* Muted fallback unmute button */}
                {isMuted && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleUnmute(); }}
                    className="absolute bottom-16 left-1/2 z-20 flex items-center gap-2 font-mono text-xs tracking-wider uppercase"
                    style={{
                      transform: 'translateX(-50%)',
                      background: 'rgba(0,0,0,0.75)',
                      border: '1px solid rgba(255,255,255,0.4)',
                      borderRadius: '999px',
                      padding: '8px 20px',
                      color: '#F5F1EA',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      touchAction: 'manipulation'
                    }}>
                    🔊 Tap to unmute
                  </button>
                )}
              </>
            ) : (
              /* ── Iframe for Cloudinary embed URLs (Ad Library) ── */
              <iframe
                ref={iframeRef}
                key={playingVideo}
                src={buildIframeSrc(playingVideo)}
                title="Video"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full rounded-2xl border-0"
              />
            )}
          </div>
        </div>
      )}
      {/* ── END VIDEO LIGHTBOX ───────────────────────────────────────────────── */}

      {/* ── AI FILMS SUBSECTION ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto mb-12 reveal-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span
              className="font-mono text-xs tracking-widest uppercase mb-3 block"
              style={{ color: '#8A7E6D' }}>
              — Portfolio
            </span>
            <h2
              className="font-manrope font-semibold leading-none tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#F5F1EA' }}>
              AI Hero Films
            </h2>
          </div>
          <p className="max-w-xs text-base" style={{ color: '#B8B0A4', fontFamily: 'Helvetica, Arial, sans-serif', fontStyle: 'oblique' }}>
            Cinematic hero films created entirely with AI. No crews, no shoot days, no limits.
          </p>
        </div>
      </div>

      {/* AI Films Grid */}
      <div className="max-w-7xl mx-auto flex flex-row gap-4 overflow-x-auto overflow-y-hidden pb-4" style={{ scrollSnapType: 'x mandatory' }}>
        {aiFilmsData.map((cell, idx) =>
        <div
          key={cell.id}
          className="iridescent-cell rounded-2xl overflow-hidden cursor-pointer reveal-up flex-shrink-0"
          style={{
            transitionDelay: `${idx * 60}ms`,
            border: '1px solid rgba(138,126,109,0.15)',
            background: 'var(--loom-black-2)',
            width: '240px',
            scrollSnapAlign: 'start',
            transform: hoveredId === cell.id ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            boxShadow: hoveredId === cell.id ? '0 8px 32px rgba(138,126,109,0.18)' : 'none'
          }}
          onMouseEnter={() => setHoveredId(cell.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => handlePlayClick(cell)}>
          
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '9/16' }}>
            {cell.video ?
            <>
              <AppImage
                src={cell.image}
                alt={cell.alt}
                fill
                className="cell-img object-cover w-full h-full" />
              <div
                className="absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300"
                style={{ background: 'rgba(0,0,0,0.35)', opacity: hoveredId === cell.id ? 1 : 0.7 }}>
                <div
                  className="flex items-center justify-center rounded-full transition-transform duration-300"
                  style={{
                    width: '52px',
                    height: '52px',
                    background: 'rgba(138,126,109,0.2)',
                    border: '2px solid rgba(138,126,109,0.7)',
                    backdropFilter: 'blur(6px)',
                    transform: hoveredId === cell.id ? 'scale(1.12)' : 'scale(1)'
                  }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#F5F1EA', marginLeft: '4px' }}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </> :
            <AppImage
              src={cell.image}
              alt={cell.alt}
              fill
              className="cell-img object-cover w-full h-full" />
            }
            <div className="cell-overlay" />
            {cell.tag &&
            <div className="absolute top-3 left-3 z-10">
              <span
                className="font-mono text-[10px] px-2 py-1 rounded-full tracking-wider uppercase"
                style={{
                  background: 'rgba(138,126,109,0.15)',
                  border: '1px solid rgba(138,126,109,0.35)',
                  color: '#8A7E6D'
                }}>
                {cell.tag}
              </span>
            </div>
            }
            <div className="absolute bottom-0 left-0 right-0 z-10 p-4 translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-400"
              style={{ background: 'linear-gradient(to top, rgba(13,13,18,0.95) 0%, transparent 100%)' }}>
              <p className="font-manrope font-semibold text-sm leading-tight" style={{ color: '#F5F1EA' }}>{cell.title}</p>
              <p className="font-mono text-[10px] mt-0.5" style={{ color: '#8A7E6D' }}>{cell.subtitle}</p>
            </div>
          </div>

          <div className="px-4 py-3 flex items-center justify-between" style={{ background: 'var(--loom-black-2)' }}>
            <div>
              <p className="font-manrope text-sm font-medium leading-tight" style={{ color: 'rgba(245,241,234,0.9)' }}>{cell.title}</p>
              <p className="font-mono text-[10px] mt-0.5" style={{ color: 'rgba(245,241,234,0.4)' }}>{cell.subtitle}</p>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              style={{ color: 'rgba(138,126,109,0.5)', flexShrink: 0 }}>
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </div>
        </div>
        )}
      </div>
      {/* ── END AI FILMS ────────────────────────────────────────────────────── */}

      {/* Generous spacing between AI Films and Ad Library */}
      <div className="max-w-7xl mx-auto" style={{ paddingTop: '80px' }} />

      {/* Section header — Ad Library */}
      <div className="max-w-7xl mx-auto mb-12 reveal-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2
              className="font-manrope font-semibold leading-none tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#F5F1EA' }}>Ad Library
            </h2>
          </div>
          <p className="max-w-xs text-base" style={{ color: '#B8B0A4', fontFamily: 'Helvetica, Arial, sans-serif', fontStyle: 'oblique' }}>Examples of the work we create for projects like yours.
          </p>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto flex flex-row gap-4 overflow-x-auto overflow-y-hidden pb-4" style={{ scrollSnapType: 'x mandatory' }}>
        {visibleCells.map((cell, idx) =>
        <div
          key={cell.id}
          className={`iridescent-cell rounded-2xl overflow-hidden cursor-pointer reveal-up flex-shrink-0`}
          style={{
            transitionDelay: `${idx * 60}ms`,
            border: '1px solid rgba(138,126,109,0.15)',
            background: 'var(--loom-black-2)',
            width: '240px',
            scrollSnapAlign: 'start',
            transform: hoveredId === cell.id ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            boxShadow: hoveredId === cell.id ? '0 8px 32px rgba(138,126,109,0.18)' : 'none'
          }}
          onMouseEnter={() => setHoveredId(cell.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => handlePlayClick(cell)}>
          
            {/* Image */}
            <div className={`relative w-full overflow-hidden`} style={{ aspectRatio: '9/16' }}>
              {cell.video ?
            <>
                  <AppImage
                src={cell.image}
                alt={cell.alt}
                fill
                className="cell-img object-cover w-full h-full" />

                  {/* Play button overlay */}
                  <div
                className="absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300"
                style={{ background: 'rgba(0,0,0,0.35)', opacity: hoveredId === cell.id ? 1 : 0.7 }}>
                    <div
                  className="flex items-center justify-center rounded-full transition-transform duration-300"
                  style={{
                    width: '52px',
                    height: '52px',
                    background: 'rgba(138,126,109,0.2)',
                    border: '2px solid rgba(138,126,109,0.7)',
                    backdropFilter: 'blur(6px)',
                    transform: hoveredId === cell.id ? 'scale(1.12)' : 'scale(1)'
                  }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#F5F1EA', marginLeft: '4px' }}>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                </> :

            <AppImage
              src={cell.image}
              alt={cell.alt}
              fill
              className="cell-img object-cover w-full h-full" />
            }

              {/* Iridescent overlay on hover */}
              <div className="cell-overlay" />

              {/* Tag badge */}
              {cell.tag &&
            <div className="absolute top-3 left-3 z-10">
                  <span
                className="font-mono text-[10px] px-2 py-1 rounded-full tracking-wider uppercase"
                style={{
                  background: cell.accent ?
                  'rgba(138,126,109,0.3)' :
                  'rgba(138,126,109,0.15)',
                  border: `1px solid ${cell.accent ? 'rgba(138,126,109,0.6)' : 'rgba(138,126,109,0.35)'}`,
                  color: '#8A7E6D'
                }}>
                    {cell.tag}
                  </span>
                </div>
            }

              {/* Bottom info (appears on hover) */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-4 translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-400"
            style={{ background: 'linear-gradient(to top, rgba(13,13,18,0.95) 0%, transparent 100%)' }}>
                <p className="font-manrope font-semibold text-sm leading-tight" style={{ color: '#F5F1EA' }}>{cell.title}</p>
                <p className="font-mono text-[10px] mt-0.5" style={{ color: '#8A7E6D' }}>{cell.subtitle}</p>
              </div>
            </div>

            {/* Card footer (always visible) */}
            <div className="px-4 py-3 flex items-center justify-between" style={{ background: 'var(--loom-black-2)' }}>
              <div>
                <p className="font-manrope text-sm font-medium leading-tight" style={{ color: 'rgba(245,241,234,0.9)' }}>{cell.title}</p>
                <p className="font-mono text-[10px] mt-0.5" style={{ color: 'rgba(245,241,234,0.4)' }}>{cell.subtitle}</p>
              </div>
              <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              style={{ color: 'rgba(138,126,109,0.5)', flexShrink: 0 }}>
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* ── CHARACTERS & LOCATIONS ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto" style={{ paddingTop: '80px' }} />
      <CharactersLocations />
      {/* ── END CHARACTERS & LOCATIONS ──────────────────────────────────────── */}

      {/* Stats row */}
      <div className="max-w-7xl mx-auto mt-16 pt-12 border-t reveal-up"
      style={{ borderColor: 'rgba(138,126,109,0.15)' }}>
        <span
          className="font-manrope font-semibold"
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            color: '#B8B0A4'
          }}>
          Every video is built from a full production toolkit: <br />
          script, voiceover, AI photo, AI video, editing, sound design, original music, and captions. <br />
          Tailored to what each project needs.
        </span>
      </div>
    </section>
  );
}