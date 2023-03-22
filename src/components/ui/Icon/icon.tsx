import cn from "classnames";
import {
  createElement,
  ElementType,
  FC,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  SVGProps,
} from "react";
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
} from "react-polymorphic-types";

import { extendedTextColors } from "../../../styles";
import { ExtendedColors, Sizes } from "../../../types";
import { typedMemo } from "../../../utils/internal";

export const sizes: Sizes = {
  xs: "h-4 w-4",
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-10 w-10",
};

export const colors: ExtendedColors = extendedTextColors;

const IconDefaultElement = "svg";

export interface IconOwnProps extends HTMLAttributes<HTMLElement> {
  size?: keyof Sizes;
  color?: keyof ExtendedColors;
  icon: FC<SVGProps<SVGSVGElement>>;
  className?: string;
}

export type IconProps<T extends ElementType = typeof IconDefaultElement> =
  PolymorphicPropsWithRef<IconOwnProps, T>;

export const Icon: PolymorphicForwardRefExoticComponent<
  IconOwnProps,
  typeof IconDefaultElement
> = forwardRef(
  <T extends ElementType = typeof IconDefaultElement>(
    {
      size = "md",
      icon,
      color = "inherit",
      className,
    }: PolymorphicPropsWithoutRef<IconOwnProps, T>,
    ref: ForwardedRef<HTMLElement>
  ) => (
    <span
      ref={ref}
      className={cn("flex", sizes[size], colors[color], className)}
    >
      {icon && createElement(icon)}
    </span>
  )
);

export default typedMemo(Icon);

Icon.displayName = "Icon";
