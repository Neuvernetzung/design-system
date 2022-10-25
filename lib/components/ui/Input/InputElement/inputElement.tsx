import cn from "classnames";
import { forwardRef, memo, ReactNode } from "react";

import { textColors } from "../../../../styles";
import type { Sizes } from "../../../../types";
import type { Variants } from "../input";
import { sizes, variants } from "../input";

export type InputElementProps = {
  className?: string;
  children: ReactNode;
  size: keyof Sizes;
  variant: keyof Variants;
  isLeft?: boolean;
  isRight?: boolean;
  pointerEvents?: boolean;
};

const styles = {
  base: `absolute flex flex-row items-center justify-center  ${textColors.accent}`,
};

export const InputElement = forwardRef<HTMLDivElement, InputElementProps>(
  (
    { className, children, size, isLeft, isRight, pointerEvents = false },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        styles.base,
        sizes[size],
        isLeft && "left-0",
        isRight && "right-0",
        !pointerEvents && "pointer-events-none",
        className
      )}
    >
      {children}
    </div>
  )
);

export default memo(InputElement);
