import { isString } from "lodash";
import get from "lodash/get";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode, useEffect } from "react";
import create from "zustand";

import { Loading } from "../components/ui/Loading";
import { ConfirmationModal } from "../components/ui/Modal";
import { Notify } from "../components/ui/Notify";
import { Color, Colors, HEX } from "../types";
import { getRGBColorVariable } from "../utils";
import { createCSSSelector } from "../utils/internal";
import { ExtendColors, extendColors, ReturnedColors } from "./extendColors";
import { Icons } from "./icons";

type ThemeProviderProps = {
  config?: ConfigProps;
  children: ReactNode;
  allowNotification?: boolean;
  allowConfirmation?: boolean;
  allowGlobalLoading?: boolean;
};

export type ConfigProps = {
  colors?: Partial<ExtendColors>;
  icons?: "outline" | "solid" | Icons;
  defaultTheme?: "system" | "light" | "dark";
};

type ColorState = {
  colorState: ReturnedColors | undefined;
};

export const useColorState = create<ColorState>(() => ({
  colorState: extendColors(),
}));

export const ThemeProvider = ({
  config,
  children,
  allowNotification = false,
  allowConfirmation = false,
  allowGlobalLoading = false,
}: ThemeProviderProps) => {
  const { colors, defaultTheme } = config || {};

  useCssColors(":root", colors);

  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme={defaultTheme || "system"}
    >
      {allowNotification && <Notify />}
      {allowConfirmation && <ConfirmationModal />}
      {allowGlobalLoading && <Loading />}
      {children}
    </NextThemeProvider>
  );
};

export const useCssColors = (
  selector: string,
  colors?: Partial<ExtendColors>
) =>
  useEffect(() => {
    const extendedColors: ReturnedColors = extendColors(colors);

    useColorState.setState({ colorState: extendedColors });

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
            get(extendedColors, `${color}.${key}`),
            color,
            key
          )
        );
      })
      .flat()
      .join(";");

    createCSSSelector(selector, cssColorVariables);
  }, [colors]);
