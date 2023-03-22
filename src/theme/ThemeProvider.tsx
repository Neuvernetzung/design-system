import get from "lodash/get";
import isString from "lodash/isString";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode, useEffect } from "react";

import { Loading } from "../components/ui/Loading";
import { ConfirmationModal } from "../components/ui/Modal/confirmation";
import { Notify } from "../components/ui/Notify";
import { GeneralNotifyProps } from "../components/ui/Notify/notify";
import { Color, Colors, HEX, Sizes } from "../types";
import { getBorderRadiusVariable, getRGBColorVariable } from "../utils";
import { createCSSSelector } from "../utils/internal";
import { BorderRadiusSizes, extendBorderRadius } from "./extendBorderRadius";
import { ExtendColors, extendColors, ReturnedColors } from "./extendColors";
import { Icons } from "./icons";
import { useThemeState } from "./useThemeState";

const LOCAL_COLOR_KEY = "colors";
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

  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme={defaultTheme || "system"}
    >
      {allowNotification && <Notify {...(notifyProps || {})} />}
      {allowConfirmation && <ConfirmationModal />}
      {allowGlobalLoading && <Loading />}
      {children}
    </NextThemeProvider>
  );
};

type UseThemeProps = {
  colors?: Partial<ExtendColors>;
  borderRadius?: keyof Sizes;
  preferSetValuesBeforeConfig?: boolean;
};

export const useTheme = (
  selector: ":root" | string,
  { colors, borderRadius, preferSetValuesBeforeConfig }: UseThemeProps
) => {
  useEffect(() => {
    const localStorageColors = localStorage.getItem(LOCAL_COLOR_KEY);
    const parsedLocalStorageColors =
      localStorageColors !== "undefined" &&
      isString(localStorageColors) &&
      JSON.parse(localStorageColors);

    const newColors = preferSetValuesBeforeConfig
      ? parsedLocalStorageColors || colors
      : colors || parsedLocalStorageColors;

    if (newColors) setColors(selector, newColors);
  }, [colors]);

  useEffect(() => {
    const localStorageBorderRadius = localStorage.getItem(
      LOCAL_BORDER_RADIUS_KEY
    );
    const parsedLocalStorageBorderRadius =
      localStorageBorderRadius !== "undefined" &&
      isString(localStorageBorderRadius) &&
      JSON.parse(localStorageBorderRadius);

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
  }

  const cssColorVariables = (
    Object.keys(extendedColors) as Array<
      keyof (Record<keyof Omit<Colors, "white" | "black">, Color> & {
        white: HEX;
        black: HEX;
      })
    >
  )
    ?.map((color) => {
      if (isString(get(extendedColors, color)))
        return getRGBColorVariable(get(extendedColors, color) as HEX, color);
      return Object.keys(get(extendedColors, color))?.map((key) =>
        getRGBColorVariable(
          get(extendedColors, `${color}.${key}`) as unknown as HEX,
          color,
          key
        )
      );
    })
    .flat()
    .join(";");

  createCSSSelector(selector, cssColorVariables);
};

export const setBorderRadius = (
  selector: ":root" | string,
  borderRadius?: keyof Sizes
) => {
  const extendedBorderRadius = extendBorderRadius(borderRadius);

  if (selector === ":root") {
    useThemeState.setState({ borderRadiusState: extendedBorderRadius });

    localStorage.setItem(LOCAL_BORDER_RADIUS_KEY, JSON.stringify(borderRadius));
  }

  const cssBorderRadiusVariables = (
    Object.keys(extendedBorderRadius) as Array<keyof BorderRadiusSizes>
  )
    ?.map((radius) =>
      getBorderRadiusVariable(get(extendedBorderRadius, radius), radius)
    )
    .flat()
    .join(";");

  createCSSSelector(selector, cssBorderRadiusVariables);
};
