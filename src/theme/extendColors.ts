import isString from "lodash/isString";

import type { Color, Colors, HEX } from "../types";
import { blendColor } from "../utils/internal";

export type ExtendColors = Partial<
  Record<keyof Omit<Colors, "white" | "black">, Color | HEX> & {
    white: HEX;
    black: HEX;
  }
>;

export type ReturnedColors = Record<
  keyof Omit<Colors, "white" | "black">,
  Color
> & {
  white: HEX;
  black: HEX;
};

export const extendColors = (customColors?: ExtendColors): ReturnedColors => ({
  white: customColors?.white || defaultColors.white,
  black: customColors?.black || defaultColors.black,
  brand: colorCondition("brand", customColors),
  primary: colorCondition("primary", customColors),
  accent: colorCondition("accent", customColors),
  success: colorCondition("success", customColors),
  warn: colorCondition("warn", customColors),
  danger: colorCondition("danger", customColors),
});

const colorCondition = (
  color: keyof Omit<Colors, "white" | "black">,
  customColors?: ExtendColors
) => {
  if (!customColors?.[color]) {
    if (isString(defaultColors[color])) {
      return blendColors(defaultColors[color] as HEX, customColors);
    }
    return defaultColors[color] as Color;
  }
  if (isString(customColors[color])) {
    return blendColors(customColors[color] as HEX, customColors);
  }
  return customColors[color] as Color;
};

const blendColors = (color: HEX, customColors?: ExtendColors): Color => ({
  "50": blendColor(color, customColors?.white || defaultColors.white, 0.9),
  "100": blendColor(color, customColors?.white || defaultColors.white, 0.8),
  "200": blendColor(color, customColors?.white || defaultColors.white, 0.6),
  "300": blendColor(color, customColors?.white || defaultColors.white, 0.4),
  "400": blendColor(color, customColors?.white || defaultColors.white, 0.2),
  "500": color,
  "600": blendColor(color, customColors?.black || defaultColors.black, 0.2),
  "700": blendColor(color, customColors?.black || defaultColors.black, 0.4),
  "800": blendColor(color, customColors?.black || defaultColors.black, 0.6),
  "900": blendColor(color, customColors?.black || defaultColors.black, 0.8),
  "950": blendColor(color, customColors?.black || defaultColors.black, 0.9),
});

const defaultColors: Required<Colors> = {
  white: "#fafafa",
  black: "#0D0D0D",
  brand: "#00a8ff",
  primary: {
    "100": "#dbeafe",
    "200": "#bfdbfe",
    "300": "#93c5fd",
    "400": "#60a5fa",
    "500": "#3b82f6",
    "600": "#2563eb",
    "700": "#1d4ed8",
    "800": "#1e40af",
    "900": "#1e3a8a",
  },
  accent: "#737373",
  success: {
    "100": "#dcfce7",
    "200": "#bbf7d0",
    "300": "#86efac",
    "400": "#4ade80",
    "500": "#22c55e",
    "600": "#16a34a",
    "700": "#15803d",
    "800": "#166534",
    "900": "#14532d",
  },
  warn: {
    "100": "#fef9c3",
    "200": "#fef08a",
    "300": "#fde047",
    "400": "#facc15",
    "500": "#eab308",
    "600": "#ca8a04",
    "700": "#a16207",
    "800": "#854d0e",
    "900": "#713f12",
  },
  danger: {
    "100": "#fee2e2",
    "200": "#fecaca",
    "300": "#fca5a5",
    "400": "#f87171",
    "500": "#ef4444",
    "600": "#dc2626",
    "700": "#b91c1c",
    "800": "#991b1b",
    "900": "#7f1d1d",
  },
};
