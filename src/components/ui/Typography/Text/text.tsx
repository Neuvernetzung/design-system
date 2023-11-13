import { cn } from "@/utils";
import { ElementType, ForwardedRef, forwardRef, HTMLAttributes } from "react";

import { extendedTextColors, textSizes } from "../../../../styles";
import type { ExtendedColor, ExtendedSize } from "../../../../types";
import { typedMemo } from "../../../../utils/internal";
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
} from "../../../../utils/internal/polymorphic";

const TextDefaultElement = "p";

export type TextOwnProps = HTMLAttributes<HTMLParagraphElement> & {
  size?: ExtendedSize;
  color?: ExtendedColor;
  className?: string;
};

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
