'use client';

interface SplitService {
  title: string;
  target: string;
}

const services: SplitService[] = [
  { title: 'Signature Films', target: 'signature-films' },
  { title: 'Realism Storytelling', target: 'realism-storytelling' },
  { title: 'Luxury Property Films', target: 'luxury-property-films' },
  { title: 'Characters & Locations', target: 'characters-locations' },
  { title: 'Talking Head & VSL', target: 'talking-head-vsl' },
  { title: 'Render to Reality', target: 'render-to-reality' },
  { title: 'Performance Ads', target: 'performance-ads' },
];

const TAUPE = '#8A7E6D';

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function ServiceSplitIndex() {
  return (
    <div
      id="service-index"
      className="-mx-6 md:-mx-12 mb-[80px] md:mb-[120px]"
      style={{
        borderTop: '1px solid rgba(138,126,109,0.2)',
        borderBottom: '1px solid rgba(138,126,109,0.2)',
      }}>
      <style>{`
        .ssi-row { display: flex; flex-wrap: nowrap; align-items: center; justify-content: flex-start; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; -ms-overflow-style: none; padding: 28px 24px; }
        .ssi-row::-webkit-scrollbar { display: none; }
        .ssi-row > :first-child { margin-left: auto; }
        .ssi-row > :last-child { margin-right: auto; }
        @media (min-width: 768px) { .ssi-row { padding-left: 48px; padding-right: 48px; } }
        .ssi-link { flex-shrink: 0; white-space: nowrap; color: #B8B0A4; text-decoration: none; font-family: 'Manrope', sans-serif; font-size: 15px; line-height: 1.4; transition: color 150ms ease; touch-action: manipulation; }
        .ssi-link:focus-visible { outline: 2px solid ${TAUPE}; outline-offset: 4px; color: #FFFFFF; }
        @media (hover: hover) { .ssi-link:hover { color: #FFFFFF; } }
        .ssi-dot { flex-shrink: 0; display: inline-block; width: 3px; height: 3px; border-radius: 9999px; background: ${TAUPE}; margin: 0 14px; }
        @media (min-width: 1024px) { .ssi-dot { margin: 0 18px; } }
      `}</style>

      <nav aria-label="Services" className="ssi-row">
        {services.map((s, i) => (
          <span key={s.target} className="contents">
            {i > 0 && <span className="ssi-dot" aria-hidden="true" />}
            <a
              href={`#${s.target}`}
              className="ssi-link"
              onClick={(e) => { e.preventDefault(); scrollToSection(s.target); }}>
              {s.title}
            </a>
          </span>
        ))}
      </nav>
    </div>
  );
}
