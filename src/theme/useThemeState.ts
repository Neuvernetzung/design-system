import { create } from "zustand";
import { extendBorderRadius, ReturnedBorderRadius } from "./extendBorderRadius";
import { extendColors, ReturnedColors } from "./extendColors";

export const LOCAL_COLOR_KEY = "colors";
export const LOCAL_DARK_COLOR_KEY = "dark_colors";
export const LOCAL_BORDER_RADIUS_KEY = "radii";

type ThemeState = {
  colorState: ReturnedColors | undefined;
  darkColorState: ReturnedColors | undefined;
  borderRadiusState: ReturnedBorderRadius | undefined;
};

export const useThemeState = create<ThemeState>(() => ({
  colorState: extendColors(),
  darkColorState: undefined,
  borderRadiusState: extendBorderRadius(),
}));
