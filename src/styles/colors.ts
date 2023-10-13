import cn from "classnames";

import type { ReturnedColors } from "../theme/extendColors";
import type { Color, ExtendedColor, HEX } from "../types";
import { colorIsBright } from "../utils/colorIsBright";

export const textColors: Record<Color, string> = {
  brand: "text-brand-500",
  primary: "text-primary-500",
  white: "text-white dark:text-black",
  black: "text-black dark:text-white",
  accent: "text-accent-900 dark:text-accent-100",
  success: "text-success-500",
  warn: "text-warn-500",
  danger: "text-danger-500",
};

export const extendedTextColors: Record<ExtendedColor, string> = {
  ...textColors,
  inherit: "",
  light: "text-accent-100 dark:text-accent-100",
  dark: "text-accent-900 dark:text-accent-900",
  subtile: "text-accent-600 dark:text-accent-400",
  filledSubtile: "text-accent-300 dark:text-accent-700",
  filled: "text-accent-100 dark:text-accent-900",
};

const adjustTextColor = (color: HEX, darkColor: HEX, differentColor?: HEX) =>
  cn(
    colorIsBright(color) ? "text-white" : "text-black",
    colorIsBright(darkColor || differentColor || color)
      ? "dark:text-white"
      : "dark:text-black"
  );

export const adjustedTextColors = (
  colorState: ReturnedColors,
  darkColorState: ReturnedColors
): Record<ExtendedColor, string> => ({
  brand: adjustTextColor(colorState?.brand[500], darkColorState?.brand[500]),
  primary: adjustTextColor(
    colorState?.primary[500],
    darkColorState?.primary[500]
  ),
  white: adjustTextColor(
    colorState?.white,
    darkColorState?.black,
    colorState?.black
  ),
  black: adjustTextColor(
    colorState?.black,
    darkColorState?.white,
    colorState?.white
  ),
  accent: adjustTextColor(colorState?.accent[600], darkColorState?.accent[600]),
  success: adjustTextColor(
    colorState?.success[500],
    darkColorState?.success[500]
  ),
  warn: adjustTextColor(colorState?.warn[500], darkColorState?.warn[500]),
  danger: adjustTextColor(colorState?.danger[500], darkColorState?.danger[500]),
  inherit: "",
  light: adjustTextColor(colorState?.accent[100], darkColorState?.accent[100]),
  dark: adjustTextColor(colorState?.accent[900], darkColorState?.accent[900]),
  filled: adjustTextColor(
    colorState?.accent[200],
    darkColorState?.accent[800],
    colorState?.accent[800]
  ),
  filledSubtile: adjustTextColor(
    colorState?.accent[100],
    darkColorState?.accent[900],
    colorState?.accent[900]
  ),
  subtile: adjustTextColor(
    colorState?.accent[50],
    darkColorState?.accent[950],
    colorState?.accent[950]
  ),
});

export const bgColors: Record<Color, string> = {
  brand: "bg-brand-500",
  primary: "bg-primary-500",
  white: "bg-white dark:bg-black",
  black: "bg-black dark:bg-white",
  accent: "bg-accent-600",
  success: "bg-success-500",
  warn: "bg-warn-500",
  danger: "bg-danger-500",
};

export const extendedBgColors: Record<ExtendedColor, string> = {
  ...bgColors,
  inherit: "bg-inherit dark:bg-inherit",
  light: "bg-accent-100 dark:bg-accent-100",
  dark: "bg-accent-900 dark:bg-accent-900",
  filled: "bg-accent-200 dark:bg-accent-800",
  filledSubtile: "bg-accent-100 dark:bg-accent-900",
  subtile: "bg-accent-50 dark:bg-accent-950",
};

export const bgColorsInteractive: Record<Color, string> = {
  brand: `${bgColors.brand} hover:bg-brand-600 dark:hover:bg-brand-400`,
  primary: `${bgColors.primary} hover:bg-primary-600 dark:hover:bg-primary-400`,
  white: `${bgColors.white} hover:bg-accent-100 dark:hover:bg-accent-900`,
  black: `${bgColors.black} hover:bg-accent-900 dark:hover:bg-accent-100`,
  accent: `${bgColors.accent} hover:bg-accent-700 dark:hover:bg-accent-500`,
  success: `${bgColors.success} hover:bg-success-600 dark:hover:bg-success-400`,
  warn: `${bgColors.warn} hover:bg-warn-600 dark:hover:bg-warn-400`,
  danger: `${bgColors.danger} hover:bg-danger-600 dark:hover:bg-danger-400`,
};

export const extendedBgColorsInteractive: Record<ExtendedColor, string> = {
  ...bgColorsInteractive,
  inherit: extendedBgColors.inherit,
  light: `${extendedBgColors.light} hover:bg-accent-200 dark:hover:bg-accent-200`,
  dark: `${extendedBgColors.dark} hover:bg-accent-800 dark:hover:bg-accent-800`,
  filled: `${extendedBgColors.filled} hover:bg-accent-300 dark:hover:bg-accent-700`,
  filledSubtile: `${extendedBgColors.filledSubtile} hover:bg-accent-200 dark:hover:bg-accent-800`,
  subtile: `${extendedBgColors.subtile} hover:bg-accent-100 dark:hover:bg-accent-900`,
};

export const fillColors: Record<Color, string> = {
  brand: "fill-brand-500",
  primary: "fill-primary-500",
  white: "fill-white dark:fill-black",
  black: "fill-black dark:fill-white",
  accent: "fill-accent-600",
  success: "fill-success-500",
  warn: "fill-warn-500",
  danger: "fill-danger-500",
};

export const extendedFillColors: Record<ExtendedColor, string> = {
  ...fillColors,
  inherit: "fill-inherit dark:fill-inherit",
  light: "fill-accent-100 dark:fill-accent-100",
  dark: "fill-accent-900 dark:fill-accent-900",
  subtile: "fill-accent-600 dark:fill-accent-400",
  filled: "fill-accent-200 dark:fill-accent-700",
  filledSubtile: "fill-accent-100 dark:fill-accent-800",
};
