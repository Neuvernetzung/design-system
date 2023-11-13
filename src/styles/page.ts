import { cn } from "@/utils/cn";

import type { Size } from "..";

export const pagePaddingsX: Record<Size, string> = {
  xs: "px-2 lg:px-4",
  sm: "px-4 lg:px-8",
  md: "px-4 sm:px-6 lg:px-12",
  lg: "px-4 sm:px-6 md:px-8 lg:px-16",
  xl: "px-4 sm:px-6 md:px-12 lg:px-24",
};

export const pagePaddingsY: Record<Size, string> = {
  xs: "py-2",
  sm: "py-2 lg:py-4",
  md: "py-2 sm:py-4 lg:py-6",
  lg: "py-2 sm:py-4 md:py-4 lg:py-8",
  xl: "py-2 sm:py-4 md:py-6 lg:py-12",
};

export const pagePaddings: Record<Size, string> = {
  xs: cn(pagePaddingsX.xs, pagePaddingsY.xs),
  sm: cn(pagePaddingsX.sm, pagePaddingsY.sm),
  md: cn(pagePaddingsX.md, pagePaddingsY.md),
  lg: cn(pagePaddingsX.lg, pagePaddingsY.lg),
  xl: cn(pagePaddingsX.xl, pagePaddingsY.xl),
};

export const negatePagePaddings: Record<Size, string> = {
  xs: "-mx-2 lg:-mx-4",
  sm: "-mx-4 lg:-mx-8",
  md: "-mx-4 sm:-mx-6 lg:-mx-12",
  lg: "-mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16",
  xl: "-mx-4 sm:-mx-6 md:-mx-12 lg:-mx-24",
};

export const pageGaps: Record<Size, string> = {
  xs: "gap-2 lg:gap-4",
  sm: "gap-4 lg:gap-8",
  md: "gap-4 sm:gap-6 lg:gap-12",
  lg: "gap-4 sm:gap-6 md:gap-8 lg:gap-16",
  xl: "gap-4 sm:gap-6 md:gap-12 lg:gap-24",
};

export const maxPageWidths: Record<Size, string> = {
  xs: "max-w-screen-sm",
  sm: "max-w-screen-md",
  md: "max-w-screen-lg",
  lg: "max-w-screen-xl",
  xl: "max-w-screen-2xl",
};
