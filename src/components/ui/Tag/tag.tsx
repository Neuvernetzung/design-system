import { cn } from "@/utils/cn";
import { ReactElement } from "react";

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

export type TagProps = {
  label?: string | ReactElement;
  leftIcon?: SvgType;
  rightIcon?: SvgType;
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

export const Tag = ({
  label,
  leftIcon,
  rightIcon,
  size = "md",
  color = "accent",
  variant = "solid",
  rounded,
  className,
}: TagProps) => {
  const { adjustedTextColorState } = useThemeState();

  const tagVariantStyle = tagVariantStyles(color, adjustedTextColorState)[
    variant
  ];

  return (
    <span
      className={cn(
        "h-min flex-0 inline-flex flex-row items-center select-none",
        tagVariantStyle,
        label ? paddingsSmall[size] : paddingsSmallEvenly[size],
        gapsSmall[size],
        textSizes[size],
        !rounded ? roundings[size] : "rounded-full",
        !label && "aspect-square",
        className
      )}
    >
      {leftIcon && <Icon size={capSize(size, "md")} icon={leftIcon} />}
      {label}
      {rightIcon && <Icon size={capSize(size, "md")} icon={rightIcon} />}
    </span>
  );
};
