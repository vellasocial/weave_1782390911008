'use client';

interface SplitService {
  num: string;
  title: string;
  target: string;
  price: string;
}

const services: SplitService[] = [
  { num: '01', title: 'Signature Films', target: 'signature-films', price: 'From $350' },
  { num: '02', title: 'Realism Storytelling', target: 'realism-storytelling', price: 'On enquiry' },
  { num: '03', title: 'Luxury Property Films', target: 'luxury-property-films', price: 'From $350' },
  { num: '04', title: 'Characters & Locations', target: 'characters-locations', price: 'On enquiry' },
  { num: '05', title: 'Talking Head & VSL', target: 'talking-head-vsl', price: 'From $250' },
  { num: '06', title: 'Render to Reality', target: 'render-to-reality', price: '$25 · min. 10' },
  { num: '07', title: 'Performance Ads', target: 'performance-ads', price: 'From $150' },
];

const MONO = "'JetBrains Mono', monospace";
const TAUPE = '#8A7E6D';

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function ServiceSplitIndex() {
  return (
    <div id="service-index" className="max-w-7xl mx-auto pt-[96px] mb-[120px]">
      <style>{`
        .ssi-heading { font-size: 28px; }
        @media (min-width: 768px) { .ssi-heading { font-size: 36px; } }
        .ssi-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 24px; }
        @media (min-width: 768px) { .ssi-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        @media (min-width: 1024px) { .ssi-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
        .ssi-link { display: block; padding-top: 16px; padding-bottom: 16px; border-top: 1px solid rgba(138,126,109,0.2); text-decoration: none; touch-action: manipulation; }
        .ssi-link:focus-visible { outline: 2px solid ${TAUPE}; outline-offset: 2px; }
        .ssi-name { transition: color 150ms ease; }
        .ssi-arrow { opacity: 0; transform: translateX(-4px); transition: opacity 150ms ease, transform 150ms ease; flex-shrink: 0; }
        @media (hover: hover) {
          .ssi-link:hover .ssi-name, .ssi-link:focus-visible .ssi-name { color: #FFFFFF; }
          .ssi-link:hover .ssi-arrow, .ssi-link:focus-visible .ssi-arrow { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div className="mb-6">
        <span className="type-label mb-4 block">— What We Make</span>
        <h2
          className="ssi-heading mb-3"
          style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600, letterSpacing: '-0.6px', lineHeight: 1.15, color: '#F5F1EA' }}>
          Seven ways to be unforgettable.
        </h2>
        <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '16px', color: '#B8B0A4' }}>
          Films, characters and ads, made with AI and finished by hand. Pick one to see the work.
        </p>
      </div>

      <nav aria-label="Services" className="ssi-grid">
        {services.map((s) => (
          <a
            key={s.num}
            href={`#${s.target}`}
            className="ssi-link"
            onClick={(e) => { e.preventDefault(); scrollToSection(s.target); }}>
            <span className="flex items-center gap-2">
              <span
                className="ssi-name"
                style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: '16px', lineHeight: 1.4, color: '#F5F1EA' }}>
                <span style={{ fontFamily: MONO, fontSize: '12px', color: TAUPE, marginRight: '8px' }}>{s.num}</span>
                {s.title}
              </span>
              <svg
                className="ssi-arrow"
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F5F1EA"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
            <span className="block" style={{ fontFamily: MONO, fontSize: '12px', color: TAUPE, marginTop: '4px' }}>
              {s.price}
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
}
