import type { Colors, ExtendedColors } from "../types";
import { colorIsBright, getThemeColors } from "../utils";

export const textColors: Colors = {
  primary: "text-primary-500",
  accent: "text-accent-800 dark:text-accent-100",
  success: "text-green-500",
  warn: "text-yellow-500",
  danger: "text-red-500",
};

export const extendedTextColors: ExtendedColors = {
  ...textColors,
  inherit: "text-inherit",
  subtile: "text-accent-300 dark:text-accent-600",
  light: "text-accent-100 dark:text-accent-100",
  dark: "text-accent-800 dark:text-accent-800",
  filled: "text-accent-100 dark:text-accent-800",
};

const realColors = {
  "primary-500": getThemeColors("primary")[500],
  "accent-50": getThemeColors("accent")[50],
  "accent-500": getThemeColors("accent")[500],
  "green-500": getThemeColors("green")[500],
  "yellow-500": getThemeColors("yellow")[500],
  "red-500": getThemeColors("red")[500],
};

export const adjustedTextColors: Colors = {
  primary: colorIsBright(realColors["primary-500"])
    ? "text-accent-50"
    : "text-accent-900",
  white: colorIsBright(realColors["accent-50"])
    ? "text-accent-50"
    : "text-accent-900",
  accent: colorIsBright(realColors["accent-500"])
    ? "text-accent-50"
    : "text-accent-900",
  success: colorIsBright(realColors["green-500"])
    ? "text-accent-50"
    : "text-accent-900",
  warn: colorIsBright(realColors["yellow-500"])
    ? "text-accent-50"
    : "text-accent-900",
  danger: colorIsBright(realColors["red-500"])
    ? "text-accent-50"
    : "text-accent-900",
};

export const bgColors: Colors = {
  primary: "bg-primary-500",
  white: "bg-accent-50 dark:bg-accent-900",
  accent: "bg-accent-500",
  success: "bg-green-500",
  warn: "bg-yellow-500",
  danger: "bg-red-500",
};

export const extendedBgColors: ExtendedColors = {
  ...bgColors,
  filledSubtile: "bg-accent-100 dark:bg-accent-800",
  filled: "bg-accent-200 dark:bg-accent-700",
};

export const bgColorsInteractive: Colors = {
  primary: `${bgColors.primary} hover:bg-primary-600 dark:hover:bg-primary-400`,
  white: `${bgColors.white} hover:bg-accent-100 dark:hover:bg-accent-800`,
  accent: `${bgColors.accent} hover:bg-accent-600 dark:hover:bg-accent-400`,
  success: `${bgColors.success} hover:bg-green-600 dark:hover:bg-green-400`,
  warn: `${bgColors.warn} hover:bg-yellow-600 dark:hover:bg-yellow-400`,
  danger: `${bgColors.danger} hover:bg-red-600 dark:hover:bg-red-400`,
};

export const extendedBgColorsInteractive: ExtendedColors = {
  ...bgColorsInteractive,
  filledSubtile: `${extendedBgColors.filledSubtile} hover:bg-accent-200 dark:hover:bg-accent-700`,
  filled: `${extendedBgColors.filled} hover:bg-accent-300 dark:hover:bg-accent-600`,
};

export const checkboxColors: Colors = {
  primary:
    "checked:bg-primary-500 checked:hover:bg-primary-600 dark:checked:hover:bg-primary-400",
  accent:
    "checked:bg-accent-500 checked:hover:bg-accent-600 dark:checked:hover:bg-accent-400",
  success:
    "checked:bg-green-500 checked:hover:bg-green-600 dark:checked:hover:bg-green-400",
  warn: "checked:bg-yellow-500 checked:hover:bg-yellow-600 dark:checked:hover:bg-yellow-400",
  danger:
    "checked:bg-red-500 checked:hover:bg-red-600 dark:checked:hover:bg-red-400",
};

export const radioColors: Colors = {
  primary:
    "checked:border-primary-500 dark:checked:border-primary-500 checked:hover:border-primary-600 dark:checked:hover:border-primary-400",
  accent:
    "checked:border-accent-500 dark:checked:border-accent-500 checked:hover:border-accent-600 dark:checked:hover:border-accent-400",
  success:
    "checked:border-green-500 dark:checked:border-green-500 checked:hover:border-green-600 dark:checked:hover:border-green-400",
  warn: "checked:border-yellow-500 dark:checked:border-yellow-500 checked:hover:border-yellow-600 dark:checked:hover:border-yellow-400",
  danger:
    "checked:border-red-500 dark:checked:border-red-500 checked:hover:border-red-600 dark:checked:hover:border-red-400",
};
