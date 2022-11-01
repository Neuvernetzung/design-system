import type { Colors } from "../types";

export const focusBase: string =
  "focus:outline-none focus-visible:ring focus-visible:ring-opacity-20 dark:focus-visible:ring-opacity-20";

export const focusRing: Colors = {
  primary: `ring-primary-500 ${focusBase}`,
  accent: ` ring-accent-600 dark:ring-accent-300 ${focusBase}`,
  success: `ring-green-500 ${focusBase}`,
  warn: `ring-yellow-500 ${focusBase}`,
  danger: `ring-red-500 ${focusBase}`,
};

export const focusBgBase: string = "focus:outline-none";

export const focusBg: Colors = {
  primary: `focus-visible:bg-primary-400 dark:focus-visible:bg-primary-600  ${focusBgBase}`,
  accent: `focus-visible:bg-accent-500 dark:focus-visible:bg-accent-400  ${focusBgBase}`,
  success: `focus-visible:bg-green-400 dark:focus-visible:bg-green-600  ${focusBgBase}`,
  warn: `focus-visible:bg-yellow-400 dark:focus-visible:bg-yellow-600  ${focusBgBase}`,
  danger: `focus-visible:bg-red-400 dark:focus-visible:bg-red-600  ${focusBgBase}`,
};

export const focus: Colors = focusRing;
