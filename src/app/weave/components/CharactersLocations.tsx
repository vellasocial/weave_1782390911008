'use client';
import { useState, useEffect, useCallback, useRef, TouchEvent } from 'react';
// Layout (heading, price) is provided by ServiceSection in SectionParts.

// ─── DATA ─────────────────────────────────────────────────────────────────────
export interface CharacterImage {
  src: string;
  alt: string;
  aspectRatio: 'square' | 'wide' | 'tall';
  fullSrc?: string;
}

export interface CharacterCard {
  id: number;
  name: string;
  type: string;
  tag: 'character' | 'location';
  images: CharacterImage[];
}

export const charactersData: CharacterCard[] = [
  {
    id: 1,
    name: 'The Daughter',
    type: 'Character',
    tag: 'character',
    images: [
      {
        src: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791181108/Daughter_Headshot_e3zz2z.png',
        alt: 'The Daughter — headshot portrait',
        aspectRatio: 'square',
        fullSrc: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791181108/Daughter_Headshot_e3zz2z.png',
      },
      {
        src: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791180808/Daughter_froo8x.png',
        alt: 'The Daughter — full turnaround',
        aspectRatio: 'wide',
        fullSrc: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791180808/Daughter_froo8x.png',
      },
    ],
  },
  {
    id: 2,
    name: 'The Farmer',
    type: 'Character',
    tag: 'character',
    images: [
      {
        src: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791181163/Farmer_Headshot_fvsdms.png',
        alt: 'The Farmer — headshot portrait',
        aspectRatio: 'square',
        fullSrc: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791181163/Farmer_Headshot_fvsdms.png',
      },
      {
        src: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791180807/Farmer_br4upt.png',
        alt: 'The Farmer — full turnaround',
        aspectRatio: 'wide',
        fullSrc: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791180807/Farmer_br4upt.png',
      },
    ],
  },
  {
    id: 3,
    name: 'Casual Clothing',
    type: 'Character',
    tag: 'character',
    images: [
      {
        src: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791180817/Casual_clothing_s3ao6z.png',
        alt: 'Casual Clothing — character turnaround',
        aspectRatio: 'wide',
        fullSrc: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791180817/Casual_clothing_s3ao6z.png',
      },
    ],
  },
  {
    id: 4,
    name: 'Peter',
    type: 'Character',
    tag: 'character',
    images: [
      {
        src: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791180854/Peter_-_Full_Character_Sheet_xr8jza.png',
        alt: 'Peter — full character reference sheet',
        aspectRatio: 'tall',
        fullSrc: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791180854/Peter_-_Full_Character_Sheet_xr8jza.png',
      },
    ],
  },
  {
    id: 5,
    name: 'Sanaya Rooftop',
    type: 'Location',
    tag: 'location',
    images: [
      {
        src: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791181266/SANAYA_Location_Reference_Sheet_m4rlkr.png',
        alt: 'Sanaya Rooftop — location reference sheet',
        aspectRatio: 'tall',
        fullSrc: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791181266/SANAYA_Location_Reference_Sheet_m4rlkr.png',
      },
    ],
  },
];
// ─────────────────────────────────────────────────────────────────────────────

interface SheetItem {
  src: string;
  alt: string;
  cardName: string;
  cardType: string;
}

// One entry per sheet image, so the lightbox arrows move between sheets
const sheetItems: SheetItem[] = charactersData.flatMap((card) =>
  card.images.map((img) => ({
    src: img.fullSrc ?? img.src,
    alt: img.alt,
    cardName: card.name,
    cardType: card.type,
  }))
);

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────
interface LightboxProps {
  images: SheetItem[];
  startIndex: number;
  onClose: () => void;
}

function Lightbox({ images, startIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(startIndex);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const prev = useCallback(() => setCurrent((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, prev, next]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    if (e.changedTouches.length !== 1) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - (touchStartY.current ?? 0);
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) next(); else prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const img = images[current];

  const arrowStyle = {
    background: 'rgba(0,0,0,0.6)',
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    color: '#F5F1EA',
    touchAction: 'manipulation' as const,
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.96)' }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="fixed top-4 right-4 z-[9999] flex items-center gap-1.5 font-mono text-sm tracking-wider uppercase transition-colors"
        style={{
          background: 'rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '999px',
          padding: '8px 16px',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          color: '#F5F1EA',
          touchAction: 'manipulation',
        }}
      >
        ✕ Close
      </button>

      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-[9999] flex items-center justify-center transition-colors"
          style={arrowStyle}
          aria-label="Previous sheet"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-[9999] flex items-center justify-center transition-colors"
          style={arrowStyle}
          aria-label="Next sheet"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      <div
        className="relative flex items-center justify-center"
        style={{ maxWidth: '90vw', maxHeight: '90vh', touchAction: 'pinch-zoom' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.src}
          alt={img.alt}
          style={{
            maxWidth: '90vw',
            maxHeight: '90vh',
            objectFit: 'contain',
            borderRadius: '12px',
            display: 'block',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 px-4 py-3 rounded-b-xl"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}
        >
          <p className="font-manrope text-sm font-medium" style={{ color: '#F5F1EA' }}>{img.cardName}</p>
          <p className="font-mono text-[10px] mt-0.5" style={{ color: '#8A7E6D' }}>{img.cardType}</p>
        </div>
      </div>

      {images.length > 1 && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs tracking-widest"
          style={{ color: 'rgba(245,241,234,0.4)' }}
        >
          {current + 1} / {images.length}
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function CharactersLocations() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setOpenIndex(null), []);

  return (
    <>
      {openIndex !== null && (
        <Lightbox images={sheetItems} startIndex={openIndex} onClose={closeLightbox} />
      )}

      <div
        className="flex gap-3 overflow-x-auto pb-2"
        style={{ scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch' }}
      >
        {sheetItems.map((item, i) => (
          <button
            key={`${item.cardName}-${i}`}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group flex-shrink-0 text-left transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1"
            style={{ touchAction: 'manipulation' }}
            aria-label={`Open ${item.cardName} ${item.cardType}`}
          >
            <div
              className="overflow-hidden"
              style={{
                height: '260px',
                width: '200px',
                borderRadius: '4px',
                border: '1px solid rgba(138,126,109,0.2)',
                background: '#0D0D12',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="transition-transform duration-500 group-hover:scale-[1.06]"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <p className="mt-2 leading-tight" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 500, fontSize: '13px', color: '#F5F1EA' }}>
              {item.cardName}
            </p>
            <p className="mt-0.5 uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '1.2px', color: '#8A7E6D' }}>
              {item.cardType}
            </p>
          </button>
        ))}
      </div>
    </>
  );
}
