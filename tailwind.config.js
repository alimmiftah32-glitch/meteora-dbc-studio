/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        meteora: {
          dark: '#080d11',
          card: '#0f171e',
          border: '#1b2a38',
          accent: '#2bfbb1',
          accentHover: '#22d897',
          cyan: '#00f2fe',
          glow: 'rgba(43, 251, 177, 0.15)',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
