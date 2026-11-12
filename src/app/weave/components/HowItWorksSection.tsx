'use client';

interface Step {
  number: string;
  title: string;
  text: string;
}

const steps: Step[] = [
  { number: '01', title: 'Brief', text: 'A short call on your brand, audience and goal' },
  { number: '02', title: 'Concept', text: 'Script, shot list and look, signed off before production' },
  { number: '03', title: 'Production', text: 'Characters, locations and footage generated and edited' },
  { number: '04', title: 'Delivery', text: 'Final files in every aspect ratio you need' },
];

export default function HowItWorksSection() {
  return (
    <section
      id="process"
      className="relative px-6 md:px-12 overflow-hidden"
      style={{ background: '#13131A', paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 md:mb-16">
          <p className="type-label mb-4">— How it works</p>
          <h2 className="type-h2">Four steps. No shoot day.</h2>
        </div>

        <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 list-none p-0 m-0">
          <span
            aria-hidden="true"
            className="hidden md:block absolute left-0 right-0 h-px"
            style={{ top: '6px', background: 'rgba(138,126,109,0.5)' }}
          />
          <span
            aria-hidden="true"
            className="md:hidden absolute w-px"
            style={{ left: '6px', top: '6px', bottom: '6px', background: 'rgba(138,126,109,0.5)' }}
          />
          {steps.map((step) => (
            <li key={step.number} className="relative pl-9 md:pl-0 md:pt-10">
              <span
                aria-hidden="true"
                className="absolute left-0 top-[1px] md:top-0 block rounded-full"
                style={{ width: '13px', height: '13px', background: '#13131A', border: '1px solid #8A7E6D' }}
              />
              <span
                className="block mb-3"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: '12px', letterSpacing: '1.2px', color: '#8A7E6D' }}>
                {step.number}
              </span>
              <h3 className="type-card-title mb-2">{step.title}</h3>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', lineHeight: 1.6, color: '#B8B0A4' }}>
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
