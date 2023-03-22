import type { Sizes } from "../types";

export type BorderRadiusSizes = {
  none: any;
  sm: any;
  DEFAULT: any;
  md: any;
  lg: any;
  xl: any;
  "2xl": any;
  "3xl": any;
  full: any;
};

export type ReturnedBorderRadius = Record<keyof BorderRadiusSizes, string>;

export const extendBorderRadius = (
  customRadius?: keyof Sizes
): ReturnedBorderRadius => defaultRadii[customRadius || "md"];

const defaultRadii: Record<keyof Sizes, BorderRadiusSizes> = {
  xs: {
    none: "0px",
    sm: "0px",
    DEFAULT: "0px",
    md: "0px",
    lg: "0px",
    xl: "0px",
    "2xl": "0.25rem",
    "3xl": "0.5rem",
    full: "9999px",
  },
  sm: {
    none: "0px",
    sm: "0.05rem",
    DEFAULT: "0.125rem",
    md: "0.25rem",
    lg: "0.375rem",
    xl: "0.5rem",
    "2xl": "0.75rem",
    "3xl": "1rem",
    full: "9999px",
  },
  md: {
    none: "0px",
    sm: "0.125rem",
    DEFAULT: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
  lg: {
    none: "0px",
    sm: "0.25rem",
    DEFAULT: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    "3xl": "2.5rem",
    full: "9999px",
  },
  xl: {
    none: "0px",
    sm: "0.5rem",
    DEFAULT: "1rem",
    md: "2rem",
    lg: "3rem",
    xl: "4rem",
    "2xl": "5rem",
    "3xl": "6.5rem",
    full: "9999px",
  },
};
