'use client';
import { useState, useRef, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function LookbookCapture() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const items = sectionRef.current?.querySelectorAll('.reveal-up');
    items?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden"
      style={{ background: 'var(--loom-black-3)' }}>
      
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(196,181,247,0.06) 0%, transparent 70%)'
        }} />
      

      <div className="max-w-7xl mx-auto">
        {/* Bento row: 3 texture cells + lookbook capture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Texture cell 1 */}
          <div
            className="iridescent-cell rounded-2xl overflow-hidden reveal-up"
            style={{ border: '1px solid rgba(196,181,247,0.1)', height: '240px' }}>
            
            <div className="relative w-full h-full">
              <AppImage
                src="https://images.unsplash.com/photo-1726206916294-80798fc3b631"
                alt="Extreme close-up of woven textile showing individual thread colors and texture"
                fill
                className="cell-img object-cover" />
              
              <div className="absolute inset-0 bg-gradient-to-br from-loom-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="font-mono text-[10px] text-lavender/70 tracking-wider">Warp & Weft Detail</span>
              </div>
            </div>
          </div>

          {/* Texture cell 2 */}
          <div
            className="iridescent-cell rounded-2xl overflow-hidden reveal-up"
            style={{ border: '1px solid rgba(196,181,247,0.1)', height: '240px', transitionDelay: '80ms' }}>
            
            <div className="relative w-full h-full">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1e2226596-1769178687781.png"
                alt="Macro photography of velvet fabric texture showing pile direction and light reflection"
                fill
                className="cell-img object-cover" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-loom-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="font-mono text-[10px] text-pearl/50 tracking-wider">Velvet Pile Macro</span>
              </div>
            </div>
          </div>

          {/* Texture cell 3 */}
          <div
            className="iridescent-cell rounded-2xl overflow-hidden reveal-up"
            style={{ border: '1px solid rgba(196,181,247,0.1)', height: '240px', transitionDelay: '160ms' }}>
            
            <div className="relative w-full h-full">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_118f44ad2-1767440697658.png"
                alt="Digital print fabric close-up showing ink saturation and fiber absorption"
                fill
                className="cell-img object-cover" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-loom-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="font-mono text-[10px] text-pearl/50 tracking-wider">Digital Print Detail</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}