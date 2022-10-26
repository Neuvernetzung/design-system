import cn from "classnames";

import { Sizes } from "../../types";
import {
  bgColors,
  borders,
  extendedBgColors,
  marginsYSmall,
  paddings,
  paddingsX,
  paddingsYSmall,
  roundings,
  shadows,
  textSizes,
  transitionFast,
  textColors,
  gapsSmall,
} from "..";

type DropdownContainerStyleProps = {
  size: keyof Sizes;
};

const containerStyles = {
  base: `absolute focus:outline-none z-10 w-full max-h-60 min-w-[16rem] overflow-auto ${bgColors.accent} border ${borders.accent}`,
};

export const getDropdownContainerStyles = ({
  size,
}: DropdownContainerStyleProps) =>
  cn(containerStyles.base, marginsYSmall[size], roundings[size], shadows[size]);

const optionSizes: Sizes = {
  xs: `${paddings.xs} ${textSizes.xs}`,
  sm: `${paddings.sm} ${textSizes.sm}`,
  md: `${paddings.md} ${textSizes.md}`, // maximale Größe bei md für Option
  lg: `${paddings.md} ${textSizes.md}`,
  xl: `${paddings.md} ${textSizes.md}`,
};

type DropdownOptionsStyleProps = {
  size: keyof Sizes;
  active?: boolean;
};

const optionStyles = {
  base: `w-full flex flex-row items-center justify-between select-none focus:outline-none ${bgColors.accent} ${transitionFast} ${textColors.accent}`,
  active: `${extendedBgColors.filledSubtile}`,
};

export const getDropDownOptionsStyles = ({
  size,
  active,
}: DropdownOptionsStyleProps) =>
  cn(
    optionStyles.base,
    optionSizes[size],
    active && optionStyles.active,
    gapsSmall[size]
  );

type DropdownGroupStyleProps = {
  size: keyof Sizes;
};

const groupStyles = {
  base: `w-full border-b last:border-none ${borders.accent}`,
};

export const getDropdownGroupStyles = ({ size }: DropdownGroupStyleProps) =>
  cn(groupStyles.base, marginsYSmall[size], paddingsYSmall[size]);

type DropdownGroupHeaderStyleProps = {
  size: keyof Sizes;
};

const groupHeaderStyles = {
  base: "font-semibold uppercase select-none",
};

export const getDropdownGroupHeaderStyles = ({
  size,
}: DropdownGroupHeaderStyleProps) =>
  cn(groupHeaderStyles.base, paddingsX[size]);
