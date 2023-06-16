import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode, useEffect } from "react";

import { Loading } from "../components/ui/Loading";
import { ConfirmationModal } from "../components/ui/Modal/confirmation";
import { Notify } from "../components/ui/Notify";
import { GeneralNotifyProps } from "../components/ui/Notify/notify";
import { Sizes } from "../types";
import { createCSSSelector } from "../utils/internal";
import {
  extendBorderRadius,
  getBorderRadiusVariables,
} from "./extendBorderRadius";
import {
  ExtendColors,
  extendColors,
  getColorVariables,
  ReturnedColors,
} from "./extendColors";
import { Icons } from "./icons";
import { useThemeState } from "./useThemeState";
import { parseLocalStorageJson } from "../utils/internal/localStorage/parseJSON";

const LOCAL_COLOR_KEY = "colors";
const LOCAL_DARK_COLOR_KEY = "dark_colors";
const LOCAL_BORDER_RADIUS_KEY = "radii";

type ThemeProviderProps = {
  config?: ConfigProps;
  children: ReactNode;
};

export type ConfigProps = {
  colors?: Partial<ExtendColors>;
  icons?: "outline" | "solid" | Icons;
  borderRadius?: keyof Sizes;
  defaultTheme?: "system" | "light" | "dark";
  allowConfirmation?: boolean;
  allowGlobalLoading?: boolean;
  preferSetValuesBeforeConfig?: boolean;
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
    borderRadius,
    defaultTheme,
    allowNotification,
    notifyProps,
    allowConfirmation,
    allowGlobalLoading,
    preferSetValuesBeforeConfig,
  } = config || {};

  useTheme(":root", { colors, borderRadius, preferSetValuesBeforeConfig });

  const { colorState, darkColorState, borderRadiusState } = useThemeState();

  const cssColorVariables = colorState && getColorVariables(colorState);
  const cssDarkColorVariables =
    darkColorState && getColorVariables(darkColorState);
  const cssRadiiVariables =
    borderRadiusState && getBorderRadiusVariables(borderRadiusState);

  return (
    <>
      <style>
        {`
        :root {
          ${cssColorVariables}
          ${cssRadiiVariables}
        }
        
        html.dark {
          ${cssDarkColorVariables}
        }
        `}
      </style>
      <NextThemeProvider
        attribute="class"
        defaultTheme={defaultTheme || "system"}
      >
        {allowNotification && <Notify {...(notifyProps || {})} />}
        {allowConfirmation && <ConfirmationModal />}
        {allowGlobalLoading && <Loading />}
        {children}
      </NextThemeProvider>
    </>
  );
};

type UseThemeProps = {
  colors?: Partial<ExtendColors>;
  darkColors?: Partial<ExtendColors>;
  borderRadius?: keyof Sizes;
  preferSetValuesBeforeConfig?: boolean;
};

export const useTheme = (
  selector: ":root" | string,
  {
    colors,
    darkColors,
    borderRadius,
    preferSetValuesBeforeConfig,
  }: UseThemeProps
) => {
  useEffect(() => {
    const localStorageColors = localStorage.getItem(LOCAL_COLOR_KEY);

    const parsedLocalStorageColors =
      parseLocalStorageJson(localStorageColors) || {};

    const newColors = preferSetValuesBeforeConfig
      ? parsedLocalStorageColors || colors
      : colors || parsedLocalStorageColors;

    if (newColors) setColors(selector, newColors);
  }, [colors]);

  useEffect(() => {
    const localStorageDarkColors = localStorage.getItem(LOCAL_DARK_COLOR_KEY);

    const parsedLocalStorageDarkColors =
      parseLocalStorageJson(localStorageDarkColors) || {};

    const newColors = preferSetValuesBeforeConfig
      ? parsedLocalStorageDarkColors || darkColors
      : darkColors || parsedLocalStorageDarkColors;

    if (newColors) setDarkColors(selector, newColors);
  }, [darkColors]);

  useEffect(() => {
    const localStorageBorderRadius = localStorage.getItem(
      LOCAL_BORDER_RADIUS_KEY
    );
    const parsedLocalStorageBorderRadius = parseLocalStorageJson(
      localStorageBorderRadius
    );

    const newBorderRadius = preferSetValuesBeforeConfig
      ? parsedLocalStorageBorderRadius || borderRadius
      : borderRadius || parsedLocalStorageBorderRadius;

    if (newBorderRadius) setBorderRadius(selector, newBorderRadius);
  }, [borderRadius]);
};

export const setColors = (
  selector: ":root" | string,
  colors?: Partial<ExtendColors>
) => {
  const extendedColors: ReturnedColors = extendColors(colors);

  if (selector === ":root") {
    useThemeState.setState({ colorState: extendedColors });

    localStorage.setItem(LOCAL_COLOR_KEY, JSON.stringify(colors));
  } else {
    const cssColorVariables = getColorVariables(extendedColors);

    createCSSSelector(selector, cssColorVariables);
  }
};

export const setDarkColors = (
  selector: ":root" | string,
  colors?: Partial<ExtendColors>
) => {
  const extendedColors: ReturnedColors = extendColors(colors);

  if (selector === ":root") {
    useThemeState.setState({ darkColorState: extendedColors });

    localStorage.setItem(LOCAL_DARK_COLOR_KEY, JSON.stringify(colors));
  } else {
    const cssColorVariables = getColorVariables(extendedColors);

    createCSSSelector(`html.dark ${selector}`, cssColorVariables);
  }
};

export const setBorderRadius = (
  selector: ":root" | string,
  borderRadius?: keyof Sizes
) => {
  const extendedBorderRadius = extendBorderRadius(borderRadius);

  if (selector === ":root") {
    useThemeState.setState({ borderRadiusState: extendedBorderRadius });

    localStorage.setItem(LOCAL_BORDER_RADIUS_KEY, JSON.stringify(borderRadius));
  } else {
    const cssBorderRadiusVariables =
      getBorderRadiusVariables(extendedBorderRadius);

    createCSSSelector(selector, cssBorderRadiusVariables);
  }
};
