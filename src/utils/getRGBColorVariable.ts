import type { Color, HEX } from "../types";

const hex2rgb = (hex: HEX) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return { r, g, b };
};

export const getRGBColorVariable = (hex: HEX, color: Color, shade?: string) => {
  if (!hex || !color) return null;

  const { r, g, b } = hex2rgb(hex);

  if (!shade) return `--color-${color}: ${r} ${g} ${b}`;

  return `--color-${color}-${shade}: ${r} ${g} ${b}`;
};
