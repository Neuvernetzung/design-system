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

import { extendedTextColors } from "../../../styles";
import { ExtendedColors } from "../../../types";

export const sizes: Sizes = {
  xs: "h-4 w-4",
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-10 w-10",
};

type Sizes = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
};

export const colors: ExtendedColors = extendedTextColors;

const IconDefaultElement = "svg";

export interface IconOwnProps extends HTMLAttributes<HTMLElement> {
  size?: keyof Sizes;
  color?: keyof ExtendedColors;
  icon: ElementType<SVGElement>;
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
    ref: ForwardedRef<Element>
  ) => {
    const IconWrapper: ElementType<SVGElement> = icon;

    return (
      <span ref={ref} className={cn(sizes[size], colors[color], className)}>
        <IconWrapper />
      </span>
    );
  }
);

Icon.defaultProps = {
  size: "md",
  color: "inherit",
};

export default memo(Icon);

Icon.displayName = "Icon";

Icon.defaultProps = {
  className: undefined,
};
