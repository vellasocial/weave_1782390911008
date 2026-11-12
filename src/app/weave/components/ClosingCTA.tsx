'use client';

export default function ClosingCTA() {
  const openEnquiry = () => {
    const panel = document.getElementById('commission-panel');
    if (panel) {
      panel?.classList?.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  return (
    <section
      id="cta"
      className="relative px-6 md:px-12 overflow-hidden"
      style={{ background: '#13131A', paddingTop: '120px', paddingBottom: '120px' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        <p className="type-label mb-6">— Your Turn</p>

        <h2 className="type-closing mb-8" style={{ color: '#F5F1EA' }}>
          <span style={{ display: 'block', color: '#F5F1EA' }}>Be the brand</span>
          <span className="text-outline" style={{ display: 'block' }}>others copy.</span>
        </h2>

        <p className="type-body mb-10 max-w-md">
          Tell us what you&apos;re making.
        </p>

        <button
          type="button"
          onClick={openEnquiry}
          className="btn-primary btn-block-mobile"
        >
          ENQUIRE
        </button>
      </div>
    </section>
  );
}
