import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";
import { persist } from "zustand/middleware";

import { adjustedTextColors } from "../styles";
import type { ExtendedColor, Size } from "../types";
import { extendBorderRadius, ReturnedBorderRadius } from "./extendBorderRadius";
import { ExtendColors, extendColors, ReturnedColors } from "./extendColors";

export const LOCAL_THEME_KEY = "theme-storage";

export type ThemeState = {
  colorState: ReturnedColors | undefined;
  darkColorState: ReturnedColors | undefined;
  borderRadiusState: ReturnedBorderRadius | undefined;
  adjustedTextColorState: Record<ExtendedColor, string>;
};

export type CreateThemeStoreProps = {
  colors?: Partial<ExtendColors>;
  darkColors?: Partial<ExtendColors>;
  borderRadius?: Size;
};

export const createThemeStore = ({
  colors,
  darkColors,
  borderRadius,
}: CreateThemeStoreProps) =>
  createStore(
    persist(
      () => {
        const defaultColors = extendColors(colors);
        const defaultDarkColors = extendColors(darkColors);

        return {
          colorState: defaultColors,
          darkColorState: defaultDarkColors,
          borderRadiusState: extendBorderRadius(borderRadius),
          adjustedTextColorState: adjustedTextColors(
            defaultColors,
            defaultDarkColors
          ),
        };
      },
      {
        name: LOCAL_THEME_KEY,
      }
    )
  );

export type ThemeStore = ReturnType<typeof createThemeStore>;

export const ThemeContext = createContext<ThemeStore | null>(null);

export const useThemeStore = () => useContext(ThemeContext);

export const useThemeState = () => {
  const store = useContext(ThemeContext);
  if (!store) throw new Error("Missing ThemeContext.Provider in the tree");

  return useStore(store);
};
