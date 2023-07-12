import cn from "classnames";
import { ComponentPropsWithoutRef, ElementType, ReactElement } from "react";

import { bgColors, roundings, zIndexes } from "../../../../styles";

export type DragIndicatorProps<TElementType extends ElementType> = {
  setNodeRef:
    | ((node: HTMLElement | null) => void)
    | ((instance: HTMLTableRowElement | null) => void);
  style: {
    transform: string | undefined;
    transition: string | undefined;
  };
  children?: ReactElement;
  className?: string;
  as?: TElementType;
} & ComponentPropsWithoutRef<TElementType>;

export const DragIndicator = <TElementType extends ElementType>({
  setNodeRef,
  style,
  children,
  className,
  as,
  ...props
}: DragIndicatorProps<TElementType>) => {
  const Component = as || "div";

  return (
    <Component
      ref={setNodeRef}
      style={style}
      className={cn(
        "h-2 w-full relative",
        zIndexes.dropdown,
        bgColors.primary,
        roundings.md,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
