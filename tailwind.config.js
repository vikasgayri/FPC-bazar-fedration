/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', md: '2rem', xl: '2.5rem' },
      screens: { '2xl': '1320px' },
    },
    extend: {
      colors: {
        navy: {
          950: '#06162C',
          900: '#0B2545',
          800: '#10325C',
          700: '#174275',
          600: '#22568F',
          500: '#3A6FA8',
          100: '#E6EDF6',
          50: '#F2F6FB',
        },
        gold: {
          600: '#B08A35',
          500: '#C9A24B',
          400: '#D8B868',
          300: '#E7D29C',
          100: '#F6EDD5',
          50: '#FBF6EA',
        },
        leaf: {
          800: '#164A22',
          700: '#1F5F2C',
          600: '#2E7D32',
          500: '#43A047',
          100: '#E2F0E0',
          50: '#F1F8EF',
        },
        saffron: { 600: '#D4651A', 500: '#E8792B', 400: '#F09A55', 100: '#FDEBDD' },
        cream: { 50: '#FCFAF5', 100: '#F6F0E3', 200: '#ECE2CC' },
        ink: { DEFAULT: '#13213A', soft: '#4A5568', mute: '#7A8496' },
      },
      fontFamily: {
        display: ['Fraunces', '"Tiro Devanagari Hindi"', 'Georgia', 'serif'],
        sans: ['Manrope', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
        hindi: ['"Tiro Devanagari Hindi"', '"Noto Sans Devanagari"', 'serif'],
      },
      fontSize: {
        eyebrow: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.22em' }],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(11,37,69,0.18)',
        card: '0 2px 6px rgba(11,37,69,0.04), 0 18px 40px -18px rgba(11,37,69,0.22)',
        lift: '0 30px 60px -25px rgba(11,37,69,0.35)',
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.05'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1.0) translate(0,0)' },
          '100%': { transform: 'scale(1.12) translate(-1.5%, -1%)' },
        },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        kenburns: 'kenburns 9s ease-out forwards',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
}
