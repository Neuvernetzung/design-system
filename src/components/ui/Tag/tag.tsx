import cn from "classnames";
import { ElementType, memo } from "react";

import {
  adjustedTextColors,
  bgColors,
  borders,
  gapsSmall,
  paddingsSmall,
  roundings,
  textColors,
} from "../../../styles";
import type { Colors, Sizes } from "../../../types";
import { capSize } from "../../../utils";
import { Icon } from "../Icon";
import { Text } from "../Typography";

export type TagProps = {
  label?: string;
  leftIcon?: ElementType<SVGElement>;
  rightIcon?: ElementType<SVGElement>;
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

export const variants = (color: keyof Colors): Variants => ({
  outline: cn("border", borders[color], textColors[color]),
  solid: cn(bgColors[color], adjustedTextColors[color]),
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
}: TagProps) => (
  <div
    className={cn(
      "h-min flex flex-row items-center",
      variants(color)[variant],
      roundings[size],
      paddingsSmall[size],
      gapsSmall[size],
      rounded && "rounded-full"
    )}
  >
    {leftIcon && <Icon size={capSize(size, "md")} icon={leftIcon} />}
    {label && (
      <Text color="inherit" size={size}>
        {label}
      </Text>
    )}
    {rightIcon && <Icon size={capSize(size, "md")} icon={rightIcon} />}
  </div>
);

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
