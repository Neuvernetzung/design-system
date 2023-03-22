import cn from "classnames";
import { forwardRef, ReactNode } from "react";

import { textColors } from "../../../../styles";
import { inputSizes } from "../../../../styles/groups";
import type { Sizes } from "../../../../types";
import { typedMemo } from "../../../../utils/internal";

export type InputElementProps = {
  className?: string;
  children: ReactNode;
  size: keyof Sizes;
  isLeft?: boolean;
  isRight?: boolean;
  pointerEvents?: boolean;
  style?: any;
};

const styles = {
  base: `absolute flex flex-row inset-y-0 items-center justify-center  ${textColors.accent}`,
};

export const InputElement = forwardRef<HTMLDivElement, InputElementProps>(
  (
    {
      className,
      children,
      size,
      isLeft,
      isRight,
      pointerEvents = false,
      style,
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        styles.base,
        inputSizes[size],
        isLeft && "left-0",
        isRight && "right-0",
        !pointerEvents && "pointer-events-none",
        className
      )}
      style={style} // Nur um Error Icon zu verschieben, falls ein rechtes Element angezeigt wird.
    >
      {children}
    </div>
  )
);

export default typedMemo(InputElement);

InputElement.displayName = "InputElement";
