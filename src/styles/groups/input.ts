import cn from "classnames";

import { InputVariants, Sizes } from "../../types";
import {
  bgColors,
  bordersInteractive,
  extendedBgColors,
  extendedBgColorsInteractive,
  extendedBorders,
  extendedTextColors,
  focus,
  minHeights,
  paddings,
  placeholder,
  roundings,
  roundingsLeft,
  roundingsRight,
  textColors,
  textSizes,
  transition,
} from "..";

type InputStyleProps = {
  size: keyof Sizes;
  variant: keyof InputVariants;
  leftAddon?: any;
  rightAddon?: any;
  disabled: boolean;
  error: boolean;
};

export const inputSizes: Required<Sizes> = {
  xs: `${paddings.xs} ${minHeights.xs} ${textSizes.xs}`,
  sm: `${paddings.sm} ${minHeights.sm} ${textSizes.sm}`,
  md: `${paddings.md} ${minHeights.md} ${textSizes.md}`,
  lg: `${paddings.lg} ${minHeights.lg} ${textSizes.lg}`,
  xl: `${paddings.xl} ${minHeights.xl} ${textSizes.xl}`,
};

type VariantProps = {
  base: string;
  default: string;
  error: string;
  disabled: string;
};

export const inputVariants: Record<keyof InputVariants, VariantProps> = {
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

const styles = {
  inputBase: `appearance-none outline-none w-full`,
};

export const getInputStyles = ({
  size,
  variant,
  error,
  disabled,
  leftAddon,
  rightAddon,
}: InputStyleProps) =>
  cn(
    inputSizes[size],
    inputVariants[variant]?.base,
    !error ? focus.accent : focus.danger,
    styles.inputBase,
    focus,
    transition,
    !error
      ? !disabled && inputVariants[variant]?.default
      : inputVariants[variant]?.error,
    disabled && `cursor-not-allowed ${inputVariants[variant]?.disabled}`,
    !disabled,
    !leftAddon && !rightAddon && roundings[size],
    !leftAddon && roundingsLeft[size],
    !rightAddon && roundingsRight[size]
  );
