import { OffsetsFunction } from "@popperjs/core/lib/modifiers/offset";

export const popperOffset: OffsetsFunction = ({ placement }) =>
  placement.startsWith("bottom") || placement.startsWith("top")
    ? [0, 10]
    : [10, 0];
