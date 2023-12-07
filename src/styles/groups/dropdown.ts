import { cn } from "@/utils/cn";

import type { Size } from "../../types";
import { capSize, minSize } from "../../utils";
import {
  bgColors,
  borders,
  paddingsSmallEvenly,
  paddingsX,
  roundings,
  scrollbar,
  shadows,
  zIndexes,
} from "..";

type DropdownContainerStyleProps = {
  size: Size;
  disablePadding?: boolean;
};

export const getDropdownPadding = (size: Size) =>
  paddingsSmallEvenly[capSize(size, "md")];

export const getDropdownContainerStyles = ({
  size,
  disablePadding,
}: DropdownContainerStyleProps) =>
  cn(
    "min-w-[16rem] overflow-auto border",
    bgColors.white,
    borders.accent,
    zIndexes.dropdown,
    scrollbar,
    !disablePadding && getDropdownPadding(size),
    roundings[minSize(size, "md")],
    shadows[minSize(size, "md")]
  );

type DropdownGroupHeaderStyleProps = {
  size: Size;
};

const groupHeaderStyles = {
  base: "font-semibold select-none",
};

export const getDropdownGroupHeaderStyles = ({
  size,
}: DropdownGroupHeaderStyleProps) =>
  cn(groupHeaderStyles.base, paddingsX[capSize(size, "md")]);
