import keys from "lodash/keys";
import { create } from "zustand";

import { parseLocalStorageJson } from "../utils/internal/localStorage/parseJSON";
import { extendBorderRadius, ReturnedBorderRadius } from "./extendBorderRadius";
import { extendColors, ReturnedColors } from "./extendColors";

export const LOCAL_COLOR_KEY = "colors";
export const LOCAL_DARK_COLOR_KEY = "dark_colors";
export const LOCAL_BORDER_RADIUS_KEY = "radii";

const isServer = typeof window === "undefined";

type ThemeState = {
  colorState: ReturnedColors | undefined;
  darkColorState: ReturnedColors | undefined;
  borderRadiusState: ReturnedBorderRadius | undefined;
};

export const useThemeState = create<ThemeState>(() => ({
  colorState: extendColors(
    isServer
      ? {}
      : parseLocalStorageJson(localStorage.getItem(LOCAL_COLOR_KEY)) || {}
  ),
  darkColorState: isServer
    ? undefined
    : keys(parseLocalStorageJson(localStorage.getItem(LOCAL_DARK_COLOR_KEY)))
        ?.length > 0
    ? extendColors(
        parseLocalStorageJson(localStorage.getItem(LOCAL_DARK_COLOR_KEY)) || {}
      )
    : undefined,
  borderRadiusState: extendBorderRadius(
    isServer
      ? {}
      : parseLocalStorageJson(localStorage.getItem(LOCAL_BORDER_RADIUS_KEY))
  ),
}));
