/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html","./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "n1": "#007bff",
      },
      fontFamily: {
        'domine': ['"Domine"', 'serif'],
      },
      boxShadow: {
        'custom-light': '0px 0px 10px rgba(0, 0, 0, 0.1)',
      },
      screens: {
        'xxs': '320px', 
      },
    },
  },
  plugins: [],
}

