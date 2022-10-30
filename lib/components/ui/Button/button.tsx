/* eslint-disable react/button-has-type */
import cn from "classnames";
import { ElementType, ForwardedRef, forwardRef, memo, ReactNode } from "react";
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
} from "react-polymorphic-types";

import {
  borders,
  focusBg,
  focusRing,
  minHeights,
  paddings,
  roundings,
  transition,
  bgColorsInteractive,
} from "../../../styles";
import type { Colors, Focuses, Sizes } from "../../../types";
import { colorIsBright, getThemeColors } from "../../../utils";
import { Icon } from "../Icon";
import { sizes as textSizes } from "../Typography/Text/text";

export const variants: Variants = {
  filled: "",
  outline:
    "bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-10 dark:hover:bg-opacity-10 border",
  ghost:
    "bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-10 dark:hover:bg-opacity-10",
};

export type Variants = { filled: string; outline: string; ghost: string };

export const realColors = {
  "primary-500": getThemeColors("primary")[500],
  "accent-500": getThemeColors("accent")[500],
  "green-500": getThemeColors("green")[500],
  "yellow-500": getThemeColors("yellow")[500],
  "red-500": getThemeColors("red")[500],
};

export const colors: Record<keyof Colors, ColorProps> = {
  primary: {
    base: `${bgColorsInteractive.primary} ${borders.primary}`,
    text: {
      filled: colorIsBright(realColors["primary-500"])
        ? "text-accent-50"
        : "text-accent-900",
      outline: "text-primary-500",
      ghost: "text-primary-500",
    },
  },
  accent: {
    base: `bg-accent-600 dark:bg-accent-300 hover:bg-accent-700 dark:hover:bg-accent-200 ${borders.accent}`,
    text: {
      filled: colorIsBright(realColors["accent-500"])
        ? "text-accent-50 dark:text-accent-900"
        : "text-accent-900 dark:text-accent-50",
      outline: "text-accent-600 dark:text-accent-300",
      ghost: "text-accent-600 dark:text-accent-300",
    },
  },
  success: {
    base: `${bgColorsInteractive.success} ${borders.success}`,
    text: {
      filled: colorIsBright(realColors["green-500"])
        ? "text-accent-50"
        : "text-accent-900",
      outline: "text-green-500",
      ghost: "text-green-500",
    },
  },
  warn: {
    base: `${bgColorsInteractive.warn} ${borders.warn}`,
    text: {
      filled: colorIsBright(realColors["yellow-500"])
        ? "text-accent-50"
        : "text-accent-900",
      outline: "text-yellow-500",
      ghost: "text-yellow-500",
    },
  },
  danger: {
    base: `${bgColorsInteractive.danger} ${borders.danger}`,
    text: {
      filled: colorIsBright(realColors["red-500"])
        ? "text-accent-50"
        : "text-accent-900",
      outline: "text-red-500",
      ghost: "text-red-500",
    },
  },
};

type ColorProps = {
  base: string;
  text: Variants;
};

export const sizes: Sizes = {
  xs: `${paddings.xs} ${roundings.xs} ${minHeights.xs}`,
  sm: `${paddings.sm} ${roundings.sm} ${minHeights.sm}`,
  md: `${paddings.md} ${roundings.md} ${minHeights.md}`,
  lg: `${paddings.lg} ${roundings.lg} ${minHeights.lg}`,
  xl: `${paddings.xl} ${roundings.xl} ${minHeights.xl}`,
};

export const focuses: Focuses = {
  ring: focusRing,
  bg: focusBg,
};

export const styles = {
  base: "appearance-none prose prose-sm h-min select-none flex flex-row justify-center items-center gap-2 font-semibold",
  disabled: "bg-gray-200 cursor-not-allowed",
  fullWidth: "w-full",
  rounded: "rounded-full",
};

export const ButtonDefaultElement = "button";

export type ButtonOwnProps = {
  variant?: keyof Variants;
  color?: keyof Colors;
  size?: keyof Sizes;
  focus?: keyof Focuses;
  fullWidth?: boolean;
  rounded?: boolean;
  leftIcon?: ElementType<SVGElement>;
  rightIcon?: ElementType<SVGElement>;
  children?: ReactNode;
};

export type ButtonProps<T extends ElementType = typeof ButtonDefaultElement> =
  PolymorphicPropsWithRef<ButtonOwnProps, T>;

export const Button: PolymorphicForwardRefExoticComponent<
  ButtonOwnProps,
  typeof ButtonDefaultElement
> = forwardRef(
  <T extends ElementType = typeof ButtonDefaultElement>(
    {
      size = "md",
      type = "button",
      variant = "filled",
      color = "accent",
      focus = "ring",
      disabled = false,
      fullWidth,
      rounded,
      leftIcon,
      rightIcon,
      className,
      as,
      children,
      ...props
    }: PolymorphicPropsWithoutRef<ButtonOwnProps, T>,
    ref: ForwardedRef<Element>
  ) => {
    const Component = as || ButtonDefaultElement;

    return (
      <Component
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          focuses[focus][color],
          styles.base,
          transition,
          variants[variant],
          sizes[size],
          textSizes[size],
          !disabled && colors[color]?.base,
          !disabled && colors[color]?.text[variant],
          disabled && styles.disabled,
          { [styles.fullWidth]: fullWidth, [styles.rounded]: rounded },
          className
        )}
        {...props}
      >
        {leftIcon && <Icon size={size} icon={leftIcon} />}
        {children}
        {rightIcon && <Icon size={size} icon={rightIcon} />}
      </Component>
    );
  }
);

export default memo(Button);

Button.displayName = "button";

Button.defaultProps = {
  variant: "filled",
  color: "accent",
  size: "md",
  fullWidth: false,
  rounded: false,
  leftIcon: undefined,
  rightIcon: undefined,
  as: undefined,
  children: undefined,
};
