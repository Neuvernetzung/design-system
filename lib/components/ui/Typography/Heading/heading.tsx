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

import type { Colors, ExtendedSizes } from "../../../../types";

export const sizes: Required<ExtendedSizes> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "sm:text-2xl text-xl",
  "3xl": "sm:text-3xl text-2xl",
  "4xl": "md:text-4xl text-3xl",
  "5xl": "lg:text-5xl md:text-4xl text-3xl",
  "6xl": "lg:text-6xl md:text-5xl text-4xl",
};

export const colors = {
  primary: "text-primary-500",
  accent: "text-accent-800 dark:text-accent-100",
  light: "text-accent-100",
  dark: "text-accent-800",
  success: "text-green-500",
  warn: "text-yellow-500",
  danger: "text-red-500",
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
  color?: keyof Colors;
  as?: keyof JSX.IntrinsicElements;
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
    }: PolymorphicPropsWithoutRef<HeadingOwnProps, T>,
    ref: ForwardedRef<Element>
  ) => {
    const Component: ElementType = as || tagMap[size];

    return (
      <Component
        ref={ref}
        className={cn("font-heading", sizes[size], colors[color], className)}
      >
        {children}
      </Component>
    );
  }
);

export default memo(Heading);

Heading.displayName = "Heading";

Heading.defaultProps = {
  size: "md",
  color: "accent",
  as: HeadingDefaultElement,
  className: undefined,
};
