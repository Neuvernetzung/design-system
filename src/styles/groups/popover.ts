import cn from "classnames";

import { Sizes } from "../../types";
import {
  bgColors,
  paddingsEvenly,
  popoverMaxSizes,
  roundings,
  shadows,
  zIndexes,
} from "..";

type PopoverContainerStyleProps = {
  size: keyof Sizes;
};

export const getPopoverContainerStyles = ({
  size,
}: PopoverContainerStyleProps) =>
  cn(
    "absolute left-0 md:-mx-4 mt-3 mb-3 w-screen overflow-hidden",
    bgColors.white,
    zIndexes.dropdown,
    shadows.lg,
    roundings.lg,
    paddingsEvenly.xl,
    popoverMaxSizes[size]
  );
