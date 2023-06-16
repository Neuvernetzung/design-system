import { create } from "zustand";
import { extendBorderRadius, ReturnedBorderRadius } from "./extendBorderRadius";

import { extendColors, ReturnedColors } from "./extendColors";

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
