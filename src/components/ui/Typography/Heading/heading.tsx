import { cn } from "@/utils";
import { ElementType, ForwardedRef, forwardRef, HTMLAttributes } from "react";

import { extendedTextColors, textSizes } from "../../../../styles";
import type { ExtendedColor, ExtendedSize } from "../../../../types";
import { Slot } from "@radix-ui/react-slot";

export const levelMap: Record<ExtendedSize, ElementType> = {
  xs: "h6",
  sm: "h5",
  md: "h4",
  lg: "h3",
  xl: "h2",
  "2xl": "h2",
  "3xl": "h2",
  "4xl": "h1",
  "5xl": "h1",
  "6xl": "h1",
};

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  size?: ExtendedSize;
  color?: ExtendedColor;
  className?: string;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  asChild?: boolean;
};

export const Heading = forwardRef(
  (
    {
      size = "md",
      color = "accent",
      level,
      className,
      children,
      asChild,
      ...props
    }: HeadingProps,
    ref: ForwardedRef<HTMLHeadingElement>
  ) => {
    const Component = asChild ? Slot : level || levelMap[size];

    return (
      <Component
        ref={ref}
        className={cn(
          getHeadingClassName({ size, color }),

          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";

export type GetHeadingClassNameProps = {
  size?: ExtendedSize;
  color?: ExtendedColor;
};

export const getHeadingClassName = ({
  size = "md",
  color = "accent",
}: GetHeadingClassNameProps) =>
  cn("font-heading font-semibold", textSizes[size], extendedTextColors[color]);
