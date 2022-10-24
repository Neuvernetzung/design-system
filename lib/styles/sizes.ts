import type { Sizes } from "../types/Sizes";

export const minHeights: Sizes = {
  xs: "min-h-[20px]",
  sm: "min-h-[28px]",
  md: "min-h-[40px]",
  lg: "min-h-[52px]",
  xl: "min-h-[60px]",
};

export const checkboxSizes: Sizes = {
  xs: "h-2.5 w-2.5",
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
};

export const radioSizes: Sizes = {
  ...checkboxSizes,
};
