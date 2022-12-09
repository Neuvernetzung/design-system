import type { Colors } from "../types";

export const borders: Colors = {
  brand: "border-brand-500 dark:border-brand-500",
  primary: "border-primary-500 dark:border-primary-500",
  accent: "border-accent-300 dark:border-accent-600",
  success: "border-success-500 dark:border-success-500",
  warn: "border-warn-500 dark:border-warn-500",
  danger: "border-danger-500 dark:border-danger-500",
};

export const bordersInteractive: Colors = {
  brand: `${borders.brand} hover:border-brand-700 dark:hover:border-brand-300 focus-visible:border-brand-500 dark:focus-visible:border-brand-400`,
  primary: `${borders.primary} hover:border-primary-700 dark:hover:border-primary-300 focus-visible:border-primary-500 dark:focus-visible:border-primary-400`,
  accent: `${borders.accent} hover:border-accent-500 dark:hover:border-accent-400 focus-visible:border-accent-500 dark:focus-visible:border-accent-400`,
  success: `${borders.success} hover:border-success-700 dark:hover:border-success-300 focus-visible:border-success-500 dark:focus-visible:border-success-400`,
  warn: `${borders.warn} hover:border-warn-700 dark:hover:border-warn-300 focus-visible:border-warn-500 dark:focus-visible:border-warn-400`,
  danger: `${borders.danger} hover:border-danger-700 dark:hover:border-danger-300 focus-visible:border-danger-500 dark:focus-visible:border-danger-400`,
};

export const divides: Colors = {
  brand: "divide-brand-500 dark:divide-brand-500",
  primary: "divide-primary-500 dark:divide-primary-500",
  accent: "divide-accent-300 dark:divide-accent-600",
  success: "divide-success-500 dark:divide-success-500",
  warn: "divide-warn-500 dark:divide-warn-500",
  danger: "divide-danger-500 dark:divide-danger-500",
};
