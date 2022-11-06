import { ReactNode, useLayoutEffect } from "react";
import { Colors, Color } from "../types";
import { extendColors } from "./extendColors";
import { createCSSSelector, getRGBColorVariable } from "../utils";
import create from "zustand";
import get from "lodash/get";

type ThemeProvider = {
  config: ConfigProps;
  children: ReactNode;
};

export type ConfigProps = {
  colors: Partial<Record<keyof Omit<Colors, "black" | "white">, Color>>;
};

type ColorState = {
  colorState: Record<keyof Omit<Colors, "white" | "black">, Color> | undefined;
};

export const useColorState = create<ColorState>(() => ({
  colorState: extendColors({}),
}));

export const ThemeProvider = ({ config, children }: ThemeProvider) => {
  useLayoutEffect(() => {
    const { colors } = config;
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
  }, [config]);

  if (!children) return null;

  return <>{children}</>;
};
