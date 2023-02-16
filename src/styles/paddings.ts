import type { Sizes } from "../types";

export const pagePaddings: string = "px-6 lg:px-12";

export const paddingsX: Sizes = {
  xs: "px-2",
  sm: "px-2",
  md: "px-3",
  lg: "px-6",
  xl: "px-8",
};

export const paddingsY: Sizes = {
  xs: "py-0.5",
  sm: "py-1",
  md: "py-2",
  lg: "py-3",
  xl: "py-4",
};

export const paddings: Sizes = {
  xs: `${paddingsX.xs} ${paddingsY.xs}`,
  sm: `${paddingsX.sm} ${paddingsY.sm}`,
  md: `${paddingsX.md} ${paddingsY.md}`,
  lg: `${paddingsX.lg} ${paddingsY.lg}`,
  xl: `${paddingsX.xl} ${paddingsY.xl}`,
};

export const paddingsXSmall: Sizes = {
  xs: "px-1",
  sm: "px-1",
  md: "px-1.5",
  lg: "px-3",
  xl: "px-4",
};

export const paddingsYSmall: Sizes = {
  xs: "py-px",
  sm: "py-0.5",
  md: "py-1",
  lg: "py-1.5",
  xl: "py-2",
};

export const paddingsSmall: Sizes = {
  xs: `${paddingsXSmall.xs} ${paddingsYSmall.xs}`,
  sm: `${paddingsXSmall.sm} ${paddingsYSmall.sm}`,
  md: `${paddingsXSmall.md} ${paddingsYSmall.md}`,
  lg: `${paddingsXSmall.lg} ${paddingsYSmall.lg}`,
  xl: `${paddingsXSmall.xl} ${paddingsYSmall.xl}`,
};

export const paddingsXLarge: Sizes = {
  xs: "px-1",
  sm: "px-2",
  md: "px-4",
  lg: "px-6",
  xl: "px-8",
};

export const paddingsYLarge: Sizes = {
  xs: "py-0.5",
  sm: "py-1",
  md: "py-2",
  lg: "py-3",
  xl: "py-4",
};

export const paddingsLarge: Sizes = {
  xs: `${paddingsXLarge.xs} ${paddingsYLarge.xs}`,
  sm: `${paddingsXLarge.sm} ${paddingsYLarge.sm}`,
  md: `${paddingsXLarge.md} ${paddingsYLarge.md}`,
  lg: `${paddingsXLarge.lg} ${paddingsYLarge.lg}`,
  xl: `${paddingsXLarge.xl} ${paddingsYLarge.xl}`,
};

export const paddingsSmallEvenly: Sizes = {
  xs: "p-px",
  sm: "p-0.5",
  md: "p-1",
  lg: "p-1.5",
  xl: "p-2",
};

export const paddingsEvenly: Sizes = {
  xs: "p-0.5",
  sm: "p-1",
  md: "p-2",
  lg: "p-3",
  xl: "p-4",
};

export const paddingsLargeEvenly: Sizes = {
  xs: "p-1",
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
};
