/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 👈 enable class-based dark mode
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-autoanimation')],
}
