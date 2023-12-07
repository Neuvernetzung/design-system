import { cn } from "@/utils";
import { forwardRef, ReactNode } from "react";

import {
  borders,
  extendedBgColors,
  roundingsLeft,
  roundingsRight,
  textColors,
} from "../../../../styles";
import { inputSizes } from "../../../../styles/groups";
import type { InputVariant, Size } from "../../../../types";

export type InputAddonProps = {
  className?: string;
  children: ReactNode;
  size: Size;
  variant: InputVariant;
  type: "left" | "right";
};

export const addonVariant: Record<InputVariant, string> = {
  outline: `border-y ${borders.accent}`,
  filled: `${extendedBgColors.filled}`,
  ghost: `${extendedBgColors.filled} bg-opacity-0 border-none`,
};

const styles = {
  base: `${textColors.accent}`,
};

export const InputAddon = forwardRef<HTMLDivElement, InputAddonProps>(
  ({ className, children, variant, size, type }, ref) => (
    <div
      ref={ref}
      className={cn(
        styles.base,
        inputSizes[size],
        addonVariant[variant],
        extendedBgColors.filledSubtile,
        type === "left" && roundingsLeft[size],
        type === "left" && "border-l",
        type === "right" && roundingsRight[size],
        type === "right" && "border-r",
        className
      )}
    >
      {children}
    </div>
  )
);

InputAddon.displayName = "InputAddon";
