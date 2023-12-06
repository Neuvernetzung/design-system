import { Slot, Slottable } from "@radix-ui/react-slot";
import { ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils";

import {
  extendedBgColors,
  extendedBgColorsInteractive,
  extendedBorders,
  extendedFocuses,
  extendedTextColors,
  minHeights,
  paddings,
  roundings,
  textSizes,
  transition,
} from "../../../styles";
import { useThemeStateValue } from "../../../theme/useThemeState";
import type {
  ButtonVariant,
  ExtendedColor,
  FocusVariant,
  Size,
  SvgType,
} from "../../../types";
import { Icon } from "../Icon";
import { Spinner } from "../Loading";

export const buttonVariantStyles: Record<ButtonVariant, string> = {
  filled: "",
  outline:
    "bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-10 disabled:hover:bg-opacity-0 dark:hover:bg-opacity-10  dark:disabled:hover:bg-opacity-0 border",
  ghost:
    "bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-10 disabled:hover:bg-opacity-0 dark:hover:bg-opacity-10  dark:disabled:hover:bg-opacity-0",
  subtile:
    "bg-opacity-30 dark:bg-opacity-30 hover:bg-opacity-40 hover:dark:bg-opacity-40 disabled:hover:bg-opacity-30 dark:disabled:hover:bg-opacity-30",
};

export const getButtonColorStyle = (
  color: ExtendedColor,
  adjustedTextColorState: Record<ExtendedColor, string>
): ColorProps => ({
  base: cn(extendedBgColorsInteractive[color], extendedBorders[color]),
  disabled: cn(extendedBgColors[color], extendedBorders[color], "opacity-50"),
  text: {
    filled: adjustedTextColorState[color],
    outline: extendedTextColors[color],
    ghost: extendedTextColors[color],
    subtile: extendedTextColors[color],
  },
});

type ColorProps = {
  base: string;
  disabled: string;
  text: Record<ButtonVariant, string>;
};

export const buttonBaseStyles = {
  base: "appearance-none flex items-center justify-center select-none gap-2 font-semibold disabled:cursor-not-allowed text-ellipsis",
  rounded: "!rounded-full",
};

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  color?: ExtendedColor;
  size?: Size;
  focus?: FocusVariant;
  rounded?: boolean;
  leftIcon?: SvgType;
  rightIcon?: SvgType;
  children?: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  asChild?: boolean;
};

export const Button = forwardRef(
  (
    {
      size = "md",
      type = "button",
      variant = "filled",
      color = "accent",
      focus = "ring",
      disabled = false,
      rounded,
      leftIcon,
      rightIcon,
      isLoading,
      className,
      children,
      asChild,
      ...props
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const Component = asChild ? Slot : "button";

    const adjustedTextColorState = useThemeStateValue(
      (v) => v.adjustedTextColorState
    );

    const _disabled = disabled || isLoading;

    return (
      <Component
        ref={ref}
        type={type}
        disabled={_disabled}
        aria-disabled={_disabled}
        className={cn(
          extendedFocuses[focus][color],
          buttonBaseStyles.base,
          transition,
          buttonVariantStyles[variant],
          paddings[size],
          roundings[size],
          minHeights[size],
          textSizes[size],
          disabled && "cursor-not-allowed",
          !_disabled &&
            getButtonColorStyle(color, adjustedTextColorState)?.base,
          _disabled &&
            getButtonColorStyle(color, adjustedTextColorState)?.disabled,
          getButtonColorStyle(color, adjustedTextColorState)?.text[variant],
          {
            [buttonBaseStyles.rounded]: rounded,
          },
          className
        )}
        {...props}
      >
        {!isLoading ? (
          leftIcon && <Icon size={size} icon={leftIcon} />
        ) : (
          <Spinner size={size} />
        )}
        <Slottable>{children}</Slottable>
        {rightIcon && <Icon size={size} icon={rightIcon} />}
      </Component>
    );
  }
);

Button.displayName = "button";
