/* eslint-disable react/button-has-type */
import cn from "classnames";
import {
  ElementType,
  FC,
  ForwardedRef,
  forwardRef,
  memo,
  ReactNode,
  SVGProps,
} from "react";
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
} from "react-polymorphic-types";

import {
  adjustedTextColors,
  bgColors,
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
import { useColorState } from "../../../theme";
import type { Colors, Focuses, Sizes } from "../../../types";
import { Icon } from "../Icon";
import { Spinner } from "../Loading";
import { sizes as textSizes } from "../Typography/Text/text";
import { useLoadingState } from "../Loading/loading";
import isString from "lodash/isString";

export const variants: Variants = {
  filled: "",
  outline:
    "bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-10 disabled:hover:bg-opacity-0 dark:hover:bg-opacity-10  dark:disabled:hover:bg-opacity-0 border",
  ghost:
    "bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-10 disabled:hover:bg-opacity-0 dark:hover:bg-opacity-10  dark:disabled:hover:bg-opacity-0",
  subtile:
    "bg-opacity-30 dark:bg-opacity-30 hover:bg-opacity-40 hover:dark:bg-opacity-40 disabled:hover:bg-opacity-30 dark:disabled:hover:bg-opacity-30",
};

export type Variants = {
  filled: string;
  outline: string;
  ghost: string;
  subtile: string;
};

export const colors = (
  color: keyof Colors,
  colorState?: Colors
): ColorProps => ({
  base: cn(bgColorsInteractive[color], borders[color]),
  disabled: cn(bgColors[color], borders[color], "opacity-50"),
  text: {
    filled: adjustedTextColors(colorState)[color],
    outline: textColors[color],
    ghost: textColors[color],
    subtile: textColors[color],
  },
});

type ColorProps = {
  base: string;
  disabled: string;
  text: Variants;
};

export const focuses: Focuses = {
  ring: focusRing,
  bg: focusBg,
};

export const styles = {
  base: "appearance-none h-min select-none flex flex-row justify-center items-center gap-2 font-semibold disabled:cursor-not-allowed",
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
  leftIcon?: FC<SVGProps<SVGSVGElement>>;
  rightIcon?: FC<SVGProps<SVGSVGElement>>;
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
    ref: ForwardedRef<any>
  ) => {
    const Component = as || ButtonDefaultElement;

    const { colorState } = useColorState();

    const loadingState = useLoadingState((state) => state);
    const isLoading = isString(loadingState) && loadingState === loadingId;

    const _disabled = disabled || isLoading;

    return (
      <Component
        ref={ref}
        type={type}
        disabled={_disabled}
        className={cn(
          focuses[focus][color],
          styles.base,
          transition,
          variants[variant],
          paddings[size],
          roundings[size],
          minHeights[size],
          textSizes[size],
          !_disabled && colors(color, colorState)?.base,
          _disabled && colors(color, colorState)?.disabled,
          colors(color, colorState)?.text[variant],
          { [styles.fullWidth]: fullWidth, [styles.rounded]: rounded },
          className
        )}
        {...props}
      >
        {!isLoading ? (
          leftIcon && <Icon size={size} icon={leftIcon} />
        ) : (
          <Spinner size={size} />
        )}
        <span className="text-ellipsis overflow-hidden">{children}</span>
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
