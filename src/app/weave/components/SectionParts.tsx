import { ReactNode } from 'react';
import AppImage from '@/components/ui/AppImage';

export const BODY_GREY = '#D4CEC4';
export const BRASS = '#8A7E6D';
export const BAND_DARK = '#0D0D12';
export const BAND_CHARCOAL = '#17171F';

export const bodyTextStyle = {
  color: BODY_GREY,
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontStyle: 'normal' as const,
  fontSize: '18px',
  lineHeight: 1.6,
};

export const labelStyle = {
  color: BRASS,
  fontSize: '13px',
};

interface SectionNumberProps {
  num: string;
}

export function SectionNumber({ num }: SectionNumberProps) {
  return (
    <span
      aria-hidden="true"
      className="font-manrope font-semibold select-none flex-shrink-0 leading-none text-[72px] md:text-[120px]"
      style={{
        color: 'transparent',
        WebkitTextStroke: `1.5px ${BRASS}`,
        letterSpacing: '-0.02em',
      }}>
      {num}
    </span>
  );
}

interface SectionBandProps {
  tone: 'dark' | 'charcoal';
  children: ReactNode;
}

export function SectionBand({ tone, children }: SectionBandProps) {
  return (
    <div
      className="-mx-6 md:-mx-12 px-6 md:px-12 py-20 md:py-24"
      style={{ background: tone === 'dark' ? BAND_DARK : BAND_CHARCOAL }}>
      {children}
    </div>
  );
}

interface TierBannerProps {
  title: string;
  subtext: string;
  image: string;
  alt: string;
}

export function TierBanner({ title, subtext, image, alt }: TierBannerProps) {
  return (
    <div
      className="relative -mx-6 md:-mx-12 overflow-hidden flex items-center"
      style={{ height: '320px' }}>
      <AppImage src={image} alt={alt} fill className="object-cover w-full h-full" />
      <div className="absolute inset-0" style={{ background: 'rgba(13,13,18,0.72)' }} />
      <div className="relative z-10 w-full px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2
            className="font-manrope font-semibold uppercase leading-none tracking-tight text-[60px] md:text-[84px]"
            style={{ color: BRASS }}>
            {title}
          </h2>
          <p className="mt-4 max-w-2xl" style={{ ...bodyTextStyle, color: '#F5F1EA' }}>
            {subtext}
          </p>
        </div>
      </div>
    </div>
  );
}
