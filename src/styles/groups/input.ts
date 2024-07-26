import { cn } from "@/utils";

import type { InputVariant, Size } from "../../types";
import { bordersInteractive, extendedBorders } from "../borders";
import {
  bgColors,
  extendedBgColors,
  extendedBgColorsInteractive,
  extendedTextColors,
  textColors,
} from "../colors";
import { focus } from "../focus";
import { paddings } from "../paddings";
import { placeholder } from "../placeholder";
import { roundings, roundingsLeft, roundingsRight } from "../roundings";
import { minHeights, textSizes } from "../sizes";
import { transition } from "../transition";

type InputStyleProps = {
  size: Size;
  variant: InputVariant;
  leftAddon?: boolean;
  rightAddon?: boolean;
  disabled: boolean;
  error: boolean;
};

export const inputSizes: Record<Size, string> = {
  xs: cn(paddings.xs, minHeights.xs, textSizes.xs),
  sm: cn(paddings.sm, minHeights.sm, textSizes.sm),
  md: cn(paddings.md, minHeights.md, textSizes.md),
  lg: cn(paddings.lg, minHeights.lg, textSizes.lg),
  xl: cn(paddings.xl, minHeights.xl, textSizes.xl),
};

type VariantProps = {
  base: string;
  default: string;
  error: string;
  disabled: string;
};

export const nputVariantClassnames: Record<InputVariant, VariantProps> = {
  outline: {
    base: `${bgColors.white} border ${placeholder.outline}`,
    default: `${bordersInteractive.accent} ${textColors.accent}`,
    error: `${bordersInteractive.danger}`,
    disabled: `${extendedBorders.filled} ${extendedBgColors.filledSubtile} ${extendedTextColors.filledSubtile}`,
  },
  filled: {
    base: `border-none ${placeholder.filled}`,
    default: `${extendedBgColorsInteractive.filled} ${textColors.accent}`,
    error: `${extendedBgColorsInteractive.danger} ${placeholder.filledError}`,
    disabled: `${extendedBgColors.filled} ${extendedTextColors.filledSubtile}`,
  },
  ghost: {
    base: `${extendedBgColorsInteractive.white} bg-opacity-0 dark:bg-opacity-0 border-none ${placeholder.ghost}`,
    default: `${textColors.accent}`,
    error: `${extendedBgColorsInteractive.danger} hover:bg-opacity-10 dark:hover:bg-opacity-10`,
    disabled: `${extendedBgColors.filledSubtile} ${extendedTextColors.filledSubtile}`,
  },
};

export const inputContainerClassName = "flex flex-row relative";

export const getInputStyles = ({
  size,
  variant,
  error,
  disabled,
  leftAddon,
  rightAddon,
}: InputStyleProps) =>
  cn(
    "appearance-none outline-none w-full",
    inputSizes[size],
    nputVariantClassnames[variant]?.base,
    !error ? focus.accent : focus.danger,
    transition,
    !error
      ? !disabled && nputVariantClassnames[variant]?.default
      : nputVariantClassnames[variant]?.error,
    disabled &&
      `cursor-not-allowed ${nputVariantClassnames[variant]?.disabled}`,
    !leftAddon && !rightAddon && roundings[size],
    !leftAddon && roundingsLeft[size],
    !rightAddon && roundingsRight[size]
  );
