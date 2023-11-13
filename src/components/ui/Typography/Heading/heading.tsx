import { cn } from "@/utils";
import { ElementType, ForwardedRef, forwardRef, HTMLAttributes } from "react";
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
} from "../../../../utils/internal/polymorphic";

import { extendedTextColors, textSizes } from "../../../../styles";
import type { ExtendedColor, ExtendedSize } from "../../../../types";
import { typedMemo } from "../../../../utils/internal";

export const tagMap: Record<ExtendedSize, keyof JSX.IntrinsicElements> = {
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

const HeadingDefaultElement: keyof JSX.IntrinsicElements = "h2";

export type HeadingOwnProps = HTMLAttributes<HTMLHeadingElement> & {
  size?: ExtendedSize;
  color?: ExtendedColor;
  className?: string;
};

export type HeadingProps<T extends ElementType = typeof HeadingDefaultElement> =
  PolymorphicPropsWithRef<HeadingOwnProps, T>;

export const Heading: PolymorphicForwardRefExoticComponent<
  HeadingOwnProps,
  typeof HeadingDefaultElement
> = forwardRef(
  <T extends ElementType = typeof HeadingDefaultElement>(
    {
      size = "md",
      color = "accent",
      as,
      className,
      children,
      ...props
    }: PolymorphicPropsWithoutRef<HeadingOwnProps, T>,
    ref: ForwardedRef<Element>
  ) => {
    const Component: ElementType = as || tagMap[size];

    return (
      <Component
        ref={ref}
        className={cn(
          "font-heading font-semibold",
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

export default typedMemo(Heading);

Heading.displayName = "Heading";
