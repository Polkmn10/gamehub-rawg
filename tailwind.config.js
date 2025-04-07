/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5e9ff',
          100: '#dbc1ff',
          200: '#c199ff',
          300: '#a771ff',
          400: '#8d49ff',
          500: '#742fff',
          600: '#5a24cc',
          700: '#411a99',
          800: '#281066',
          900: '#100633',
        }
      },
      backgroundColor: {
        'dark': '#13111C',
        'dark-lighter': '#1A1B26'
      }
    },
  },
  plugins: [],
}