import cn from "classnames";

import { Sizes } from "../../types";
import { capSize, minSize } from "../../utils";
import {
  bgColors,
  borders,
  extendedBgColors,
  extendedTextColors,
  gapsSmall,
  paddings,
  paddingsX,
  paddingsYSmall,
  roundings,
  shadows,
  textColors,
  textSizes,
  transitionFast,
} from "..";

type DropdownContainerStyleProps = {
  size: keyof Sizes;
};

const containerStyles = {
  base: `absolute focus:outline-none z-10 w-full max-h-60 min-w-[16rem] overflow-auto ${bgColors.white} border ${borders.accent}`,
};

export const getDropdownContainerStyles = ({
  size,
}: DropdownContainerStyleProps) =>
  cn(
    containerStyles.base,
    paddingsYSmall[capSize(size, "md")],
    roundings[minSize(size, "md")],
    shadows[minSize(size, "md")]
  );

type DropdownOptionsStyleProps = {
  size: keyof Sizes;
  active?: boolean;
  disabled?: boolean;
};

const optionStyles = {
  base: `w-full flex flex-row items-center justify-between select-none focus:outline-none ${bgColors.white} ${transitionFast} ${textColors.accent}`,
  active: `${extendedBgColors.filledSubtile}`,
  disabled: `${extendedTextColors.subtile} cursor-not-allowed`,
};

export const getDropDownOptionsStyles = ({
  size,
  active,
  disabled,
}: DropdownOptionsStyleProps) =>
  cn(
    optionStyles.base,
    paddings[capSize(size, "md")],
    textSizes[capSize(size, "md")],
    active && optionStyles.active,
    gapsSmall[size],
    disabled && optionStyles.disabled
  );

type DropdownGroupStyleProps = {
  size: keyof Sizes;
};

const groupStyles = {
  base: `w-full border-b last:border-none ${borders.accent}`,
};

export const getDropdownGroupStyles = ({ size }: DropdownGroupStyleProps) =>
  cn(groupStyles.base, paddingsYSmall[capSize(size, "md")]);

type DropdownGroupHeaderStyleProps = {
  size: keyof Sizes;
};

const groupHeaderStyles = {
  base: "font-semibold uppercase select-none",
};

export const getDropdownGroupHeaderStyles = ({
  size,
}: DropdownGroupHeaderStyleProps) =>
  cn(groupHeaderStyles.base, paddingsX[capSize(size, "md")]);
