/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#F5FCF4",
          100: "#F0F5EF",
          200: "#C4DBD5",
          300: "#92AAA3",
          400: "#355F53",
          500: "#008060",
          600: "#002E22",
        },
        error: "#CE3C55",
        success: "#37D7AF",
      },
    },
  },
  plugins: [],
};
