import type { BorderRadiusSize } from "../theme";

export const getBorderRadiusVariable = (
  size: string,
  radius: BorderRadiusSize
) => {
  if (!radius) return null;

  return `--radius-${radius}: ${size}`;
};
