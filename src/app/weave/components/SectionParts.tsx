'use client';
import { ReactNode, useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

export const BODY_GREY = '#B9B3A8';
export const BRASS = '#C9A86A';
export const BAND_DARK = '#0B0B0D';
export const BAND_CHARCOAL = '#141417';

export const bodyTextStyle = {
  color: BODY_GREY,
  fontFamily: 'Manrope, sans-serif',
  fontStyle: 'normal' as const,
  fontSize: '18px',
  lineHeight: 1.6,
};

export const labelStyle = {
  color: BRASS,
  fontSize: '13px',
  fontWeight: 600,
  letterSpacing: '0.18em',
};

export function openEnquiryFor(service: string) {
  window.dispatchEvent(new CustomEvent('weave-enquiry-service', { detail: { service } }));
  const panel = document.getElementById('commission-panel');
  if (panel) {
    panel.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

interface PricePillProps {
  label: string;
  service: string;
}

export function PricePill({ label, service }: PricePillProps) {
  return (
    <button
      type="button"
      onClick={() => openEnquiryFor(service)}
      className="btn-primary btn-block-mobile">
      {label}
    </button>
  );
}

interface WhatYouGetProps {
  points: [string, string, string];
}

export function WhatYouGet({ points }: WhatYouGetProps) {
  return (
    <div className="mt-6 mb-8 max-w-3xl">
      <span className="type-label mb-4 block">
        What you get
      </span>
      <ul className="flex flex-col gap-3">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-3" style={{ ...bodyTextStyle, fontSize: '18px' }}>
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={BRASS}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0 mt-[6px]">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SectionNumberProps {
  num: string;
}

export function SectionNumber({ num }: SectionNumberProps) {
  return (
    <span
      aria-hidden="true"
      className="select-none flex-shrink-0 leading-none text-[72px] md:text-[120px]"
      style={{
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 700,
        color: 'transparent',
        WebkitTextStroke: `1.5px ${BRASS}`,
        letterSpacing: '-0.02em',
      }}>
      {num}
    </span>
  );
}

interface SectionBandProps {
  tone: 'dark' | 'charcoal';
  children: ReactNode;
}

export function SectionBand({ tone, children }: SectionBandProps) {
  return (
    <div
      className="-mx-6 md:-mx-12 px-6 md:px-12 pt-[120px] pb-[60px]"
      style={{ background: tone === 'dark' ? BAND_DARK : BAND_CHARCOAL }}>
      {children}
    </div>
  );
}

interface TierBannerProps {
  title: string;
  subtext: string;
  image: string;
  alt: string;
}

export function TierBanner({ title, subtext, image, alt }: TierBannerProps) {
  return (
    <div
      className="relative -mx-6 md:-mx-12 overflow-hidden flex items-center"
      style={{ height: '320px', borderTop: '1px solid rgba(242,239,233,0.10)', borderBottom: '1px solid rgba(242,239,233,0.10)' }}>
      <AppImage src={image} alt={alt} fill className="object-cover w-full h-full" />
      <div className="absolute inset-0" style={{ background: 'rgba(11,11,13,0.78)' }} />
      <div className="relative z-10 w-full px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2
            className="uppercase leading-none text-[48px] md:text-[84px]"
            style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, color: '#F2EFE9', letterSpacing: '-0.02em' }}>
            {title}
          </h2>
          <p className="mt-4 max-w-2xl" style={{ ...bodyTextStyle, color: '#F2EFE9' }}>
            {subtext}
          </p>
        </div>
      </div>
    </div>
  );
}

export const SERVICE_LINKS: { id: string; label: string }[] = [
  { id: 'signature-films', label: 'Signature Films' },
  { id: 'realism-storytelling', label: 'Realism Storytelling' },
  { id: 'luxury-property-films', label: 'Luxury Property Films' },
  { id: 'characters-locations', label: 'Characters & Locations' },
  { id: 'talking-head-vsl', label: 'Talking Head & VSL' },
  { id: 'render-to-reality', label: 'Render to Reality' },
  { id: 'performance-ads', label: 'Performance Ads' },
];

export function ServiceSubNav() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const update = () => {
      const probe = 150;
      const first = document.getElementById(SERVICE_LINKS[0].id);
      const lastEl = document.getElementById('pricing') || document.getElementById('cta');
      const firstTop = first ? first.getBoundingClientRect().top : Infinity;
      const lastTop = lastEl ? lastEl.getBoundingClientRect().top : Infinity;
      const inRange = firstTop <= probe + 200 && lastTop > probe;
      setVisible(inRange);

      let current: string | null = null;
      for (const link of SERVICE_LINKS) {
        const el = document.getElementById(link.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= probe) current = link.id;
      }
      setActiveId(inRange ? current : null);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    if (!activeId) return;
    const btn = itemRefs.current[activeId];
    const list = listRef.current;
    if (btn && list) {
      const target = btn.offsetLeft - list.clientWidth / 2 + btn.clientWidth / 2;
      list.scrollTo({ left: target, behavior: 'smooth' });
    }
  }, [activeId]);

  return (
    <div
      aria-label="Services"
      className="fixed left-0 right-0 z-40 transition-all duration-300"
      style={{
        top: '64px',
        background: 'rgba(11,11,13,0.94)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(242,239,233,0.10)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        pointerEvents: visible ? 'auto' : 'none',
      }}>
      <div
        ref={listRef}
        className="max-w-7xl mx-auto px-4 md:px-12 flex items-center gap-1 md:gap-2 overflow-x-auto md:justify-center"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {SERVICE_LINKS.map((link, i) => {
          const active = activeId === link.id;
          return (
            <button
              key={link.id}
              ref={(el) => { itemRefs.current[link.id] = el; }}
              type="button"
              aria-current={active ? 'true' : undefined}
              onClick={() => {
                document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="whitespace-nowrap flex-shrink-0 px-3 py-3 transition-colors duration-300"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: active ? BRASS : '#8A857C',
                borderBottom: `2px solid ${active ? BRASS : 'transparent'}`,
                touchAction: 'manipulation',
                minHeight: '44px',
              }}>
              <span style={{ opacity: 0.7 }}>{String(i + 1).padStart(2, '0')}</span> {link.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
