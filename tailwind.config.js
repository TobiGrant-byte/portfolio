/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f4f1ea',
          100: '#e8e2d4',
          400: '#8a8478',
          500: '#6b655c',
          600: '#4a463e',
          700: '#2f2c27',
          800: '#1c1b19',
          900: '#0c0c0b',
          950: '#070706',
        },
        signal: {
          DEFAULT: '#2ee59d',
          dim: '#1a9e6c',
          bright: '#5fffc0',
        },
        brass: {
          DEFAULT: '#c9a227',
          muted: '#8b7319',
        },
      },
      fontFamily: {
        display: ['Syne', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(46, 229, 157, 0.35)',
      },
    },
  },
  plugins: [],
}