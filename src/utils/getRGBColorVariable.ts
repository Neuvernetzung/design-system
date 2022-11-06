import { Colors, HEX } from "../types";

const hex2rgb = (hex: HEX) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return { r, g, b };
};

export const getRGBColorVariable = (
  hex: HEX,
  color: keyof Colors,
  shade: string
) => {
  if (!hex || !color || !shade) return null;

  const { r, g, b } = hex2rgb(hex);

  return `--color-${color}-${shade}: ${r} ${g} ${b}`;
};
