/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core STITCH / DESIGN.md palette
        primary: '#22130C',
        'primary-container': '#39271F',
        'on-primary': '#FFFFFF',
        'on-primary-container': '#A78D82',
        secondary: '#735A30',
        'secondary-container': '#FDDBA6',
        'secondary-fixed': '#FFDEAB',
        'secondary-fixed-dim': '#E2C28F',
        'on-secondary': '#FFFFFF',
        'on-secondary-container': '#785F34',
        'on-secondary-fixed': '#271900',
        champagne: '#B89A6A',
        'champagne-soft': '#EFE5D6',
        espresso: '#281B18',
        ivory: '#F8F4EC',
        surface: '#FDF9F1',
        'surface-bright': '#FDF9F1',
        'surface-dim': '#DDDAD2',
        'surface-container-lowest': '#FFFFFF',
        'surface-container-low': '#F7F3EB',
        'surface-container': '#F1EDE6',
        'surface-container-high': '#ECE8E0',
        'surface-container-highest': '#E6E2DA',
        'on-surface': '#1C1C17',
        'on-surface-variant': '#4F4540',
        'inverse-surface': '#31302B',
        'inverse-on-surface': '#F4F0E8',
        outline: '#817470',
        'outline-variant': '#D3C3BE',
        error: '#BA1A1A',
        'error-container': '#FFDAD6',
        'on-error-container': '#93000A',
        laurel: '#4D5D43',
        bordeaux: '#873D35',
      },
      fontFamily: {
        display: ['Playfair Display Variable', 'Playfair Display', 'serif'],
        body: ['DM Sans Variable', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        shell: '1360px',
      },
      spacing: {
        'margin-mobile': '1.25rem',
        margin: '3rem',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(40, 27, 24, 0.05)',
        float:
          '0 16px 40px -4px rgba(40, 27, 24, 0.08), 0 2px 6px -1px rgba(40, 27, 24, 0.04)',
        bloom: '0 22px 48px -16px rgba(40, 27, 24, 0.22)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'soft-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.55', transform: 'scale(0.86)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'soft-pulse': 'soft-pulse 2.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
