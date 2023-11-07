import cn from "classnames";

import type { Size } from "../../types";
import { capSize, minSize } from "../../utils";
import {
  bgColors,
  borders,
  extendedBgColors,
  extendedTextColors,
  gapsSmall,
  paddings,
  paddingsSmallEvenly,
  paddingsX,
  roundings,
  shadows,
  textColors,
  textSizes,
  transitionFast,
  zIndexes,
} from "..";

type DropdownContainerStyleProps = {
  size: Size;
};

const containerStyles = {
  base: `focus:outline-none z-10 w-full max-h-60 min-w-[16rem] overflow-auto ${bgColors.white} border ${borders.accent}`,
};

export const getDropdownContainerStyles = ({
  size,
}: DropdownContainerStyleProps) =>
  cn(
    containerStyles.base,
    zIndexes.dropdown,
    paddingsSmallEvenly[capSize(size, "md")],
    roundings[minSize(size, "md")],
    shadows[minSize(size, "md")]
  );

type DropdownOptionsStyleProps = {
  size: Size;
  active?: boolean;
  disabled?: boolean;
};

const optionStyles = {
  base: `w-full flex flex-row items-center justify-between select-none focus:outline-none outline-none ${transitionFast}`,
  inactive: cn(bgColors.white),
  active: `${extendedBgColors.filledSubtile}`,
  textColor: textColors.accent,
  disabled: `${extendedTextColors.filledSubtile} cursor-not-allowed`,
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
    active ? optionStyles.active : optionStyles.inactive,
    gapsSmall[size],
    disabled ? optionStyles.disabled : optionStyles.textColor
  );

type DropdownGroupHeaderStyleProps = {
  size: Size;
};

const groupHeaderStyles = {
  base: "font-semibold uppercase select-none",
};

export const getDropdownGroupHeaderStyles = ({
  size,
}: DropdownGroupHeaderStyleProps) =>
  cn(groupHeaderStyles.base, paddingsX[capSize(size, "md")]);
