import cn from "classnames";
import {
  bgColors,
  zIndexes,
  shadows,
  roundings,
  paddingsEvenly,
  popoverMaxSizes,
} from "../";
import { Sizes } from "../../types";

type PopoverContainerStyleProps = {
  size: keyof Sizes;
};

export const getPopoverContainerStyles = ({
  size,
}: PopoverContainerStyleProps) =>
  cn(
    "absolute left-0 md:-mx-4 mt-3 w-screen overflow-hidden",
    bgColors.white,
    zIndexes.dropdown,
    shadows.lg,
    roundings.lg,
    paddingsEvenly.xl,
    popoverMaxSizes[size]
  );
