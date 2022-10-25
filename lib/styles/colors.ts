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
  accentReverse: "text-accent-100 dark:text-accent-800",
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
