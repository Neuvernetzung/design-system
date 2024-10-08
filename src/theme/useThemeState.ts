import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";

import { adjustedTextColors } from "../styles";
import type { ExtendedColor, RequiredInfoVariant, Size } from "../types";
import { extendBorderRadius, ReturnedBorderRadius } from "./borderRadius";
import { ExtendColors, extendColors, ReturnedColors } from "./colors";

export type ThemeState = {
  colorState: ReturnedColors | undefined;
  darkColorState: ReturnedColors | undefined;
  borderRadiusState: ReturnedBorderRadius | undefined;
  adjustedTextColorState: Record<ExtendedColor, string>;
  requiredInfoVariant: RequiredInfoVariant;
  pagePadding: Size;
  maxPageWidth?: Size;
  iconStrokeWidth: number;
};

export type CreateThemeStoreProps = {
  colors?: Partial<ExtendColors>;
  darkColors?: Partial<ExtendColors>;
  borderRadius?: Size;
  requiredInfoVariant?: RequiredInfoVariant;
  pagePadding?: Size;
  iconStrokeWidth?: number;
  maxPageWidth?: Size;
};

export const createThemeStore = ({
  colors,
  darkColors,
  borderRadius = "md",
  requiredInfoVariant = "star",
  pagePadding = "md",
  maxPageWidth,
  iconStrokeWidth = 1.5,
}: CreateThemeStoreProps) =>
  createStore(() => {
    const defaultColors = extendColors(colors);
    const defaultDarkColors = darkColors ? extendColors(darkColors) : undefined;

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
      iconStrokeWidth,
      maxPageWidth,
    };
  });

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
