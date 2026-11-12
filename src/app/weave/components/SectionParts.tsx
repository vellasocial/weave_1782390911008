'use client';
import { ReactNode, useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

export const BODY_GREY = '#B8B0A4';
export const BRASS = '#8A7E6D';
export const BAND_DARK = '#0D0D12';
export const BAND_CHARCOAL = '#13131A';

export const bodyTextStyle = {
  color: BODY_GREY,
  fontFamily: 'Manrope, sans-serif',
  fontStyle: 'normal' as const,
  fontSize: '16px',
  lineHeight: 1.6,
};

export const labelStyle = {
  color: BRASS,
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '12px',
  fontWeight: 400,
  letterSpacing: '1.2px',
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
          <li key={i} className="flex items-start gap-3" style={{ ...bodyTextStyle, fontSize: '16px' }}>
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
      className="select-none block leading-none text-[96px] md:text-[140px]"
      style={{
        fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
        fontWeight: 600,
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        WebkitTextStroke: `1px ${BRASS}`,
        letterSpacing: '-0.03em',
        lineHeight: 0.9,
      }}>
      {num}
    </span>
  );
}

interface SectionBandProps {
  tone: 'dark' | 'charcoal';
  children: ReactNode;
  id?: string;
}

export function SectionBand({ tone, children, id }: SectionBandProps) {
  return (
    <section
      id={id}
      className="-mx-6 md:-mx-12 px-6 md:px-12 py-16 md:py-24 scroll-mt-24"
      style={{ background: tone === 'dark' ? BAND_DARK : BAND_CHARCOAL }}>
      {children}
    </section>
  );
}

interface ComingSoonFrameProps {
  aspect?: string;
  className?: string;
}

export function ComingSoonFrame({ aspect = '16/9', className = '' }: ComingSoonFrameProps) {
  return (
    <div
      className={`w-full flex items-center justify-center ${className}`}
      style={{
        aspectRatio: aspect,
        border: '1px dashed rgba(138,126,109,0.4)',
        borderRadius: '4px',
        background: 'transparent',
      }}>
      <span
        className="text-center px-2"
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', letterSpacing: '1.2px', color: 'rgba(245,241,234,0.3)' }}>
        Example coming soon
      </span>
    </div>
  );
}

interface ServiceSectionProps {
  id: string;
  index: number;
  num: string;
  label: string;
  heading: string;
  description: string;
  points: [string, string, string];
  bestFor: string;
  price: string;
  service: string;
  children: ReactNode;
}

export function ServiceSection({ id, index, num, label, heading, description, points, bestFor, price, service, children }: ServiceSectionProps) {
  const textLeft = index % 2 === 1;
  const tone = index % 2 === 1 ? 'dark' : 'charcoal';
  return (
    <SectionBand tone={tone} id={id}>
      <div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-10 gap-10 md:gap-12 md:items-start"
        data-service={service}>
        <div className={`min-w-0 md:col-span-4 ${textLeft ? 'md:order-1' : 'md:order-2'}`}>
          <SectionNumber num={num} />
          <span className="type-label mt-6 mb-4 block">— {label}</span>
          <h3 className="type-h2 mb-5">{heading}</h3>
          <p className="max-w-xl" style={bodyTextStyle}>{description}</p>
          <WhatYouGet points={points} />
          <p className="mb-8" style={{ ...bodyTextStyle, fontSize: '14px', color: 'rgba(245,241,234,0.45)' }}>
            Best for: {bestFor}
          </p>
          <PricePill label={`From ${price} · Enquire`} service={service} />
        </div>
        <div className={`min-w-0 md:col-span-6 ${textLeft ? 'md:order-2' : 'md:order-1'}`}>
          {children}
        </div>
      </div>
    </SectionBand>
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
      style={{ minHeight: '60vh', borderTop: '1px solid rgba(138,126,109,0.25)', borderBottom: '1px solid rgba(138,126,109,0.25)' }}>
      <AppImage src={image} alt={alt} fill className="object-cover w-full h-full" />
      <div className="absolute inset-0" style={{ background: 'rgba(13,13,18,0.78)' }} />
      <div className="relative z-10 w-full px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2
            className="uppercase text-[40px] md:text-[84px]"
            style={{ fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif', fontWeight: 600, lineHeight: 0.9, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
            {title}
          </h2>
          <p className="mt-6 max-w-2xl" style={{ ...bodyTextStyle, color: '#B8B0A4' }}>
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
  const [topOffset, setTopOffset] = useState(64);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const update = () => {
      const probe = 160;
      const index = document.getElementById('service-index');
      const lastEl = document.getElementById('pricing') || document.getElementById('cta');
      const indexBottom = index ? index.getBoundingClientRect().bottom : Infinity;
      const lastTop = lastEl ? lastEl.getBoundingClientRect().top : Infinity;
      const inRange = indexBottom <= 64 && lastTop > probe;
      setVisible(inRange);
      setTopOffset(window.scrollY > 80 ? 61 : 110);

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
      className="hidden md:block fixed left-0 right-0 z-40 transition-all duration-300"
      style={{
        top: `${topOffset}px`,
        background: 'rgba(13,13,18,0.94)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(138,126,109,0.25)',
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
                fontWeight: 500,
                fontSize: '12px',
                letterSpacing: '0.6px',
                textTransform: 'uppercase',
                color: active ? BRASS : 'rgba(245,241,234,0.6)',
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
