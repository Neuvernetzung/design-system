import cn from "classnames";
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
import { typedMemo } from "../../../../utils/internal";

export type InputAddonProps = {
  className?: string;
  children: ReactNode;
  size: Size;
  variant: InputVariant;
  isLeft?: boolean;
  isRight?: boolean;
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
  ({ className, children, variant, size, isLeft, isRight }, ref) => (
    <div
      ref={ref}
      className={cn(
        styles.base,
        inputSizes[size],
        addonVariant[variant],
        extendedBgColors.filledSubtile,
        isLeft && roundingsLeft[size],
        isLeft && "border-l",
        isRight && roundingsRight[size],
        isRight && "border-r",
        className
      )}
    >
      {children}
    </div>
  )
);

export default typedMemo(InputAddon);

InputAddon.displayName = "InputAddon";
