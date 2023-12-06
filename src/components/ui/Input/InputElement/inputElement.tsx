import { cn } from "@/utils";
import { forwardRef, ReactNode } from "react";

import { textColors } from "../../../../styles";
import { inputSizes } from "../../../../styles/groups";
import type { Size } from "../../../../types";

export type InputElementProps = {
  className?: string;
  children: ReactNode;
  size: Size;
  type: "left" | "right";
  pointerEvents?: boolean;
};

export const InputElement = forwardRef<HTMLDivElement, InputElementProps>(
  ({ className, children, size, type, pointerEvents = false }, ref) => (
    <div
      ref={ref}
      className={cn(
        "absolute flex flex-row inset-y-0 items-center justify-center",
        textColors.accent,
        inputSizes[size],
        type === "left" && "left-0",
        type === "right" && "right-0",
        !pointerEvents && "pointer-events-none",
        className
      )}
    >
      {children}
    </div>
  )
);

InputElement.displayName = "InputElement";
