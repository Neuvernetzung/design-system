import { cn } from "@/utils/cn";

import type { Size } from "../../types";
import { capSize, minSize } from "../../utils";
import {
  bgColors,
  borders,
  divides,
  paddingsSmallEvenly,
  paddingsX,
  popoverAnimation,
  roundings,
  scrollbar,
  shadows,
  zIndexes,
} from "..";

type DropdownContainerStyleProps = {
  size: Size;
};

export const getDropdownPadding = (size: Size) =>
  paddingsSmallEvenly[capSize(size, "md")];

export const getDropdownContainerStyles = ({
  size,
}: DropdownContainerStyleProps) =>
  cn(
    "flex flex-col min-w-[16rem] overflow-auto border divide-y will-change-[transform,opacity]",
    divides.accent,
    bgColors.white,
    borders.accent,
    zIndexes.dropdown,
    scrollbar,
    roundings[minSize(size, "md")],
    shadows[minSize(size, "md")],
    popoverAnimation
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
