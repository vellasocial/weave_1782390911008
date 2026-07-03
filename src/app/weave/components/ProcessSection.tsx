'use client';
import { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const processSteps = [
{
  step: '01',
  label: 'KICK-OFF & BRIEF',
  description: 'We lock in the package, you send your assets, and we agree on the angle and tone for the ad.',
  video: null,
  image: '/assets/images/1._Kick_off___Brief-1782419083712.jpg',
  alt: 'Kick-off and brief process step'
},
{
  step: '02',
  label: 'ROLLING DELIVERY',
  description: 'We deliver new content every week, not in one bulk drop, so you always have fresh ads ready to run.',
  video: null,
  image: "/assets/images/2._Rolling_delivery-1782419219571.jpg",
  alt: 'Logo creation branding board with color palette swatches and typography samples on white background'
},
{
  step: '03',
  label: 'FEEDBACK & REFINEMENT',
  description: 'You review each week\'s content and give feedback. We refine as we go, so every cut keeps getting sharper.',
  video: null,
  image: '/assets/images/3._Feedback_and_refinement-1782419318022.jpg',
  alt: 'Feedback and refinement process step'
},
{
  step: '04',
  label: 'READY TO PUBLISH',
  description: 'Every delivery arrives in all the formats you need, ready to post and fully yours to use.',
  video: null,
  image: '/assets/images/4._ready_to_publish-1782419414563.jpg',
  alt: 'Colorful floral fabric dramatically draped and flowing against a neutral studio background'
}];


export default function ProcessSection() {
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
      style={{ background: 'var(--loom-black-2)' }}>
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
          'linear-gradient(rgba(196,181,247,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(196,181,247,0.6) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 reveal-up">
          <div>
            <span className="font-mono text-xs text-lavender/60 tracking-[0.2em] uppercase block mb-3">
              — Process
            </span>
            <h2
              className="font-manrope font-semibold text-pearl leading-none tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              
              From Brief
              <br />
              <span className="text-lavender">to Buyers</span>
            </h2>
          </div>
          <p className="font-mono text-sm text-pearl/40 max-w-sm leading-relaxed">
            Every project moves through four clear phases, from kick-off brief to rolling delivery to refinement to published,{' '}
            <br />
            ready-to-run content.
          </p>
        </div>

        {/* Process bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {processSteps?.map((step, idx) =>
          <div
            key={step?.step}
            className={`iridescent-cell rounded-2xl overflow-hidden reveal-up flex flex-col`}
            style={{
              transitionDelay: `${idx * 100}ms`,
              border: '1px solid rgba(196,181,247,0.1)',
              background: 'var(--loom-black)'
            }}>
            
              {/* Image / Video */}
              <div className="relative h-72 overflow-hidden">
                {step?.image ? (
                  <AppImage
                    src={step?.image}
                    alt={step?.alt}
                    fill
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <iframe
                    src={step?.video}
                    title={step?.alt}
                    allowFullScreen
                    allow="autoplay; fullscreen"
                    className="w-full h-full border-0"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  />
                )}
              
                <div className="absolute inset-0 bg-gradient-to-t from-loom-black via-transparent to-transparent pointer-events-none" />
                {/* Step number */}
                <div className="absolute top-4 right-4">
                  <span
                  className="font-mono text-xs font-bold px-2 py-1 rounded"
                  style={{
                    background: 'rgba(13,13,18,0.8)',
                    border: '1px solid rgba(196,181,247,0.3)',
                    color: '#C4B5F7'
                  }}>
                  
                    {step?.step}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col gap-2">
                <h3 className="font-manrope font-semibold text-pearl text-base tracking-tight">
                  {step?.label}
                </h3>
                <p className="font-mono text-xs text-pearl/50 leading-relaxed">
                  {step?.description}
                </p>
              </div>

              {/* Bottom line */}
              <div
              className="h-px mx-5 mb-4"
              style={{
                background: 'linear-gradient(90deg, rgba(217,70,168,0.5), rgba(196,181,247,0.2), transparent)'
              }} />
            
            </div>
          )}
        </div>

        {/* Techniques marquee */}
        <div className="mt-20 reveal-up overflow-hidden">
          <div
            className="flex gap-8 w-max"
            style={{ animation: 'marquee 90s linear infinite' }}>
            
            {[
            'Ad Creation', 'On-site 4K Filming', 'Social Media Content', 'Ads Management', 'AI Music Creation', 'Script Writing', 'AI Voiceover',
            'Ad Creation', 'On-site 4K Filming', 'Social Media Content', 'Ads Management', 'AI Music Creation', 'Script Writing', 'AI Voiceover',
            'Ad Creation', 'On-site 4K Filming', 'Social Media Content', 'Ads Management', 'AI Music Creation', 'Script Writing', 'AI Voiceover']?.
            map((tech, i) =>
            <span
              key={i}
              className="font-manrope text-2xl font-semibold whitespace-nowrap"
              style={{
                color: i % 3 === 0 ? 'rgba(196,181,247,0.4)' : i % 3 === 1 ? 'rgba(217,70,168,0.3)' : 'rgba(232,228,240,0.15)'
              }}>
              
                {tech}
                <span className="mx-6 text-lavender/20">·</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );

}