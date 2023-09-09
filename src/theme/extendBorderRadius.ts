import get from "lodash/get";

import type { Size } from "../types";
import { getBorderRadiusVariable } from "../utils";

export const borderRadiusSizes = [
  "none",
  "sm",
  "DEFAULT",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "full",
] as const;

export type BorderRadiusSizes = typeof borderRadiusSizes;

export type BorderRadiusSize = BorderRadiusSizes[number];

export const getBorderRadiusVariables = (
  extendedBorderRadius: ReturnedBorderRadius
) =>
  borderRadiusSizes
    ?.map((radius) =>
      getBorderRadiusVariable(get(extendedBorderRadius, radius), radius)
    )
    .flat()
    .join(";");

export type ReturnedBorderRadius = Record<BorderRadiusSize, string>;

export const extendBorderRadius = (customRadius?: Size): ReturnedBorderRadius =>
  defaultRadii[customRadius || "md"];

const defaultRadii: Record<Size, Record<BorderRadiusSize, string>> = {
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
