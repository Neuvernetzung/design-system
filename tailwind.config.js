/** @type {import('tailwindcss').Config} */

const colorVariable = (color, key) =>
  `rgb(var(--color-${color}-${key}) / <alpha-value>)`;

const colorVariables = (color) => ({
  50: colorVariable(color, 50),
  100: colorVariable(color, 100),
  200: colorVariable(color, 200),
  300: colorVariable(color, 300),
  400: colorVariable(color, 400),
  500: colorVariable(color, 500),
  600: colorVariable(color, 600),
  700: colorVariable(color, 700),
  800: colorVariable(color, 800),
  900: colorVariable(color, 900),
});

module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./dist**/*.{js,mjs}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      heading: [
        "Oswald",
        ...require("tailwindcss/defaultTheme").fontFamily.sans,
      ],
      body: ["Inter", ...require("tailwindcss/defaultTheme").fontFamily.sans],
    },
    extend: {
      colors: {
        primary: colorVariables("primary"),
        accent: colorVariables("accent"),
        success: colorVariables("success"),
        warn: colorVariables("warn"),
        danger: colorVariables("danger"),
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
    require("@tailwindcss/typography"),
    require("tailwindcss/plugin")(({ addVariant }) => {
      addVariant("not-first-of-type", "&>*:not(:first-of-type)");
      addVariant("not-last-of-type", "&>*:not(:last-of-type)");
    }),
  ],
};
