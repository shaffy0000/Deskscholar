import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* ── Dark surfaces ─────────────────────────────────── */
        'ink-900': 'var(--ink-900)',
        'ink-800': 'var(--ink-800)',
        'ink-700': 'var(--ink-700)',

        /* ── Light surfaces ────────────────────────────────── */
        paper:   'var(--paper)',
        'paper-2': 'var(--paper-2)',

        /* ── Text on dark ──────────────────────────────────── */
        'text-hi': 'var(--text-hi)',
        'text-lo': 'var(--text-lo)',

        /* ── Text on light ─────────────────────────────────── */
        'ink-hi': 'var(--ink-hi)',
        'ink-lo': 'var(--ink-lo)',

        /* ── The one accent ────────────────────────────────── */
        beam:     'var(--beam)',
        'beam-dim': 'var(--beam-dim)',

        /* ── State colours ─────────────────────────────────── */
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger:  'var(--danger)',

        /* ── Legacy Aliases (Auto-converts old pages to Dark Theme) ── */
        midnight: 'var(--ink-900)',
        'deep-navy': 'var(--ink-800)',
        'dark-line': 'rgba(255, 255, 255, 0.07)',
        ivory: 'var(--ink-900)', // main background maps to dark
        ink: 'var(--text-hi)', // dark text maps to light text
        muted: 'var(--text-lo)',
        line: 'rgba(255, 255, 255, 0.07)',
        brand: {
          DEFAULT: 'var(--beam)',
          dark: 'var(--beam)',
          light: 'var(--beam-dim)',
        },
        sun: {
          DEFAULT: 'var(--beam)',
          dark: 'var(--beam)',
          light: 'var(--beam-dim)',
        },
        aqua: {
          DEFAULT: 'var(--beam)',
          dark: 'var(--beam)',
          light: 'var(--beam-dim)',
        },
      },
      fontFamily: {
        display: ['Sora', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        /* §3.3 — Fluid type scale, clamped */
        display: ['var(--type-display)', { lineHeight: 'var(--lh-display)', letterSpacing: 'var(--ls-display)' }],
        h1:      ['var(--type-h1)', { lineHeight: 'var(--lh-h1)', letterSpacing: 'var(--ls-h1)' }],
        h2:      ['var(--type-h2)', { lineHeight: 'var(--lh-h2)', letterSpacing: 'var(--ls-h2)' }],
        h3:      ['var(--type-h3)', { lineHeight: 'var(--lh-h3)', letterSpacing: 'var(--ls-h3)' }],
        'body-lg': ['var(--type-body-lg)', { lineHeight: 'var(--lh-body-lg)' }],
        body:    ['var(--type-body)', { lineHeight: 'var(--lh-body)' }],
        sm:      ['var(--type-sm)', { lineHeight: 'var(--lh-sm)' }],
        micro:   ['var(--type-micro)', { lineHeight: '1.5' }],
      },
      borderRadius: {
        control: 'var(--radius-control)',
        card:    'var(--radius-card)',
        none:    'var(--radius-none)',
      },
      boxShadow: {
        header: 'var(--shadow-header)',
      },
      maxWidth: {
        content: 'var(--content-max)',
        wide:    'var(--wide-max)',
        measure: 'var(--measure)',
      },
      spacing: {
        'section':   'var(--section-pad)',
        'section-m': 'var(--section-pad-m)',
      },
      transitionTimingFunction: {
        'out': 'var(--ease-out)',
        'io':  'var(--ease-io)',
      },
      transitionDuration: {
        'micro': 'var(--t-micro)',
        'fast':  'var(--t-fast)',
        'base':  'var(--t-base)',
        'slow':  'var(--t-slow)',
      },
    },
  },
  plugins: [],
} satisfies Config;
