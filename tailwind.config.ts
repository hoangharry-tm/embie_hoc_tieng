import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        milk: {
          DEFAULT: 'var(--milk)',
          soft: 'var(--milk-soft)',
        },
        sky: {
          DEFAULT: 'var(--sky)',
          deep: 'var(--sky-deep)',
        },
        lavender: {
          DEFAULT: 'var(--lavender)',
          deep: 'var(--lavender-deep)',
        },
        blush: 'var(--blush)',
        'warm-gray': 'var(--warm-gray)',
        ice: {
          mid: 'var(--ice-mid)',
          deep: 'var(--ice-deep)',
        },
        frost: 'var(--frost)',
        foam: 'var(--foam)',
        surface: {
          DEFAULT: 'var(--surface)',
          strong: 'var(--surface-strong)',
        },
        line: 'var(--line)',
        kicker: 'var(--kicker)',
        'bg-base': 'var(--bg-base)',
        header: 'var(--header-bg)',
        chip: {
          DEFAULT: 'var(--chip-bg)',
          line: 'var(--chip-line)',
        },
        hero: {
          a: 'var(--hero-a)',
          b: 'var(--hero-b)',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        chinese: ['"Noto Serif SC"', 'serif'],
      },
      // borderRadius: {
      //   sm: 'calc(var(--radius) - 4px)',
      //   md: 'calc(var(--radius) - 2px)',
      //   lg: 'var(--radius)',
      //   xl: 'calc(var(--radius) + 6px)',
      //   '2xl': 'calc(var(--radius) + 12px)',
      // },
      boxShadow: {
        island:
          '0 1px 0 var(--inset-glint) inset, 0 22px 44px rgba(30,90,130,0.08), 0 6px 18px rgba(30,58,82,0.07)',
        card: '0 1px 0 var(--inset-glint) inset, 0 18px 34px rgba(30,90,130,0.08), 0 4px 14px rgba(30,58,82,0.06)',
        brand: 'var(--shadow)',
        'brand-card': 'var(--shadow-card)',
      },
      backgroundImage: {
        'island-shell': 'linear-gradient(165deg, var(--surface-strong), var(--surface))',
        'feature-card':
          'linear-gradient(165deg, color-mix(in oklab, var(--surface-strong) 93%, white 7%), var(--surface))',
        'sky-gradient': 'linear-gradient(160deg, rgb(227, 243, 252) 0%, rgb(208, 237, 251) 60%, rgb(217, 233, 255) 100%)'
      },
      backdropBlur: {
        island: '4px',
      },
    },
  },
  plugins: [],
} satisfies Config
