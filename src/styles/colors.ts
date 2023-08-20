import type { Colors, ExtendedColors } from "../types";
import { colorIsBright } from "../utils/colorIsBright";

export const textColors: Colors = {
  brand: "text-brand-500",
  primary: "text-primary-500",
  white: "text-white dark:text-black",
  black: "text-black dark:text-white",
  accent: "text-accent-900 dark:text-accent-100",
  success: "text-success-500",
  warn: "text-warn-500",
  danger: "text-danger-500",
};

export const extendedTextColors: ExtendedColors = {
  ...textColors,
  inherit: "",
  light: "text-accent-100 dark:text-accent-100",
  dark: "text-accent-900 dark:text-accent-900",
  subtile: "text-accent-600 dark:text-accent-400",
  filledSubtile: "text-accent-300 dark:text-accent-700",
  filled: "text-accent-100 dark:text-accent-900",
};

export const adjustedTextColors = (
  colorState?: ExtendedColors
): ExtendedColors => ({
  brand: colorIsBright(colorState?.brand[500]) ? "text-white" : "text-black",
  primary: colorIsBright(colorState?.primary[500])
    ? "text-white"
    : "text-black",
  white: colorIsBright(colorState?.white)
    ? "text-white dark:text-black"
    : "text-black dark:text-white",
  black: colorIsBright(colorState?.black)
    ? "text-white dark:text-black"
    : "text-black dark:text-white",
  accent: colorIsBright(colorState?.accent[500]) ? "text-white" : "text-black",
  success: colorIsBright(colorState?.success[500])
    ? "text-white"
    : "text-black",
  warn: colorIsBright(colorState?.warn[500]) ? "text-white" : "text-black",
  danger: colorIsBright(colorState?.danger[500]) ? "text-white" : "text-black",
  light: colorIsBright(colorState?.accent[100]) ? "text-white" : "text-black",
  dark: colorIsBright(colorState?.accent[900]) ? "text-white" : "text-black",
});

export const bgColors: Colors = {
  brand: "bg-brand-500",
  primary: "bg-primary-500",
  white: "bg-white dark:bg-black",
  black: "bg-black dark:bg-white",
  accent: "bg-accent-600",
  success: "bg-success-500",
  warn: "bg-warn-500",
  danger: "bg-danger-500",
};

export const extendedBgColors: ExtendedColors = {
  ...bgColors,
  light: "bg-accent-100 dark:bg-accent-100",
  dark: "bg-accent-900 dark:bg-accent-900",
  filled: "bg-accent-200 dark:bg-accent-800",
  filledSubtile: "bg-accent-100 dark:bg-accent-900",
  subtile: "bg-accent-50 dark:bg-accent-950",
};

export const bgColorsInteractive: Colors = {
  brand: `${bgColors.brand} hover:bg-brand-600 dark:hover:bg-brand-400`,
  primary: `${bgColors.primary} hover:bg-primary-600 dark:hover:bg-primary-400`,
  white: `${bgColors.white} hover:bg-accent-100 dark:hover:bg-accent-900`,
  black: `${bgColors.black} hover:bg-accent-900 dark:hover:bg-accent-100`,
  accent: `${bgColors.accent} hover:bg-accent-700 dark:hover:bg-accent-500`,
  success: `${bgColors.success} hover:bg-success-600 dark:hover:bg-success-400`,
  warn: `${bgColors.warn} hover:bg-warn-600 dark:hover:bg-warn-400`,
  danger: `${bgColors.danger} hover:bg-danger-600 dark:hover:bg-danger-400`,
};

export const extendedBgColorsInteractive: ExtendedColors = {
  ...bgColorsInteractive,
  light: `${extendedBgColors.light} hover:bg-accent-200`,
  dark: `${extendedBgColors.dark} hover:bg-accent-800`,
  filled: `${extendedBgColors.filled} hover:bg-accent-300 dark:hover:bg-accent-700`,
  filledSubtile: `${extendedBgColors.filledSubtile} hover:bg-accent-200 dark:hover:bg-accent-800`,
  subtile: `${extendedBgColors.filledSubtile} hover:bg-accent-100 dark:hover:bg-accent-900`,
};

export const fillColors: Colors = {
  brand: "fill-brand-500",
  primary: "fill-primary-500",
  white: "fill-white dark:fill-black",
  black: "fill-black dark:fill-white",
  accent: "fill-accent-600",
  success: "fill-success-500",
  warn: "fill-warn-500",
  danger: "fill-danger-500",
};

export const extendedFillColors: ExtendedColors = {
  ...fillColors,
  subtile: "fill-accent-600 dark:fill-accent-400",
  filled: "fill-accent-200 dark:fill-accent-700",
  filledSubtile: "fill-accent-100 dark:fill-accent-800",
};
