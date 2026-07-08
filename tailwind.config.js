/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        carbon: '#08080a',
        'carbon-2': '#0e0e11',
        'race-red': '#e10600',
        caution: '#ffb800',
        'data-blue': '#3fc1ff',
      },
      fontFamily: {
        display: ['Anton', 'Inter', 'sans-serif'],
        tele: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
