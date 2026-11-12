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
      style={{ background: '#0D0D12', paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12">
          <p className="type-label mb-4">— How it works</p>
          <h2 className="type-h2">Four steps. No shoot day.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col p-6 md:p-8"
              style={{
                border: '1px solid rgba(138,126,109,0.25)',
                background: '#13131A',
                borderRadius: '4px',
              }}>
              <span
                className="block mb-6"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: '12px', letterSpacing: '1.2px', color: '#8A7E6D' }}>
                {step.number}
              </span>
              <h3 className="type-card-title mb-3">{step.title}</h3>
              <p className="type-body">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
