import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: 'var(--paper)',
          soft: 'var(--paper-soft)',
          deep: 'var(--paper-deep)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          soft: 'var(--ink-soft)',
          mute: 'var(--ink-mute)',
        },
        rule: 'var(--rule)',
        moss: { DEFAULT: 'var(--moss)', soft: 'var(--moss-soft)' },
        clay: { DEFAULT: 'var(--clay)', soft: 'var(--clay-soft)' },
        saffron: { DEFAULT: 'var(--saffron)', soft: 'var(--saffron-soft)' },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        sans: ['var(--font-plex-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        kicker: '0.18em',
      },
    },
  },
  plugins: [],
};

export default config;
