/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: "#f5e6c5",
          DEFAULT: "#d4af37", // luxury gold
          dark: "#b8860b",
        },
        white: "#ffffff",
        black: "#111111",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],  // elegant serif
        sans: ["Inter", "sans-serif"],        // clean sans
      },
    },
  },
  plugins: [],
}
