import type { Colors, ExtendedColors } from "../types";

export const textColors: Colors = {
  primary: "text-primary-500",
  accent: "text-accent-800 dark:text-accent-100",
  success: "text-green-500",
  warn: "text-yellow-500",
  danger: "text-red-500",
};

export const extendedTextColors: ExtendedColors = {
  ...textColors,
  light: "text-accent-100",
  dark: "text-accent-800",
  filled: "text-accent-100 dark:text-accent-800",
};

export const bgColors: Colors = {
  primary: "bg-primary-500",
  accent: "bg-accent-50 dark:bg-accent-900",
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
  accent: `${bgColors.accent} hover:bg-accent-100 dark:hover:bg-accent-800`,
  success: `${bgColors.success} hover:bg-green-600 dark:hover:bg-green-400`,
  warn: `${bgColors.warn} hover:bg-yellow-600 dark:hover:bg-yellow-400`,
  danger: `${bgColors.danger} hover:bg-red-600 dark:hover:bg-red-400`,
};

export const extendedBgColorsInteractive: ExtendedColors = {
  ...bgColorsInteractive,
  filledSubtile: `${extendedBgColors.filledSubtile} hover:bg-accent-200 dark:hover:bg-accent-700`,
  filled: `${extendedBgColors.filled} hover:bg-accent-300 dark:hover:bg-accent-600`,
};
