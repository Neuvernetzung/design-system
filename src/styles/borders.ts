import type { Colors } from "../types";

export const borders: Colors = {
  primary: "border-primary-500 dark:border-primary-500",
  accent: "border-accent-300 dark:border-accent-600",
  success: "border-green-500 dark:border-green-500",
  warn: "border-yellow-500 dark:border-yellow-500",
  danger: "border-red-500 dark:border-red-500",
};

export const bordersInteractive: Colors = {
  primary: `${borders.primary} hover:border-primary-700 dark:hover:border-primary-300 focus-visible:border-primary-500 dark:focus-visible:border-primary-400`,
  accent: `${borders.accent} hover:border-accent-500 dark:hover:border-accent-400 focus-visible:border-accent-500 dark:focus-visible:border-accent-400`,
  success: `${borders.success} hover:border-green-700 dark:hover:border-green-300 focus-visible:border-green-500 dark:focus-visible:border-green-400`,
  warn: `${borders.warn} hover:border-yellow-700 dark:hover:border-yellow-300 focus-visible:border-yellow-500 dark:focus-visible:border-yellow-400`,
  danger: `${borders.danger} hover:border-red-700 dark:hover:border-red-300 focus-visible:border-red-500 dark:focus-visible:border-red-400`,
};

export const divides: Colors = {
  primary: "divide-primary-500 dark:divide-primary-500",
  accent: "divide-accent-300 dark:divide-accent-600",
  success: "divide-green-500 dark:divide-green-500",
  warn: "divide-yellow-500 dark:divide-yellow-500",
  danger: "divide-red-500 dark:divide-red-500",
};
