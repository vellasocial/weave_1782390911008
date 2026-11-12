'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import { SectionNumber, bodyTextStyle, PricePill, WhatYouGet } from './SectionParts';

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
    <div className="max-w-7xl mx-auto">
      {/* Section header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-start gap-4 md:gap-10" data-service="Render to Reality">
        <SectionNumber num="06" />
        <div className="min-w-0">
          <span className="type-label mb-4 block">
            Render to Reality
          </span>
          <h3 className="type-h2 mb-6">
            From CGI to photograph.
          </h3>
          <p className="mb-3 max-w-3xl" style={bodyTextStyle}>
            Send us your renders. We turn them into images that look like they were shot on location. Drag the slider to compare.
          </p>
          <WhatYouGet points={['Placeholder: key deliverable one', 'Placeholder: key deliverable two', 'Placeholder: key deliverable three']} />
          <PricePill label="From $25 · Enquire" service="Render to Reality" />
        </div>
      </div>

      {/* Before / after slider */}
      <div
        className="overflow-hidden"
        style={{ border: '1px solid rgba(242,239,233,0.10)', background: '#141417', borderRadius: '4px' }}>
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden select-none"
          style={{ aspectRatio: '16/9', touchAction: 'pan-y', cursor: 'ew-resize', background: '#1C1C20' }}
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
              <span className="uppercase" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.14em', color: '#8A857C' }}>
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
                <span className="uppercase" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.14em', color: '#8A857C' }}>
                  Upload realistic version below
                </span>
              </div>
            )}
          </div>

          {/* Labels */}
          <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
            <span
              className="px-3 py-1 uppercase"
              style={{ background: 'rgba(11,11,13,0.7)', border: '1px solid rgba(242,239,233,0.10)', color: '#F2EFE9', borderRadius: '9999px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.14em' }}>
              After · Vella Realism
            </span>
          </div>
          <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
            <span
              className="px-3 py-1 uppercase"
              style={{ background: 'rgba(11,11,13,0.7)', border: '1px solid rgba(242,239,233,0.10)', color: '#F2EFE9', borderRadius: '9999px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.14em' }}>
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {pairs.map((pair) => {
          const selected = pair.id === activeId;
          const thumb = pair.after || pair.before;
          return (
            <div
              key={pair.id}
              className="overflow-hidden flex flex-col transition-all duration-300 media-zoom"
              style={{
                border: selected ? `1px solid ${ACCENT}` : '1px solid rgba(242,239,233,0.10)',
                outline: selected ? `1px solid ${ACCENT}` : 'none',
                background: '#141417',
                borderRadius: '4px',
              }}>
              <button
                type="button"
                onClick={() => {
                  setActiveId(pair.id);
                  setPosition(50);
                }}
                aria-pressed={selected}
                className="text-left w-full"
                style={{ touchAction: 'manipulation' }}>
                <div
                  className="relative w-full overflow-hidden flex items-center justify-center"
                  style={{ aspectRatio: '4/3', background: '#1C1C20' }}>
                  {thumb ? (
                    <AppImage src={thumb} alt={`${pair.name} example thumbnail`} fill className="object-cover w-full h-full" />
                  ) : (
                    <span className="uppercase" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.14em', color: '#8A857C' }}>
                      Coming soon
                    </span>
                  )}
                </div>
                <div className="px-4 py-4">
                  <p className="leading-tight" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: '#F2EFE9' }}>
                    {pair.name}
                  </p>
                </div>
              </button>

              <div className="px-4 pb-4 flex flex-col gap-2">
                {(['before', 'after'] as const).map((side) => (
                  <label
                    key={side}
                    className="uppercase rounded-full px-3 text-center cursor-pointer transition-opacity duration-300 hover:opacity-70 flex items-center justify-center"
                    style={{
                      border: '1px solid rgba(242,239,233,0.10)',
                      color: pair[side] ? '#F2EFE9' : '#B9B3A8',
                      fontFamily: 'Inter, sans-serif',
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
      </div>
    </div>
  );
}
