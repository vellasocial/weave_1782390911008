'use client';

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
      { name: 'Character + Location', price: '$500 bundle', note: 'Character and location together' },
    ],
  },
  {
    title: 'GROWTH WORK',
    items: [
      { name: 'Performance Ads', price: '$150 each', note: 'Short ads built to convert' },
      { name: 'Talking Head & VSL', price: '$250 per video', note: 'Your presenter, up to 30 sec' },
      { name: 'VSL + AI Presenter', price: '$500 bundle', note: 'Includes a custom AI character' },
      { name: 'Render to Reality', price: '$25 per render', note: 'Minimum 10 renders' },
    ],
  },
];

const smallPrint: string[] = [
  'All films up to 30 seconds. Up to 60 seconds is 1.5x the price.',
  'Characters and locations are reused in all your future videos at no extra cost.',
  'Special requests and monthly packages quoted to brief.',
  'All prices in USD.',
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative px-6 md:px-12 overflow-hidden"
      style={{ background: '#0D0D12', paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12">
          <p className="type-label mb-4">— PRICING</p>
          <h2 className="type-h2 mb-6">Clear pricing, no surprises.</h2>
          <p className="type-body max-w-3xl">
            Every price includes two revision rounds and any aspect ratio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {pricingCards.map((card) => (
            <div
              key={card.title}
              className="overflow-hidden flex flex-col p-6 md:p-8 h-full"
              style={{
                border: '1px solid rgba(138,126,109,0.35)',
                background: '#13131A',
                borderRadius: '4px',
              }}>
              <p className="type-label mb-6">{card.title}</p>
              <div className="flex flex-col">
                {card.items.map((item, i) => (
                  <div
                    key={item.name}
                    className={i === 0 ? 'pb-5' : 'py-5 border-t'}
                    style={{ borderColor: 'rgba(138,126,109,0.25)' }}>
                    <div className="flex items-baseline justify-between gap-x-3">
                      <p className="text-[18px] leading-tight" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600, color: '#F5F1EA' }}>
                        {item.name}
                      </p>
                      <p className="text-right whitespace-nowrap" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '15px', color: '#8A7E6D' }}>
                        {item.price}
                      </p>
                    </div>
                    <p className="mt-1" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', lineHeight: 1.5, color: '#B8B0A4' }}>
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-1">
          {smallPrint.map((line) => (
            <p key={line} style={{ fontFamily: 'Manrope, sans-serif', fontSize: '13px', color: 'rgba(245,241,234,0.4)', lineHeight: 1.6 }}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
