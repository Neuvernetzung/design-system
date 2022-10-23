import { forwardRef, memo, ReactNode } from "react";
import { sizes, variants } from "../input";
import cn from "classnames";
import {
  borders,
  extendedBgColors,
  textColors,
  roundingsLeft,
  roundingsRight,
} from "../../../../styles";
import type { Sizes } from "../../../../types";
import type { Variants } from "../input";

export type InputAddonProps = {
  className?: string;
  children: ReactNode;
  size: keyof Sizes;
  variant: keyof Variants;
  isLeft?: boolean;
  isRight?: boolean;
};

export const addonVariant: Record<keyof Variants, string> = {
  outline: `border-y ${borders.accent}`,
  filled: `${extendedBgColors.filled}`,
};

const styles = {
  base: `${textColors.accent}`,
};

export const InputAddon = forwardRef<HTMLDivElement, InputAddonProps>(
  ({ className, children, variant, size, isLeft, isRight }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          styles.base,
          sizes[size],
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
    );
  }
);

export default memo(InputAddon);
