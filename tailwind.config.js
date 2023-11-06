/** @type {import('tailwindcss').Config} */

const colorVariable = (color, key) => {
  if (!key) return `rgb(var(--color-${color}) / <alpha-value>)`;
  return `rgb(var(--color-${color}-${key}) / <alpha-value>)`;
};

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
  950: colorVariable(color, 950),
});

const radiusVariable = (size) => `var(--radius-${size})`;

const radiusVariables = {
  none: radiusVariable("none"),
  sm: radiusVariable("sm"),
  DEFAULT: radiusVariable("DEFAULT"),
  md: radiusVariable("md"),
  lg: radiusVariable("lg"),
  xl: radiusVariable("xl"),
  "2xl": radiusVariable("2xl"),
  "3xl": radiusVariable("3xl"),
  full: radiusVariable("full"),
};

module.exports = {
  content: [`${__dirname}/src/**/*.{ts,tsx}`],
  darkMode: "class",
  theme: {
    fontFamily: {
      heading: [
        "Oswald",
        ...require("tailwindcss/defaultTheme").fontFamily.sans,
      ],
      body: ["Inter", ...require("tailwindcss/defaultTheme").fontFamily.sans],
    },
    borderRadius: radiusVariables,
    extend: {
      colors: {
        white: colorVariable("white"),
        black: colorVariable("black"),
        brand: colorVariables("brand"),
        primary: colorVariables("primary"),
        accent: colorVariables("accent"),
        success: colorVariables("success"),
        warn: colorVariables("warn"),
        danger: colorVariables("danger"),
      },
      animation: {
        popover: "popover 100ms linear",
        popoverOut: "popoverOut 50ms linear",
        tooltip: "tooltip 50ms linear",
        tooltipOut: "tooltipOut 50ms linear",
      },
      keyframes: {
        popover: {
          "0%": { transform: "scale(95%) translateY(5px)", opacity: 0 },
          "100%": { transform: "scale(100%) translateY(0px)", opacity: 1 },
        },
        popoverOut: {
          "0%": { transform: "scale(100%) translateY(0px)", opacity: 1 },
          "100%": { transform: "scale(95%) translateY(5px)", opacity: 0 },
        },
        tooltip: {
          "0%": { transform: "scale(95%)", opacity: 0 },
          "100%": { transform: "scale(100%)", opacity: 1 },
        },
        tooltipOut: {
          "0%": { transform: "scale(100%)", opacity: 1 },
          "100%": { transform: "scale(95%)", opacity: 0 },
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
    require("tailwind-scrollbar"),
    require("tailwindcss/plugin")(({ addVariant }) => {
      addVariant("not-first-of-type", "&>*:not(:first-of-type)");
      addVariant("not-last-of-type", "&>*:not(:last-of-type)");
    }),
  ],
};
