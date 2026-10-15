/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Colores del manual de marca (+ dos tonos de apoyo para textos legibles)
        cream: '#F7F2EC',
        paper: '#FFFDF9',
        vino: '#5A1A2B',
        'vino-soft': '#7A4E58',
        gold: '#D1AE6A',
        'gold-deep': '#86662B',
        sakura: '#E9A8B6',
        'sakura-deep': '#B8667A',
        line: '#E8DCCF',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { label: '0.32em' },
    },
  },
  plugins: [],
}
