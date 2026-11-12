'use client';
import { useState, useEffect } from 'react';
import { vibrate } from '@/lib/vibrate';

const SERVICE_OPTIONS = [
  'Signature Films',
  'Realism Storytelling',
  'Luxury Property Films',
  'Characters & Locations',
  'Talking Head & VSL',
  'Render to Reality',
  'Performance Ads',
  'Custom package',
  'Not sure yet',
];

export default function CommissionPanel() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('');
  const [project, setProject] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ service?: string }>).detail;
      if (detail?.service && SERVICE_OPTIONS.includes(detail.service)) {
        setService(detail.service);
      }
    };
    window.addEventListener('weave-enquiry-service', handler);
    return () => window.removeEventListener('weave-enquiry-service', handler);
  }, []);

  const closePanel = () => {
    vibrate(20);
    const panel = document.getElementById('commission-panel');
    if (panel) {
      panel.classList.remove('open');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (window.lenisInstance) {
        window.lenisInstance.start();
      }
    }
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setService('');
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
        body: JSON.stringify({ name, email, phone, company, service, project }),
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
  'w-full px-5 py-3 text-base outline-none transition-all duration-300';
  const inputStyle = {
    background: '#1A1A24',
    border: '1px solid rgba(138,126,109,0.25)',
    color: '#F5F1EA',
    borderRadius: '4px',
    fontFamily: 'Manrope, sans-serif',
    minHeight: '48px',
  };

  const focusHandlers = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      (e.currentTarget as HTMLElement).style.borderColor = '#8A7E6D';
      (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 1px #8A7E6D';
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(138,126,109,0.25)';
      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
    },
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
          background: '#13131A',
          borderLeft: '1px solid rgba(138,126,109,0.25)',
          boxShadow: '-24px 0 80px rgba(0,0,0,0.6)'
        }}>

        {/* Header */}
        <div
          className="flex items-center justify-between px-8 py-6 sticky top-0 z-10"
          style={{
            background: '#13131A',
            borderBottom: '1px solid rgba(138,126,109,0.25)'
          }}>

          <div>
            <h2 className="text-[26px] leading-tight" style={{ color: '#F5F1EA' }}>Enquire below</h2>
            <p className="text-sm mt-1" style={{ color: '#B8B0A4' }}>
              Tell us about your project
            </p>
          </div>
          <button
            onClick={closePanel}
            aria-label="Close enquiry form"
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ border: '1px solid rgba(138,126,109,0.25)', color: '#F5F1EA' }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,241,234,0.35)'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(138,126,109,0.25)'}>
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
              style={{ background: 'rgba(138,126,109,0.12)', border: '1px solid #8A7E6D' }}>

                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8A7E6D" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <div>
                <h3 className="text-[26px] mb-2" style={{ color: '#F5F1EA' }}>
                  Enquiry Received
                </h3>
                <p className="type-body max-w-xs">
                  Thank you, {name}. We'll be in touch shortly.
                </p>
              </div>
              <button
              type="button"
              onClick={closePanel}
              className="btn-primary mt-4">

                Close
              </button>
            </div> :

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div>
                <label className="type-label block mb-2" style={{ color: '#B8B0A4' }}>
                  Name <span style={{ color: '#8A7E6D' }}>*</span>
                </label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
                className={inputClass}
                style={inputStyle}
                {...focusHandlers} />

              </div>

              {/* Email */}
              <div>
                <label className="type-label block mb-2" style={{ color: '#B8B0A4' }}>
                  Email <span style={{ color: '#8A7E6D' }}>*</span>
                </label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className={inputClass}
                style={inputStyle}
                {...focusHandlers} />

              </div>

              {/* WhatsApp / Phone */}
              <div>
                <label className="type-label block mb-2" style={{ color: '#B8B0A4' }}>
                  WhatsApp / Phone
                </label>
                <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 234 567 8900"
                className={inputClass}
                style={inputStyle}
                {...focusHandlers} />

              </div>

              {/* Company */}
              <div>
                <label className="type-label block mb-2" style={{ color: '#B8B0A4' }}>
                  Company
                </label>
                <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Your company or brand"
                className={inputClass}
                style={inputStyle}
                {...focusHandlers} />

              </div>

              {/* Service */}
              <div>
                <label className="type-label block mb-2" style={{ color: '#B8B0A4' }}>
                  Service
                </label>
                <div className="relative">
                  <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className={`${inputClass} appearance-none pr-12 cursor-pointer`}
                  style={inputStyle}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#8A7E6D';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 1px #8A7E6D';
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(138,126,109,0.25)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}>
                    <option value="" style={{ background: '#13131A', color: '#B8B0A4' }}>Select a service</option>
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} style={{ background: '#13131A', color: '#F5F1EA' }}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <svg
                  className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none"
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B8B0A4" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>

              {/* Tell us about your project */}
              <div>
                <label className="type-label block mb-2" style={{ color: '#B8B0A4' }}>
                  Tell us about your project
                </label>
                <textarea
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="Describe your vision, style references, intended use, or anything that helps us understand your project..."
                rows={7}
                className="w-full px-5 py-4 text-base outline-none transition-all duration-300 resize-none leading-relaxed"
                style={inputStyle}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#8A7E6D';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 1px #8A7E6D';
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(138,126,109,0.25)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }} />

              </div>

              {/* Submit */}
              {error && (
                <p className="text-sm text-red-400 text-center -mt-2">{error}</p>
              )}
              <a
              href={`https://wa.me/61466096169?text=${encodeURIComponent(
                `Hi Vella Social, ${name} here from ${company}. I'm enquiring about your marketing campaigns.${service ? ` Service: ${service}.` : ''} ${project}\n\nThank you,\n\n${name}\n\n${email}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full mt-2">

                Send Enquiry
              </a>
            </form>
          }
        </div>
      </div>
    </>);

}