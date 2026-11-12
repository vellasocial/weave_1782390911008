'use client';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

export const CARD_H = 462;
export const VERTICAL_W = 260;
export const WIDE_W = 821;

export type CardKind = 'vertical' | 'wide';

export interface MediaItem {
  type: 'image' | 'video';
  src: string; // full-size image src or video src
  poster?: string;
  alt: string;
  title?: string;
  caption?: string;
}

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────
interface MediaLightboxProps {
  items: MediaItem[];
  startIndex: number;
  onClose: () => void;
}

export function MediaLightbox({ items, startIndex, onClose }: MediaLightboxProps) {
  const [current, setCurrent] = useState(startIndex);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % items.length), [items.length]);

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
    document.body.setAttribute('data-video-open', 'true');
    window.dispatchEvent(new CustomEvent('weave-video-playing', { detail: { playing: true } }));
    return () => {
      document.body.style.overflow = '';
      document.body.removeAttribute('data-video-open');
      window.dispatchEvent(new CustomEvent('weave-video-playing', { detail: { playing: false } }));
    };
  }, []);

  const item = items[current];
  if (!item) return null;

  const arrowStyle = {
    background: 'rgba(0,0,0,0.6)',
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    color: '#F5F1EA',
    touchAction: 'manipulation' as const,
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.96)' }}
      onClick={onClose}>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="fixed top-4 right-4 z-[9999] flex items-center gap-1.5 font-mono text-sm tracking-wider uppercase"
        style={{
          background: 'rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '999px',
          padding: '8px 16px',
          color: '#F5F1EA',
          touchAction: 'manipulation',
        }}>
        ✕ Close
      </button>

      {items.length > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-[9999] flex items-center justify-center"
          style={arrowStyle}
          aria-label="Previous">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
      )}
      {items.length > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-[9999] flex items-center justify-center"
          style={arrowStyle}
          aria-label="Next">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      )}

      <div
        className="relative flex items-center justify-center"
        style={{ maxWidth: '90vw', maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}>
        {item.type === 'video' ? (
          <video
            key={item.src}
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            preload="auto"
            style={{ maxWidth: '90vw', maxHeight: '88vh', background: '#000', borderRadius: '4px', display: 'block' }}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={item.src}
            src={item.src}
            alt={item.alt}
            style={{ maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: '4px', display: 'block' }}
          />
        )}
      </div>

      {items.length > 1 && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs tracking-widest"
          style={{ color: 'rgba(245,241,234,0.4)' }}>
          {current + 1} / {items.length}
        </div>
      )}
    </div>
  );
}

// ─── SLIDE ROW ───────────────────────────────────────────────────────────────
interface SlideRowProps {
  children: ReactNode;
  cardWidth: number; // desktop card width in px
  ariaLabel?: string;
}

export function SlideRow({ children, cardWidth, ariaLabel }: SlideRowProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [overflowing, setOverflowing] = useState(false);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setOverflowing(max > 4);
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    update();
    const el = scrollerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (cardWidth + 16), behavior: 'smooth' });
  };

  const arrowBtn = (dir: 1 | -1, visible: boolean) => (
    <button
      type="button"
      onClick={() => scrollByCard(dir)}
      aria-label={dir === 1 ? 'Slide right' : 'Slide left'}
      tabIndex={visible ? 0 : -1}
      className="flex items-center justify-center rounded-full transition-opacity duration-200"
      style={{
        width: '36px',
        height: '36px',
        background: '#2A2622',
        border: '1px solid rgba(245,241,234,0.25)',
        color: '#F5F1EA',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        touchAction: 'manipulation',
      }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {dir === 1 ? <path d="M9 18l6-6-6-6" /> : <path d="M15 18l-6-6 6-6" />}
      </svg>
    </button>
  );

  return (
    <div className="slide-row w-full" style={{ ['--card-w' as string]: `${cardWidth}px` }}>
      <div className="hidden md:flex justify-end gap-2 mb-3" style={{ minHeight: '36px' }}>
        {overflowing && (
          <>
            {arrowBtn(-1, !atStart)}
            {arrowBtn(1, !atEnd)}
          </>
        )}
      </div>
      <div
        className="relative"
        style={{
          WebkitMaskImage: !atEnd && overflowing ? 'linear-gradient(to right, #000 0, #000 calc(100% - 64px), transparent 100%)' : undefined,
          maskImage: !atEnd && overflowing ? 'linear-gradient(to right, #000 0, #000 calc(100% - 64px), transparent 100%)' : undefined,
        }}>
        <div
          ref={scrollerRef}
          onScroll={update}
          role="region"
          aria-label={ariaLabel}
          className="slide-row-scroller flex gap-4 overflow-x-auto"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingTop: '6px',
            paddingBottom: '6px',
          }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── SLIDE CARD ──────────────────────────────────────────────────────────────
interface SlideCardProps {
  kind: CardKind;
  children: ReactNode; // media content filling the frame
  tag?: string;
  title?: string;
  subtitle?: string;
  onClick?: () => void;
  ariaLabel?: string;
  showPlay?: boolean;
}

export function SlideCard({ kind, children, tag, title, subtitle, onClick, ariaLabel, showPlay }: SlideCardProps) {
  const clickable = !!onClick;
  return (
    <div
      className={`slide-card slide-card-${kind} flex-shrink-0 ${clickable ? 'cursor-pointer' : ''}`}
      style={{ scrollSnapAlign: 'start' }}>
      <div
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        aria-label={ariaLabel}
        onClick={clickable ? onClick : undefined}
        onKeyDown={clickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
        className="slide-card-lift"
        style={{ touchAction: 'pan-x pan-y' }}>
        <div
          className="slide-card-frame relative overflow-hidden"
          style={{
            borderRadius: '4px',
            border: '1px solid rgba(138,126,109,0.2)',
            background: '#13131A',
          }}>
          {children}
          {showPlay && (
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none" style={{ background: 'rgba(11,11,13,0.25)' }}>
              <div
                className="flex items-center justify-center rounded-full"
                style={{ width: '52px', height: '52px', background: 'rgba(11,11,13,0.6)', border: '1px solid rgba(242,239,233,0.35)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#F2EFE9', marginLeft: '4px' }}><path d="M8 5v14l11-7z" /></svg>
              </div>
            </div>
          )}
          {tag && (
            <div className="absolute top-3 left-3 z-20">
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
                  letterSpacing: '0.14em',
                }}>
                {tag}
              </span>
            </div>
          )}
        </div>
      </div>
      {(title || subtitle) && (
        <div className="pt-3">
          {title && <p className="leading-tight" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '16px', color: '#F2EFE9' }}>{title}</p>}
          {subtitle && <p className="mt-1" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', color: '#8A857C' }}>{subtitle}</p>}
        </div>
      )}
    </div>
  );
}
