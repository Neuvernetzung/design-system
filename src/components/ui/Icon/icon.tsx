import cn from "classnames";
import {
  createElement,
  ElementType,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
} from "react";
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
} from "../../../utils/internal/polymorphic";

import { extendedTextColors } from "../../../styles";
import type { ExtendedColor, Size, SvgType } from "../../../types";
import { typedMemo } from "../../../utils/internal";
import { useThemeStateValue } from "../../../theme";

export const iconDimensions: Record<Size, string> = {
  xs: "h-4 w-4",
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-10 w-10",
};

const IconDefaultElement = "svg";

export type IconOwnProps = HTMLAttributes<HTMLElement> & {
  size?: Size;
  color?: ExtendedColor;
  icon: SvgType;
  className?: string;
};

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
  ) => {
    const iconStrokeWidth = useThemeStateValue(
      (values) => values.iconStrokeWidth
    );

    return (
      <span
        ref={ref}
        className={cn(
          "flex",
          iconDimensions[size],
          extendedTextColors[color],
          className
        )}
      >
        {icon &&
          createElement(icon, {
            className: iconDimensions[size],
            strokeWidth: iconStrokeWidth || 1.5,
          })}
      </span>
    );
  }
);

export default typedMemo(Icon);

Icon.displayName = "Icon";
