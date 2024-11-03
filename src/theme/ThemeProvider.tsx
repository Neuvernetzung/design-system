import keys from "lodash/keys";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode, useEffect, useRef } from "react";

import { Loading } from "../components/ui/Loading";
import { ConfirmationModal } from "../components/ui/Modal/confirmation";
import { Notify } from "../components/ui/Notify";
import type { GeneralNotifyProps } from "../components/ui/Notify/notify";
import { adjustedTextColors } from "../styles";
import type { RequiredInfoVariant, Size } from "../types";
import { createCSSSelector } from "../utils/internal";
import { extendBorderRadius, getBorderRadiusVariables } from "./borderRadius";
import {
  type ExtendColors,
  extendColors,
  getColorVariables,
  type ReturnedColors,
} from "./colors";
import {
  createThemeStore,
  ThemeContext,
  type ThemeStore,
  useThemeState,
  useThemeStore,
} from "./useThemeState";

type ThemeProviderProps = {
  config?: ConfigProps;
  children: ReactNode;
};

export type ConfigProps = {
  colors?: Partial<ExtendColors>;
  darkColors?: Partial<ExtendColors>;
  borderRadius?: Size;
  requiredInfoVariant?: RequiredInfoVariant;
  pagePadding?: Size;
  defaultTheme?: "system" | "light" | "dark";
  allowConfirmation?: boolean;
  allowGlobalLoading?: boolean;
  forcedTheme?: "system" | "light" | "dark";
  disableSetTheme?: boolean;
  iconStrokeWidth?: number;
  maxPageWidth?: Size;
} & NotificationConfigProps;

type NotificationConfigProps =
  | {
      allowNotification: true;
      notifyProps?: GeneralNotifyProps;
    }
  | { allowNotification?: false; notifyProps?: undefined };

export const ThemeProvider = ({ config, children }: ThemeProviderProps) => {
  const {
    colors,
    darkColors,
    borderRadius,
    defaultTheme,
    allowNotification,
    notifyProps,
    allowConfirmation,
    allowGlobalLoading,
    forcedTheme,
    requiredInfoVariant,
    pagePadding,
    iconStrokeWidth,
    maxPageWidth,
  } = config || {};

  const store = useRef(
    // useRef https://zustand.docs.pmnd.rs/guides/initialize-state-with-props#basic-component-usage
    createThemeStore({
      colors,
      darkColors,
      borderRadius,
      requiredInfoVariant,
      pagePadding,
      iconStrokeWidth,
      maxPageWidth,
    })
  ).current;

  useTheme(":root", {
    store,
    colors,
    darkColors,
    borderRadius,
    iconStrokeWidth,
  });

  return (
    <ThemeContext.Provider value={store}>
      <ThemeStyles />
      <NextThemeProvider
        attribute="class"
        forcedTheme={forcedTheme}
        defaultTheme={defaultTheme || "system"}
      >
        {allowNotification && <Notify {...(notifyProps || {})} />}
        {allowConfirmation && <ConfirmationModal />}
        {allowGlobalLoading && <Loading />}
        {children}
      </NextThemeProvider>
    </ThemeContext.Provider>
  );
};

export const ThemeStyles = () => {
  const { colorState, darkColorState, borderRadiusState } = useThemeState();

  const themeStore = useThemeStore();

  useEffect(() => {
    if (colorState)
      themeStore?.setState({
        adjustedTextColorState: adjustedTextColors(
          colorState,
          darkColorState || colorState
        ),
      });
  }, [colorState, darkColorState]);

  const cssColorVariables = colorState && getColorVariables(colorState);
  const cssDarkColorVariables =
    darkColorState && getColorVariables(darkColorState);

  const cssRadiiVariables =
    borderRadiusState && getBorderRadiusVariables(borderRadiusState);

  return (
    <style>
      {`
  :root {
    ${cssColorVariables};
    ${cssRadiiVariables}
  }
  
  html.dark {
    ${cssDarkColorVariables}
  }
  `}
    </style>
  );
};

type UseThemeProps = {
  store: ThemeStore;
  colors?: Partial<ExtendColors>;
  darkColors?: Partial<ExtendColors>;
  borderRadius?: Size;
  iconStrokeWidth?: number;
};

export const useTheme = (
  selector: ":root" | string,
  { store, colors, darkColors, borderRadius, iconStrokeWidth }: UseThemeProps
) => {
  useEffect(() => {
    if (keys(colors).length > 0) setInternalColors(store, selector, colors);
  }, [colors, store]);

  useEffect(() => {
    setInternalDarkColors(store, selector, darkColors);
  }, [darkColors, store]);

  useEffect(() => {
    if (borderRadius) setInternalBorderRadius(store, selector, borderRadius);
  }, [borderRadius, store]);

  useEffect(() => {
    if (iconStrokeWidth)
      setInternalIconStrokeWidth(store, selector, iconStrokeWidth);
  }, [iconStrokeWidth, store]);
};

export const setInternalColors = (
  themeStore: ThemeStore,
  selector: ":root" | string,
  colors?: Partial<ExtendColors>
) => {
  const extendedColors: ReturnedColors = extendColors(colors);

  if (selector === ":root") {
    themeStore.setState({ colorState: extendedColors });
  } else {
    const cssColorVariables = getColorVariables(extendedColors);

    createCSSSelector(selector, cssColorVariables);
  }
};

export const setInternalDarkColors = (
  themeStore: ThemeStore,
  selector: ":root" | string,
  colors?: Partial<ExtendColors>
) => {
  const extendedColors: ReturnedColors | undefined = colors
    ? extendColors(colors)
    : undefined;

  if (selector === ":root") {
    themeStore.setState({ darkColorState: extendedColors });
  } else if (extendedColors) {
    const cssColorVariables = getColorVariables(extendedColors);

    createCSSSelector(`html.dark ${selector}`, cssColorVariables);
  }
};

export const setInternalBorderRadius = (
  themeStore: ThemeStore,
  selector: ":root" | string,
  borderRadius?: Size
) => {
  const extendedBorderRadius = extendBorderRadius(borderRadius);

  if (selector === ":root") {
    themeStore.setState({ borderRadiusState: extendedBorderRadius });
  } else {
    const cssBorderRadiusVariables =
      getBorderRadiusVariables(extendedBorderRadius);

    createCSSSelector(selector, cssBorderRadiusVariables);
  }
};

export const setInternalIconStrokeWidth = (
  themeStore: ThemeStore,
  selector: ":root" | string,
  iconStrokeWidth?: number
) => {
  if (selector === ":root") {
    themeStore.setState({ iconStrokeWidth });
  }
};
