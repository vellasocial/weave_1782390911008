'use client';
import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';

interface SplitService {
  num: string;
  title: string;
  desc: string;
  target: string;
  price: string;
  thumb: string;
  thumbAlt: string;
  wide?: boolean;
  position?: string;
}

const services: SplitService[] = [
  { num: '01', title: 'Signature Films', desc: 'Flagship cinematic hero films.', target: 'signature-films', price: 'From $350', thumb: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791173786/Hum_Thumbnail_g5wzbs.png', thumbAlt: 'The Hum signature film still', position: 'center top' },
  { num: '02', title: 'Realism Storytelling', desc: 'Documentary-style brand stories.', target: 'realism-storytelling', price: 'On enquiry', thumb: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1794501098/BB_Thumbnail_rzk8fy.png', thumbAlt: 'Sudana family documentary-style film still', position: 'center top' },
  { num: '03', title: 'Luxury Property Films', desc: 'Villas and resorts, before they exist.', target: 'luxury-property-films', price: 'From $350', thumb: 'https://res.cloudinary.com/wle6dmxs/video/upload/so_14,w_1600/v1794384226/Sanctuary_Hero_-_Cinematic_Crop_4k_newwww_bfjzkn.jpg', thumbAlt: 'The Sanctuary luxury property film still', wide: true },
  { num: '04', title: 'Characters & Locations', desc: 'A face and a world you own.', target: 'characters-locations', price: 'On enquiry', thumb: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791181108/Daughter_Headshot_e3zz2z.png', thumbAlt: 'The Daughter character headshot portrait', position: 'center top' },
  { num: '05', title: 'Talking Head & VSL', desc: 'Presenter-led sales video.', target: 'talking-head-vsl', price: 'From $250', thumb: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1794461792/Peter_Ubud_or_Uluwatu_.00_00_47_08.Still001_m4adz5.png', thumbAlt: 'Presenter-led Ubud or Uluwatu video still', position: 'center top' },
  { num: '06', title: 'Render to Reality', desc: 'CGI renders made photoreal.', target: 'render-to-reality', price: '$25 · min. 10', thumb: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1794501483/01_-_Arrival_at_the_pool_realism_siw0id.png', thumbAlt: 'Pool arrival render made photoreal', wide: true },
  { num: '07', title: 'Performance Ads', desc: 'Vertical ads in volume.', target: 'performance-ads', price: 'From $150', thumb: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1785846311/Balitecture_-_Nara_Villas_3_bedroom_fzc2g6_poster.jpg', thumbAlt: 'Nara Villas vertical performance ad still', position: 'center top' },
];

interface PreviewImageProps {
  service: SplitService;
  mode: 'frame' | 'thumb';
}

function PreviewImage({ service, mode }: PreviewImageProps) {
  if (mode === 'frame' && service.wide) {
    return (
      <>
        <AppImage
          src={service.thumb}
          alt=""
          fill
          aria-hidden="true"
          className="w-full h-full"
          objectFit="cover"
          style={{ filter: 'blur(24px) brightness(0.45)', transform: 'scale(1.2)' }} />
        <AppImage src={service.thumb} alt={service.thumbAlt} fill className="w-full h-full" objectFit="contain" objectPosition="center center" />
      </>
    );
  }
  return (
    <AppImage
      src={service.thumb}
      alt={service.thumbAlt}
      fill
      className="w-full h-full"
      objectFit="cover"
      objectPosition={service.position ?? 'center center'} />
  );
}

const MONO = "'JetBrains Mono', monospace";
const TAUPE = '#8A7E6D';

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function ServiceSplitIndex() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  return (
    <div id="service-index" className="max-w-7xl mx-auto pt-[120px] mb-[120px]">
      <style>{`
        .ssi-row { background: transparent; transition: background-color 120ms ease; }
        .ssi-row .ssi-name { opacity: 0.85; transition: opacity 120ms ease; }
        .ssi-row .ssi-arrow { transition: transform 120ms ease, opacity 120ms ease; opacity: 0.6; }
        .ssi-row:focus-visible { outline: 2px solid ${TAUPE}; outline-offset: -2px; }
        @media (min-width: 768px) {
          .ssi-row:hover, .ssi-row:focus-visible { background: rgba(245,241,234,0.03); transition: background-color 150ms ease; }
          .ssi-row:hover .ssi-name, .ssi-row:focus-visible .ssi-name { opacity: 1; transition: opacity 150ms ease; }
          .ssi-row:hover .ssi-arrow, .ssi-row:focus-visible .ssi-arrow { transform: translateX(4px); opacity: 1; transition: transform 150ms ease, opacity 150ms ease; }
        }
        @media (min-width: 1024px) {
          .ssi-row:hover, .ssi-row:focus-visible { background: rgba(245,241,234,0.03); transition: background-color 150ms ease; }
          .ssi-row:hover .ssi-name, .ssi-row:focus-visible .ssi-name { opacity: 1; transition: opacity 150ms ease; }
          .ssi-row:hover .ssi-arrow, .ssi-row:focus-visible .ssi-arrow { transform: translateX(4px); opacity: 1; transition: transform 150ms ease, opacity 150ms ease; }
        }
      `}</style>

      <div className="mb-8">
        <span className="type-label mb-4 block">— What We Make</span>
        <h2
          className="mb-3"
          style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600, fontSize: '40px', letterSpacing: '-0.8px', lineHeight: 1.15, color: '#F5F1EA' }}>
          Seven ways to be unforgettable.
        </h2>
        <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '16px', color: '#B8B0A4' }}>
          Hover to preview, click to see the work.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row" style={{ gap: '64px' }}>
        {/* LEFT: preview frame (desktop only) */}
        <div className="hidden lg:block" style={{ width: 'calc((100% - 64px) * 5 / 12)', flexShrink: 0 }}>
          <div style={{ position: 'sticky', top: '120px' }}>
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: '9 / 16', borderRadius: '4px', border: '1px solid rgba(138,126,109,0.2)', background: '#13131A' }}>
              {services.map((s, i) => (
                <div
                  key={s.num}
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ opacity: (hoverIdx ?? activeIdx) === i ? 1 : 0, transition: 'opacity 300ms ease' }}>
                  <PreviewImage service={s} mode="frame" />
                </div>
              ))}
              <span
                className="absolute"
                style={{ left: '12px', bottom: '12px', background: 'rgba(13,13,18,0.85)', color: '#F5F1EA', fontFamily: MONO, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.2px', padding: '6px 10px', borderRadius: '999px', border: '1px solid rgba(138,126,109,0.2)' }}>
                {services[hoverIdx ?? activeIdx]?.title}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: list */}
        <div className="flex-1 min-w-0" onMouseLeave={() => setHoverIdx(null)}>
          {services.map((s, i) => (
            <div key={s.num}>
              <a
                href={`#${s.target}`}
                className="ssi-row flex items-center gap-4 lg:gap-5 py-3 lg:py-0"
                onClick={(e) => { e.preventDefault(); scrollToSection(s.target); }}
                onMouseEnter={() => { setHoverIdx(i); setActiveIdx(i); }}
                onFocus={() => { setHoverIdx(i); setActiveIdx(i); }}
                onBlur={() => setHoverIdx(null)}
                style={{ borderBottom: '1px solid rgba(138,126,109,0.15)', minHeight: '72px', textDecoration: 'none', touchAction: 'manipulation' }}>
                <span className="lg:hidden relative flex-shrink-0 overflow-hidden" style={{ width: '56px', height: '56px', borderRadius: '4px', border: '1px solid rgba(138,126,109,0.2)', background: '#13131A' }}>
                  <PreviewImage service={s} mode="thumb" />
                </span>
                <span className="hidden lg:block flex-shrink-0" style={{ width: '28px', fontFamily: MONO, fontSize: '12px', color: TAUPE }}>
                  {s.num}
                </span>
                <span className="flex-1 min-w-0 flex flex-col">
                  <span className="ssi-name" style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: '20px', lineHeight: 1.3, color: '#F5F1EA' }}>
                    <span className="lg:hidden" style={{ fontFamily: MONO, fontSize: '12px', color: TAUPE, marginRight: '8px' }}>{s.num}</span>
                    {s.title}
                  </span>
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '14px', lineHeight: 1.4, color: '#B8B0A4' }}>
                    {s.desc}
                  </span>
                  <span className="lg:hidden" style={{ fontFamily: MONO, fontSize: '12px', color: TAUPE, marginTop: '4px' }}>
                    {s.price}
                  </span>
                </span>
                <span className="hidden lg:block flex-shrink-0 text-right" style={{ fontFamily: MONO, fontSize: '12px', color: TAUPE }}>
                  {s.price}
                </span>
                <svg
                  className="ssi-arrow hidden lg:block flex-shrink-0"
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F5F1EA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
