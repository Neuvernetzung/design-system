import cn from "classnames";
import { FC, memo, SVGProps } from "react";

import {
  adjustedTextColors,
  bgColors,
  borders,
  gapsSmall,
  paddingsSmall,
  roundings,
  textColors,
  textSizes,
} from "../../../styles";
import { useColorState } from "../../../theme";
import type { Colors, Sizes } from "../../../types";
import { capSize } from "../../../utils";
import { Icon } from "../Icon";

export type TagProps = {
  label?: string;
  leftIcon?: FC<SVGProps<SVGSVGElement>>;
  rightIcon?: FC<SVGProps<SVGSVGElement>>;
  size?: keyof Sizes;
  color?: keyof Colors;
  variant?: keyof Variants;
  rounded?: boolean;
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
}: TagProps) => {
  const { colorState } = useColorState();

  return (
    <div
      className={cn(
        "h-min flex-0 inline-flex flex-row items-center select-none",
        variants(color, colorState)[variant],
        roundings[size],
        paddingsSmall[size],
        gapsSmall[size],
        textSizes[size],
        rounded && "rounded-full"
      )}
    >
      {leftIcon && <Icon size={capSize(size, "md")} icon={leftIcon} />}
      {label}
      {rightIcon && <Icon size={capSize(size, "md")} icon={rightIcon} />}
    </div>
  );
};

export default memo(Tag);

Tag.defaultProps = {
  label: undefined,
  leftIcon: undefined,
  rightIcon: undefined,
  size: "md",
  color: "accent",
  variant: "solid",
  rounded: false,
};
