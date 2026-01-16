/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'dm-sans': ["DM Sans", "sans-serif"],
        'libre-baskerville': ["Libre Baskerville", "serif"],
      },
    },
  },
  plugins: [],
}
