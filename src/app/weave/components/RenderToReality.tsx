'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import { SectionNumber, bodyTextStyle } from './SectionParts';

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

function openEnquiry() {
  window.dispatchEvent(new CustomEvent('weave-enquiry-service', { detail: { service: 'Render to Reality' } }));
  const panel = document.getElementById('commission-panel');
  if (panel) {
    panel.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

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
      <div className="mb-10 reveal-up flex flex-col md:flex-row md:items-start gap-4 md:gap-10" data-service="Render to Reality">
        <SectionNumber num="06" />
        <div className="min-w-0">
          <span className="font-mono text-[13px] tracking-widest uppercase mb-3 block" style={{ color: ACCENT }}>
            Render to Reality
          </span>
          <h3
            className="font-manrope font-semibold leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#F5F1EA' }}>
            From CGI to photograph.
          </h3>
          <p className="mb-3 max-w-3xl" style={bodyTextStyle}>
            Send us your renders. We turn them into images that look like they were shot on location. Drag the slider to compare.
          </p>
          <p className="font-mono text-[13px] tracking-wider uppercase" style={{ color: ACCENT }}>
            $25 per render, minimum 10 · Best for developers with existing CGI renders
          </p>
          <button
            type="button"
            onClick={openEnquiry}
            className="font-mono text-[13px] tracking-widest uppercase mt-4 inline-flex items-center gap-2 transition-opacity duration-300 hover:opacity-70"
            style={{ color: ACCENT, touchAction: 'manipulation' }}>
            Enquire about this →
          </button>
        </div>
      </div>

      {/* Before / after slider */}
      <div
        className="rounded-2xl overflow-hidden reveal-up"
        style={{ border: '1px solid rgba(138,126,109,0.15)', background: 'var(--loom-black-2)' }}>
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden select-none"
          style={{ aspectRatio: '16/9', touchAction: 'pan-y', cursor: 'ew-resize', background: 'var(--loom-black-3)' }}
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
              <span className="font-mono text-[10px] tracking-wider uppercase" style={{ color: 'rgba(245,241,234,0.4)' }}>
                Upload client render below
              </span>
            </div>
          )}

          {/* After (on top, revealed by clip) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)`, background: active.after ? undefined : 'var(--loom-black-2)' }}>
            {active.after ? (
              <AppImage
                src={active.after}
                alt={`${active.name} - Vella Realism photoreal version`}
                fill
                draggable={false}
                className="object-cover w-full h-full pointer-events-none" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-[10px] tracking-wider uppercase" style={{ color: 'rgba(245,241,234,0.4)' }}>
                  Upload realistic version below
                </span>
              </div>
            )}
          </div>

          {/* Labels */}
          <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
            <span
              className="font-mono text-[10px] px-2 py-1 rounded-full tracking-wider uppercase"
              style={{ background: 'rgba(13,13,18,0.7)', border: '1px solid rgba(138,126,109,0.35)', color: '#F5F1EA' }}>
              After · Vella Realism
            </span>
          </div>
          <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
            <span
              className="font-mono text-[10px] px-2 py-1 rounded-full tracking-wider uppercase"
              style={{ background: 'rgba(13,13,18,0.7)', border: '1px solid rgba(138,126,109,0.35)', color: '#F5F1EA' }}>
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
                color: '#0D0D12',
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
              className="rounded-2xl overflow-hidden reveal-up flex flex-col transition-all duration-300"
              style={{
                border: selected ? `1px solid ${ACCENT}` : '1px solid rgba(138,126,109,0.15)',
                outline: selected ? `1px solid ${ACCENT}` : 'none',
                background: 'var(--loom-black-2)',
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
                  style={{ aspectRatio: '4/3', background: 'var(--loom-black-3)' }}>
                  {thumb ? (
                    <AppImage src={thumb} alt={`${pair.name} example thumbnail`} fill className="object-cover w-full h-full" />
                  ) : (
                    <span className="font-mono text-[10px] tracking-wider uppercase" style={{ color: 'rgba(245,241,234,0.4)' }}>
                      Coming soon
                    </span>
                  )}
                </div>
                <div className="px-4 py-3">
                  <p className="font-manrope text-sm font-medium leading-tight" style={{ color: 'rgba(245,241,234,0.9)' }}>
                    {pair.name}
                  </p>
                </div>
              </button>

              <div className="px-4 pb-4 flex flex-col gap-2">
                {(['before', 'after'] as const).map((side) => (
                  <label
                    key={side}
                    className="font-mono text-[10px] tracking-wider uppercase rounded-full px-3 py-2 text-center cursor-pointer transition-opacity duration-300 hover:opacity-70"
                    style={{
                      border: '1px solid rgba(138,126,109,0.35)',
                      color: pair[side] ? '#F5F1EA' : ACCENT,
                      background: 'rgba(138,126,109,0.15)',
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
