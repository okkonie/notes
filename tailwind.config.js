/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'rgb(204, 204, 204)',
        dborder: 'rgb(30, 30, 30)',
        greenlightest: '#b0ffb7',
        greenlight: '#93f59b',
        greenbase: '#00780b',
        greendark: '#014707',
        greendarkest: '#013b06',
      },
    },
  },
  plugins: [],
}