import type { Color, ExtendedColor, Size } from "../types";

export const borderVariants = [
  "solid",
  "dashed",
  "dotted",
  "double",
  "hidden",
] as const;

export type BorderVariants = typeof borderVariants;
export type BorderVariant = BorderVariants[number];

export const borders: Record<Color, string> = {
  brand: "border-brand-500 dark:border-brand-500",
  primary: "border-primary-500 dark:border-primary-500",
  white: "border-accent-100 dark:border-accent-900",
  black: "border-accent-900 dark:border-accent-100",
  accent: "border-accent-300 dark:border-accent-700",
  success: "border-success-500 dark:border-success-500",
  warn: "border-warn-500 dark:border-warn-500",
  danger: "border-danger-500 dark:border-danger-500",
};

export const extendedBorders: Record<ExtendedColor, string> = {
  ...borders,
  inherit: "border-inherit",
  light: "border-accent-200",
  filled: "border-accent-200 dark:border-accent-800",
  filledSubtile: "border-accent-100 dark:border-accent-900",
  subtile: "border-accent-50 dark:border-accent-950",
  dark: "border-accent-800",
};

export const bordersInteractive: Record<Color, string> = {
  brand: `${borders.brand} hover:border-brand-700 dark:hover:border-brand-300 focus-visible:border-brand-500 dark:focus-visible:border-brand-400`,
  primary: `${borders.primary} hover:border-primary-700 dark:hover:border-primary-300 focus-visible:border-primary-500 dark:focus-visible:border-primary-400`,
  white: `${borders.white} hover:border-accent-300 dark:hover:border-accent-700 focus-visible:border-accent-200 dark:focus-visible:border-accent-800`,
  black: `${borders.black} hover:border-accent-700 dark:hover:border-accent-300 focus-visible:border-accent-800 dark:focus-visible:border-accent-200`,
  accent: `${borders.accent} hover:border-accent-500 dark:hover:border-accent-400 focus-visible:border-accent-500 dark:focus-visible:border-accent-400`,
  success: `${borders.success} hover:border-success-700 dark:hover:border-success-300 focus-visible:border-success-500 dark:focus-visible:border-success-400`,
  warn: `${borders.warn} hover:border-warn-700 dark:hover:border-warn-300 focus-visible:border-warn-500 dark:focus-visible:border-warn-400`,
  danger: `${borders.danger} hover:border-danger-700 dark:hover:border-danger-300 focus-visible:border-danger-500 dark:focus-visible:border-danger-400`,
};

export const extendedBordersInteractive: Record<ExtendedColor, string> = {
  ...bordersInteractive,
  inherit: extendedBorders.inherit,
  light: `${extendedBorders.light} hover:border-accent-300`,
  dark: `${extendedBorders.dark} hover:border-accent-700`,
  filled: `${extendedBorders.filled} hover:border-accent-300 dark:hover:border-accent-700`,
  filledSubtile: `${extendedBorders.filledSubtile} hover:border-accent-200 dark:hover:border-accent-800`,
  subtile: `${extendedBorders.subtile} hover:border-accent-100 dark:hover:border-accent-900`,
};

export const borderSizesLargeL: Record<Size, string> = {
  xs: "border-l-[1px]",
  sm: "border-l-2",
  md: "border-l-4",
  lg: "border-l-[6px]",
  xl: "border-l-8",
};

export const borderSizesLargeB: Record<Size, string> = {
  xs: "border-b-[1px]",
  sm: "border-b-2",
  md: "border-b-4",
  lg: "border-b-[6px]",
  xl: "border-b-8",
};

export const divides: Record<Color, string> = {
  brand: "divide-brand-500 dark:divide-brand-500",
  primary: "divide-primary-500 dark:divide-primary-500",
  accent: "divide-accent-300 dark:divide-accent-600",
  success: "divide-success-500 dark:divide-success-500",
  warn: "divide-warn-500 dark:divide-warn-500",
  danger: "divide-danger-500 dark:divide-danger-500",
  white: "divide-accent-100 dark:divide-accent-900",
  black: "divide-accent-900 dark:divide-accent-100",
};
