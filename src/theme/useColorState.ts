import { create } from "zustand";
import { extendColors, ReturnedColors } from "./extendColors";

type ColorState = {
  colorState: ReturnedColors | undefined;
};

export const useColorState = create<ColorState>(() => ({
  colorState: extendColors(),
}));
