/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary:   'rgb(var(--brand-primary) / <alpha-value>)',
          secondary: 'rgb(var(--brand-secondary) / <alpha-value>)',
          accent:    'rgb(var(--brand-accent) / <alpha-value>)',
          ondark:    'rgb(var(--brand-on-dark) / <alpha-value>)',
          surface:   'rgb(var(--brand-surface) / <alpha-value>)',
          text:      'rgb(var(--brand-text) / <alpha-value>)',
          muted:     'rgb(var(--brand-text-muted) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans:    ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'brand-lg': '0 30px 60px -20px rgb(var(--brand-primary) / 0.35)',
        'inset-line': 'inset 0 -1px 0 0 rgb(var(--brand-accent) / 0.4)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(rgb(var(--brand-on-dark) / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--brand-on-dark) / 0.06) 1px, transparent 1px)',
      },
      keyframes: {
        'slide-up':   { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in':    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'marquee':    { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        'slide-up': 'slide-up 0.6s ease-out both',
        'fade-in':  'fade-in 0.8s ease-out both',
        'marquee':  'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};
