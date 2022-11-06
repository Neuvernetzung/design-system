import type { Colors, Color } from "../types";
import twColors from "tailwindcss/colors";

export const extendColors = (
  customColors: Partial<Record<keyof Omit<Colors, "white" | "black">, Color>>
) =>
  ({
    primary: customColors.primary || twColors.blue,
    accent: customColors.accent || twColors.neutral,
    success: customColors.success || twColors.green,
    warn: customColors.warn || twColors.yellow,
    danger: customColors.danger || twColors.red,
  } as Record<keyof Omit<Colors, "white" | "black">, Color>);
