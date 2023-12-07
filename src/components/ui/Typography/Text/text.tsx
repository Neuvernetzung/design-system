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
        className={cn(getTextClassName({ color, size }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";

export type GetTextClassNameProps = {
  size: ExtendedSize;
  color: ExtendedColor;
};

export const getTextClassName = ({
  size = "md",
  color = "accent",
}: GetTextClassNameProps) =>
  cn("font-body inline", textSizes[size], extendedTextColors[color]);
