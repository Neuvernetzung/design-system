import keys from "lodash/keys";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode, useEffect } from "react";

import { Loading } from "../components/ui/Loading";
import { ConfirmationModal } from "../components/ui/Modal/confirmation";
import { Notify } from "../components/ui/Notify";
import { GeneralNotifyProps } from "../components/ui/Notify/notify";
import { Sizes } from "../types";
import { createCSSSelector } from "../utils/internal";
import { parseLocalStorageJson } from "../utils/internal/localStorage/parseJSON";
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
import {
  LOCAL_BORDER_RADIUS_KEY,
  LOCAL_COLOR_KEY,
  LOCAL_DARK_COLOR_KEY,
  useThemeState,
} from "./useThemeState";
import { adjustedTextColors } from "../styles";

type ThemeProviderProps = {
  config?: ConfigProps;
  children: ReactNode;
};

export type ConfigProps = {
  colors?: Partial<ExtendColors>;
  darkColors?: Partial<ExtendColors>;
  icons?: "outline" | "solid" | Icons;
  borderRadius?: keyof Sizes;
  defaultTheme?: "system" | "light" | "dark";
  allowConfirmation?: boolean;
  allowGlobalLoading?: boolean;
  preferSetValuesBeforeConfig?: boolean;
  forcedTheme?: "system" | "light" | "dark";
  disableSetTheme?: boolean;
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
    preferSetValuesBeforeConfig,
    forcedTheme,
    disableSetTheme,
  } = config || {};

  useTheme(":root", {
    colors,
    darkColors,
    borderRadius,
    preferSetValuesBeforeConfig,
    disableSetTheme,
  });

  const { colorState, darkColorState, borderRadiusState } = useThemeState();

  useEffect(() => {
    useThemeState.setState({
      adjustedTextColorState: adjustedTextColors(colorState, darkColorState),
    });
  }, [colorState, darkColorState]);

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
        forcedTheme={forcedTheme}
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
  disableSetTheme?: boolean;
};

export const useTheme = (
  selector: ":root" | string,
  {
    colors,
    darkColors,
    borderRadius,
    preferSetValuesBeforeConfig,
    disableSetTheme,
  }: UseThemeProps
) => {
  useEffect(() => {
    const localStorageColors = localStorage.getItem(LOCAL_COLOR_KEY);

    const parsedLocalStorageColors =
      parseLocalStorageJson(localStorageColors) || {};

    const newColors = getPreferredValue({
      disableSetTheme,
      value: colors,
      localStorageValue: parsedLocalStorageColors,
      preferSetValuesBeforeConfig,
    });

    if (keys(newColors).length > 0) setColors(selector, newColors);
  }, [colors]);

  useEffect(() => {
    const localStorageDarkColors = localStorage.getItem(LOCAL_DARK_COLOR_KEY);

    const parsedLocalStorageDarkColors =
      parseLocalStorageJson(localStorageDarkColors) || {};

    const newColors = getPreferredValue({
      disableSetTheme,
      value: darkColors,
      localStorageValue: parsedLocalStorageDarkColors,
      preferSetValuesBeforeConfig,
    });

    if (keys(newColors).length > 0) setDarkColors(selector, newColors);
  }, [darkColors]);

  useEffect(() => {
    const localStorageBorderRadius = localStorage.getItem(
      LOCAL_BORDER_RADIUS_KEY
    );
    const parsedLocalStorageBorderRadius = parseLocalStorageJson(
      localStorageBorderRadius
    );

    const newBorderRadius = getPreferredValue({
      disableSetTheme,
      value: borderRadius,
      localStorageValue: parsedLocalStorageBorderRadius,
      preferSetValuesBeforeConfig,
    });

    if (keys(newBorderRadius).length > 0)
      setBorderRadius(selector, newBorderRadius);
  }, [borderRadius]);
};

type GetPreferredValueProps = {
  value: any;
  localStorageValue: any;
  disableSetTheme: ConfigProps["disableSetTheme"];
  preferSetValuesBeforeConfig: ConfigProps["preferSetValuesBeforeConfig"];
};

const getPreferredValue = ({
  disableSetTheme,
  value,
  localStorageValue,
  preferSetValuesBeforeConfig,
}: GetPreferredValueProps) =>
  disableSetTheme
    ? value
    : preferSetValuesBeforeConfig
    ? localStorageValue || value
    : value || localStorageValue;

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
