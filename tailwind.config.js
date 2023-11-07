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
        backdrop: "backdrop 100ms linear",
        backdropOut: "backdropOut 50ms linear",
        disclosure: "disclosure 100ms linear",
        disclosureOut: "disclosureOut 50ms linear",
        drawerRight: "drawerRight 100ms linear",
        drawerRightOut: "drawerRightOut 100ms linear",
        drawerLeft: "drawerLeft 100ms linear",
        drawerLeftOut: "drawerLeftOut 100ms linear",
        drawerTop: "drawerTop 100ms linear",
        drawerTopOut: "drawerTopOut 100ms linear",
        drawerBottom: "drawerBottom 100ms linear",
        drawerBottomOut: "drawerBottomOut 100ms linear",
        checkbox: "checkbox 150ms linear",
        checkboxOut: "checkboxOut 100ms linear",
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
        backdrop: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        backdropOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        disclosure: {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        disclosureOut: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        drawerRight: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0%)" },
        },
        drawerRightOut: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(100%)" },
        },
        drawerLeft: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0%)" },
        },
        drawerLeftOut: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(-100%)" },
        },
        drawerTop: {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0%)" },
        },
        drawerTopOut: {
          from: { transform: "translateY(0%)" },
          to: { transform: "translateY(-100%)" },
        },
        drawerBottom: {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0%)" },
        },
        drawerBottomOut: {
          from: { transform: "translateY(0%)" },
          to: { transform: "translateY(100%)" },
        },
        checkbox: {
          from: { opacity: 0, strokeDashoffset: "100%", scale: 0.5 },
          to: {
            opacity: 1,
            strokeDashoffset: 0,
            scale: 1,
          },
        },
        checkboxOut: {
          from: { opacity: 1, strokeDashoffset: 0, scale: 1 },
          to: {
            opacity: 0,
            strokeDashoffset: "100%",
            scale: 0.5,
          },
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
