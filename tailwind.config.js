/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        text: 'rgb(var(--text) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        accentlight: 'rgb(var(--accentlight) / <alpha-value>)',
        red: 'rgb(var(--red) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
