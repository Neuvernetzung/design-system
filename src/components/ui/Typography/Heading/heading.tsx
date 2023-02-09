import cn from "classnames";
import {
  ElementType,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  memo,
} from "react";
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
} from "react-polymorphic-types";

import { textSizes } from "../../../../styles";
import type { ExtendedColors, ExtendedSizes } from "../../../../types";

export const sizes: Required<ExtendedSizes> = textSizes;

export const colors: ExtendedColors = {
  brand: "text-brand-500",
  primary: "text-primary-500",
  accent: "text-accent-800 dark:text-accent-100",
  light: "text-accent-100",
  dark: "text-accent-800",
  success: "text-success-500",
  warn: "text-warn-500",
  danger: "text-danger-500",
};

export const tagMap: TagMap = {
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

const HeadingDefaultElement = "h2";

type TagMap = Record<keyof ExtendedSizes, keyof JSX.IntrinsicElements>;

export interface HeadingOwnProps extends HTMLAttributes<HTMLHeadingElement> {
  size?: keyof ExtendedSizes;
  color?: keyof ExtendedColors;
  className?: string;
}

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
          sizes[size],
          colors[color],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

export default memo(Heading);

Heading.displayName = "Heading";
