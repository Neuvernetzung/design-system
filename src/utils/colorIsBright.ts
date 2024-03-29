import type { HEX } from "../types";

export const colorIsBright = (color: HEX) => {
  if (!color) return false;

  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 0 + 2), 16);
  const g = parseInt(hex.substring(2, 2 + 2), 16);
  const b = parseInt(hex.substring(4, 4 + 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 155;
};
