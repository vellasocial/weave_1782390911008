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

const INITIAL_PAIRS: RenderPair[] = [
  { id: 'villa-exterior', name: 'Villa exterior', before: '', after: '' },
  { id: 'pool-deck', name: 'Pool deck', before: '', after: '' },
  { id: 'living-room', name: 'Living room', before: '', after: '' },
  { id: 'master-bedroom', name: 'Master bedroom', before: '', after: '' },
];

const ACCENT = '#8A7E6D';

export default function RenderToReality() {
  const [pairs, setPairs] = useState<RenderPair[]>(INITIAL_PAIRS);
  const [activeId, setActiveId] = useState<string>(INITIAL_PAIRS[0].id);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const urlsRef = useRef<string[]>([]);

  const active = pairs.find((p) => p.id === activeId) ?? pairs[0];

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

  useEffect(() => {
    const urls = urlsRef.current;
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  const handleUpload = (id: string, side: 'before' | 'after', file?: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    urlsRef.current.push(url);
    setPairs((prev) => prev.map((p) => (p.id === id ? { ...p, [side]: url } : p)));
  };

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
          {active.before ? (
            <AppImage
              src={active.before}
              alt={`${active.name} - original client CGI render`}
              fill
              draggable={false}
              className="object-cover w-full h-full pointer-events-none" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="uppercase" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.14em', color: '#8A857C' }}>
                Upload client render below
              </span>
            </div>
          )}

          {/* After (on top, revealed by clip) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)`, background: active.after ? undefined : '#141417' }}>
            {active.after ? (
              <AppImage
                src={active.after}
                alt={`${active.name} - Vella Realism photoreal version`}
                fill
                draggable={false}
                className="object-cover w-full h-full pointer-events-none" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="uppercase" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.14em', color: '#8A857C' }}>
                  Upload realistic version below
                </span>
              </div>
            )}
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

      {/* Example thumbnails */}
      <div className="mt-6">
        <SlideRow cardWidth={320} ariaLabel="Render to reality examples">
          {pairs.map((pair) => {
            const selected = pair.id === activeId;
            const thumb = pair.after || pair.before;
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
                    className="slide-card-frame relative overflow-hidden flex items-center justify-center"
                    style={{
                      borderRadius: '4px',
                      border: selected ? `1px solid ${ACCENT}` : thumb ? '1px solid rgba(138,126,109,0.2)' : '1px dashed rgba(138,126,109,0.4)',
                      outline: selected ? `1px solid ${ACCENT}` : 'none',
                      background: thumb ? '#1C1C20' : 'transparent',
                    }}>
                    {thumb ? (
                      <AppImage src={thumb} alt={`${pair.name} example thumbnail`} fill className="object-cover w-full h-full" />
                    ) : (
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', letterSpacing: '1.2px', color: 'rgba(245,241,234,0.3)' }}>
                        Example coming soon
                      </span>
                    )}
                  </div>
                  <p className="pt-3 leading-tight" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '16px', color: '#F2EFE9' }}>
                    {pair.name}
                  </p>
                </button>

                <div className="pt-3 flex flex-col gap-2">
                  {(['before', 'after'] as const).map((side) => (
                    <label
                      key={side}
                      className="uppercase rounded-full px-3 text-center cursor-pointer transition-opacity duration-300 hover:opacity-70 flex items-center justify-center"
                      style={{
                        border: '1px solid rgba(242,239,233,0.10)',
                        color: pair[side] ? '#F2EFE9' : '#B9B3A8',
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 600,
                        fontSize: '11px',
                        letterSpacing: '0.14em',
                        minHeight: '44px',
                        touchAction: 'manipulation',
                      }}>
                      {side === 'before'
                        ? pair.before ? 'Before · Client Render ✓' : 'Upload Before · Client Render'
                        : pair.after ? 'After · Vella Realism ✓' : 'Upload After · Vella Realism'}
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => {
                          handleUpload(pair.id, side, e.target.files?.[0]);
                          e.target.value = '';
                        }} />
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </SlideRow>
      </div>
    </div>
  );
}
