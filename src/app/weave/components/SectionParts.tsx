'use client';
import { ReactNode, useEffect, useRef, useState } from 'react';


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
      className="btn-primary btn-block-mobile whitespace-nowrap">
      {label}
    </button>
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
      className="-mx-6 md:-mx-12 px-6 md:px-12 py-12 md:py-16 lg:py-24 scroll-mt-24"
      style={{ background: tone === 'dark' ? BAND_DARK : BAND_CHARCOAL }}>
      {children}
    </section>
  );
}

interface ServiceSectionProps {
  id: string;
  index: number;
  num: string;
  label: string;
  heading: string;
  description: string;
  price: string;
  buttonLabel?: string;
  service: string;
  children: ReactNode;
}

export function ServiceSection({ id, index, num, label, heading, description, price, buttonLabel, service, children }: ServiceSectionProps) {
  const tone = index % 2 === 1 ? 'dark' : 'charcoal';
  return (
    <SectionBand tone={tone} id={id}>
      <div
        className="max-w-7xl mx-auto flex flex-col gap-10"
        data-service={service}>
        <div className="min-w-0 max-w-3xl">
          <span className="type-label mb-3 block">{num} · {label}</span>
          <h3 className="type-h2 mb-4">{heading}</h3>
          <p className="max-w-xl mb-6" style={bodyTextStyle}>{description}</p>
          <PricePill label={buttonLabel ?? `From ${price} · Enquire`} service={service} />
        </div>
        <div className="min-w-0 w-full">
          {children}
        </div>
      </div>
    </SectionBand>
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
        className="max-w-7xl mx-auto px-2 flex items-center gap-0 overflow-x-auto md:justify-center"
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
              className="whitespace-nowrap flex-shrink-0 px-[6px] py-3 transition-colors duration-300"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 500,
                fontSize: '10.5px',
                letterSpacing: '0.2px',
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
