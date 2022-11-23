import type { Colors, ExtendedColors } from "../types";
import { colorIsBright } from "../utils";

export const textColors: Colors = {
  primary: "text-primary-500",
  accent: "text-accent-800 dark:text-accent-100",
  success: "text-success-500",
  warn: "text-warn-500",
  danger: "text-danger-500",
};

export const extendedTextColors: ExtendedColors = {
  ...textColors,
  inherit: "text-inherit",
  subtile: "text-accent-300 dark:text-accent-600",
  light: "text-accent-100 dark:text-accent-100",
  dark: "text-accent-800 dark:text-accent-800",
  filled: "text-accent-100 dark:text-accent-800",
};

export const adjustedTextColors = (colorState?: Colors) =>
  ({
    primary: colorIsBright(colorState?.primary[500])
      ? "text-accent-50"
      : "text-accent-900",
    white: colorIsBright(colorState?.accent[50])
      ? "text-accent-50"
      : "text-accent-900",
    accent: colorIsBright(colorState?.accent[500])
      ? "text-accent-50"
      : "text-accent-900",
    success: colorIsBright(colorState?.success[500])
      ? "text-accent-50"
      : "text-accent-900",
    warn: colorIsBright(colorState?.warn[500])
      ? "text-accent-50"
      : "text-accent-900",
    danger: colorIsBright(colorState?.danger[500])
      ? "text-accent-50"
      : "text-accent-900",
  } as Colors);

export const bgColors: Colors = {
  primary: "bg-primary-500",
  white: "bg-accent-50 dark:bg-accent-900",
  black: "bg-accent-900 dark:bg-accent-50",
  accent: "bg-accent-600",
  success: "bg-success-500",
  warn: "bg-warn-500",
  danger: "bg-danger-500",
};

export const extendedBgColors: ExtendedColors = {
  ...bgColors,
  filledSubtile: "bg-accent-100 dark:bg-accent-800",
  filled: "bg-accent-200 dark:bg-accent-700",
};

export const bgColorsInteractive: Colors = {
  primary: `${bgColors.primary} hover:bg-primary-600 dark:hover:bg-primary-400`,
  white: `${bgColors.white} hover:bg-accent-100 dark:hover:bg-accent-800`,
  accent: `${bgColors.accent} hover:bg-accent-700 dark:hover:bg-accent-500`,
  success: `${bgColors.success} hover:bg-success-600 dark:hover:bg-success-400`,
  warn: `${bgColors.warn} hover:bg-warn-600 dark:hover:bg-warn-400`,
  danger: `${bgColors.danger} hover:bg-danger-600 dark:hover:bg-danger-400`,
};

export const extendedBgColorsInteractive: ExtendedColors = {
  ...bgColorsInteractive,
  filledSubtile: `${extendedBgColors.filledSubtile} hover:bg-accent-200 dark:hover:bg-accent-700`,
  filled: `${extendedBgColors.filled} hover:bg-accent-300 dark:hover:bg-accent-600`,
};
