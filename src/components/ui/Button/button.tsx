/* eslint-disable react/button-has-type */
import cn from "classnames";
import { ElementType, ForwardedRef, forwardRef, memo, ReactNode } from "react";
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
} from "react-polymorphic-types";
import { useColorState } from "../../../theme";

import {
  adjustedTextColors,
  bgColorsInteractive,
  borders,
  focusBg,
  focusRing,
  minHeights,
  paddings,
  roundings,
  textColors,
  transition,
} from "../../../styles";
import type { Colors, Focuses, Sizes } from "../../../types";
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

export const colors = (
  color: keyof Colors,
  colorState?: Colors
): ColorProps => ({
  base: cn(bgColorsInteractive[color], borders[color]),
  text: {
    filled: adjustedTextColors(colorState)[color],
    outline: textColors[color],
    ghost: textColors[color],
  },
});

type ColorProps = {
  base: string;
  text: Variants;
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
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
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

    const { colorState } = useColorState();

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
          paddings[size],
          roundings[size],
          minHeights[size],
          textSizes[size],
          !disabled && colors(color, colorState)?.base,
          !disabled && colors(color, colorState)?.text[variant],
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
