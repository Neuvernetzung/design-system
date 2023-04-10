import cn from "classnames";
import { ReactElement } from "react";

import {
  adjustedTextColors,
  bgColors,
  borders,
  gapsSmall,
  paddingsSmall,
  paddingsSmallEvenly,
  roundings,
  textColors,
  textSizes,
} from "../../../styles";
import { useThemeState } from "../../../theme/useThemeState";
import type { Colors, Sizes, SvgType } from "../../../types";
import { capSize } from "../../../utils";
import { typedMemo } from "../../../utils/internal";
import { Icon } from "../Icon";

export type TagProps = {
  label?: string | ReactElement;
  leftIcon?: SvgType;
  rightIcon?: SvgType;
  size?: keyof Sizes;
  color?: keyof Colors;
  variant?: keyof Variants;
  rounded?: boolean;
  className?: string;
};

type Variants = {
  outline: any;
  solid: any;
  subtile: any;
};

export const variants = (
  color: keyof Colors,
  colorState?: Colors
): Variants => ({
  outline: cn("border", borders[color], textColors[color]),
  solid: cn(bgColors[color], adjustedTextColors(colorState)[color]),
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
  const { colorState } = useThemeState();

  return (
    <div
      className={cn(
        "h-min flex-0 inline-flex flex-row items-center select-none",
        variants(color, colorState)[variant],

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
    </div>
  );
};

export default typedMemo(Tag);
