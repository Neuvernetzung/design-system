import type { Size } from "../types";

export const paddingsX: Record<Size, string> = {
  xs: "px-2",
  sm: "px-2",
  md: "px-3",
  lg: "px-6",
  xl: "px-8",
};

export const paddingsY: Record<Size, string> = {
  xs: "py-0.5",
  sm: "py-1",
  md: "py-2",
  lg: "py-3",
  xl: "py-4",
};

export const paddings: Record<Size, string> = {
  xs: `${paddingsX.xs} ${paddingsY.xs}`,
  sm: `${paddingsX.sm} ${paddingsY.sm}`,
  md: `${paddingsX.md} ${paddingsY.md}`,
  lg: `${paddingsX.lg} ${paddingsY.lg}`,
  xl: `${paddingsX.xl} ${paddingsY.xl}`,
};

export const paddingsXSmall: Record<Size, string> = {
  xs: "px-1",
  sm: "px-1",
  md: "px-1.5",
  lg: "px-3",
  xl: "px-4",
};

export const paddingsYSmall: Record<Size, string> = {
  xs: "py-px",
  sm: "py-0.5",
  md: "py-1",
  lg: "py-1.5",
  xl: "py-2",
};

export const paddingsSmall: Record<Size, string> = {
  xs: `${paddingsXSmall.xs} ${paddingsYSmall.xs}`,
  sm: `${paddingsXSmall.sm} ${paddingsYSmall.sm}`,
  md: `${paddingsXSmall.md} ${paddingsYSmall.md}`,
  lg: `${paddingsXSmall.lg} ${paddingsYSmall.lg}`,
  xl: `${paddingsXSmall.xl} ${paddingsYSmall.xl}`,
};

export const paddingsXLarge: Record<Size, string> = {
  xs: "px-1",
  sm: "px-2",
  md: "px-4",
  lg: "px-6",
  xl: "px-8",
};

export const paddingsYLarge: Record<Size, string> = {
  xs: "py-0.5",
  sm: "py-1",
  md: "py-2",
  lg: "py-3",
  xl: "py-4",
};

export const paddingsLarge: Record<Size, string> = {
  xs: `${paddingsXLarge.xs} ${paddingsYLarge.xs}`,
  sm: `${paddingsXLarge.sm} ${paddingsYLarge.sm}`,
  md: `${paddingsXLarge.md} ${paddingsYLarge.md}`,
  lg: `${paddingsXLarge.lg} ${paddingsYLarge.lg}`,
  xl: `${paddingsXLarge.xl} ${paddingsYLarge.xl}`,
};

export const paddingsSmallEvenly: Record<Size, string> = {
  xs: "p-px",
  sm: "p-0.5",
  md: "p-1",
  lg: "p-1.5",
  xl: "p-2",
};

export const paddingsEvenly: Record<Size, string> = {
  xs: "p-0.5",
  sm: "p-1",
  md: "p-2",
  lg: "p-3",
  xl: "p-4",
};

export const paddingsLargeEvenly: Record<Size, string> = {
  xs: "p-1",
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
};

export const pagePaddings: Record<Size, string> = {
  xs: "px-2 lg:px-4",
  sm: "px-4 lg:px-8",
  md: "px-4 sm:px-6 lg:px-12",
  lg: "px-4 sm:px-6 md:px-8 lg:px-16",
  xl: "px-4 sm:px-6 md:px-12 lg:px-24",
};

export const negatePagePaddings: Record<Size, string> = {
  xs: "-mx-2 lg:-mx-4",
  sm: "-mx-4 lg:-mx-8",
  md: "-mx-4 sm:-mx-6 lg:-mx-12",
  lg: "-mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16",
  xl: "-mx-4 sm:-mx-6 md:-mx-12 lg:-mx-24",
};
