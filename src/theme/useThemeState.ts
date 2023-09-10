import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";
import { persist } from "zustand/middleware";

import { adjustedTextColors } from "../styles";
import type { ExtendedColor, RequiredInfoVariant, Size } from "../types";
import { extendBorderRadius, ReturnedBorderRadius } from "./extendBorderRadius";
import { ExtendColors, extendColors, ReturnedColors } from "./extendColors";

export const LOCAL_THEME_KEY = "theme-storage";

export type ThemeState = {
  colorState: ReturnedColors | undefined;
  darkColorState: ReturnedColors | undefined;
  borderRadiusState: ReturnedBorderRadius | undefined;
  adjustedTextColorState: Record<ExtendedColor, string>;
  requiredInfoVariant: RequiredInfoVariant;
  pagePadding: Size;
};

export type CreateThemeStoreProps = {
  colors?: Partial<ExtendColors>;
  darkColors?: Partial<ExtendColors>;
  borderRadius?: Size;
  requiredInfoVariant?: RequiredInfoVariant;
  pagePadding?: Size;
};

export const createThemeStore = ({
  colors,
  darkColors,
  borderRadius = "md",
  requiredInfoVariant = "star",
  pagePadding = "md",
}: CreateThemeStoreProps) =>
  createStore(
    persist(
      () => {
        const defaultColors = extendColors(colors);
        const defaultDarkColors = darkColors
          ? extendColors(darkColors)
          : undefined;

        return {
          colorState: defaultColors,
          darkColorState: defaultDarkColors,
          borderRadiusState: extendBorderRadius(borderRadius),
          adjustedTextColorState: adjustedTextColors(
            defaultColors,
            defaultDarkColors || defaultColors
          ),
          requiredInfoVariant,
          pagePadding,
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

const missingErrorMessage = "Missing ThemeContext.Provider in the tree";

export const useThemeState = () => {
  const store = useContext(ThemeContext);
  if (!store) throw new Error(missingErrorMessage);

  return useStore(store);
};

export const useThemeStateValue = <T>(
  selector: (state: ThemeState) => T
): T => {
  const store = useContext(ThemeContext);
  if (!store) throw new Error(missingErrorMessage);

  return useStore(store, selector);
};
