/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#7C5DFA",
        lightPurple: "#9277FF",
        darkGrey: "#1E2139",
        grey: "#252945",
        lightestGrey: "#DFE3FA",
        lightGrey: "#888EB0",
        blueGrey: "#7E88C3",
        almostBlack: "#0C0E16",
        red: "#EC5757",
        lightRed: "#FF9797",
        almostWhite: "#f8f8f8",
        darkestGrey: "#141625",
        orange: "#FF8F00",
      },
      fontFamily: {
        spartan: ["League Spartan", "sans-serif"],
      },
    },
  },
  plugins: [],
};
