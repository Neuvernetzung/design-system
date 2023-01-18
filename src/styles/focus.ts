import type { Colors } from "../types";

export const focusBase: string =
  "focus:outline-none focus-visible:ring focus-visible:ring-opacity-20 dark:focus-visible:ring-opacity-20";

export const focusRing: Colors = {
  brand: `focus-visible:ring-brand-500 ${focusBase}`,
  primary: `focus-visible:ring-primary-500 ${focusBase}`,
  white: `focus-visible:ring-accent-white ${focusBase}`,
  black: `focus-visible:ring-accent-black ${focusBase}`,
  accent: ` focus-visible:ring-accent-600 dark:focus-visible:ring-accent-300 ${focusBase}`,
  success: `focus-visible:ring-success-500 ${focusBase}`,
  warn: `focus-visible:ring-warn-500 ${focusBase}`,
  danger: `focus-visible:ring-danger-500 ${focusBase}`,
};

export const focusBgBase: string = "focus:outline-none";

export const focusBg: Colors = {
  brand: `focus-visible:bg-brand-400 dark:focus-visible:bg-brand-600 ${focusBgBase}`,
  primary: `focus-visible:bg-primary-400 dark:focus-visible:bg-primary-600 ${focusBgBase}`,
  white: `focus-visible:bg-accent-100 dark:bg-accent-900 ${focusBase}`,
  black: `focus-visible:bg-accent-900 dark:bg-accent-100 ${focusBase}`,
  accent: `focus-visible:bg-accent-500 dark:focus-visible:bg-accent-400 ${focusBgBase}`,
  success: `focus-visible:bg-success-400 dark:focus-visible:bg-success-600  {focusBgBase}`,
  warn: `focus-visible:bg-warn-400 dark:focus-visible:bg-warn-600 ${focusBgBase}`,
  danger: `focus-visible:bg-danger-400 dark:focus-visible:bg-danger-600 ${focusBgBase}`,
};

export const focus: Colors = focusRing;
