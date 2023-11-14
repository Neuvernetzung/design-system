import { createElement, ForwardedRef, forwardRef, HTMLAttributes } from "react";

import { cn } from "@/utils";

import { extendedTextColors } from "../../../styles";
import { useThemeStateValue } from "../../../theme/useThemeState";
import type { ExtendedColor, Size, SvgType } from "../../../types";

export const iconDimensions: Record<Size, string> = {
  xs: "h-4 w-4",
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-10 w-10",
};

export type IconProps = HTMLAttributes<HTMLSpanElement> & {
  size?: Size;
  color?: ExtendedColor;
  icon: SvgType;
  className?: string;
};

export const Icon = forwardRef(
  (
    { size = "md", icon, color = "inherit", className }: IconProps,
    ref: ForwardedRef<HTMLSpanElement>
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

Icon.displayName = "Icon";
