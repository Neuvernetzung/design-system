import { create } from "zustand";
import { extendBorderRadius, ReturnedBorderRadius } from "./extendBorderRadius";
import { extendColors, ReturnedColors } from "./extendColors";
import { adjustedTextColors } from "../styles";
import type { ExtendedColor } from "../types";

export const LOCAL_COLOR_KEY = "colors";
export const LOCAL_DARK_COLOR_KEY = "dark_colors";
export const LOCAL_BORDER_RADIUS_KEY = "radii";

type ThemeState = {
  colorState: ReturnedColors | undefined;
  darkColorState: ReturnedColors | undefined;
  borderRadiusState: ReturnedBorderRadius | undefined;
  adjustedTextColorState: Record<ExtendedColor, string>;
};

export const useThemeState = create<ThemeState>(() => {
  const defaultColors = extendColors();

  return {
    colorState: defaultColors,
    darkColorState: undefined,
    borderRadiusState: extendBorderRadius(),
    adjustedTextColorState: adjustedTextColors(defaultColors, defaultColors),
  };
});
