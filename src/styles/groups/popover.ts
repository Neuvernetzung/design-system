import cn from "classnames";

import type { Size } from "../../types";
import {
  bgColors,
  borders,
  paddingsLargeEvenly,
  popoverMaxSizes,
  roundings,
  shadows,
  zIndexes,
} from "..";

type PopoverContainerStyleProps = {
  size: Size;
  fullWidth?: boolean;
};

const styles = {
  base: cn("w-max overflow-x-hidden"),
};

export const getPopoverContainerStyles = ({
  size,
  fullWidth,
}: PopoverContainerStyleProps) =>
  cn(
    styles.base,
    "max-h-[75vh] overflow-y-auto border",
    borders.accent,
    bgColors.white,
    zIndexes.dropdown,
    shadows.lg,
    roundings.lg,
    paddingsLargeEvenly.lg,
    fullWidth ? "w-[var(--radix-popover-trigger-width)]" : popoverMaxSizes[size]
  );
