import type { Modifier } from "@dnd-kit/core";

export const createSnapModifier =
  (rows: number, cols: number): Modifier =>
  ({ transform }) => ({
    ...transform,
    x: Math.ceil(transform.x / cols) * cols,
    y: Math.ceil(transform.y / rows) * rows,
  });
