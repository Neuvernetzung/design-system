import { forwardRef, HTMLAttributes, memo } from "react";
import cn from "classnames";
import type { ExtendedColors, ExtendedSizes } from "../../../../types";
import { extendedTextColors } from "../../../../styles";
export { extendedTextColors as colors };

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

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: keyof ExtendedSizes;
  color?: keyof ExtendedColors;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      size = "md",
      color = "accent",
      as: Component = "p",
      className,
      children,
    }: TextProps,
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "font-body",
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
