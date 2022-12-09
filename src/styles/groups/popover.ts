import cn from "classnames";

import { Sizes } from "../../types";
import {
  bgColors,
  paddingsEvenly,
  paddingsLargeEvenly,
  popoverMaxSizes,
  roundings,
  shadows,
  zIndexes,
} from "..";

type PopoverContainerStyleProps = {
  size: keyof Sizes;
};

const styles = {
  base: "w-screen overflow-x-hidden",
};

export const getPopoverContainerStyles = ({
  size,
}: PopoverContainerStyleProps) =>
  cn(
    styles.base,
    "absolute left-0 md:-mx-4 mt-3 mb-3 max-h-[60vh] overflow-y-auto",
    bgColors.white,
    zIndexes.dropdown,
    shadows.lg,
    roundings.lg,
    paddingsLargeEvenly.lg,
    popoverMaxSizes[size]
  );

export const getPopoverFullScreenStyles = () =>
  cn(
    styles.base,
    "fixed inset-0 overflow-y-hidden h-screen flex flex-col",
    bgColors.white,
    zIndexes.dropdown
  );

export const getPopoverFullScreenHeaderStyles = () =>
  cn("flex justify-end", paddingsEvenly.xl);

export const getPopoverFullScreenContainerStyles = () =>
  cn("overflow-y-auto", paddingsEvenly.xl);
