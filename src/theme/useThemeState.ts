import { create } from "zustand";
import { extendBorderRadius, ReturnedBorderRadius } from "./extendBorderRadius";

import { extendColors, ReturnedColors } from "./extendColors";

type ColorState = {
  colorState: ReturnedColors | undefined;
  borderRadiusState: ReturnedBorderRadius | undefined;
};

export const useThemeState = create<ColorState>(() => ({
  colorState: extendColors(),
  borderRadiusState: extendBorderRadius(),
}));
