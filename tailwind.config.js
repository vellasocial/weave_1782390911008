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
        heading: ['Manrope', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        loom: {
          black: '#0D0D12',
          black2: '#13131A',
          black3: '#1A1A24',
        },
        lavender: {
          DEFAULT: '#8A7E6D',
          dim: 'rgba(138, 126, 109, 0.10)',
          border: 'rgba(138, 126, 109, 0.25)',
        },
        pearl: {
          DEFAULT: '#F5F1EA',
          dim: '#B8B0A4',
        },
        magenta: {
          DEFAULT: '#8A7E6D',
          dim: 'rgba(138, 126, 109, 0.15)',
          glow: 'rgba(138, 126, 109, 0.4)',
        },
        taupe: {
          DEFAULT: '#8A7E6D',
        },
        'warm-grey': {
          DEFAULT: '#B8B0A4',
        },
        'off-white': {
          DEFAULT: '#F5F1EA',
        },
        'near-black': {
          DEFAULT: '#0D0D12',
        },
        brass: {
          DEFAULT: '#8A7E6D',
          hover: '#8A7E6D',
        },
      },
      animation: {
        'marquee-slow': 'marquee 60s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      maxWidth: {
        '7xl': '1280px',
      },
    },
  },
  plugins: [],
};