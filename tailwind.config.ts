import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core palette
        midnight: '#081321', // dark section backgrounds
        'deep-navy': '#102036', // cards inside dark sections
        'dark-line': '#1C2C44', // borders inside dark sections
        ivory: '#FAF7F2', // main page background (warm paper white)
        white: '#FFFFFF', // cards
        ink: '#111827', // headings
        muted: '#5B6B80', // slate body text; AA on ivory (#64748B measured 4.49:1)
        line: '#E6E0D6', // borders (warm grey)
        // Brand (violet)
        brand: {
          DEFAULT: '#625BF6',
          dark: '#4F46D8',
          light: '#EEECFF',
        },
        // Warm tertiary accent (apricot) — learning moments & hint surfaces
        sun: {
          DEFAULT: '#E08A3C',
          dark: '#8A5119', // AA (5.2:1) on sun-light and ivory
          light: '#FBEBD9',
        },
        // Technical accent (aqua) — offline/local/scanning/privacy only
        aqua: {
          DEFAULT: '#22C3CF',
          dark: '#0F6B75', // AA on aqua-light (#127C86 measured 4.49:1)
          light: '#E4F8FA',
        },
        // State colors
        success: '#059669',
        warning: '#D97706',
        danger: '#DC2626',
      },
      fontFamily: {
        display: ['Sora', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2.1rem, 1.55rem + 2.4vw, 3.4rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        h1: ['clamp(1.85rem, 1.45rem + 1.8vw, 2.8rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        h2: ['clamp(1.55rem, 1.25rem + 1.4vw, 2.35rem)', { lineHeight: '1.18', letterSpacing: '-0.015em' }],
        h3: ['clamp(1.1rem, 1.02rem + 0.4vw, 1.35rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        lead: ['clamp(1rem, 0.96rem + 0.25vw, 1.15rem)', { lineHeight: '1.65' }],
      },
      borderRadius: {
        card: '18px',
        panel: '24px',
        hero: '30px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(17, 24, 39, 0.04), 0 8px 24px -14px rgba(17, 24, 39, 0.12)',
        card: '0 2px 4px rgba(17, 24, 39, 0.04), 0 14px 32px -14px rgba(17, 24, 39, 0.16)',
      },
      maxWidth: {
        content: '68ch',
        prose: '78ch',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.85)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(0%)', opacity: '0' },
          '12%': { opacity: '1' },
          '88%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 2.6s ease-in-out infinite',
        'scan-line': 'scan-line 3.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
