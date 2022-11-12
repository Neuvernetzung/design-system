import { ReactNode, useLayoutEffect } from "react";
import { Colors, Color } from "../types";
import { extendColors } from "./extendColors";
import { createCSSSelector, getRGBColorVariable } from "../utils";
import create from "zustand";
import get from "lodash/get";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { Icons } from "./icons";

type ThemeProvider = {
  config: ConfigProps;
  children: ReactNode;
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

export const ThemeProvider = ({ config, children }: ThemeProvider) => {
  const { colors, defaultTheme } = config;

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
      {children}
    </NextThemeProvider>
  );
};
