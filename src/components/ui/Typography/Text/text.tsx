import cn from "classnames";
import { ElementType, ForwardedRef, forwardRef, HTMLAttributes } from "react";
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
} from "react-polymorphic-types";

import { extendedTextColors, textSizes } from "../../../../styles";
import type { ExtendedColors, ExtendedSizes } from "../../../../types";
import { typedMemo } from "../../../../utils/internal";

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
      ...props
    }: PolymorphicPropsWithoutRef<TextOwnProps, T>,
    ref: ForwardedRef<Element>
  ) => {
    const Component: ElementType = as || TextDefaultElement;

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

export default typedMemo(Text);

Text.displayName = "Text";
