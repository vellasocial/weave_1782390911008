'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import { SlideRow } from './SlideRow';
// Header, points and price are provided by ServiceSection.

interface RenderPair {
  id: string;
  name: string;
  before: string;
  after: string;
}

const PAIRS: RenderPair[] = [
  {
    id: 'pool-arrival',
    name: 'Pool arrival',
    before: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1794501942/10_s1pdsc.png',
    after: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1794501483/01_-_Arrival_at_the_pool_realism_siw0id.png',
  },
  {
    id: 'living-room',
    name: 'Living room',
    before: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1794501951/9_h21sja.png',
    after: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1794501522/03_-_The_living_room_realism_jwncxg.png',
  },
  {
    id: 'fire-pit',
    name: 'Fire pit',
    before: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1794501900/Enscape_2023-05-30-07-25-55_nhghfx.jpg',
    after: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1794501594/Fire_pit_du6srw.png',
  },
  {
    id: 'lounge',
    name: 'Lounge',
    before: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1794501879/Enscape_2023-05-30-08-03-06_ltthsx.jpg',
    after: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1794501611/The_living_room_bk4bn5.png',
  },
];

const ACCENT = '#8A7E6D';

export default function RenderToReality() {
  const [activeId, setActiveId] = useState<string>(PAIRS[0].id);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const active = PAIRS.find((p) => p.id === activeId) ?? PAIRS[0];

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMouseMove = (e: MouseEvent) => updateFromClientX(e.clientX);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) updateFromClientX(e.touches[0].clientX);
    };
    const stop = () => setDragging(false);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', stop);
    window.addEventListener('touchcancel', stop);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', stop);
      window.removeEventListener('touchcancel', stop);
    };
  }, [dragging, updateFromClientX]);

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - 3));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + 3));
    }
  };

  return (
    <div className="w-full">
      {/* Before / after slider */}
      <div
        className="compare-frame overflow-hidden"
        style={{ border: '1px solid rgba(138,126,109,0.2)', background: '#13131A', borderRadius: '4px' }}>
        <div
          ref={containerRef}
          className="relative w-full h-full overflow-hidden select-none"
          style={{ touchAction: 'pan-y', cursor: 'ew-resize', background: '#1C1C20' }}
          onMouseDown={(e) => {
            e.preventDefault();
            setDragging(true);
            updateFromClientX(e.clientX);
          }}
          onTouchStart={(e) => {
            setDragging(true);
            if (e.touches[0]) updateFromClientX(e.touches[0].clientX);
          }}>
          {/* Before (underneath) */}
          <AppImage
            key={`before-${active.id}`}
            src={active.before}
            alt={`${active.name} - original client CGI render`}
            fill
            draggable={false}
            className="object-cover w-full h-full pointer-events-none" />

          {/* After (on top, revealed by clip) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
            <AppImage
              key={`after-${active.id}`}
              src={active.after}
              alt={`${active.name} - Vella Realism photoreal version`}
              fill
              draggable={false}
              className="object-cover w-full h-full pointer-events-none" />
          </div>

          {/* Labels */}
          <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
            <span
              className="px-3 py-1 uppercase"
              style={{ background: 'rgba(11,11,13,0.7)', border: '1px solid rgba(242,239,233,0.10)', color: '#F2EFE9', borderRadius: '9999px', fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.14em' }}>
              After · Vella Realism
            </span>
          </div>
          <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
            <span
              className="px-3 py-1 uppercase"
              style={{ background: 'rgba(11,11,13,0.7)', border: '1px solid rgba(242,239,233,0.10)', color: '#F2EFE9', borderRadius: '9999px', fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.14em' }}>
              Before · Client Render
            </span>
          </div>

          {/* Handle */}
          <div
            className="absolute top-0 bottom-0 z-20"
            style={{ left: `${position}%`, width: 0 }}>
            <div
              className="absolute top-0 bottom-0"
              style={{ left: '-1px', width: '2px', background: ACCENT }} />
            <div
              role="slider"
              tabIndex={0}
              aria-label="Compare before and after"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(position)}
              onKeyDown={handleKey}
              className="absolute top-1/2 flex items-center justify-center rounded-full outline-none"
              style={{
                left: '-20px',
                marginTop: '-20px',
                width: '40px',
                height: '40px',
                background: ACCENT,
                boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                color: '#0B0B0D',
                touchAction: 'none',
              }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M7 5L3 10L7 15M13 5L17 10L13 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Example thumbnails (show the "after" image) */}
      <div className="mt-6">
        <SlideRow cardWidth={320} ariaLabel="Render to reality examples">
          {PAIRS.filter((pair) => pair.id !== activeId).map((pair) => {
            const selected = false;
            return (
              <div
                key={pair.id}
                className="slide-card slide-card-thumb flex-shrink-0 flex flex-col"
                style={{ scrollSnapAlign: 'start' }}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveId(pair.id);
                    setPosition(50);
                  }}
                  aria-pressed={selected}
                  className="slide-card-lift text-left w-full"
                  style={{ touchAction: 'manipulation' }}>
                  <div
                    className="slide-card-frame relative overflow-hidden"
                    style={{
                      borderRadius: '4px',
                      border: selected ? `1px solid ${ACCENT}` : '1px solid rgba(138,126,109,0.2)',
                      outline: selected ? `1px solid ${ACCENT}` : 'none',
                      background: '#1C1C20',
                    }}>
                    <AppImage src={pair.after} alt={`${pair.name} example thumbnail`} fill className="w-full h-full" objectFit="cover" objectPosition="center center" />
                  </div>
                  <p className="pt-3 leading-tight" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '16px', color: '#F2EFE9' }}>
                    {pair.name}
                  </p>
                </button>
              </div>
            );
          })}
        </SlideRow>
      </div>
    </div>
  );
}
