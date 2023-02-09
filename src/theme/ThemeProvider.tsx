import get from "lodash/get";
import isString from "lodash/isString";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode, useEffect } from "react";

import { Loading } from "../components/ui/Loading";
import { ConfirmationModal } from "../components/ui/Modal/confirmation";
import { Notify } from "../components/ui/Notify";
import { GeneralNotifyProps } from "../components/ui/Notify/notify";
import { Color, Colors, HEX } from "../types";
import { getRGBColorVariable } from "../utils";
import { createCSSSelector } from "../utils/internal";
import { ExtendColors, extendColors, ReturnedColors } from "./extendColors";
import { Icons } from "./icons";
import { useColorState } from "./useColorState";

const LOCAL_COLOR_KEY = "colors";

type ThemeProviderProps = {
  config?: ConfigProps;
  children: ReactNode;
};

export type ConfigProps = {
  colors?: Partial<ExtendColors>;
  icons?: "outline" | "solid" | Icons;
  defaultTheme?: "system" | "light" | "dark";
  allowConfirmation?: boolean;
  allowGlobalLoading?: boolean;
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
    defaultTheme,
    allowNotification,
    notifyProps,
    allowConfirmation,
    allowGlobalLoading,
  } = config || {};

  useColors(":root", colors);

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

export const useColors = (
  selector: ":root" | string,
  colors?: Partial<ExtendColors>
) =>
  useEffect(() => {
    const localStorageColors = localStorage.getItem(LOCAL_COLOR_KEY);
    setColors(
      selector,
      localStorageColors !== "undefined" && isString(localStorageColors)
        ? JSON.parse(localStorageColors)
        : colors
    );
  }, [colors]);

export const setColors = (
  selector: ":root" | string,
  colors?: Partial<ExtendColors>
) => {
  const extendedColors: ReturnedColors = extendColors(colors);

  if (selector === ":root") {
    useColorState.setState({ colorState: extendedColors });

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
