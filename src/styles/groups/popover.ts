import { cn } from "@/utils";

import type { Size } from "../../types";
import { borders } from "../borders";
import { bgColors } from "../colors";
import { zIndexes } from "../zIndexes";
import { shadows } from "../shadows";
import { roundings } from "../roundings";
import { paddingsLargeEvenly } from "../paddings";
import { popoverMaxSizes } from "../sizes";

type PopoverContainerStyleProps = {
  size: Size;
  fullWidth?: boolean;
  ignoreMaxSizes?: boolean;
};

const styles = {
  base: cn("w-max overflow-x-hidden"),
};

export const getPopoverContainerStyles = ({
  size,
  fullWidth,
  ignoreMaxSizes,
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
    fullWidth
      ? "w-[var(--radix-popover-trigger-width)]"
      : !ignoreMaxSizes && popoverMaxSizes[size]
  );
