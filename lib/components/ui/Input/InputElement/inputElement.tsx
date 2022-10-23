import { memo, ReactNode, forwardRef } from "react";
import { sizes, variants } from "../input";
import cn from "classnames";
import { textColors } from "../../../../styles";
import type { Sizes } from "../../../../types";
import type { Variants } from "../input";

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
  ) => {
    return (
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
    );
  }
);

export default memo(InputElement);
