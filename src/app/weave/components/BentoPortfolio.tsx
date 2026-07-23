'use client';
import { useState, useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

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
  category: ['Ads'],
  size: 'wide',
  image: "https://cdn-cf-east.streamable.com/image/05o9cr.jpg",
  alt: 'The Sanctuary - Tranquility Bali campaign video',
  tag: 'ad',
  video: 'https://streamable.com/e/05o9cr'
},
{
  id: 19,
  title: 'The Sanctuary',
  subtitle: 'Tranquility Bali',
  category: ['Ads'],
  size: 'wide',
  image: "https://cdn-cf-east.streamable.com/image/kzh7qy.jpg",
  alt: 'The Sanctuary - Tranquility Bali original campaign video',
  tag: 'ad',
  video: 'https://streamable.com/e/kzh7qy'
},
{
  id: 1,
  title: 'Nara Villas',
  subtitle: 'Balitecture',
  category: ['Ads'],
  size: 'wide',
  image: "https://cdn-cf-east.streamable.com/image/ugrvg7.jpg",
  alt: 'Close-up of midnight blue jacquard weave with gold thread repeats',
  tag: 'ad',
  video: 'https://streamable.com/e/v9rquu'
},
{
  id: 15,
  title: 'The Nest',
  subtitle: 'Roam International',
  category: ['Ads'],
  size: 'small',
  image: "https://cdn-cf-east.streamable.com/image/hxxe4z.jpg",
  alt: 'Digital campaign video reel',
  tag: 'ad',
  video: 'https://streamable.com/e/c5vxww'
},
{
  id: 17,
  title: 'Residence',
  subtitle: 'Element Bali',
  category: ['Ads'],
  size: 'small',
  image: "https://cdn-cf-east.streamable.com/image/bzwwvl.jpg",
  alt: 'Campaign video reel',
  tag: 'ad',
  video: 'https://streamable.com/e/vxf8ih'
}];


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

export default function BentoPortfolio() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [visibleCells, setVisibleCells] = useState<BentoCell[]>(cells);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (playingVideo) {
      document.body.setAttribute('data-video-open', 'true');
    } else {
      document.body.removeAttribute('data-video-open');
    }
    return () => {
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
    // Force all reveal-up elements visible after filter change
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

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-24 px-6 md:px-12"
      style={{ background: 'var(--loom-black)' }}>
      
      {/* Video Lightbox Modal */}
      {playingVideo &&
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.85)' }}
        onClick={() => { setPlayingVideo(null); }}>
          <div
          className="relative w-full max-w-2xl mx-4"
          style={{ aspectRatio: '9/16', maxHeight: '85vh' }}
          onClick={(e) => e.stopPropagation()}>
            <iframe
            key={playingVideo}
            src={`${playingVideo}?autoplay=1&loop=1`}
            title="Video"
            allow="autoplay; fullscreen; encrypted-media"
            allowFullScreen
            className="absolute inset-0 w-full h-full rounded-2xl border-0" />
            <button
            onClick={() => { setPlayingVideo(null); }}
            className="absolute -top-10 right-0 text-white/70 hover:text-white font-mono text-sm tracking-wider uppercase transition-colors">
              ✕ Close
            </button>
          </div>
        </div>
      }

      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-12 reveal-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="font-mono text-xs text-lavender/60 tracking-[0.2em] uppercase block mb-3">
              — Portfolio
            </span>
            <h2
              className="font-manrope font-semibold text-pearl leading-none tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>Ad Library


            </h2>
          </div>
          <p className="font-mono text-sm text-pearl/40 max-w-xs leading-relaxed">Examples of the work we create for projects like yours.

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
            border: '1px solid rgba(196,181,247,0.1)',
            background: 'var(--loom-black-2)',
            width: '240px',
            scrollSnapAlign: 'start',
            transform: hoveredId === cell.id ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            boxShadow: hoveredId === cell.id ? '0 8px 32px rgba(196,181,247,0.18)' : 'none'
          }}
          onMouseEnter={() => setHoveredId(cell.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => cell.video && setPlayingVideo(cell.video)}>
          
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
                    background: 'rgba(196,181,247,0.2)',
                    border: '2px solid rgba(196,181,247,0.7)',
                    backdropFilter: 'blur(6px)',
                    transform: hoveredId === cell.id ? 'scale(1.12)' : 'scale(1)'
                  }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-pearl ml-1">
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
                  'rgba(217,70,168,0.3)' :
                  'rgba(196,181,247,0.15)',
                  border: `1px solid ${cell.accent ? 'rgba(217,70,168,0.5)' : 'rgba(196,181,247,0.3)'}`,
                  color: cell.accent ? '#D946A8' : '#C4B5F7'
                }}>
                
                    {cell.tag}
                  </span>
                </div>
            }

              {/* Bottom info (appears on hover) */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-4 translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-400"
            style={{ background: 'linear-gradient(to top, rgba(13,13,18,0.95) 0%, transparent 100%)' }}>
                <p className="font-manrope font-semibold text-pearl text-sm leading-tight">{cell.title}</p>
                <p className="font-mono text-[10px] text-lavender/70 mt-0.5">{cell.subtitle}</p>
              </div>
            </div>

            {/* Card footer (always visible) */}
            <div className="px-4 py-3 flex items-center justify-between" style={{ background: 'var(--loom-black-2)' }}>
              <div>
                <p className="font-manrope text-sm font-medium text-pearl/90 leading-tight">{cell.title}</p>
                <p className="font-mono text-[10px] text-pearl/40 mt-0.5">{cell.subtitle}</p>
              </div>
              <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-lavender/40 flex-shrink-0">
              
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Stats row */}
      <div className="max-w-7xl mx-auto mt-16 pt-12 border-t reveal-up"
      style={{ borderColor: 'rgba(196,181,247,0.1)' }}>
        <span
          className="font-manrope font-semibold"
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            background: 'linear-gradient(135deg, #C4B5F7, #D946A8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
          Every ad is built from a full production toolkit: script, voiceover, AI photo, AI video, editing, sound design, original music, and captions, tailored to what each ad needs.
        </span>
      </div>
    </section>);

}