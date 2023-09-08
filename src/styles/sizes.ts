import type { ExtendedSize, Size } from "../types/Sizes";

export const heights: Record<Size, string> = {
  xs: "h-5",
  sm: "h-7",
  md: "h-10",
  lg: "h-14",
  xl: "h-16",
};

export const heightsSmall: Record<Size, string> = {
  xs: "h-3",
  sm: "h-5",
  md: "h-7",
  lg: "h-10",
  xl: "h-14",
};

export const minHeights: Record<Size, string> = {
  xs: "min-h-[20px]",
  sm: "min-h-[28px]",
  md: "min-h-[40px]",
  lg: "min-h-[56px]",
  xl: "min-h-[64px]",
};

export const checkboxSizes: Record<Size, string> = {
  xs: "h-2.5 w-2.5",
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
};

export const radioSizes: Record<Size, string> = {
  ...checkboxSizes,
};

export const textSizes: Record<ExtendedSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "sm:text-2xl text-xl",
  "3xl": "sm:text-3xl text-2xl",
  "4xl": "md:text-4xl text-3xl",
  "5xl": "lg:text-5xl md:text-4xl text-3xl",
  "6xl": "lg:text-6xl md:text-5xl text-4xl",
};

export const popoverMaxSizes: Record<Size, string> = {
  xs: "max-w-xs",
  sm: "max-w-xs sm:max-w-sm",
  md: "max-w-xs sm:max-w-sm lg:max-w-md",
  lg: "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",
  xl: "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl",
};
