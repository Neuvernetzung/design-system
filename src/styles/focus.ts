import type { Color, ExtendedColor, FocusVariant } from "../types";

export const focusBase: string =
  "focus:outline-none outline-none focus-visible:ring focus-visible:ring-opacity-20 dark:focus-visible:ring-opacity-20";

export const focusRing: Record<Color, string> = {
  brand: `focus-visible:ring-brand-500 ${focusBase}`,
  primary: `focus-visible:ring-primary-500 ${focusBase}`,
  white: `focus-visible:ring-accent-white ${focusBase}`,
  black: `focus-visible:ring-accent-black ${focusBase}`,
  accent: ` focus-visible:ring-accent-600 dark:focus-visible:ring-accent-300 ${focusBase}`,
  success: `focus-visible:ring-success-500 ${focusBase}`,
  warn: `focus-visible:ring-warn-500 ${focusBase}`,
  danger: `focus-visible:ring-danger-500 ${focusBase}`,
};

export const extendedFocusRing: Record<ExtendedColor, string> = {
  ...focusRing,
  inherit: `focus-visible:ring-inherit dark:focus-visible:ring-inherit ${focusBase}`,
  light: `focus-visible:ring-accent-100 dark:focus-visible:ring-accent-100 ${focusBase}`,
  dark: `focus-visible:ring-accent-900 dark:focus-visible:ring-accent-900 ${focusBase}`,
  subtile: `focus-visible:ring-accent-600 dark:focus-visible:ring-accent-400 ${focusBase}`,
  filledSubtile: `focus-visible:ring-accent-300 dark:focus-visible:ring-accent-700 ${focusBase}`,
  filled: `focus-visible:ring-accent-100 dark:focus-visible:ring-accent-900 ${focusBase}`,
};

export const focusBgBase: string = "focus:outline-none outline-none";

export const focusBg: Record<Color, string> = {
  brand: `focus-visible:bg-brand-400 dark:focus-visible:bg-brand-600 ${focusBgBase}`,
  primary: `focus-visible:bg-primary-400 dark:focus-visible:bg-primary-600 ${focusBgBase}`,
  white: `focus-visible:bg-accent-100 dark:bg-accent-900 ${focusBase}`,
  black: `focus-visible:bg-accent-900 dark:bg-accent-100 ${focusBase}`,
  accent: `focus-visible:bg-accent-500 dark:focus-visible:bg-accent-400 ${focusBgBase}`,
  success: `focus-visible:bg-success-400 dark:focus-visible:bg-success-600  {focusBgBase}`,
  warn: `focus-visible:bg-warn-400 dark:focus-visible:bg-warn-600 ${focusBgBase}`,
  danger: `focus-visible:bg-danger-400 dark:focus-visible:bg-danger-600 ${focusBgBase}`,
};

export const extendedfocusBg: Record<ExtendedColor, string> = {
  ...focusBg,
  inherit: `focus-visible:bg-inherit dark:focus-visible:bg-inherit ${focusBgBase}`,
  light: `focus-visible:bg-accent-200 dark:focus-visible:bg-accent-200 ${focusBgBase}`,
  dark: `focus-visible:bg-accent-800 dark:focus-visible:bg-accent-800 ${focusBgBase}`,
  filled: `focus-visible:bg-accent-300 dark:focus-visible:bg-accent-700 ${focusBgBase}`,
  filledSubtile: `focus-visible:bg-accent-200 dark:focus-visible:bg-accent-800 ${focusBgBase}`,
  subtile: `focus-visible:bg-accent-100 dark:focus-visible:bg-accent-900 ${focusBgBase}`,
};

export const focus: Record<Color, string> = focusRing;

export const focuses: Record<FocusVariant, Record<Color, string>> = {
  ring: focusRing,
  bg: focusBg,
};

export const extendedFocuses: Record<
  FocusVariant,
  Record<ExtendedColor, string>
> = {
  ring: extendedFocusRing,
  bg: extendedfocusBg,
};
