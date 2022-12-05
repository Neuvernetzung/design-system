import get from "lodash/get";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode, useLayoutEffect } from "react";
import create from "zustand";

import { Loading } from "../components/ui/Loading";
import { ConfirmationModal } from "../components/ui/Modal";
import { Notify } from "../components/ui/Notify";
import { Color, Colors } from "../types";
import { getRGBColorVariable } from "../utils";
import { createCSSSelector } from "../utils/internal";
import { extendColors } from "./extendColors";
import { Icons } from "./icons";

type ThemeProviderProps = {
  config?: ConfigProps;
  children: ReactNode;
  allowNotification?: boolean;
  allowConfirmation?: boolean;
  allowGlobalLoading?: boolean;
};

export type ConfigProps = {
  colors?: Partial<Record<keyof Omit<Colors, "black" | "white">, Color>>;
  icons?: "outline" | "solid" | Icons;
  defaultTheme?: "system" | "light" | "dark";
};

type ColorState = {
  colorState: Record<keyof Omit<Colors, "white" | "black">, Color> | undefined;
};

export const useColorState = create<ColorState>(() => ({
  colorState: extendColors({}),
}));

export const ThemeProvider = ({
  config,
  children,
  allowNotification = false,
  allowConfirmation = false,
  allowGlobalLoading = false,
}: ThemeProviderProps) => {
  const { colors, defaultTheme } = config || {};

  useLayoutEffect(() => {
    const extendedColors: Record<keyof Omit<Colors, "white" | "black">, Color> =
      extendColors(colors);

    useColorState.setState({ colorState: extendedColors });

    const cssColorVariables = (
      Object.keys(extendedColors) as Array<
        keyof Omit<Colors, "white" | "black">
      >
    )
      ?.map((color) =>
        Object.keys(get(extendedColors, color))?.map((key) =>
          getRGBColorVariable(
            get(extendedColors, `${color}.${key}`),
            color,
            key
          )
        )
      )
      .flat()
      .join(";");

    createCSSSelector(":root", cssColorVariables);
  }, [colors]);

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

ThemeProvider.defaultProps = {
  config: undefined,
  allowNotification: false,
  allowConfirmation: false,
};
