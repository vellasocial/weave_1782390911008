'use client';
import { useState, useEffect, useRef } from 'react';
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
  const [submittedName, setSubmittedName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

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
      setSubmittedName('');
      setError('');
      setNameError('');
      setEmailError('');
    }, 400);
  };

  const validateEnquiry = (): boolean => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    let firstInvalid: HTMLInputElement | null = null;

    if (!trimmedName) {
      setNameError('Please enter your name.');
      firstInvalid = nameRef.current;
    } else {
      setNameError('');
    }

    if (!trimmedEmail) {
      setEmailError('Please enter your email.');
      firstInvalid = firstInvalid ?? emailRef.current;
    } else if (!emailValid) {
      setEmailError('Please enter a valid email address.');
      firstInvalid = firstInvalid ?? emailRef.current;
    } else {
      setEmailError('');
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return false;
    }
    return true;
  };

  const handleSendEnquiry = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validateEnquiry()) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!validateEnquiry()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/send-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone,
          company,
          service,
          project,
        }),
      });

      if (!res.ok) {
        throw new Error('send failed');
      }

      setSubmittedName(name.trim());
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or send via WhatsApp.');
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
            type="button"
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
                  Thanks, {submittedName}. We&apos;ve got your enquiry and will be in touch within 24 hours.
                </p>
              </div>
              <button
              type="button"
              onClick={closePanel}
              className="btn-primary mt-4">

                Close
              </button>
            </div> :

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              {/* Name */}
              <div>
                <label htmlFor="enquiry-name" className="type-label block mb-2" style={{ color: '#B8B0A4' }}>
                  Name <span style={{ color: '#8A7E6D' }}>*</span>
                </label>
                <input
                id="enquiry-name"
                name="name"
                autoComplete="name"
                ref={nameRef}
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); if (nameError) setNameError(''); }}
                aria-invalid={nameError ? true : undefined}
                aria-describedby={nameError ? 'enquiry-name-error' : undefined}
                placeholder="Your full name"
                required
                className={inputClass}
                style={inputStyle}
                {...focusHandlers} />
                {nameError && (
                  <p id="enquiry-name-error" role="alert" className="mt-2 text-sm" style={{ color: '#F87171' }}>{nameError}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="enquiry-email" className="type-label block mb-2" style={{ color: '#B8B0A4' }}>
                  Email <span style={{ color: '#8A7E6D' }}>*</span>
                </label>
                <input
                id="enquiry-email"
                name="email"
                autoComplete="email"
                ref={emailRef}
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(''); }}
                aria-invalid={emailError ? true : undefined}
                aria-describedby={emailError ? 'enquiry-email-error' : undefined}
                placeholder="your@email.com"
                required
                className={inputClass}
                style={inputStyle}
                {...focusHandlers} />
                {emailError && (
                  <p id="enquiry-email-error" role="alert" className="mt-2 text-sm" style={{ color: '#F87171' }}>{emailError}</p>
                )}
              </div>

              {/* WhatsApp / Phone */}
              <div>
                <label htmlFor="enquiry-phone" className="type-label block mb-2" style={{ color: '#B8B0A4' }}>
                  WhatsApp / Phone
                </label>
                <input
                id="enquiry-phone"
                name="tel"
                autoComplete="tel"
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
                <label htmlFor="enquiry-company" className="type-label block mb-2" style={{ color: '#B8B0A4' }}>
                  Company
                </label>
                <input
                id="enquiry-company"
                name="organization"
                autoComplete="organization"
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
                <label htmlFor="enquiry-service" className="type-label block mb-2" style={{ color: '#B8B0A4' }}>
                  Service
                </label>
                <div className="relative">
                  <select
                  id="enquiry-service"
                  name="service"
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
                <label htmlFor="enquiry-project" className="type-label block mb-2" style={{ color: '#B8B0A4' }}>
                  Tell us about your project
                </label>
                <textarea
                id="enquiry-project"
                name="project"
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
                <p role="alert" className="text-sm text-center -mt-2" style={{ color: '#F87171' }}>{error}</p>
              )}
              <div className="flex flex-col md:flex-row gap-3 mt-2">
                <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full md:flex-1 disabled:opacity-60 disabled:cursor-not-allowed">

                  {loading ? 'Sending…' : 'Send via email'}
                </button>
                <a
                href={`https://wa.me/61466096169?text=${encodeURIComponent(
                  `Hi Vella Social, ${name} here from ${company}. I'd like to enquire about a project.${service ? ` Service: ${service}.` : ''} ${project}\n\nThank you,\n\n${name}\n\n${email}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSendEnquiry}
                className="w-full md:flex-1 inline-flex items-center justify-center gap-2 transition-all duration-300"
                style={{
                  border: '1px solid rgba(245,241,234,0.4)',
                  color: '#F5F1EA',
                  borderRadius: '9999px',
                  minHeight: '48px',
                  padding: '0 24px',
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}>

                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Send via WhatsApp
                </a>
              </div>
            </form>
          }
        </div>
      </div>
    </>);

}