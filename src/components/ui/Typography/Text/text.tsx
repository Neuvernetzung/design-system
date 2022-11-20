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

import { extendedTextColors, textSizes } from "../../../../styles";
import type { ExtendedColors, ExtendedSizes } from "../../../../types";

export const sizes: Required<ExtendedSizes> = textSizes;

export const colors: ExtendedColors = extendedTextColors;

const TextDefaultElement = "p";

export interface TextOwnProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: keyof ExtendedSizes;
  color?: keyof ExtendedColors;
  className?: string;
}

export type TextProps<T extends ElementType = typeof TextDefaultElement> =
  PolymorphicPropsWithRef<TextOwnProps, T>;

export const Text: PolymorphicForwardRefExoticComponent<
  TextOwnProps,
  typeof TextDefaultElement
> = forwardRef(
  <T extends ElementType = typeof TextDefaultElement>(
    {
      size = "md",
      color = "accent",
      as,
      className,
      children,
    }: PolymorphicPropsWithoutRef<TextOwnProps, T>,
    ref: ForwardedRef<Element>
  ) => {
    const Component: ElementType = as || TextDefaultElement;

    return (
      <Component
        ref={ref}
        className={cn(
          "font-body inline",
          sizes[size],
          extendedTextColors[color],
          className
        )}
      >
        {children}
      </Component>
    );
  }
);

export default memo(Text);

Text.displayName = "Text";

Text.defaultProps = {
  size: "md",
  color: "accent",
  as: TextDefaultElement,
  className: undefined,
};
