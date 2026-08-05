'use client';
import { useState } from 'react';

export default function CommissionPanel() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [project, setProject] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const closePanel = () => {
    const panel = document.getElementById('commission-panel');
    if (panel) {
      panel.classList.remove('open');
      // Restore scroll on both html and body
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      // Restart Lenis smooth scroll
      if (window.lenisInstance) {
        window.lenisInstance.start();
      }
    }
    // Reset form after close animation
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setProject('');
      setSubmitted(false);
    }, 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/send-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, company, project }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
  'w-full px-5 py-3 rounded-xl font-mono text-sm text-pearl placeholder-pearl/30 outline-none transition-all duration-300 focus:ring-1';
  const inputStyle = {
    background: 'rgba(232,228,240,0.05)',
    border: '1px solid rgba(196,181,247,0.15)'
  };

  return (
    <>
      {/* Backdrop */}
      <div
        id="commission-backdrop"
        className="fixed inset-0 z-50 bg-loom-black/70 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300"
        onClick={closePanel}
        ref={(el) => {
          if (el) {
            const panel = document.getElementById('commission-panel');
            if (panel) {
              const observer = new MutationObserver(() => {
                el.style.opacity = panel.classList.contains('open') ? '1' : '0';
                el.style.pointerEvents = panel.classList.contains('open') ? 'auto' : 'none';
              });
              observer.observe(panel, { attributes: true, attributeFilter: ['class'] });
            }
          }
        }} />


      {/* Modal */}
      <div
        id="commission-panel"
        className="commission-panel fixed top-0 right-0 h-full w-full md:w-[520px] z-[60] flex flex-col overflow-y-auto"
        style={{
          background: 'var(--loom-black-2)',
          borderLeft: '1px solid rgba(196,181,247,0.15)',
          boxShadow: '-24px 0 80px rgba(0,0,0,0.6)'
        }}>

        {/* Header */}
        <div
          className="flex items-center justify-between px-8 py-6 sticky top-0 z-10"
          style={{
            background: 'var(--loom-black-2)',
            borderBottom: '1px solid rgba(196,181,247,0.1)'
          }}>

          <div>
            <h2 className="font-manrope font-semibold text-pearl text-xl tracking-tight">Enquire below

            </h2>
            <p className="font-mono text-xs text-pearl/40 mt-1">
              Tell us about your project
            </p>
          </div>
          <button
            onClick={closePanel}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ border: '1px solid rgba(196,181,247,0.2)', color: '#C4B5F7' }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(196,181,247,0.1)'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}>

            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 px-8 py-8">
          {submitted ?
          <div className="flex flex-col items-center justify-center h-full text-center gap-6 py-16">
              <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(217,70,168,0.15)', border: '1px solid rgba(217,70,168,0.4)' }}>

                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D946A8" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <div>
                <h3 className="font-manrope font-semibold text-pearl text-xl mb-2">
                  Enquiry Received
                </h3>
                <p className="font-mono text-sm text-pearl/40 leading-relaxed max-w-xs">
                  Thank you, {name}. We'll be in touch shortly.
                </p>
              </div>
              <button
              onClick={closePanel}
              className="mt-4 px-8 py-3 rounded-full font-manrope font-semibold text-sm text-white transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #D946A8, #C026A0)' }}>

                Close
              </button>
            </div> :

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div>
                <label className="font-mono text-xs text-lavender/70 tracking-wider uppercase block mb-2">
                  Name <span style={{ color: '#D946A8' }}>*</span>
                </label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
                className={inputClass}
                style={inputStyle}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(217,70,168,0.5)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 1px rgba(217,70,168,0.3)';
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,181,247,0.15)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }} />

              </div>

              {/* Email */}
              <div>
                <label className="font-mono text-xs text-lavender/70 tracking-wider uppercase block mb-2">
                  Email <span style={{ color: '#D946A8' }}>*</span>
                </label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className={inputClass}
                style={inputStyle}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(217,70,168,0.5)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 1px rgba(217,70,168,0.3)';
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,181,247,0.15)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }} />

              </div>

              {/* WhatsApp / Phone */}
              <div>
                <label className="font-mono text-xs text-lavender/70 tracking-wider uppercase block mb-2">
                  WhatsApp / Phone
                </label>
                <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 234 567 8900"
                className={inputClass}
                style={inputStyle}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(217,70,168,0.5)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 1px rgba(217,70,168,0.3)';
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,181,247,0.15)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }} />

              </div>

              {/* Company */}
              <div>
                <label className="font-mono text-xs text-lavender/70 tracking-wider uppercase block mb-2">
                  Company
                </label>
                <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Your company or brand"
                className={inputClass}
                style={inputStyle}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(217,70,168,0.5)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 1px rgba(217,70,168,0.3)';
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,181,247,0.15)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }} />

              </div>

              {/* Tell us about your project */}
              <div>
                <label className="font-mono text-xs text-lavender/70 tracking-wider uppercase block mb-2">
                  Tell us about your project
                </label>
                <textarea
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="Describe your vision, style references, intended use, or anything that helps us understand your project..."
                rows={7}
                className="w-full px-5 py-4 rounded-xl font-mono text-sm text-pearl placeholder-pearl/30 outline-none transition-all duration-300 resize-none leading-relaxed"
                style={inputStyle}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(217,70,168,0.5)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 1px rgba(217,70,168,0.3)';
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,181,247,0.15)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }} />

              </div>

              {/* Submit */}
              {error && (
                <p className="font-mono text-xs text-red-400 text-center -mt-2">{error}</p>
              )}
              <a
              href={`https://wa.me/61466096169?text=${encodeURIComponent(
                `Hi Luke, ${name} here from ${company}. I'm enquiring about your marketing campaigns. ${project}\n\nThank you,\n\n${name}\n\n${email}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-full font-manrope font-semibold text-sm text-white transition-all duration-300 mt-2 flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #D946A8, #C026A0)',
                boxShadow: '0 8px 24px rgba(217,70,168,0.35)'
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(217,70,168,0.55)'; }}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(217,70,168,0.35)'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Send Enquiry
              </a>
            </form>
          }
        </div>
      </div>
    </>);

}