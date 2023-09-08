import type { Size } from "../types";

export const shadows: Record<Size, string> = {
  xs: "shadow-sm dark:shadow",
  sm: "shadow dark:shadow-md",
  md: "shadow-md dark:shadow-lg",
  lg: "shadow-lg dark:shadow-xl",
  xl: "shadow-xl dark:shadow-2xl",
};
