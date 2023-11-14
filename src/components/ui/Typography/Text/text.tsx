import { Slot } from "@radix-ui/react-slot";
import { ForwardedRef, forwardRef, HTMLAttributes } from "react";

import { cn } from "@/utils";

import { extendedTextColors, textSizes } from "../../../../styles";
import type { ExtendedColor, ExtendedSize } from "../../../../types";

export type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  size?: ExtendedSize;
  color?: ExtendedColor;
  className?: string;
  asChild?: boolean;
};

export const Text = forwardRef(
  (
    {
      size = "md",
      color = "accent",
      asChild,
      className,
      children,
      ...props
    }: TextProps,
    ref: ForwardedRef<HTMLParagraphElement>
  ) => {
    const Component = asChild ? Slot : "p";

    return (
      <Component
        ref={ref}
        className={cn(
          "font-body inline",
          textSizes[size],
          extendedTextColors[color],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";
