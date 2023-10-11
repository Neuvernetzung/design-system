/* eslint-disable react/button-has-type */
import cn from "classnames";
import isString from "lodash/isString";
import { ElementType, ForwardedRef, forwardRef, ReactNode } from "react";

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
import { useThemeState } from "../../../theme/useThemeState";
import type {
  ButtonVariant,
  ExtendedColor,
  FocusVariant,
  Size,
  SvgType,
} from "../../../types";
import { typedMemo } from "../../../utils/internal";
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
} from "../../../utils/internal/polymorphic";
import { Icon } from "../Icon";
import { Spinner } from "../Loading";
import { useLoadingState } from "../Loading/loading";

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
  fullWidth: "w-full",
  rounded: "!rounded-full",
};

export const ButtonDefaultElement = "button";

export type ButtonOwnProps = {
  variant?: ButtonVariant;
  color?: ExtendedColor;
  size?: Size;
  focus?: FocusVariant;
  fullWidth?: boolean;
  rounded?: boolean;
  leftIcon?: SvgType;
  rightIcon?: SvgType;
  children?: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  loadingId?: string;
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
      loadingId,
      className,
      as,
      children,
      ...props
    }: PolymorphicPropsWithoutRef<ButtonOwnProps, T>,
    ref: ForwardedRef<Element>
  ) => {
    const Component: ElementType = as || ButtonDefaultElement;

    const { adjustedTextColorState } = useThemeState();

    const loadingState = useLoadingState((state) => state);
    const isLoading = isString(loadingState) && loadingState === loadingId;

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
            [buttonBaseStyles.fullWidth]: fullWidth,
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
        {children}
        {rightIcon && <Icon size={size} icon={rightIcon} />}
      </Component>
    );
  }
);

export default typedMemo(Button);

Button.displayName = "button";
