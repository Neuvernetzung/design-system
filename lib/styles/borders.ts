import type { Colors } from "../types";

export const borders: Colors = {
  primary: "border-primary-500",
  accent: "border-accent-300 dark:border-accent-600",
  success: "border-green-500",
  warn: "border-yellow-500",
  danger: "border-red-500",
};

export const bordersInteractive: Colors = {
  primary: `${borders.primary} hover:border-primary-700 dark:hover:border-primary-300`,
  accent: `${borders.accent} hover:border-accent-500 dark:hover:border-accent-400`,
  success: `${borders.success} hover:border-green-700 dark:hover:border-green-300`,
  warn: `${borders.warn} hover:border-yellow-700 dark:hover:border-yellow-300`,
  danger: `${borders.danger} hover:border-red-700 dark:hover:border-red-300`,
};
