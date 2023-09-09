export const colorShades = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;

export type ColorShades = typeof colorShades;

export type ColorShade = ColorShades[number];

export type HEX = `#${string}`;

export type ColorObject = Record<ColorShade, HEX>;

export const colors = [
  "brand",
  "primary",
  "accent",
  "success",
  "warn",
  "danger",
  "white",
  "black",
] as const;

export type Colors = typeof colors;

export type Color = Colors[number];

export const extendedColors = [
  ...colors,
  "inherit",
  "subtile",
  "light",
  "dark",
  "filled",
  "filledSubtile",
] as const;

export type ExtendedColors = typeof extendedColors;

export type ExtendedColor = ExtendedColors[number];
