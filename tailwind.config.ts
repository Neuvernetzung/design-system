import tailwindcssScrollbar from "tailwind-scrollbar";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

import { animationKeyframes, animations } from "@/theme/animations";
import { twRadiusVariables } from "@/theme/borderRadius";
import { twColorVariable, twColorVariables } from "@/theme/colors";

const config: Config = {
  content: [`${__dirname}/src/**/*.{ts,tsx}`],
  darkMode: "class",
  theme: {
    fontFamily: {
      heading: ["Oswald", ...defaultTheme.fontFamily.sans],
      body: ["Inter", ...defaultTheme.fontFamily.sans],
    },
    borderRadius: twRadiusVariables,
    extend: {
      colors: {
        white: twColorVariable("white"),
        black: twColorVariable("black"),
        brand: twColorVariables("brand"),
        primary: twColorVariables("primary"),
        accent: twColorVariables("accent"),
        success: twColorVariables("success"),
        warn: twColorVariables("warn"),
        danger: twColorVariables("danger"),
      },
      animation: animations,
      keyframes: animationKeyframes,
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
    tailwindcssScrollbar,
    plugin(({ addVariant }) => {
      addVariant("not-first-of-type", "&>*:not(:first-of-type)");
      addVariant("not-last-of-type", "&>*:not(:last-of-type)");
    }),
  ],
};

export default config;
