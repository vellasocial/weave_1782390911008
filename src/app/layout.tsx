import React from 'react';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
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
      { url: '/assets/images/vella_circle_grey-1789299848363.png', type: 'image/png', sizes: '32x32' },
      { url: '/assets/images/vella_circle_grey-1789299848363.png', type: 'image/png', sizes: '16x16' },
    ],
    shortcut: '/assets/images/vella_circle_grey-1789299848363.png',
    apple: '/assets/images/vella_circle_grey-1789299848363.png',
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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1063301116686053');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=1063301116686053&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fweave17822849back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.20" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.3" /></body>
    </html>
  );
}
