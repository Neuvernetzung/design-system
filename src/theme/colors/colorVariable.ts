import type { Color, HEX } from "@/types";

const hex2rgb = (hex: HEX) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return { r, g, b };
};

export const colorVariableName = (color: Color, shade?: string) => {
  if (!shade) return `--color-${color}`;

  return `--color-${color}-${shade}`;
};

export const getColorVariable = (hex: HEX, color: Color, shade?: string) => {
  if (!hex || !color) return null;

  const { r, g, b } = hex2rgb(hex);

  return `${colorVariableName(color, shade)}: ${r} ${g} ${b}`;
};

export const twColorVariable = (color: Color, shade?: string) =>
  `rgb(var(${colorVariableName(color, shade)}) / <alpha-value>)`;

export const twColorVariables = (color: Color) => ({
  50: twColorVariable(color, "50"),
  100: twColorVariable(color, "100"),
  200: twColorVariable(color, "200"),
  300: twColorVariable(color, "300"),
  400: twColorVariable(color, "400"),
  500: twColorVariable(color, "500"),
  600: twColorVariable(color, "600"),
  700: twColorVariable(color, "700"),
  800: twColorVariable(color, "800"),
  900: twColorVariable(color, "900"),
  950: twColorVariable(color, "950"),
});
