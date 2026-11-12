'use client';

interface PricingItem {
  name: string;
  price: string;
  note: string;
}

interface PricingGroup {
  title: string;
  items: PricingItem[];
}

const pricingGroups: PricingGroup[] = [
  {
    title: 'PREMIUM',
    items: [
      { name: 'Signature Films', price: '$350 per film', note: 'Hero films, social and website' },
      { name: 'Luxury Property Films', price: '$350 per film', note: 'Villas and resorts from renders' },
      { name: 'Realism Storytelling', price: '$950 per film', note: 'Bring your story to life' },
    ],
  },
  {
    title: 'CHARACTERS & LOCATIONS',
    items: [
      { name: 'Characters & Locations', price: 'On enquiry', note: 'Priced by scope. Depends on the character or location.' },
    ],
  },
  {
    title: 'ADS & CONTENT',
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
        <div className="mb-4 mx-auto" style={{ maxWidth: '880px' }}>
          <p className="type-label mb-4">— PRICING</p>
          <h2 className="type-h2 mb-6">Clear pricing, no surprises.</h2>
          <p className="type-body">
            Every price includes two revision rounds and any aspect ratio.
          </p>
        </div>

        <div className="mx-auto" style={{ maxWidth: '880px' }}>
          {pricingGroups.map((group) => (
            <div key={group.title}>
              <p className="uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', letterSpacing: '1.2px', color: '#8A7E6D', marginTop: '40px' }}>
                {group.title}
              </p>
              <div className="mt-4">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    style={{ padding: '20px 0', borderBottom: '1px solid rgba(138,126,109,0.15)' }}>
                    <div className="flex items-baseline justify-between gap-x-4">
                      <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 500, fontSize: '18px', lineHeight: 1.3, color: '#F5F1EA' }}>
                        {item.name}
                      </p>
                      <p className="text-right whitespace-nowrap" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '14px', color: '#8A7E6D' }}>
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

          <div className="mt-10 flex flex-col gap-1 text-center">
            {smallPrint.map((line) => (
              <p key={line} style={{ fontFamily: 'Manrope, sans-serif', fontSize: '13px', color: 'rgba(245,241,234,0.4)', lineHeight: 1.6 }}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
