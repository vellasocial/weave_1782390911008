/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        loom: {
          black: '#0D0D12',
          black2: '#13131A',
          black3: '#1A1A24',
        },
        lavender: {
          DEFAULT: '#C4B5F7',
          dim: 'rgba(196, 181, 247, 0.15)',
          border: 'rgba(196, 181, 247, 0.25)',
        },
        pearl: {
          DEFAULT: '#E8E4F0',
          dim: 'rgba(232, 228, 240, 0.6)',
        },
        magenta: {
          DEFAULT: '#D946A8',
          dim: 'rgba(217, 70, 168, 0.15)',
          glow: 'rgba(217, 70, 168, 0.4)',
        },
      },
      animation: {
        'opacity-pulse': 'opacityPulse 3s ease-in-out infinite',
        'magenta-pulse': 'magentaPulse 2.5s ease-in-out infinite',
        'irid-shift': 'iridShift 12s ease infinite',
        'marquee-slow': 'marquee 60s linear infinite',
      },
      keyframes: {
        opacityPulse: {
          '0%, 100%': { opacity: '0.85' },
          '50%': { opacity: '1' },
        },
        magentaPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(217,70,168,0.4), 0 8px 32px rgba(217,70,168,0.35)' },
          '50%': { boxShadow: '0 0 0 12px rgba(217,70,168,0), 0 8px 32px rgba(217,70,168,0.5)' },
        },
        iridShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};