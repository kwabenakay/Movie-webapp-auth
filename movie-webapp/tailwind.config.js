/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      red: "#FC4747",
      "teal-blue": "#10141E",
      grey: "#5A698F",
      "light-teal-blue": "#161D2F",
      white: "#fff",
    },
    screens: {
      mobile: "640px",
      // => @media (min-width: 640px) { ... }

      tablet: "768px",
      // => @media (min-width: 768px) { ... }

      "mini-pc": "1024px",
      // => @media (min-width: 1024px) { ... }

      pc: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
  },
  plugins: [],
};
