/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      bg: 'rgb(190, 197, 209)',
      dbg: 'rgb(23, 24, 26)',
      black: 'rgb(0,0,0)',
      white: 'rgb(255,255,255)',
      blackt: 'rgba(0,0,0,0.7)',
      whitet: 'rgba(255,255,255,0.7)',
      blue: 'rgb(79, 85, 255)',
      dblue: 'rgb(39, 42, 112)',
    },
    extend: {},
  },
  plugins: [],
}