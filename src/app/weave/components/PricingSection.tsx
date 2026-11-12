'use client';
import { useEffect, useRef } from 'react';

interface PricingItem {
  name: string;
  price: string;
  note: string;
}

interface PricingCard {
  title: string;
  items: PricingItem[];
}

const pricingCards: PricingCard[] = [
  {
    title: 'SIGNATURE WORK',
    items: [
      { name: 'Signature Films', price: '$350 per film', note: 'Hero films, social and website' },
      { name: 'Luxury Property Films', price: '$350 per film', note: 'Villas and resorts from renders' },
      { name: 'Realism Storytelling', price: '$950 per film', note: 'Bring your story to life' },
    ],
  },
  {
    title: 'CHARACTERS & LOCATIONS',
    items: [
      { name: 'Character', price: '$350', note: 'Full reference sheet' },
      { name: 'Location', price: '$250', note: 'Your brand world, reusable' },
      { name: 'Character + Location', price: '$500 bundle', note: 'Save $100' },
    ],
  },
  {
    title: 'GROWTH WORK',
    items: [
      { name: 'Performance Ads', price: '$150 each', note: 'Or 5 for $700' },
      { name: 'Talking Head & VSL', price: '$250 per video', note: 'Your presenter, up to 30 sec' },
      { name: 'VSL + AI Presenter', price: '$500 bundle', note: 'Includes a custom AI character. Save $100' },
      { name: 'Render to Reality', price: '$25 per render', note: 'Minimum 10 renders' },
    ],
  },
];

const smallPrint: string[] = [
  'All films up to 30 seconds. Up to 60 seconds is 1.5x the price.',
  '10% off orders of 10 or more videos. Not combined with bundle pricing.',
  'Characters and locations are reused in all your future videos at no extra cost.',
  'Special requests and monthly packages quoted to brief.',
  'All prices in USD.',
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const items = sectionRef?.current?.querySelectorAll('.reveal-up');
    items?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-24 px-6 md:px-12 overflow-hidden"
      style={{ background: '#17171F' }}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 reveal-up">
          <span
            className="font-mono text-[13px] tracking-widest uppercase mb-3 block"
            style={{ color: '#8A7E6D' }}>
            — Founding Client Rates
          </span>
          <h2
            className="font-manrope font-semibold leading-none tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#F5F1EA' }}>
            Simple, upfront pricing.
          </h2>
          <p
            className="max-w-3xl"
            style={{ color: '#D4CEC4', fontFamily: 'Helvetica, Arial, sans-serif', fontStyle: 'normal', fontSize: '18px', lineHeight: 1.6 }}>
            Founding client rates, available for a limited time. Every price includes two revision rounds and any aspect ratio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pricingCards.map((card, idx) => (
            <div
              key={card.title}
              className="rounded-2xl overflow-hidden reveal-up flex flex-col p-6"
              style={{
                transitionDelay: `${idx * 100}ms`,
                border: '1px solid rgba(138,126,109,0.15)',
                background: 'var(--loom-black-2)',
              }}>
              <span
                className="font-mono text-[13px] tracking-widest uppercase mb-6 block"
                style={{ color: '#8A7E6D' }}>
                {card.title}
              </span>
              <div className="flex flex-col gap-5">
                {card.items.map((item, i) => (
                  <div
                    key={item.name}
                    className={i === 0 ? '' : 'pt-5 border-t'}
                    style={{ borderColor: 'rgba(138,126,109,0.15)' }}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <p className="font-manrope text-base font-semibold leading-tight" style={{ color: '#F5F1EA' }}>
                        {item.name}
                      </p>
                      <p className="font-mono text-sm tracking-wider" style={{ color: '#8A7E6D' }}>
                        {item.price}
                      </p>
                    </div>
                    <p
                      className="mt-1"
                      style={{ color: '#D4CEC4', fontFamily: 'Helvetica, Arial, sans-serif', fontStyle: 'normal', fontSize: '18px', lineHeight: 1.6 }}>
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-1 reveal-up">
          {smallPrint.map((line) => (
            <p key={line} className="font-mono text-[10px] tracking-wider" style={{ color: 'rgba(245,241,234,0.4)' }}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
