/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#f94231",
        secondary: "#FFF5F0",
        accent: "#fdc462",
        font: "#4B3F3F",

        positive: "#31cb55",
        negative: "#e83c36",
        neutral: "#FFC107",

        nav: {
          background: "#fe602b",
          linkActive: "#fedf54",
        },

        card: "#FFFFFF",
      },

      boxShadow: {
        nav: "0 2px 6px rgba(0,0,0,0.1)",
      },

      borderRadius: {
        DEFAULT: "10px",
        xl: "1rem",
      },

      spacing: {
        header: "70px",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}