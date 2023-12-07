import type { BorderRadiusSize } from "@/types/Sizes";

export const borderRadiusVariableName = (size: BorderRadiusSize) =>
  `--radius-${size}`;

export const getBorderRadiusVariable = (
  size: string,
  radius: BorderRadiusSize
) => {
  if (!radius) return null;

  return `${borderRadiusVariableName(radius)}: ${size}`;
};

const twRadiusVariable = (size: BorderRadiusSize) =>
  `var(${borderRadiusVariableName(size)})`;

export const twRadiusVariables = {
  none: twRadiusVariable("none"),
  sm: twRadiusVariable("sm"),
  DEFAULT: twRadiusVariable("DEFAULT"),
  md: twRadiusVariable("md"),
  lg: twRadiusVariable("lg"),
  xl: twRadiusVariable("xl"),
  "2xl": twRadiusVariable("2xl"),
  "3xl": twRadiusVariable("3xl"),
  full: twRadiusVariable("full"),
};
