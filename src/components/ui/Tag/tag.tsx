import { cn } from "@/utils/cn";
import type {
  ReactElement,
  ReactNode,
  ComponentPropsWithoutRef,
  ForwardedRef,
} from "react";
import { forwardRef } from "react";

import {
  bgColors,
  borders,
  gapsSmall,
  paddingsSmall,
  paddingsSmallEvenly,
  roundings,
  textColors,
  textSizes,
} from "@/styles";
import { useThemeState } from "@/theme/useThemeState";
import type { Color, ExtendedColor, Size, SvgType, TagVariant } from "@/types";
import { capSize } from "@/utils";
import { Icon } from "../Icon";
import { Slot, Slottable } from "@radix-ui/react-slot";

export type TagProps = ComponentPropsWithoutRef<"span"> & {
  children?: ReactNode;
  asChild?: boolean;
  leftIcon?: SvgType;
  leftElement?: ReactElement;
  rightIcon?: SvgType;
  rightElement?: ReactElement;
  size?: Size;
  color?: Color;
  variant?: TagVariant;
  rounded?: boolean;
  className?: string;
};

export const tagVariantStyles = (
  color: Color,
  adjustedTextColorState: Record<ExtendedColor, string>
): Record<TagVariant, string> => ({
  outline: cn("border", borders[color], textColors[color]),
  solid: cn(bgColors[color], adjustedTextColorState[color]),
  subtile: cn(bgColors[color], "bg-opacity-25", textColors[color]),
});

export const Tag = forwardRef(
  (
    {
      children,
      asChild,
      leftIcon,
      rightIcon,
      leftElement,
      rightElement,
      size = "md",
      color = "accent",
      variant = "solid",
      rounded,
      className,
      ...props
    }: TagProps,
    ref: ForwardedRef<HTMLSpanElement>
  ) => {
    const { adjustedTextColorState } = useThemeState();

    const tagVariantStyle = tagVariantStyles(color, adjustedTextColorState)[
      variant
    ];

    const Component = asChild ? Slot : "span";

    return (
      <Component
        ref={ref}
        className={cn(
          "h-min flex-0 inline-flex flex-row items-center select-none",
          tagVariantStyle,
          children ? paddingsSmall[size] : paddingsSmallEvenly[size],
          gapsSmall[size],
          textSizes[size],
          !rounded ? roundings[size] : "rounded-full",
          !children && "aspect-square",
          className
        )}
        {...props}
      >
        {leftElement && leftElement}
        {leftIcon && <Icon size={capSize(size, "md")} icon={leftIcon} />}
        <Slottable>{children}</Slottable>
        {rightIcon && <Icon size={capSize(size, "md")} icon={rightIcon} />}
        {rightElement && rightElement}
      </Component>
    );
  }
);

Tag.displayName = "Tag";
