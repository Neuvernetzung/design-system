import type { BorderRadiusSizes } from "../theme";

export const getBorderRadiusVariable = (
  size: string,
  radius: keyof BorderRadiusSizes
) => {
  if (!radius) return null;

  return `--radius-${radius}: ${size}`;
};
