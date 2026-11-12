'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import AppImage from '@/components/ui/AppImage';
import CharactersLocations from './CharactersLocations';
import ServiceSplitIndex from './ServiceSplitIndex';
import RenderToReality from '@/app/weave/components/RenderToReality';
import { TierBanner, ServiceSection, ComingSoonFrame } from './SectionParts';

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

const PLACEHOLDER_POINTS: [string, string, string] = ['Placeholder: key deliverable one', 'Placeholder: key deliverable two', 'Placeholder: key deliverable three'];

interface VideoSlotProps {
  aspect?: string;
  tagText?: string;
  title?: string;
  caption?: string;
  image?: string;
  alt: string;
  video?: string;
  soundLabel?: string;
  onPlay: (url: string) => void;
}

function VideoSlot({ aspect = '16/9', tagText, title, caption, image, alt, video, soundLabel, onPlay }: VideoSlotProps) {
  if (!image) {
    return (
      <div>
        <ComingSoonFrame aspect={aspect} />
        {(title || caption) && (
          <div className="pt-3">
            {title && <p className="leading-tight" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '16px', color: '#F5F1EA' }}>{title}</p>}
            {caption && <p className="mt-1" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', lineHeight: 1.6, color: '#B8B0A4' }}>{caption}</p>}
          </div>
        )}
      </div>
    );
  }
  return (
    <div
      className="overflow-hidden media-zoom"
      style={{ border: '1px solid rgba(242,239,233,0.10)', background: '#141417', borderRadius: '4px' }}>
      <div
        className="relative w-full overflow-hidden flex items-center justify-center"
        style={{ aspectRatio: aspect, cursor: video ? 'pointer' : 'default' }}
        onClick={() => { if (video) onPlay(video); }}>
        {image ? (
          <AppImage src={image} alt={alt} fill className="object-cover w-full h-full" />
        ) : (
          <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8A857C' }}>
            Coming soon
          </span>
        )}
        {tagText && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className="px-3 py-1 uppercase"
              style={{
                background: 'rgba(11,11,13,0.7)',
                border: '1px solid rgba(242,239,233,0.10)',
                color: '#F2EFE9',
                borderRadius: '9999px',
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '0.14em'
              }}>
              {tagText}
            </span>
          </div>
        )}
        {soundLabel && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="uppercase" style={{ color: '#F2EFE9', fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.14em' }}>
              {soundLabel}
            </span>
          </div>
        )}
      </div>
      {(title || caption) && (
        <div className="px-4 py-4">
          {title && (
            <p className="leading-tight" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '20px', color: '#F2EFE9' }}>{title}</p>
          )}
          {caption && (
            <p className="mt-2" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '15px', lineHeight: 1.6, color: '#B9B3A8' }}>{caption}</p>
          )}
        </div>
      )}
    </div>
  );
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

  const handlePlayVideoUrl = useCallback((url: string) => {
    if (!url) return;
    if (nativeVideoRef.current) {
      nativeVideoRef.current.pause();
      nativeVideoRef.current.currentTime = 0;
    }
    setIsMuted(false);
    setPlayingVideo(url);
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

  const isNative = playingVideo ? isDirectMp4(playingVideo) : false;

  return (
    <div
      id="portfolio"
      ref={sectionRef}
      className="relative pb-24 px-6 md:px-12 overflow-x-hidden"
      style={{ background: '#0D0D12' }}>
      <span id="services" aria-hidden="true" className="absolute top-0 left-0 w-0 h-0" />
      
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

      {/* ── WHAT WE MAKE OVERVIEW ───────────────────────────────────────────── */}
      <ServiceSplitIndex />
      {/* ── END WHAT WE MAKE ────────────────────────────────────────────────── */}

      {/* ── SIGNATURE WORK BANNER ───────────────────────────────────────────── */}
      <TierBanner
        title="Signature Work"
        subtext="Premium films, made to set the standard for a brand."
        image="https://res.cloudinary.com/wle6dmxs/image/upload/v1791173786/BB_Thumbnail_pact37.png"
        alt="Bali Beans film still behind the Signature Work banner" />
      {/* ── 01 SIGNATURE FILMS ──────────────────────────────────────────────── */}
      <ServiceSection
        id="signature-films"
        index={1}
        num="01"
        label="Signature Films"
        heading="The hero film your brand is remembered by."
        description="Our highest tier. Full cinematic production, built shot by shot for launches and flagship campaigns."
        points={PLACEHOLDER_POINTS}
        bestFor="launches and flagship brand campaigns"
        price="$350"
        service="Signature Films">
        <div className="grid grid-cols-2 gap-4">
          {aiFilmsData.map((cell, i) =>
          <div
            key={cell.id}
            className={`iridescent-cell overflow-hidden cursor-pointer ${i === 0 ? 'col-span-2' : ''}`}
            onMouseEnter={() => setHoveredId(cell.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handlePlayClick(cell)}>
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: i === 0 ? '16/9' : '4/5' }}>
              <AppImage
                src={cell.image}
                alt={cell.alt}
                fill
                className="cell-img object-cover w-full h-full" />
              {cell.video &&
              <div
                className="absolute inset-0 z-10 flex items-center justify-center"
                style={{ background: 'rgba(11,11,13,0.35)' }}>
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{ width: '52px', height: '52px', background: 'rgba(11,11,13,0.6)', border: '1px solid rgba(242,239,233,0.35)', backdropFilter: 'blur(6px)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#F2EFE9', marginLeft: '4px' }}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              }
              {cell.tag &&
              <div className="absolute top-3 left-3 z-10">
                <span
                  className="px-3 py-1 uppercase"
                  style={{ background: 'rgba(11,11,13,0.7)', border: '1px solid rgba(242,239,233,0.10)', color: '#F2EFE9', borderRadius: '9999px', fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.14em' }}>
                  {cell.tag}
                </span>
              </div>
              }
            </div>
            <div className="px-4 py-3" style={{ background: '#141417' }}>
              <p className="leading-tight" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '18px', color: '#F2EFE9' }}>{cell.title}</p>
              <p className="mt-1" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', color: '#8A857C' }}>{cell.subtitle}</p>
            </div>
          </div>
          )}
        </div>
      </ServiceSection>

      {/* ── 02 REALISM STORYTELLING ─────────────────────────────────────────── */}
      <ServiceSection
        id="realism-storytelling"
        index={2}
        num="02"
        label="Realism Storytelling"
        heading="Real stories. Footage that feels lived in."
        description="Documentary-style films that tell the human story behind a brand, built from real people, real history and real places."
        points={PLACEHOLDER_POINTS}
        bestFor="heritage brands and founder stories"
        price="$950"
        service="Realism Storytelling">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <VideoSlot
              aspect="16/9"
              tagText="Bali Beans"
              title="The Sudana Family Story"
              caption="A documentary-style film of the family behind Bali Beans, rebuilt from old family photos, then and now."
              image="https://res.cloudinary.com/wle6dmxs/image/upload/v1791173786/BB_Thumbnail_pact37.png"
              alt="The Sudana Family Story - Bali Beans documentary-style film"
              onPlay={(v) => handlePlayVideoUrl(v)} />
          </div>
          <VideoSlot
            aspect="16/9"
            title="Video title"
            caption="Video caption coming soon."
            alt="Bali Beans second film placeholder"
            onPlay={(v) => handlePlayVideoUrl(v)} />
          <ComingSoonFrame aspect="16/9" />
        </div>
      </ServiceSection>

      {/* ── 03 LUXURY PROPERTY FILMS ────────────────────────────────────────── */}
      <ServiceSection
        id="luxury-property-films"
        index={3}
        num="03"
        label="Luxury Property Films"
        heading="Sell it before it's built."
        description="Cinematic villa and resort films made from your renders and plans. No shoot day, no waiting for construction."
        points={PLACEHOLDER_POINTS}
        bestFor="developers and villa or resort owners"
        price="$350"
        service="Luxury Property Films">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2"><ComingSoonFrame aspect="16/9" /></div>
          <ComingSoonFrame aspect="16/9" />
          <ComingSoonFrame aspect="16/9" />
        </div>
      </ServiceSection>

      {/* ── 04 CHARACTERS & LOCATIONS ───────────────────────────────────────── */}
      <ServiceSection
        id="characters-locations"
        index={4}
        num="04"
        label="Characters & Locations"
        heading="Consistent by design."
        description="A face and a world you own: custom characters and locations that stay consistent across every film."
        points={PLACEHOLDER_POINTS}
        bestFor="brands that need a recurring face or setting"
        price="$250"
        service="Characters & Locations">
        <CharactersLocations />
      </ServiceSection>
      {/* ── END CHARACTERS & LOCATIONS ──────────────────────────────────────── */}

      {/* ── GROWTH WORK BANNER ──────────────────────────────────────────────── */}
      <TierBanner
        title="Growth Work"
        subtext="Content built to convert, test and scale."
        image="https://res.cloudinary.com/wle6dmxs/image/upload/v1785847539/3_bedroom_Pool_iegaig.png"
        alt="The Sanctuary still behind the Growth Work banner" />

      {/* ── 05 TALKING HEAD & VSL ───────────────────────────────────────────── */}
      <ServiceSection
        id="talking-head-vsl"
        index={5}
        num="05"
        label="Talking Head & VSL"
        heading="A face that sells, every week."
        description="Presenter-led video sales letters and talking-head content, with no filming. Use your own presenter, or add a custom AI character as a consistent on-screen host."
        points={PLACEHOLDER_POINTS}
        bestFor="coaches, founders and offers that need a presenter"
        price="$250"
        service="Talking Head & VSL">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3"><ComingSoonFrame aspect="16/9" /></div>
          {[1, 2, 3].map((n) => <ComingSoonFrame key={n} aspect="9/16" />)}
        </div>
      </ServiceSection>

      {/* ── 06 RENDER TO REALITY ────────────────────────────────────────────── */}
      <ServiceSection
        id="render-to-reality"
        index={6}
        num="06"
        label="Render to Reality"
        heading="From CGI to photograph."
        description="Send us your renders. We turn them into images that look like they were shot on location. Drag the slider to compare."
        points={PLACEHOLDER_POINTS}
        bestFor="architects and developers with CGI renders"
        price="$25"
        service="Render to Reality">
        <RenderToReality />
      </ServiceSection>

      {/* ── 07 PERFORMANCE ADS ──────────────────────────────────────────────── */}
      <ServiceSection
        id="performance-ads"
        index={7}
        num="07"
        label="Performance Ads"
        heading="Ads built for volume."
        description="Short vertical ads made fast and in batches, so you can test hooks and keep your feed fresh."
        points={PLACEHOLDER_POINTS}
        bestFor="brands testing hooks and feeding social channels"
        price="$150"
        service="Performance Ads">
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {visibleCells.filter((cell) => cell.id !== 18).map((cell) =>
          <div
            key={cell.id}
            className="iridescent-cell overflow-hidden cursor-pointer"
            onMouseEnter={() => setHoveredId(cell.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handlePlayClick(cell)}>
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '9/16' }}>
              <AppImage
                src={cell.image}
                alt={cell.alt}
                fill
                className="cell-img object-cover w-full h-full" />
              {cell.video &&
              <div
                className="absolute inset-0 z-10 flex items-center justify-center"
                style={{ background: 'rgba(11,11,13,0.35)' }}>
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{ width: '44px', height: '44px', background: 'rgba(11,11,13,0.6)', border: '1px solid rgba(242,239,233,0.35)', backdropFilter: 'blur(6px)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#F2EFE9', marginLeft: '3px' }}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              }
              {cell.tag &&
              <div className="absolute top-2 left-2 z-10">
                <span
                  className="px-2 py-1 uppercase"
                  style={{ background: 'rgba(11,11,13,0.7)', border: '1px solid rgba(242,239,233,0.10)', color: '#F2EFE9', borderRadius: '9999px', fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '10px', letterSpacing: '0.14em' }}>
                  {cell.tag}
                </span>
              </div>
              }
            </div>
            <div className="px-3 py-3" style={{ background: '#141417' }}>
              <p className="leading-tight" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#F2EFE9' }}>{cell.title}</p>
              <p className="mt-1" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '13px', color: '#8A857C' }}>{cell.subtitle}</p>
            </div>
          </div>
          )}
        </div>
      </ServiceSection>
      {/* ── END GROWTH WORK AREA ────────────────────────────────────────────── */}

      {/* Stats row */}
      <div className="max-w-7xl mx-auto mt-16 pt-12 border-t"
      style={{ borderColor: 'rgba(242,239,233,0.10)' }}>
        <span className="type-body block">
          Every video is built from a full production toolkit: <br />
          script, voiceover, AI photo, AI video, editing, sound design, original music, and captions. <br />
          Tailored to what each project needs.
        </span>
      </div>
    </div>
  );
}