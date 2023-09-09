import type { Size } from "../../types";

export type PopperOffsetProps = { size?: Size };

const offsetSizes: Record<Size, number> = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 10,
};

export const popperOffset = ({
  size = "md",
}: PopperOffsetProps): [number, number] => [0, offsetSizes[size]];
