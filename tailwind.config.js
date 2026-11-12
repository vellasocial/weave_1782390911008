/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Syne', 'sans-serif'],
        heading: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['Inter', 'sans-serif'],
      },
      colors: {
        loom: {
          black: '#0B0B0D',
          black2: '#141417',
          black3: '#1C1C20',
        },
        lavender: {
          DEFAULT: '#C9A86A',
          dim: 'rgba(242, 239, 233, 0.06)',
          border: 'rgba(242, 239, 233, 0.10)',
        },
        pearl: {
          DEFAULT: '#F2EFE9',
          dim: '#B9B3A8',
        },
        magenta: {
          DEFAULT: '#C9A86A',
          dim: 'rgba(201, 168, 106, 0.15)',
          glow: 'rgba(201, 168, 106, 0.4)',
        },
        taupe: {
          DEFAULT: '#8A857C',
        },
        'warm-grey': {
          DEFAULT: '#B9B3A8',
        },
        'off-white': {
          DEFAULT: '#F2EFE9',
        },
        'near-black': {
          DEFAULT: '#0B0B0D',
        },
        brass: {
          DEFAULT: '#C9A86A',
          hover: '#D8BC85',
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