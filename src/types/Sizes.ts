export const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export type Sizes = typeof sizes;

export type Size = Sizes[number];

export const extendedSizes = [
  ...sizes,
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
] as const;

export type ExtendedSizes = typeof extendedSizes;

export type ExtendedSize = ExtendedSizes[number];
