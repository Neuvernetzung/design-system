/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./lib/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      heading: ["Oswald", ...defaultTheme.fontFamily.sans],
      body: ["Inter", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        primary: {
          50: "#80d4ff",
          100: "#66cbff",
          200: "#4dc2ff",
          300: "#33b9ff",
          400: "#1ab1ff",
          500: "#00a8ff",
          600: "#0097e6",
          700: "#0086cc",
          800: "#0076b3",
          900: "#006599",
        },
        accent: {
          50: "#ffffff",
          100: "#e6e6e6",
          200: "#cccccc",
          300: "#b3b3b3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4c4c4c",
          800: "#333333",
          900: "#191919",
        },
      },
    },
  },
  variants: {
    extend: {
      ringColor: ["focus-visible"],
      ringWidth: ["focus-visible"],
      ringOpacity: ["focus-visible"],
      borderColor: ["focus-visible"],
    },
  },
  plugins: [
    require("@headlessui/tailwindcss"),
    import("@tailwindcss/forms"),
    import("@tailwindcss/typography"),
    plugin(({ addVariant }) => {
      addVariant("not-first", "&>*:not(:first-child)");
      addVariant("not-last", "&>*:not(:last-child)");
    }),
  ],
};
