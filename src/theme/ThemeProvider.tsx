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
import {
  extendBorderRadius,
  getBorderRadiusVariables,
} from "./extendBorderRadius";
import {
  type ExtendColors,
  extendColors,
  getColorVariables,
  type ReturnedColors,
} from "./extendColors";
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
  preferSetValuesOverConfig?: boolean;
  iconStrokeWidth?: number;
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
    preferSetValuesOverConfig,
    iconStrokeWidth,
  } = config || {};

  const store = useRef(
    createThemeStore({
      colors,
      darkColors,
      borderRadius,
      requiredInfoVariant,
      pagePadding,
      iconStrokeWidth,
    })
  ).current;

  useTheme(":root", {
    store,
    colors,
    darkColors,
    borderRadius,
    iconStrokeWidth,
    preferSetValuesOverConfig,
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
  preferSetValuesOverConfig?: boolean;
};

export const useTheme = (
  selector: ":root" | string,
  {
    store,
    colors,
    darkColors,
    borderRadius,
    iconStrokeWidth,
    preferSetValuesOverConfig,
  }: UseThemeProps
) => {
  useEffect(() => {
    if (preferSetValuesOverConfig) return;
    if (keys(colors).length > 0) setColors(store, selector, colors);
  }, [colors, store]);

  useEffect(() => {
    if (preferSetValuesOverConfig) return;
    setDarkColors(store, selector, darkColors);
  }, [darkColors, store]);

  useEffect(() => {
    if (preferSetValuesOverConfig) return;
    if (borderRadius) setBorderRadius(store, selector, borderRadius);
  }, [borderRadius, store]);

  useEffect(() => {
    if (preferSetValuesOverConfig) return;
    if (iconStrokeWidth) setIconStrokeWidth(store, selector, iconStrokeWidth);
  }, [iconStrokeWidth, store]);
};

export const setColors = (
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

export const setDarkColors = (
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

export const setBorderRadius = (
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

export const setIconStrokeWidth = (
  themeStore: ThemeStore,
  selector: ":root" | string,
  iconStrokeWidth?: number
) => {
  if (selector === ":root") {
    themeStore.setState({ iconStrokeWidth });
  }
};
