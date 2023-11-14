import { Slot } from "@radix-ui/react-slot";
import { HTMLAttributes, ReactElement } from "react";

import { cn } from "@/utils";

import { bgColors, roundings, zIndexes } from "../../../../styles";

export type DragIndicatorProps = HTMLAttributes<HTMLDivElement> & {
  setNodeRef:
    | ((node: HTMLElement | null) => void)
    | ((instance: HTMLTableRowElement | null) => void);
  style: {
    transform: string | undefined;
    transition: string | undefined;
  };
  children?: ReactElement;
  className?: string;
  asChild?: boolean;
};

export const DragIndicator = ({
  setNodeRef,
  style,
  children,
  className,
  asChild,
  ...props
}: DragIndicatorProps) => {
  const Component = asChild ? Slot : "div";

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
