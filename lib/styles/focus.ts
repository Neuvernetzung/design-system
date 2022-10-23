import type { Colors } from "../types";

export const focusBase: string =
  "focus:outline-none focus-visible:ring focus-visible:ring-opacity-20 dark:focus-visible:ring-opacity-20";

export const focus: Colors = {
  primary: `ring-primary-500 ${focusBase}`,
  accent: ` ring-accent-600 dark:ring-accent-300 ${focusBase}`,
  success: `ring-green-500 ${focusBase}`,
  warn: `ring-yellow-500 ${focusBase}`,
  danger: `ring-red-500 ${focusBase}`,
};
