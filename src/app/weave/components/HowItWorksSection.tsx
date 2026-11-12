'use client';
import { useEffect, useRef } from 'react';

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
      id="process"
      ref={sectionRef}
      className="relative py-24 px-6 md:px-12 overflow-hidden"
      style={{ background: 'var(--loom-black)' }}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 reveal-up">
          <span
            className="font-mono text-[13px] tracking-widest uppercase mb-3 block"
            style={{ color: '#8A7E6D' }}>
            — How it works
          </span>
          <h2
            className="font-manrope font-semibold leading-none tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#F5F1EA' }}>
            Four steps. No shoot day.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="rounded-2xl reveal-up flex flex-col p-6"
              style={{
                transitionDelay: `${idx * 100}ms`,
                border: '1px solid rgba(138,126,109,0.15)',
                background: '#17171F',
              }}>
              <span className="font-mono text-sm tracking-wider mb-6 block" style={{ color: '#8A7E6D' }}>
                {step.number}
              </span>
              <h3 className="font-manrope text-xl font-semibold leading-tight mb-2" style={{ color: '#F5F1EA' }}>
                {step.title}
              </h3>
              <p
                style={{ color: '#D4CEC4', fontFamily: 'Helvetica, Arial, sans-serif', fontStyle: 'normal', fontSize: '18px', lineHeight: 1.6 }}>
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
