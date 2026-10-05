'use client';
import { useState, useEffect, useCallback, useRef, TouchEvent } from 'react';

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Add more cards by duplicating an entry in this array.
// Each card needs: id, name, type ('character' | 'location'), tag ('character' | 'location'),
// images: array of { src, alt, aspectRatio ('square'|'wide'|'tall') }
// The lightbox shows all images in order; the grid shows them grouped in one card.

export interface CharacterImage {
  src: string;
  alt: string;
  /** 'square' ≈ 1:1 | 'wide' ≈ 16:9 or 3:1 | 'tall' ≈ 2:3 or taller */
  aspectRatio: 'square' | 'wide' | 'tall';
  /** Full-resolution URL for lightbox (falls back to src if omitted) */
  fullSrc?: string;
}

export interface CharacterCard {
  id: number;
  name: string;
  type: string; // e.g. "Character Sheet" | "Location Sheet"
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
    type: 'Character Turnaround',
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
    type: 'Character Sheet',
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
    type: 'Location Sheet',
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

// Flatten all images into a single ordered list for lightbox navigation
function buildLightboxImages(cards: CharacterCard[]) {
  const result: { src: string; alt: string; cardName: string; cardType: string }[] = [];
  cards.forEach((card) => {
    card.images.forEach((img) => {
      result.push({
        src: img.fullSrc ?? img.src,
        alt: img.alt,
        cardName: card.name,
        cardType: card.type,
      });
    });
  });
  return result;
}

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────
interface LightboxProps {
  images: { src: string; alt: string; cardName: string; cardType: string }[];
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
      dx < 0 ? next() : prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const img = images[current];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.96)' }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close */}
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

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-[9999] flex items-center justify-center transition-colors"
          style={{
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: '#F5F1EA',
            touchAction: 'manipulation',
          }}
          aria-label="Previous image"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-[9999] flex items-center justify-center transition-colors"
          style={{
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: '#F5F1EA',
            touchAction: 'manipulation',
          }}
          aria-label="Next image"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Image */}
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
        {/* Caption */}
        <div
          className="absolute bottom-0 left-0 right-0 px-4 py-3 rounded-b-xl"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}
        >
          <p className="font-manrope text-sm font-medium" style={{ color: '#F5F1EA' }}>{img.cardName}</p>
          <p className="font-mono text-[10px] mt-0.5" style={{ color: '#8A7E6D' }}>{img.cardType}</p>
        </div>
      </div>

      {/* Counter */}
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

// ─── ASPECT RATIO HELPER ──────────────────────────────────────────────────────
function aspectRatioStyle(ar: CharacterImage['aspectRatio']): string {
  if (ar === 'square') return '1 / 1';
  if (ar === 'wide') return '16 / 9';
  return '2 / 3';
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function CharactersLocations() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const lightboxImages = buildLightboxImages(charactersData);

  // Build a map: cardId → starting lightbox index for that card's first image
  const cardStartIndex: Record<number, number> = {};
  let idx = 0;
  charactersData.forEach((card) => {
    cardStartIndex[card.id] = idx;
    idx += card.images.length;
  });

  const openLightbox = (cardId: number, imageOffset = 0) => {
    setLightboxIndex(cardStartIndex[cardId] + imageOffset);
    setLightboxOpen(true);
  };

  return (
    <>
      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          startIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {/* ── CHARACTERS & LOCATIONS SUBSECTION ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto mb-12 reveal-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span
              className="font-mono text-xs tracking-widest uppercase mb-3 block"
              style={{ color: '#8A7E6D' }}
            >
              — Characters &amp; Locations
            </span>
            <h2
              className="font-manrope font-semibold leading-none tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#F5F1EA' }}
            >
              Consistent by Design
            </h2>
          </div>
          <p
            className="max-w-xs text-base"
            style={{ color: '#B8B0A4', fontFamily: 'Helvetica, Arial, sans-serif', fontStyle: 'oblique' }}
          >
            Original AI characters and locations, built with full reference sheets so every shot stays consistent.
          </p>
        </div>
      </div>

      {/* Masonry grid */}
      <div
        className="max-w-7xl mx-auto"
        style={{
          columns: '3 240px',
          columnGap: '16px',
        }}
      >
        {charactersData.map((card) => (
          <div
            key={card.id}
            className="iridescent-cell rounded-2xl overflow-hidden cursor-pointer reveal-up"
            style={{
              breakInside: 'avoid',
              marginBottom: '16px',
              border: '1px solid rgba(138,126,109,0.15)',
              background: 'var(--loom-black-2)',
              transform: hoveredCard === card.id ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              boxShadow: hoveredCard === card.id ? '0 8px 32px rgba(138,126,109,0.18)' : 'none',
              display: 'inline-block',
              width: '100%',
            }}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Images — stacked vertically, each at natural aspect ratio */}
            <div className="relative">
              {card.images.map((img, imgIdx) => (
                <div
                  key={imgIdx}
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio: aspectRatioStyle(img.aspectRatio),
                    borderBottom:
                      imgIdx < card.images.length - 1
                        ? '1px solid rgba(138,126,109,0.1)'
                        : 'none',
                  }}
                  onClick={() => openLightbox(card.id, imgIdx)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: 'rgba(0,0,0,0.25)',
                      opacity: hoveredCard === card.id ? 1 : 0,
                    }}
                  />
                  {/* Expand icon on hover */}
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                    style={{ opacity: hoveredCard === card.id ? 1 : 0 }}
                  >
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: '40px',
                        height: '40px',
                        background: 'rgba(138,126,109,0.2)',
                        border: '1px solid rgba(138,126,109,0.6)',
                        backdropFilter: 'blur(6px)',
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5F1EA" strokeWidth="2">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                  </div>
                  {/* Tag badge — only on first image */}
                  {imgIdx === 0 && (
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className="font-mono text-[10px] px-2 py-1 rounded-full tracking-wider uppercase"
                        style={{
                          background: 'rgba(138,126,109,0.15)',
                          border: '1px solid rgba(138,126,109,0.35)',
                          color: '#8A7E6D',
                        }}
                      >
                        {card.tag}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Card footer label */}
            <div
              className="px-4 py-3 flex items-center justify-between"
              style={{ background: 'var(--loom-black-2)' }}
              onClick={() => openLightbox(card.id)}
            >
              <div>
                <p className="font-manrope text-sm font-medium leading-tight" style={{ color: 'rgba(245,241,234,0.9)' }}>
                  {card.name}
                </p>
                <p className="font-mono text-[10px] mt-0.5" style={{ color: 'rgba(245,241,234,0.4)' }}>
                  {card.type}
                </p>
              </div>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ color: 'rgba(138,126,109,0.5)', flexShrink: 0 }}
              >
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </div>
          </div>
        ))}
      </div>
      {/* ── END CHARACTERS & LOCATIONS ──────────────────────────────────────── */}
    </>
  );
}
