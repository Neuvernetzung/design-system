/* eslint-disable react/button-has-type */
import cn from "classnames";
import { colorIsBright, getThemeColors } from "../../../utils";
import {
  forwardRef,
  memo,
  Ref,
  ElementType,
  ComponentPropsWithoutRef,
  ReactElement,
  ReactNode,
} from "react";
import { Icon } from "../Icon";
import { sizes as textSizes } from "../Typography/Text/text";
import {
  minHeights,
  roundings,
  paddings,
  focus,
  transition,
} from "../../../styles";

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

export const colors: Colors = {
  primary: {
    base: "bg-primary-500 hover:bg-primary-600 border-primary-500",
    text: {
      filled: colorIsBright(realColors["primary-500"])
        ? "text-accent-50"
        : "text-accent-900",
      outline: "text-primary-500",
      ghost: "text-primary-500",
    },
  },
  accent: {
    base: "bg-accent-600 dark:bg-accent-300 hover:bg-accent-700 dark:hover:bg-accent-200 border-accent-600 dark:border-accent-300",
    text: {
      filled: colorIsBright(realColors["accent-500"])
        ? "text-accent-50 dark:text-accent-900"
        : "text-accent-900 dark:text-accent-50",
      outline: "text-accent-600 dark:text-accent-300",
      ghost: "text-accent-600 dark:text-accent-300",
    },
  },
  success: {
    base: "bg-green-500 hover:bg-green-600 border-green-500",
    text: {
      filled: colorIsBright(realColors["green-500"])
        ? "text-accent-50"
        : "text-accent-900",
      outline: "text-green-500",
      ghost: "text-green-500",
    },
  },
  warn: {
    base: "bg-yellow-500 hover:bg-yellow-600 border-yellow-500",
    text: {
      filled: colorIsBright(realColors["yellow-500"])
        ? "text-accent-50"
        : "text-accent-900",
      outline: "text-yellow-500",
      ghost: "text-yellow-500",
    },
  },
  danger: {
    base: "bg-red-500 hover:bg-red-600 border-red-500",
    text: {
      filled: colorIsBright(realColors["red-500"])
        ? "text-accent-50"
        : "text-accent-900",
      outline: "text-red-500",
      ghost: "text-red-500",
    },
  },
};

export type Colors = {
  primary: ColorProps;
  accent: ColorProps;
  success: ColorProps;
  warn: ColorProps;
  danger: ColorProps;
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

export type Sizes = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
};

export const styles = {
  base: "appearance-none prose prose-sm h-min select-none flex flex-row justify-center items-center gap-2 font-semibold",
  disabled: "bg-gray-200 cursor-not-allowed",
  fullWidth: "w-full",
  rounded: "rounded-full",
};

export type ButtonProps<T extends ElementType> = ComponentPropsWithoutRef<T> & {
  variant?: keyof Variants;
  color?: keyof Colors;
  size?: keyof Sizes;
  fullWidth?: boolean;
  rounded?: boolean;
  leftIcon?: ElementType<SVGElement>;
  rightIcon?: ElementType<SVGElement>;
  as?: T;
  children?: ReactNode;
};

type PolymorphicComponent = <T extends ElementType = "button">(
  props: ButtonProps<T>
) => ReactElement | null;

export const Button: PolymorphicComponent = forwardRef(
  <T extends ElementType>(
    {
      size = "md",
      type = "button",
      variant = "filled",
      color = "accent",
      disabled = false,
      fullWidth,
      rounded,
      leftIcon,
      rightIcon,
      className,
      as,
      children,
      ...props
    }: ButtonProps<T>,
    ref: Ref<T>
  ): JSX.Element => {
    const Component = as || "button";

    return (
      <Component
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          focus[color],
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
