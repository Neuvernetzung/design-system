import type { PointerActivationConstraint } from "@dnd-kit/core";

export const activationConstraint: PointerActivationConstraint = {
  distance: 8, // Es ist nur eine Distanz notwendig und keine Zeit, dadurch kann bei Klick Edit geöffnet werden und bei ziehen die Karte verschoben
};
