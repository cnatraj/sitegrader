/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './app/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FBFAF7',
        surface: '#F2EFE9',
        'surface-hover': '#ECE8E0',
        hairline: '#E6E1D8',
        'hairline-strong': '#DAD3C5',
        ink: '#1A1714',
        'ink-soft': '#5C564E',
        'ink-mute': '#8E867C',
        accent: '#C2410C',
        'accent-hover': '#9A3309',
        status: '#4A8A5E'
      },
      fontFamily: {
        sans: ['"Instrument Sans"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      boxShadow: {
        'focus-ring': '0 0 0 1px #E6E1D8, 0 0 0 5px rgba(194, 65, 12, 0.18)',
        'status-dot': '0 0 0 3px rgba(74, 138, 94, 0.12)'
      }
    }
  },
  plugins: []
}
