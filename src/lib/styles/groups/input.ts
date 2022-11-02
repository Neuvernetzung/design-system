import cn from "classnames";

import { InputVariants, Sizes } from "../../types";
import {
  bgColors,
  borders,
  bordersInteractive,
  extendedBgColors,
  extendedBgColorsInteractive,
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
    default: `${bordersInteractive.accent}`,
    error: `${bordersInteractive.danger}`,
    disabled: `${borders.accent} ${extendedBgColors.filledSubtile}`,
  },
  filled: {
    base: `border-none ${placeholder.filled}`,
    default: `${extendedBgColorsInteractive.filled}`,
    error: `${extendedBgColorsInteractive.danger} ${placeholder.filledError}`,
    disabled: `${extendedBgColors.filled}`,
  },
};

const styles = {
  inputBase: `appearance-none outline-none w-full ${textColors.accent}`,
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
    !leftAddon && !rightAddon && roundings[size],
    !leftAddon && roundingsLeft[size],
    !rightAddon && roundingsRight[size]
  );
