/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
        handwriting: ['"Delicious Handrawn"', 'cursive'],
      },
      colors: {
        brand: {
          red: 'rgb(var(--brand-primary) / <alpha-value>)',
          black: '#050505',
          gray: '#F5F5F5'
        }
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    }
  },
  plugins: [],
}