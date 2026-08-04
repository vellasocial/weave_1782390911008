import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/index.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'VELLASOCIAL',
  description: 'We create cinematic video ads that sell Bali luxury property to international investors. No film crews, no agency markup.',
  icons: {
    icon: [
      { url: '/assets/images/VELLA_circle_green-1783403042435.png', type: 'image/png' }
    ],
  },
  openGraph: {
    title: 'VELLASOCIAL',
    description: 'We create cinematic video ads that sell Bali luxury property to international investors. No film crews, no agency markup.',
    url: 'https://vellasocial.com',
    siteName: 'VELLASOCIAL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VELLASOCIAL',
    description: 'We create cinematic video ads that sell Bali luxury property to international investors. No film crews, no agency markup.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
       
        {children}

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fweave17822849back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.20" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></body>
    </html>
  );
}
